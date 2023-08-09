import { IOpenSegmentType, checkers } from "@base-open/web-api";

export function text(value: string) {
  const res= {
    text: String(value),
    type: IOpenSegmentType.Text,
  };
  if (checkers.isSegments(res)) return res;
  console.log("not a text", value, res);
  return {
    text: "",
    type: IOpenSegmentType.Text,
  };
}