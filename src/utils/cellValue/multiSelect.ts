import { IMultiSelectField } from "@lark-base-open/js-sdk"

export const defaultSeparator = ","

/**
 * Get multiSelect cell
 * @param field
 * @param value
 * @param separator Default: ","
 * @returns
 */
export async function multiSelect(
  field: IMultiSelectField,
  value: string,
  separator: string = ",",
) {
  const options = await field.getOptions()
  const values = value.split(separator)
  for (let i = 0; i < values.length; i++) {
    const option = options.find((option) => option.name === values[i])
    if (!option) {
      await field.addOption(values[i])
    }
  }
  return await field.createCell(values)
}
