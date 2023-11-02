import { ISingleSelectField, FieldType } from "@lark-base-open/js-sdk"
import { defineTranslator } from "./cell"

/**
 * Get singleSelect cell
 * @param field
 * @param value
 * @returns
 */
async function singleSelect(value: string, field: ISingleSelectField) {
  return await field.createCell(value)
}

export const SingleSelectTranslator = defineTranslator({
  fieldType: FieldType.SingleSelect,
  translate: singleSelect,
  normalization: async (value: string) => value,
  name: "SingleSelect",
})
