import { IOpenSegmentType, IOpenUrlSegment } from '@base-open/web-api';


export function url(value: string): IOpenUrlSegment[] {
  return [
    {
      text: value,
      type: IOpenSegmentType.Url,
      link: value,
    },
  ];
}