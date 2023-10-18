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
