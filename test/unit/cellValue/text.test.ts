import { text } from "../../../src/utils/cellValue/text"
import { describe, it, expect } from "vitest"
import { checkers } from "@lark-base-open/js-sdk"

describe("text", () => {
  it("should return IOpenSegment[]", () => {
    expect(checkers.isSegments(text("Hello world"))).toBe(true)
    expect(text("Hello world")).toMatchSnapshot()
  })
})
