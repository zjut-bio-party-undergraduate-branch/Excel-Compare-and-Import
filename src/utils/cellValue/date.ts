import dayjs from "dayjs/esm/index.js"
import customParseFormat from "dayjs/plugin/customParseFormat"
import advancedFormat from "dayjs/plugin/advancedFormat"
import { IDateTimeField } from "@lark-base-open/js-sdk"

dayjs.extend(customParseFormat)
dayjs.extend(advancedFormat)

export const dateDefaultFormat = "YYYY/MM/DD"

/**
 * Get dateTime cell
 * @param field
 * @param value
 * @param format Default: "YYYY/MM/DD"
 * @returns
 */
export async function dateTime(
  field: IDateTimeField,
  value: string,
  format: string = "YYYY/MM/DD",
) {
  const res = dayjs(value, format).valueOf()
  return await field.createCell(res)
}
