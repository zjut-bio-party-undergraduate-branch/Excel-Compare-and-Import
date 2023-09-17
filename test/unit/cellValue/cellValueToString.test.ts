import { cellValueToString } from "../../../src/utils/cellValue"
import { describe, it, expect } from "vitest"
import {
  IOpenLink,
  IOpenLocation,
  IOpenSegment,
  IOpenSegmentType,
  IOpenSingleSelect,
  IOpenUser,
} from "@lark-base-open/js-sdk"
const segment: IOpenSegment[] = [
  {
    type: IOpenSegmentType.Text, // 文本类型
    text: "Hello world",
  }, // type: IOpenTextSegment
  {
    type: IOpenSegmentType.Url, // URL 类型
    text: "https://feishu.cn",
    link: "https://feishu.cn",
  }, // type: IOpenUrlSegment
  {
    type: IOpenSegmentType.Mention, // @人 类型
    mentionType: "User", //
    name: "李健", // 人名
    enName: "Jian Li",
    text: "@李健",
    token: "ou_xxx",
    id: "ou_xxx", // OpenId，暂未支持
  }, // type: IOpenUserMentionSegment
  {
    type: IOpenSegmentType.Mention, // 文档类型
    mentionType: "Bitable", // Bitable 文档
    text: "未命名多维表格",
    token: "basxxxx",
    link: "https://www.feishu.cn/base/basxxxxx",
  }, // type: IOpenDocumentMentionSegment
]
const singleSelect: IOpenSingleSelect = {
  id: "opt123", //这里的id不是随便填的，是从字段meta信息的property属性中选的一个值
  text: "选项1",
}

const multiSelect: IOpenSingleSelect[] = [
  {
    id: "opt123",
    text: "选项1",
  },
  {
    id: "opt456",
    text: "选项2",
  },
]

const user: IOpenUser[] = [
  {
    name: "@李健", // 人名
    en_name: "@JianLi", // 英文名
    email: "lijian@feishu.cn", // 邮箱
    id: "ou_xxx", // OpenId
  },
]

const location: IOpenLocation = {
  address: "科苑地铁站C出口",
  adname: "南山区",
  cityname: "深圳市",
  fullAddress: "深圳湾创新科技中心，广东深圳南山科苑地铁站C出口",
  full_address: "深圳湾创新科技中心，广东深圳南山科苑地铁站C出口",
  location: "113.946874,22.52835",
  name: "深圳湾创新科技中心",
  pname: "广东省",
}

const link: IOpenLink[] = [
  {
    record_ids: ["recMQTzZP6"],
    recordIds: ["recMQTzZP6"],
    tableId: "tblHBG6ACPXeTu2G",
    table_id: "tblHBG6ACPXeTu2G",
    text: "1",
    type: "text",
  },
]

describe("cellValueToString test", () => {
  it("IOpenSegment->string", () => {
    expect(cellValueToString(segment)).toMatchSnapshot()
  })

  it("TimeStamp->string", () => {
    expect(cellValueToString(1614048000000)).toMatchSnapshot()
  })

  it("number->string", () => {
    expect(cellValueToString(1)).toMatchSnapshot()
  })

  it("checkbox->string", () => {
    expect(cellValueToString(true)).toMatchSnapshot()
  })

  it("IOpenSingleSelect->string", () => {
    expect(cellValueToString(singleSelect)).toMatchSnapshot()
  })

  it("IOpenMultiSelect->string", () => {
    expect(cellValueToString(multiSelect)).toMatchSnapshot()
  })

  it("IOpenUser->string", () => {
    expect(cellValueToString(user)).toMatchSnapshot()
  })

  it("IOpenLocation->string", () => {
    expect(cellValueToString(location)).toMatchSnapshot()
  })

  it("IOpenLink->string", () => {
    expect(cellValueToString(link)).toMatchSnapshot()
  })
})
