import { IBarcodeField } from "@lark-base-open/js-sdk"
/**
 * Get barCode cell
 * @param field
 * @param value
 * @returns
 */
export async function barCode(field: IBarcodeField, value: string) {
  return await field.createCell(value)
}
