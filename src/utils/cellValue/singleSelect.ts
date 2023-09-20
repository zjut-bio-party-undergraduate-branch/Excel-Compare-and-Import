import { ISingleSelectField } from "@lark-base-open/js-sdk"

/**
 * Get singleSelect cell
 * @param field
 * @param value
 * @returns
 */
export async function singleSelect(field: ISingleSelectField, value: string) {
  const options = await field.getOptions()
  const option = options.find((option) => option.id === value)
  if (!option) {
    await field.addOption(value)
  }
  return await field.createCell(value)
}
