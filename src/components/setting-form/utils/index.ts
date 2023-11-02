import { FieldType } from "@lark-base-open/js-sdk"
import { dateDefaultFormat } from "@/utils/cellValue/date"
import { defaultSeparator as multiSelectSeparator } from "@/utils/cellValue/multiSelect"
import { defaultBoolValue } from "@/utils/cellValue/checkBox"
import { singleLinkSeparator } from "@/utils/cellValue/singleLink"
import { duplexLinkSeparator } from "@/utils/cellValue/duplexLink"
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
  [FieldType.DuplexLink]: {
    separator: duplexLinkSeparator,
  },
}

export function configField(type: FieldType) {
  return fieldsConfig[type] || {}
}
