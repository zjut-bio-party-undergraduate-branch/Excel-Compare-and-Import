import {
  IOpenCellValue,
  FieldType,
  IMultiSelectFieldMeta,
  ISingleSelectFieldMeta,
  checkers,
  IOpenGroupChat,
} from "@lark-base-open/js-sdk"
import { fieldMap } from "@/types/types"
import { dateTime, dateDefaultFormat } from "./date"
import { multiSelect } from "./multiSelect"
import { singleSelect } from "./singleSelect"
import { checkBox, defaultBoolValue } from "./checkBox"
import { text } from "./text"
import { url } from "./url"
import { phone } from "./phone"
import { currency } from "./currency"
import { progress } from "./progress"
import { rating } from "./rating"
import { barCode } from "./barCode"
import { User } from "./user"

export function getCellValue(
  fieldMap: fieldMap,
  value: string,
): IOpenCellValue {
  const type = fieldMap.field.type
  const field = fieldMap.field
  const config = fieldMap.config
  if (!value) return value
  switch (type) {
    case FieldType.Url:
      return url(value)
    case FieldType.DateTime:
      return dateTime(value, config?.format ?? dateDefaultFormat)
    case FieldType.SingleSelect:
      return singleSelect(value, field as ISingleSelectFieldMeta)
    case FieldType.MultiSelect:
      return multiSelect(
        value,
        field as IMultiSelectFieldMeta,
        config?.separator ?? ",",
      )
    case FieldType.Number:
      return Number(value.match(/-?\d+\.?\d*/g))
    case FieldType.Currency:
      return currency(value)
    case FieldType.Progress:
      return progress(value)
    case FieldType.Rating:
      return rating(value)
    case FieldType.Checkbox:
      return checkBox(value, config?.boolValue ?? defaultBoolValue)
    case FieldType.Text:
      return text(value) as IOpenCellValue
    case FieldType.Barcode:
      return barCode(value) as IOpenCellValue
    case FieldType.Phone:
      return phone(value)
    case FieldType.User:
      return User(value, config.separator)
    default:
      return value
  }
}

function isGroupChats(value: IOpenCellValue): value is IOpenGroupChat[] {
  if (!Array.isArray(value)) return false
  return value.every((v) => checkers.isGroupChat(v))
}

/**
 * Transform cellValue to string
 * @param value
 * @returns
 */
export function cellValueToString(value: IOpenCellValue) {
  if (checkers.isSegments(value)) {
    return value.map((v) => v.text).join("")
  }
  if (checkers.isTimestamp(value) || checkers.isNumber(value)) {
    return String(value)
  }
  if (checkers.isSingleSelect(value)) {
    return value.text
  }
  if (checkers.isMultiSelect(value)) {
    return value.map((v) => v.text).join(",")
  }
  if (checkers.isCheckbox(value)) {
    return value ? "☑️" : ""
  }
  if (checkers.isUsers(value)) {
    return value.map((v) => v.name).join(",")
  }
  if (checkers.isEmpty(value)) {
    return ""
  }
  if (checkers.isLocation(value)) {
    return value.fullAddress
  }
  if (checkers.isLink(value)) {
    return value.text
  }
  if (checkers.isAttachments(value)) {
    return value.map((v) => v.name).join(",")
  }
  if (checkers.isPhone(value) || checkers.isAutoNumber(value)) {
    return value
  }
  if (isGroupChats(value)) {
    return value.map((v) => v.name).join(",")
  }
}
