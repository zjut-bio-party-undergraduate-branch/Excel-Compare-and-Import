import {
  ISingleSelectFieldMeta,
  IOpenSingleSelect,
  IWidgetTable,
  checkers,
} from "@lark-base-open/js-sdk";

export function singleSelect(
  value: string,
  field: ISingleSelectFieldMeta,
  // table: IWidgetTable
): IOpenSingleSelect {
  if (value === "") {
    return {
      text: "",
      id: "",
    };
  }
  let id =
    field.property.options.find((option) => option.name === value)?.id ?? "";
  // if (id === "") {
  //   const fieldItem = await table.getFieldMetaById(field.id) as ISingleSelectFieldMeta;
  //   id = fieldItem.property.options.find((option) => option.name === value)?.id ?? "";
  // }
  const res = {
    text: value,
    id,
  };
  if (checkers.isSingleSelect(res)) return res;
  return {
    text: "",
    id: "",
  };
}
