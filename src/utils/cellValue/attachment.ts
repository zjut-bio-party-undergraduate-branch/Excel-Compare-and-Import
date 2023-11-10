import { type IAttachmentField, FieldType } from "@lark-base-open/js-sdk"
import { defineTranslator } from "./cell"

enum DownloadStatus {
  Waiting = -1,
  Downloading = 0,
  Downloaded = 200,
  Error = 404,
}

interface FileCacheItem {
  url: string
  file: File
  status: DownloadStatus
}

const cache: Record<string, FileCacheItem> = {}

const setCache = () => {}

async function normalization(value: string) {
  const file = cache[value] || (await downloadFile(value))
}

async function attachment(field: IAttachmentField, value: string) {
  const { url } = JSON.parse(value)
  const file = await downloadFile(url)
  return {
    value: file,
    type: "file",
  }
}
