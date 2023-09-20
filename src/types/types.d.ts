import {
  FieldType,
  IDuplexLinkFieldMeta,
  IFieldMeta,
  ISingleLinkFieldMeta,
  IWidgetTable,
  IWidgetField,
  IField,
} from "@lark-base-open/js-sdk"
import { TaskAction } from "@/utils/import/tasks"

export interface SheetInfo {
  name: string
  tableData: {
    fields: {
      name: string
    }[]
    records: {
      [key: string]: string
    }[]
  }
}

export interface ExcelDataInfo {
  sheets: SheetInfo[]
  name: string
}

export interface IFieldValue {
  record_id: string
  value: IOpenCellValue
}

export interface IUndefinedFieldValue {
  record_id: undefined
  value: undefined
}

export type LinkField = ISingleLinkFieldMeta | IDuplexLinkFieldMeta
export interface fieldMap {
  /**
   * Key for tree node
   *
   * @Description The unique key of the node in a tree table
   */
  key: string
  field: IFieldMeta
  table: string
  excel_field: string | undefined
  root: boolean
  config: {
    format?: string
    separator?: string
    boolValue?: {
      true: string[]
      false: string[]
    }
  }
  hasChildren: boolean
  children?: fieldMap[]
}

export interface BitableTable {
  table: IWidgetTable
  id: IWidgetTable["id"]
  name: IWidgetTable["name"]
  indexId: string[]
  root: boolean
  fields: {
    [key: string]: IField
  }
}

export type Task = {
  table: {
    name: string
    id: string
  }
  action: TaskAction
  index: number
  data: any[]
  result: any[] | undefined
}
