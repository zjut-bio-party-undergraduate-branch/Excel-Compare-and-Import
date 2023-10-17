import { IOpenSegmentType, IOpenUrlSegment, checkers } from '@lark-base-open/js-sdk';


export function url(value: string): IOpenUrlSegment[] {
  const res = [
    {
      text: value,
      type: IOpenSegmentType.Url,
      link: value,
    },
  ] as IOpenUrlSegment[];
  if (checkers.isSegments(res)) return res;
  return [
    {
      text: "",
      type: IOpenSegmentType.Url,
      link: "",
    },
  ];
}