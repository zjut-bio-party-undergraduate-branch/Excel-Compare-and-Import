import { IOpenSegmentType } from "@lark-base-open/web-api";

export function text(value: string) {
  const res= {
    text: String(value),
    type: IOpenSegmentType.Text,
  };
  return res;
}