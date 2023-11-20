import { type IAttachmentField, FieldType } from "@lark-base-open/js-sdk"
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
          item.loaded = p.loaded
          item.total = p.total
          onProgress?.({
            total,
            loaded: ++loaded,
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
        })
        .catch((e) => {
          item.status = DownloadStatus.Error
          onError?.(e)
        })
        .finally(() => {
          runningNum--
          pendingItems.splice(pendingItems.indexOf(item), 1)
          _run()
        })
    }
  }
  return new Promise((resolve) => {
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
      return item.file
    })
    .filter((item) => item) as File[]
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
  },
  roles: [FieldRole.ASYNC],
  cache,
  refresh: () => {
    cache = {}
  },
})
