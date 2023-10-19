import {
  IDuplexLinkFieldMeta,
  IFieldMeta,
  ISingleLinkFieldMeta,
  ITable,
  IField,
  IOpenCellValue,
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
    primaryKey?: string
  }
  hasChildren: boolean
  children?: fieldMap[]
}

export interface BitableTable {
  table: ITable
  id: string
  name: string
  indexId: string[]
  root: boolean
  fields: {
    [key: string]: IField
  }
}

export interface Task<T = any> {
  table: {
    name: string
    id: string
  }
  action: TaskAction
  data: T[]
  result: boolean[] | undefined
}
