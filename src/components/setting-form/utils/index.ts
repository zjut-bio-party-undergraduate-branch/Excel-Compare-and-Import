import { FieldType } from "@lark-base-open/js-sdk"
import { dateDefaultFormat } from "@/utils/cellValue/date"
import { defaultSeparator as multiSelectSeparator } from "@/utils/cellValue/multiSelect"
import { defaultBoolValue } from "@/utils/cellValue/checkBox"
import { singleLinkSeparator } from "@/utils/cellValue/singleLink"
import { fieldMap } from "@/types/types"

export const ignoreFieldType = [
  FieldType.Lookup,
  FieldType.CreatedTime,
  FieldType.ModifiedTime,
  FieldType.Formula,
  FieldType.CreatedUser,
  FieldType.ModifiedUser,
  FieldType.NotSupport,
  FieldType.Location,
  FieldType.AutoNumber,
  FieldType.GroupChat,
  FieldType.Denied,
  FieldType.Attachment,
]

export const hasChildrenFieldType = [FieldType.SingleLink, FieldType.DuplexLink]

export const indexFieldType = [
  FieldType.Text,
  FieldType.Number,
  FieldType.DateTime,
  FieldType.Barcode,
  FieldType.Phone,
]

const fieldsConfig: { [key: number]: fieldMap["config"] } = {
  [FieldType.DateTime]: {
    format: dateDefaultFormat,
  },
  [FieldType.MultiSelect]: {
    separator: multiSelectSeparator,
  },
  [FieldType.Checkbox]: {
    boolValue: defaultBoolValue,
  },
  [FieldType.SingleLink]: {
    separator: singleLinkSeparator,
  },
}

export function configField(type: FieldType) {
  return fieldsConfig[type] || {}
}
