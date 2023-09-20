import type { ICheckBoxField } from "@lark-base-open/js-sdk"

export const defaultBoolValue = {
  true: ["是", "True", "true", "TRUE", "1", "☑️"],
  false: ["否", "False", "false", "FALSE", "0", ""],
}

/**
 * Get checkBox cell
 * @param field
 * @param value
 * @param boolValue Default value is { true: ["是", "True", "true", "TRUE", "1", "☑️"], false: ["否", "False", "false", "FALSE", "0", ""] }
 * @returns
 */
export async function checkBox(
  field: ICheckBoxField,
  value: string,
  boolValue: { true: string[]; false: string[] } = defaultBoolValue,
) {
  return await field.createCell(boolValue.true.includes(value))
}
