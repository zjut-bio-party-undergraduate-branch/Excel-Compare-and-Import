import { IOpenPhone } from "@base-open/web-api"

export function phone(value: string): IOpenPhone {
  return String(value)
}