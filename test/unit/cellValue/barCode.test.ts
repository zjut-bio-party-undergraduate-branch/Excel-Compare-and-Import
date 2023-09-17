import { barCode } from "../../../src/utils/cellValue/barCode"
import { describe, it, expect } from "vitest"
import { checkers } from "@lark-base-open/js-sdk"

describe("barCode", () => {
  it("should return IOpenSegment[]", () => {
    expect(checkers.isSegments(barCode("Hello world"))).toBe(true)
    expect(barCode("Hello world")).toMatchSnapshot()
  })
})
