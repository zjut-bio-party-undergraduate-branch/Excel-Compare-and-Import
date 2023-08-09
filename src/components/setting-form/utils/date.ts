import * as dayjs from "dayjs";
import * as customParseFormat from "dayjs/plugin/customParseFormat";
import * as advancedFormat from 'dayjs/plugin/advancedFormat';
import type { IOpenTimestamp } from "@base-open/web-api";

dayjs.extend(customParseFormat);
dayjs.extend(advancedFormat);


export const dateDefaultFormat = "YYYY/MM/DD";

export function dateTime(value: string, format: string = "YYYY/MM/DD"): IOpenTimestamp{
  console.log("dateTime", value, format)
  return dayjs(value, format).valueOf() ?? Number(new Date(value));
};
