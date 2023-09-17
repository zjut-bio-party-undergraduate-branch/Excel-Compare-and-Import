import { IOpenSegmentType, IOpenUrlSegment } from "@lark-base-open/js-sdk"

/**
 * Get url cell value
 * @param value
 * @returns
 */
export function url(value: string): IOpenUrlSegment[] {
  const res = [
    {
      text: value,
      type: IOpenSegmentType.Url,
      link: value,
    },
  ] as IOpenUrlSegment[]
  return res
}
