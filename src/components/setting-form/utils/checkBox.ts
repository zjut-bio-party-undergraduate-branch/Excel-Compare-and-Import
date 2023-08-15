import type { IOpenCheckbox } from "@lark-base-open/web-api";

export const defaultBoolValue = {
  true: ["是", "True", "true", "TRUE", "1", "☑️"],
  false: ["否", "False", "false", "FALSE", "0", ""],
}

export function checkBox(value: string, boolValue: { true: string[]; false: string[]; } = defaultBoolValue): IOpenCheckbox {
  if (!value) return false;
  // const boolValue = config?.boolValue;
  if (boolValue.true.includes(value)) return true;
  if (boolValue.false.includes(value)) return false;
  return false
}