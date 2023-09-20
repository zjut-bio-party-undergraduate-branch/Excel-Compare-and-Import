import {
  IOpenCellValue,
  FieldType,
  checkers,
  IOpenGroupChat,
  IField,
  IUrlField,
  IDateTimeField,
  ISingleLinkField,
  ISingleSelectField,
  IMultiSelectField,
  INumberField,
  ICurrencyField,
  IProgressField,
  IRatingField,
  ICheckBoxField,
  ITextField,
  IBarcodeField,
  IPhoneField,
  IUserField,
  IDuplexLinkField,
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
import { singleLink } from "./singleLink"
import { duplexLink } from "./duplexLink"
import { number } from "./number"

export async function getCell(
  field: IField,
  fieldMap: fieldMap,
  value: string,
) {
  const type = fieldMap.field.type
  const config = fieldMap.config
  switch (type) {
    case FieldType.Url:
      return url(field as IUrlField, value)
    case FieldType.DateTime:
      return dateTime(
        field as IDateTimeField,
        value,
        config?.format ?? dateDefaultFormat,
      )
    case FieldType.SingleSelect:
      return singleSelect(field as ISingleSelectField, value)
    case FieldType.MultiSelect:
      return multiSelect(
        field as IMultiSelectField,
        value,
        config?.separator ?? ",",
      )
    case FieldType.Number:
      return number(field as INumberField, value)
    case FieldType.Currency:
      return currency(field as ICurrencyField, value)
    case FieldType.Progress:
      return progress(field as IProgressField, value)
    case FieldType.Rating:
      return rating(field as IRatingField, value)
    case FieldType.Checkbox:
      return checkBox(
        field as ICheckBoxField,
        value,
        config?.boolValue ?? defaultBoolValue,
      )
    case FieldType.Text:
      return text(field as ITextField, value)
    case FieldType.Barcode:
      return barCode(field as IBarcodeField, value)
    case FieldType.Phone:
      return phone(field as IPhoneField, value)
    case FieldType.User:
      return User(field as IUserField, value, config.separator)
    case FieldType.SingleLink:
      return singleLink(field as ISingleLinkField, value)
    case FieldType.DuplexLink:
      return duplexLink(field as IDuplexLinkField, value)
    default:
      return null
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
