import { ref } from "vue"

export type LogOptions = {
  prefix: string
  onError?: Function
  onWarn?: Function
  onInfo?: Function
  onLog?: Function
}

export type LogItem = {
  type: "info" | "warn" | "error" | "log"
  message: string
  time: number
  file?: string
  line?: number
}

export const log = ref<LogItem[]>([])

export const options = ref<LogOptions>({
  prefix: "[Excel Compare and Import]",
})

const _console = console

export const useLog = (type: LogItem["type"]) => (msg: string) => {
  const cache = {
    type: type,
    message: msg,
    time: Date.now(),
  }
  log.value.push(cache)
  const action = _console[type] ?? _console.log
  action.apply(void 0, [options.value.prefix, msg])
  if (type === "error") {
    options.value.onError?.(msg)
  }

  if (type === "warn") {
    options.value.onWarn?.(msg)
  }

  if (type === "info") {
    options.value.onInfo?.(msg)
  }

  if (type === "log") {
    options.value.onLog?.(msg)
  }
}
