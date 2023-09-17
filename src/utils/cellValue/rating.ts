import { checkers } from "@lark-base-open/js-sdk"

/**
 * Get rating cell value
 * @param value
 * @returns
 */
export function rating(value: string) {
  const res = Number(value.match(/-?\d+\.?\d*/g))
  if (checkers.isNumber(res)) return res
  return null
}
