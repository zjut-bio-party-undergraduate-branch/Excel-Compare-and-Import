import { useLog, log } from "../../../src/utils/log"
import { describe, it, expect, beforeEach, vi, afterEach } from "vitest"

describe("useLog", () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it("should return a function", () => {
    expect(typeof useLog("info")).toBe("function")
  })

  it("should push a LogItem to log.value", () => {
    const date = new Date(2000, 1, 1, 13)
    vi.setSystemTime(date)
    const logInfo = useLog("info")
    logInfo("Hello world")
    expect(log.value[0]).toMatchSnapshot()
    const logWarn = useLog("warn")
    logWarn("Hello world")
    expect(log.value[1]).toMatchSnapshot()
    const logError = useLog("error")

    logError("Hello world")
    expect(log.value[2]).toMatchSnapshot()
    const logLog = useLog("log")
    logLog("Hello world")
    expect(log.value[3]).toMatchSnapshot()
  })
})
