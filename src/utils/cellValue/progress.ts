import { type IProgressField, FieldType } from "@lark-base-open/js-sdk"
import { defineTranslator } from "./cell"

async function normalization(value: string) {
  const { divide } = await import("mathjs")
  const v = value.match(/-?\d+\.?\d*/g)
  const percentage = /-?\d+\.?\d*%/g.test(value)
  const res = percentage ? divide(Number(v), 100) : Number(v)
  return res
}

/**
 * Get progress cell
 *
 * @param value
 * @param field
 * @returns
 */
async function progress(value: string, field: IProgressField) {
  const v = await normalization(value)
  return await field.createCell(v)
}

export const ProgressTranslator = defineTranslator({
  fieldType: FieldType.Progress,
  translate: progress,
  name: "Progress",
  normalization,
})
