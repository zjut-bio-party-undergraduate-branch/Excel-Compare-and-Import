import { IProgressField } from "@lark-base-open/js-sdk"
import { divide } from "mathjs"

/**
 * Get progress cell
 * @param field
 * @param value
 * @returns
 */
export async function progress(field: IProgressField, value: string) {
  const v = Number(value.match(/-?\d+\.?\d*/g))
  const res = value.match(/-?\d+\.?\d*%/g) ? divide(v, 100) : v
  return await field.createCell(res)
}
