import { checkBox } from "../../../src/utils/cellValue/checkBox"
import { describe, it, expect } from "vitest"
import { checkers } from "@lark-base-open/js-sdk"

describe("checkBox", () => {
  it("☑️ should return true", () => {
    expect(checkers.isCheckbox(checkBox("☑️"))).toBe(true)
    expect(checkBox("☑️")).toBe(true)
    expect(checkBox("☑️")).toMatchSnapshot()
  })
  it('"" should return false', () => {
    expect(checkers.isCheckbox(checkBox(""))).toBe(true)
    expect(checkBox("")).toBe(false)
    expect(checkBox("")).toMatchSnapshot()
  })
})
