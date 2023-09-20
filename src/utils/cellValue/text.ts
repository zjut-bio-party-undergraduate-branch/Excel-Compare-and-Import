import { ITextField } from "@lark-base-open/js-sdk"

/**
 * Get text cell
 * @param value
 * @returns
 */
export async function text(field: ITextField, value: string) {
  return await field.createCell(value)
}
