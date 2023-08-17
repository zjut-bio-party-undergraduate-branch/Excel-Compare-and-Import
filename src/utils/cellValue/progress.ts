import { checkers } from "@lark-base-open/web-api";
export function progress(value: string) {
  const v = Number(value.match(/-?\d+\.?\d*/g));
  const res = v > 1 ? v/100 : v
  console.log("progress", value, res)
  if (checkers.isNumber(res)) return res
  console.log("not a number", value, value.match(/-?\d+\.?\d*/g), res)
  return 0
}