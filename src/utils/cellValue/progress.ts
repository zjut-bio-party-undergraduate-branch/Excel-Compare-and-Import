import { checkers } from "@lark-base-open/js-sdk"

/**
 * Get progress cell value
 * @param value
 * @returns
 */
export function progress(value: string) {
  const v = Number(value.match(/-?\d+\.?\d*/g))
  const res = v > 1 ? v / 100 : v
  if (checkers.isNumber(res)) return res
  return 0
}
