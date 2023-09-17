import {
  IMultiSelectFieldMeta,
  IOpenMultiSelect,
  checkers,
} from "@lark-base-open/js-sdk"

export const defaultSeparator = ","

/**
 * Get multiSelect cell value
 * @param value
 * @param field
 * @param separator Default: ","
 * @returns
 */
export function multiSelect(
  value: string,
  field: IMultiSelectFieldMeta,
  separator: string = ",",
): IOpenMultiSelect {
  console.log("separator", separator)
  if (value === "") return []
  console.log("multiSelect", value)
  const selection = Array.from(value.split(separator))
  const res: IOpenMultiSelect = []
  for (const v of selection) {
    let id =
      field.property.options.find((option) => option.name === v)?.id ?? ""
    res.push({
      text: v,
      id,
    })
  }
  if (checkers.isMultiSelect(res)) return res
  return []
}
