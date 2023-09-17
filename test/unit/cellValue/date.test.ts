import { dateTime } from "../../../src/utils/cellValue/date"
import { describe, it, expect } from "vitest"
import { checkers } from "@lark-base-open/js-sdk"

describe("dateTime", () => {
  it("should return TimeStamp", () => {
    expect(checkers.isTimestamp(dateTime("2020/01/01"))).toBe(true)
    expect(dateTime("2020/01/01")).toMatchSnapshot()
  })
})
