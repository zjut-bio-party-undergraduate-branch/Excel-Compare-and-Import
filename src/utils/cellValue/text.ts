import { IOpenSegmentType } from "@lark-base-open/js-sdk";

export function text(value: string) {
  const res= {
    text: String(value),
    type: IOpenSegmentType.Text,
  };
  return res;
}