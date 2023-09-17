import { MaybeRefOrGetter, toValue, ref, watch } from "vue"
import {
  IFieldMeta,
  ISingleLinkFieldProperty,
} from "@lark-base-open/js-sdk/dist"
import { importModes } from "@/utils/import"
import { ExcelDataInfo, fieldMap, SheetInfo } from "@/types/types"
import { configField, hasChildrenFieldType, ignoreFieldType } from "../utils"

export function useSetting(
  tableFields: MaybeRefOrGetter<IFieldMeta[] | undefined>,
  excelData: MaybeRefOrGetter<ExcelDataInfo | undefined>,
  tableId: MaybeRefOrGetter<string | null>,
) {
  const mode = ref<importModes>(importModes.append)
  const settingColumns = ref<fieldMap[]>([])
  const sheetIndex = ref<number>(0)
  const excelFields = ref<SheetInfo["tableData"]["fields"]>([])
  const Index = ref<string[]>()
  function reset() {
    settingColumns.value = settingColumns.value.map((v) => {
      return {
        ...v,
        excel_field: undefined,
      }
    })
  }

  function fill() {
    if (!toValue(excelData) || !toValue(tableFields)) return
    const excelFieldsArray = toValue(excelFields).map((field) => field.name)
    settingColumns.value.forEach((column) => {
      if (excelFieldsArray.includes(column.field.name)) {
        column.excel_field = column.field.name
      }
      if (column.hasChildren && column.children) {
        column.children.forEach((child) => {
          if (excelFieldsArray.includes(child.field.name)) {
            child.excel_field = child.field.name
          }
        })
      }
    })
  }
  watch(
    () => toValue(excelData),
    (newVal) => {
      console.log(newVal)
      if (!newVal) {
        excelFields.value = []
        reset()
      } else {
        excelFields.value = newVal.sheets[sheetIndex.value].tableData.fields
        fill()
      }
    },
    { deep: true },
  )
  watch(
    () => toValue(tableFields),
    (newVal) => {
      settingColumns.value =
        newVal
          ?.filter((i) => !ignoreFieldType.includes(i.type))
          .map((v) => {
            return {
              key: v.id,
              field: v,
              table: toValue(tableId) ?? "",
              excel_field: undefined,
              config: configField(v.type),
              root: true,
              hasChildren:
                hasChildrenFieldType.includes(v.type) &&
                (v.property as ISingleLinkFieldProperty).tableId !==
                  toValue(tableId),
              children: [],
            }
          }) ?? []
      if (toValue(excelData)) {
        fill()
      }
    },
    { deep: true },
  )
  return {
    mode,
    reset,
    settingColumns,
    fill,
    sheetIndex,
    excelFields,
    Index,
  }
}
