import { progress } from "../../../src/utils/cellValue/progress"
import { describe, it, expect } from "vitest"
import { checkers } from "@lark-base-open/js-sdk"

describe("progress", () => {
  it("should return number", () => {
    expect(checkers.isNumber(progress("123456789"))).toBe(true)
    expect(progress("0.1")).toMatchSnapshot()
  })
  // it("should between 0 and 1", () => {
  //   expect(progress("0.1")).toBe(0.1)
  //   expect(progress("0.5")).toBe(0.5)
  //   expect(progress("0.9")).toBe(0.9)
  //   expect(progress("1")).toBe(1)
  //   expect(progress("1.1")).toBe(0.011)
  // })
})
