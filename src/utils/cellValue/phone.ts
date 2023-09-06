import { IOpenPhone, checkers } from "@lark-base-open/js-sdk"

export function phone(value: string): IOpenPhone {
  const res = String(value)
  if (checkers.isPhone(res)) return res
  return ""
}