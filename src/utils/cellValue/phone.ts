import { IPhoneField } from "@lark-base-open/js-sdk"

/**
 * Get phone cell
 * @param field
 * @param value
 * @returns
 */
export async function phone(field: IPhoneField, value: string) {
  return await field.createCell(value)
}
