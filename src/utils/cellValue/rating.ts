import { type IRatingField, FieldType } from "@lark-base-open/js-sdk"
import { defineTranslator } from "./cell"

async function normalization(value: string) {
  const { divide } = await import("mathjs")
  const percentage = /-?\d+\.?\d*%/g.test(value)
  const v = value.match(/-?\d+\.?\d*/g)
  const res = percentage ? divide(Number(v), 100) : Number(v)
  return res
}

/**
 * Get rating cell
 *
 * @param value
 * @param field
 * @returns
 */
async function rating(value: string, field: IRatingField) {
  const v = await normalization(value)
  return await field.createCell(v)
}

export const RatingTranslator = defineTranslator({
  fieldType: FieldType.Rating,
  translate: rating,
  normalization,
  name: "Rating",
})
