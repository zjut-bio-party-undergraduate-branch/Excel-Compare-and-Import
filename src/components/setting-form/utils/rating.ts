import { checkers } from "@base-open/web-api"
export function rating(value: string) {
  const res = Number(value.replace(/-?\d+\.?\d*/g, ""))
  if (checkers.isNumber(res)) return res
  console.log("not a rating", value, res)
  return null;
}