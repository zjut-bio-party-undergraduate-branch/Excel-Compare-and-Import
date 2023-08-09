import { IOpenSegmentType } from "@base-open/web-api";

export function text(value: string) {
  return {
    text: String(value),
    type: IOpenSegmentType.Text,
  };
}