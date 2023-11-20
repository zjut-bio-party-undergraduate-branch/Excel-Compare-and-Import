import {
  type IAttachmentField,
  FieldType,
  bitable,
  UploadFileTaskStatus,
  IOpenAttachment,
} from "@lark-base-open/js-sdk"
import { defineTranslator, type AsyncParams, FieldRole } from "./cell"
import { downLoadFile, unique, validateUrl } from "@/utils"
import type { fieldMap } from "@/types/types"

enum DownloadStatus {
  Waiting = -1,
  Downloading = 0,
  Downloaded = 200,
  Error = 404,
}

interface FileCacheItem {
  url: string
  file: File | null
  name: string
  total: number
  loaded: number
  status: DownloadStatus
  token: string
  timeStamp: number
}

let cache: Record<string, FileCacheItem> = {}

const setCache = (item: FileCacheItem | Array<FileCacheItem>) => {
  if (Array.isArray(item)) {
    item.forEach((i) => {
      cache[i.url] = i
    })
    return
  }
  cache[item.url] = item
}

/**
 * Download files
 *
 * @param urls
 * @param options
 * @returns
 */
function processDownloadFiles(
  urls: Array<string>,
  options?: {
    onProgress?: AsyncParams<string>["onProgress"]
    onError?: AsyncParams<string>["onError"]
    parallel?: number
    requestConfig?: fieldMap["config"]["requestConfig"]
  },
) {
  const cacheItems = unique(urls)
    .map((url) => {
      if (!validateUrl(url)) return
      const item =
        cache[url] ||
        ({
          url,
          file: null,
          name: "",
          total: 0,
          loaded: 0,
          status: DownloadStatus.Waiting,
          token: "",
        } as FileCacheItem)
      return item
    })
    .filter((item) => {
      return (
        item &&
        [DownloadStatus.Waiting, DownloadStatus.Error].includes(item.status)
      )
    }) as Array<FileCacheItem>
  if (!cacheItems.length) return
  setCache(cacheItems)
  const { onProgress, parallel = 4, onError } = options ?? {}
  const total = cacheItems.length
  let loaded = 0
  let runningNum = 0
  const pendingItems: Array<FileCacheItem> = []
  const _run = () => {
    while (runningNum < parallel && cacheItems.length) {
      const item = cacheItems.shift()
      if (!item) return
      item.status = DownloadStatus.Downloading
      runningNum++
      pendingItems.push(item)
      downLoadFile(item.url, {
        onProgress: (p) => {
          console.log("processDownloadFiles", p)
          item.loaded = p.loaded
          item.total = p.total
          onProgress?.({
            total,
            loaded,
            message: pendingItems
              .map(
                (i) =>
                  `Downloading ${i.url} ${((i.loaded / i.total) * 100).toFixed(
                    2,
                  )}%`,
              )
              .join("\n"),
          })
        },
        fetchOptions: options?.requestConfig,
      })
        .then((file) => {
          item.file = file
          item.name = file?.name ?? ""
          item.status = DownloadStatus.Downloaded
          console.log("res", item, file)
        })
        .catch((e) => {
          item.status = DownloadStatus.Error
          onError?.(e)
          console.error(e)
        })
        .finally(() => {
          runningNum--
          loaded++
          console.log("cache", cache)
          pendingItems.splice(pendingItems.indexOf(item), 1)
          console.log("cache", cache)
          _run()
        })
    }
  }
  return new Promise((resolve) => {
    console.log("processDownloadFiles", cacheItems)
    _run()
    const timer = setInterval(() => {
      if (!cacheItems.length) {
        clearInterval(timer)
        resolve(null)
      }
    }, 1000)
  })
}

async function normalization(value: string, config?: fieldMap["config"]) {
  const { separator = "," } = config || {}
  const urls = value.split(separator)
  return urls
}

async function attachment(value: string, field: IAttachmentField) {
  const urls = await normalization(value)
  const files = urls
    .map((url) => {
      const item = cache[url]
      if (!item) return null
      return {
        name: item.name,
        token: item.token,
        size: item.total,
        type: item.file?.type ?? "",
        timeStamp: new Date().getTime(),
      }
    })
    .filter((item) => item) as IOpenAttachment[]
  if (!files) return null
  return await field.createCell(files)
}

export const AttachmentTranslator = defineTranslator({
  fieldType: FieldType.Attachment,
  translate: attachment,
  normalization: async (value: string) => value,
  name: "Attachment",
  asyncMethod: async (
    options: AsyncParams<string>,
    config?: fieldMap["config"],
  ) => {
    const { data: urls, onProgress, onError } = options
    const { requestConfig } = config || {}
    if (!urls.length) return
    await processDownloadFiles(urls, { onProgress, onError, requestConfig })
    const hasFileItems = Object.values(cache).filter((item) => item.file)
    const files = hasFileItems.map((item) => item.file) as File[]
    const off = bitable.base.onUploadStatusChange(({ data }) => {
      const { tasks } = data
      const { list } = tasks
      onProgress?.({
        loaded: list.filter((t) => t.status === UploadFileTaskStatus.Success)
          .length,
        total: list.length,
        message: list
          .filter((t) => t.status === UploadFileTaskStatus.Pending)
          .map(
            (t) =>
              `Uploading ${t.name} ${((t.uploadedSize / t.size) * 100).toFixed(
                2,
              )}`,
          )
          .join("\n"),
      })
    })
    const tokens = await bitable.base.batchUploadFile(files)
    let index = 0
    const items = Object.values(hasFileItems)
    for (const t in items) {
      const item = items[t]
      if (!item.file) continue
      item.token = tokens[index]
      index += 1
    }
    off()
  },
  roles: [FieldRole.ASYNC],
  refresh: () => {
    cache = {}
  },
})
