import * as XLSX from "xlsx"
import type { SheetInfo } from "@/types/types"

function readXLSX(data: string, name: string) {
  try {
    const workbook = XLSX.read(data, { type: "binary" })
    const sheets = workbook.SheetNames.map((name) => {
      const sheet = workbook.Sheets[name]
      const tableData = XLSX.utils.sheet_to_json(sheet, {
        header: 1,
      }) as any[][]
      if (tableData.length <= 1) return null
      try {
        const fields = tableData[0]?.map((name: string) => ({
          name: String(name),
        }))
        const records = tableData
          .slice(1)
          .map((row: string[]) => {
            const record: { [key: string]: string } = {}
            row.forEach((value, index) => {
              record[fields[index].name] = value ? String(value) : ""
            })
            return record
          })
          .filter((record) => {
            return Object.values(record).some((value) => {
              return value
            })
          })
        if (records.length) return { name, tableData: { fields, records } }
        return null
      } catch (e) {
        console.log(e)
        // ElMessage.error(t("message.sheetError", { sheetName: name }))
        postMessage({ type: "error", payload: "message.sheetError" })
        return null
      }
    }).filter((sheet) => sheet !== null) as SheetInfo[]
    console.log(sheets)
    if (sheets.length === 0) {
      // ElMessage.error(t("message.noSheet"))
      postMessage({ type: "error", payload: "message.noSheet" })
      return null
    }
    return { sheets, name: name }
  } catch (e) {
    console.error(e)
    return null
  }
}

onmessage = function (e) {
  const { data } = e
  const { type, payload } = data
  if (type === "readXLSX") {
    const { data, name } = payload
    const result = readXLSX(data, name)
    postMessage({ type: "readXLSX", payload: result })
  }
}
