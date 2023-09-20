import { IRatingField } from "@lark-base-open/js-sdk"

/**
 * Get rating cell
 * @param value
 * @returns
 */
export async function rating(field: IRatingField, value: string) {
  const res = Number(value.match(/-?\d+\.?\d*/g))
  return await field.createCell(res)
}
