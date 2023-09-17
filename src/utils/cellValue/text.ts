import { IOpenSegmentType } from "@lark-base-open/js-sdk"

/**
 * Get text cell value
 * @param value
 * @returns
 */
export function text(value: string) {
  const res = [
    {
      text: String(value),
      type: IOpenSegmentType.Text,
    },
  ]
  return res
}
