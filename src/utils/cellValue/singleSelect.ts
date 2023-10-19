import {
  ISingleSelectFieldMeta,
  IOpenSingleSelect,
  checkers,
} from "@lark-base-open/js-sdk";

export function singleSelect(
  value: string,
  field: ISingleSelectFieldMeta
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