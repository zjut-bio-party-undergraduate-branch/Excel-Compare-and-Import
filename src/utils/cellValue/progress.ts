import { checkers } from "@lark-base-open/js-sdk";
export function progress(value: string) {
  const v = Number(value.match(/-?\d+\.?\d*/g));
  const res = v > 1 ? v/100 : v
  if (checkers.isNumber(res)) return res
  return 0
}