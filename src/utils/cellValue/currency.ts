import { ICurrencyField } from "@lark-base-open/js-sdk"

/**
 * Get currency cell
 * @param field
 * @param value
 * @returns
 */
export async function currency(field: ICurrencyField, value: string) {
  const res = Number(value.match(/-?\d+\.?\d*/g))
  return await field.createCell(res)
}
