import {
  IMultiSelectFieldMeta,
  IOpenMultiSelect,
  IWidgetTable,
  checkers
} from "@lark-base-open/js-sdk";

export const defaultSeparator = ","

export function multiSelect(
  value: string,
  field: IMultiSelectFieldMeta,
  // table: IWidgetTable,
  separator: string = ","
): IOpenMultiSelect {
  console.log("separator", separator)
  if(value === "") return []
  console.log("multiSelect", value)
  const selection = Array.from(value.split(separator))
  const res: IOpenMultiSelect = [];
  // let fieldItem = null;
  // let fieldItem = await table.getFieldMetaById(field.id) as IMultiSelectFieldMeta;
  for (const v of selection) {
    let id = field.property.options.find((option) => option.name === v)?.id ?? "";
    // if(id === "") {
    //   if(!fieldItem) fieldItem = await table.getFieldMetaById(field.id) as IMultiSelectFieldMeta;
    //   id = fieldItem.property.options.find((option) => option.name === v)?.id ?? "";
    // }
    res.push({
      text: v,
      id,
    });
  }
  if (checkers.isMultiSelect(res)) return res;
  return [];
}