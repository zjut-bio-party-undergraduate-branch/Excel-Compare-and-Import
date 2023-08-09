import { IOpenSegmentType, IOpenUrlSegment, checkers } from '@base-open/web-api';


export function url(value: string): IOpenUrlSegment[] {
  const res = [
    {
      text: value,
      type: IOpenSegmentType.Url,
      link: value,
    },
  ];
  if (checkers.isSegments(res)) return res;
  console.log("not a url", value, res);
  return [
    {
      text: "",
      type: IOpenSegmentType.Url,
      link: "",
    },
  ];
}