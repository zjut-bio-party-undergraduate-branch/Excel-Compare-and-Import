import {
  IMultiSelectFieldMeta,
  IOpenMultiSelect,
  IWidgetTable,
  checkers
} from "@lark-base-open/web-api";

export const defaultSeparator = ","

export async function multiSelect(
  value: string,
  field: IMultiSelectFieldMeta,
  table: IWidgetTable,
  separator: string = ","
): Promise<IOpenMultiSelect> {
  console.log("separator", separator)
  if(value === "") return []
  console.log("multiSelect", value)
  const selection = Array.from(value.split(separator))
  const res: IOpenMultiSelect = [];
  let fieldItem = null;
  // let fieldItem = await table.getFieldMetaById(field.id) as IMultiSelectFieldMeta;
  for (const v of selection) {
    let id = field.property.options.find((option) => option.name === v)?.id ?? "";
    if(id === "") {
      if(!fieldItem) fieldItem = await table.getFieldMetaById(field.id) as IMultiSelectFieldMeta;
      id = fieldItem.property.options.find((option) => option.name === v)?.id ?? "";
    }
    res.push({
      text: v,
      id,
    });
  }
  console.log("IOpenMultiSelect",value, res)
  if (checkers.isMultiSelect(res)) return res;
  console.log("not a multiSelect", value, res)
  return [];
}