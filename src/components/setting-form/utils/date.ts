import dayjs from "dayjs/esm/index.js";
import customParseFormat from "dayjs/plugin/customParseFormat";
import advancedFormat from 'dayjs/plugin/advancedFormat';
import { IOpenTimestamp, checkers } from "@lark-base-open/web-api";

dayjs.extend(customParseFormat);
dayjs.extend(advancedFormat);


export const dateDefaultFormat = "YYYY/MM/DD";

export function dateTime(value: string, format: string = "YYYY/MM/DD"): IOpenTimestamp | null {
  const res = dayjs(value, format).valueOf();
  if (checkers.isTimestamp(res)) return res;
  return null;
};
