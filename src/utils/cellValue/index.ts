import {
  IOpenCellValue,
  FieldType,
  IMultiSelectFieldMeta,
  ISingleSelectFieldMeta,
  IWidgetTable,
} from "@lark-base-open/web-api";
import { fieldMap } from "@/types/types";
import { dateTime, dateDefaultFormat } from "./date";
import { multiSelect } from "./multiSelect";
import { singleSelect } from "./singleSelect";
import { checkBox, defaultBoolValue } from "./checkBox";
import { text } from "./text";
import { url } from "./url";
import { phone } from "./phone";
import { currency } from "./currency";
import { progress } from "./progress";
import { rating } from "./rating";
import { barCode } from "./barCode";

export async function getCellValue(
  fieldMap: fieldMap,
  value: string,
  table: IWidgetTable
): Promise<IOpenCellValue> {
  console.log("input value", value);
  const type = fieldMap.field.type;
  const field = fieldMap.field;
  const config = fieldMap.config;
  if (!value) return value;
  switch (type) {
    case FieldType.Url:
      return url(value);
    case FieldType.DateTime:
      return dateTime(value, config?.format ?? dateDefaultFormat);
    case FieldType.SingleSelect:
      return singleSelect(value, field as ISingleSelectFieldMeta, table);
    case FieldType.MultiSelect:
      return multiSelect(
        value,
        field as IMultiSelectFieldMeta,
        table,
        config?.separator ?? ","
      );
    case FieldType.Number:
      return Number(value.match(/-?\d+\.?\d*/g));
    case FieldType.Currency:
      return currency(value);
    case FieldType.Progress:
      return progress(value);
    case FieldType.Rating:
      return rating(value);
    case FieldType.Checkbox:
      return checkBox(value, config?.boolValue ?? defaultBoolValue);
    case FieldType.Text:
      return text(value) as IOpenCellValue;
    case FieldType.Barcode:
      return barCode(value) as IOpenCellValue;
    case FieldType.Phone:
      return phone(value);
    default:
      return value;
  }
}
