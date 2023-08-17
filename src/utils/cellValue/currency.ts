import { checkers } from "@lark-base-open/web-api"

export function currency(value: string): number | null {
  const res = Number(value.match(/-?\d+\.?\d*/g))
  if (checkers.isNumber(res)) return res;
  console.log("not a currency", value, res)
  return null
}