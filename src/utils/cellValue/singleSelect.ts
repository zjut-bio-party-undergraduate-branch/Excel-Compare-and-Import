import {
  ISingleSelectFieldMeta,
  IOpenSingleSelect,
} from "@lark-base-open/js-sdk"

/**
 * Get singleSelect cell value
 * @param value
 * @param field
 * @returns
 */
export function singleSelect(
  value: string,
  field: ISingleSelectFieldMeta,
): IOpenSingleSelect {
  if (value === "") {
    return {
      text: "",
      id: "",
    }
  }
  const id =
    field.property.options.find((option) => option.name === value)?.id ?? ""
  return {
    text: value,
    id,
  }
}
