import { IOpenPhone, checkers } from "@lark-base-open/js-sdk"

/**
 * Get phone cell value
 * @param value
 * @returns
 */
export function phone(value: string): IOpenPhone {
  const res = String(value)
  if (checkers.isPhone(res)) return res
  return ""
}
