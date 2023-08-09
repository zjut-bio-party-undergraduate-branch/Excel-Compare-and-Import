import { checkers } from "@base-open/web-api";
export function progress(value: string) {
  const v = Number(value.replace(/-?\d+\.?\d*/g, ""));
  const res = v > 1 ? v/100 : v
  if (checkers.isNumber(res)) return res
  console.log("not a number", value, res)
  return 0
}