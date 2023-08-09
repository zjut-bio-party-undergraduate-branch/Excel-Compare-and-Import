import * as dayjs from "dayjs";
import * as customParseFormat from "dayjs/plugin/customParseFormat";
import * as advancedFormat from 'dayjs/plugin/advancedFormat';
import { IOpenTimestamp, checkers } from "@base-open/web-api";

dayjs.extend(customParseFormat);
dayjs.extend(advancedFormat);


export const dateDefaultFormat = "YYYY/MM/DD";

export function dateTime(value: string, format: string = "YYYY/MM/DD"): IOpenTimestamp | null{
  console.log("dateTime", value, format, dayjs(value, format).valueOf())
  const res = dayjs(value, format).valueOf();
  if(checkers.isTimestamp(res)) return res;
  return null;
};
