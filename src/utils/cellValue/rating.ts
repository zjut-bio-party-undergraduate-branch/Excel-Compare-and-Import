import { checkers } from "@lark-base-open/js-sdk"
export function rating(value: string) {
  const res = Number(value.match(/-?\d+\.?\d*/g))
  if (checkers.isNumber(res)) return res
  return null;
}