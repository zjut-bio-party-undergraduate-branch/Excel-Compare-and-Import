import { phone } from "../../../src/utils/cellValue/phone"
import { describe, it, expect } from "vitest"
import { checkers } from "@lark-base-open/js-sdk"

describe("phone", () => {
  it("should return string", () => {
    expect(checkers.isPhone(phone("123456789"))).toBe(true)
    expect(phone("123456789")).toMatchSnapshot()
  })
})
