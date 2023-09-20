import { IOpenLink, ISingleLinkField } from "@lark-base-open/js-sdk"

export const singleLinkSeparator = ","

/**
 * Get singleLink cell
 * @param field
 * @param value
 * @returns
 */
export async function singleLink(field: ISingleLinkField, value: string) {
  const multiple = await field.getMultiple()
  const ids = value.split(",")
  return await field.createCell({
    recordIds: multiple ? ids : Array(ids[0]),
    tableId: await field.getTableId(),
  } as IOpenLink)
}
