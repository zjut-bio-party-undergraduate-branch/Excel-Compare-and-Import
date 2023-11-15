import { type IAttachmentField, FieldType } from "@lark-base-open/js-sdk"
import { defineTranslator, type AsyncParams } from "./cell"
import { downLoadFile, unique, validateUrl } from "@/utils"

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

function processDownloadFiles(
  urls: Array<string>,
  options?: {
    onProgress?: AsyncParams<string, FileCacheItem>["onProgress"]
    onError?: AsyncParams<string, FileCacheItem>["onError"]
    parallel?: number
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
            pending: pendingItems,
          })
        },
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

async function normalization(value: string) {
  const file = cache[value].file
  return file
}

async function attachment(value: string, field: IAttachmentField) {
  const file = await normalization(value)
  if (!file) return null
  return await field.createCell(file)
}

export const AttachmentTranslator = defineTranslator({
  fieldType: FieldType.Attachment,
  translate: attachment,
  normalization: async (value: string) => value,
  name: "Attachment",
  asyncMethod: async (options: AsyncParams<string, FileCacheItem>) => {
    const { data: urls, onProgress, onError } = options
    if (!urls.length) return
    await processDownloadFiles(unique(urls), { onProgress, onError })
  },
  cache,
  refresh: () => {
    cache = {}
  },
})
