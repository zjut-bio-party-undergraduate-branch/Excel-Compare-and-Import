import {
  FieldType,
  IDuplexLinkFieldMeta,
  IFieldMeta,
  ISingleLinkFieldMeta,
  IWidgetTable,
  IWidgetField,
} from "@lark-base-open/js-sdk"

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
  indexName: string[]
  fields: {
    [key: string]: IWidgetField
  }
}

export enum TaskAction {
  Update = "update",
  Delete = "delete",
  Add = "add",
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
