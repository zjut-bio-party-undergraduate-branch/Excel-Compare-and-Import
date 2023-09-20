import { IUserField } from "@lark-base-open/js-sdk"

/**
 * Get user cell
 * @param field
 * @param openId
 * @param separator Default: ","
 * @returns
 */
export async function User(
  field: IUserField,
  openId: string,
  separator: string = ",",
) {
  const multiple = await field.getMultiple()
  const users = openId.split(separator)
  return await field.createCell(
    multiple
      ? users.map((u) => ({
          id: u,
        }))
      : { id: users[0] },
  )
}
