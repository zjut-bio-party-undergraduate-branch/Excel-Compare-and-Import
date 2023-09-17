import { currency } from "../../../src/utils/cellValue/currency"
import { describe, it, expect } from "vitest"
import { checkers } from "@lark-base-open/js-sdk"

describe("currency", () => {
  it("should return number", () => {
    expect(checkers.isNumber(currency("123456789"))).toBe(true)
    expect(currency("123456789")).toMatchSnapshot()
  })
})
