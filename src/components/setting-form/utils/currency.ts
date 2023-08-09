import { checkers } from "@base-open/web-api"

export function currency(value: string): number | null {
  const res = Number(value.replace(/-?\d+\.?\d*/g, ""))
  if (checkers.isNumber(res)) return res;
  console.log("not a currency", value, res)
  return null
}