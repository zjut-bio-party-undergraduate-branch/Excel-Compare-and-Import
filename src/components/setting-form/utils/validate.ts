import type { fieldMap } from "@/types/types"
import { Warn } from "@/utils"

export function validateIndex(index: fieldMap[]) {
  if (index.length === 0) {
    Warn({
      title: "noIndex",
      message: "noIndex",
      notice: true,
      noticeParams: {
        text: "message.noIndex",
      },
    })
    return false
  }
  const noExcelField = index.filter((i) => !i.excel_field)
  if (noExcelField.length) {
    const names = noExcelField.map((i) => i.field.name).join(", ")
    Warn({
      title: "noExcelField",
      message: names,
      notice: true,
      noticeParams: {
        text: "message.indexNoExcelField",
        params: {
          fields: names,
        },
      },
    })
    return false
  }
  return true
}
