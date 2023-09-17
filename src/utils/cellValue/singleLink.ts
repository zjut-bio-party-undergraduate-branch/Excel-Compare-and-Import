import { ISingleLinkFieldMeta } from "@lark-base-open/js-sdk"

export const singleLinkSeparator = ","

/**
 * Get singleLink cell value
 * @param value
 * @param field
 * @param separator Default: ","
 * @returns
 */
export function singleLink(
  value: string,
  field: ISingleLinkFieldMeta,
  separator: string = singleLinkSeparator,
) {
  if (!value) return value
  const res = value.split(separator)
  if (res.length === 1) return res[0]
  return res
}
