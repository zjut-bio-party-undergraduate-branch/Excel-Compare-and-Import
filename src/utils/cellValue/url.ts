import { IUrlField } from "@lark-base-open/js-sdk"

/**
 * Get url cell
 * @param field
 * @param value
 * @returns
 */
export async function url(field: IUrlField, value: string) {
  return await field.createCell(value)
}
