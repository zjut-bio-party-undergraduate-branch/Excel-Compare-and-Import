import {
  bitable,
  ThemeModeType,
  IFieldMeta,
  IWidgetTable,
  Selection,
} from "@lark-base-open/js-sdk"
import {
  ref,
  onUnmounted,
  MaybeRefOrGetter,
  toValue,
  watch,
  onMounted,
} from "vue"

export function useBitableTheme() {
  const themeMode = ref<ThemeModeType>(ThemeModeType.LIGHT)
  onMounted(() => {
    bitable.bridge.getTheme().then((e) => {
      themeMode.value = e
    })
  })
  const unListenTheme = bitable.bridge.onThemeChange((ev) => {
    console.log("theme change")
    themeMode.value = ev.data.theme
  })
  onUnmounted(() => {
    unListenTheme()
  })
  return {
    themeMode,
  }
}

export function useBitableSelection(
  callback?: (e: Selection) => void | Promise<void>,
) {
  const baseId = ref<string | null>(null)
  const recordId = ref<string | null>(null)
  const fieldId = ref<string | null>(null)
  const viewId = ref<string | null>(null)
  const tableId = ref<string | null>(null)
  onMounted(() => {
    bitable.base.getSelection().then((e) => {
      baseId.value = e.baseId
      recordId.value = e.recordId
      fieldId.value = e.fieldId
      viewId.value = e.viewId
      tableId.value = e.tableId
    })
  })
  const unListenSelection = bitable.base.onSelectionChange(async (e) => {
    baseId.value = e.data.baseId
    recordId.value = e.data.recordId
    fieldId.value = e.data.fieldId
    viewId.value = e.data.viewId
    tableId.value = e.data.tableId
    console.log("selection change", e.data)
    if (callback) {
      await callback(e.data)
    }
  })

  onUnmounted(() => {
    unListenSelection()
  })

  return {
    baseId,
    recordId,
    fieldId,
    viewId,
    tableId,
  }
}

export function useBitableTable(
  tableId: MaybeRefOrGetter<string | null>,
  callback?: (table: IWidgetTable) => void | Promise<void>,
) {
  const name = ref<string | null>(null)
  const fields = ref<IFieldMeta[]>([])
  watch(
    () => toValue(tableId),
    async (newVal) => {
      fields.value = []
      console.log("tableId", toValue(tableId))
      if (newVal) {
        const table = await bitable.base.getTableById(newVal)
        name.value = await table.getName()
        fields.value = await table.getFieldMetaList()
        if (callback) {
          await callback(table as IWidgetTable)
        }
      }
    },
  )
  return {
    name,
    fields,
  }
}

export function useData<T extends Record<string, unknown> | undefined>() {
  const data = ref<T>()
  watch(
    () => toValue(data),
    (newVal: T | undefined) => {
      if (newVal) {
        bitable.bridge.setData(newVal)
      }
    },
    { deep: true },
  )
  onMounted(async () => {
    data.value = (await bitable.bridge.getData()) as T
  })
  return {
    data,
  }
}
