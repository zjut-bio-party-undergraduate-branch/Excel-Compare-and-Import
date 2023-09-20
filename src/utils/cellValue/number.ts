import { INumberField } from "@lark-base-open/js-sdk"

/**
 * Get number cell
 * @param field
 * @param value
 * @returns
 */
export async function number(field: INumberField, value: string) {
  const res = Number(value.match(/-?\d+\.?\d*/g))
  return await field.createCell(res)
}
