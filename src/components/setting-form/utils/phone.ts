import { IOpenPhone, checkers } from "@lark-base-open/web-api"

export function phone(value: string): IOpenPhone {
  const res = String(value)
  if (checkers.isPhone(res)) return res
  console.log("not a phone", value, res)
  return ""
}