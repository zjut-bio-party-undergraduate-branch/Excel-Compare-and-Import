import {
  ISingleSelectFieldMeta,
  IOpenSingleSelect,
  IWidgetTable
} from "@base-open/web-api";

export async function singleSelect(value: string, field: ISingleSelectFieldMeta, table: IWidgetTable): Promise<IOpenSingleSelect> {
  if (value === "") {
    return {
      text: "",
      id: ""
    }
  }
  let id = field.property.options.find((option) => option.name === value)?.id ?? "";
  if (id === "") {
    const fieldItem = await table.getFieldMetaById(field.id) as ISingleSelectFieldMeta;
    id = fieldItem.property.options.find((option) => option.name === value)?.id ?? "";
  }
  return {
    text: value,
    id,
  };
}