import { IOpenUser } from "@lark-base-open/js-sdk"

/**
 * Get user cell value
 * @param open_id
 * @param separator Default: ","
 * @returns
 */
export function User(open_id: string, separator: string = ","): IOpenUser[] {
  if (open_id === "") return []
  const selection = Array.from(open_id.split(separator))
  return selection.map((v) => {
    return {
      id: v.trim(),
    }
  })
}
