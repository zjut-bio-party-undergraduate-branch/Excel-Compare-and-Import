export interface SheetInfo {
  name: string;
  tableData: {
    fields: {
      name: string;
    }[];
    records: {
      [key: string]: string;
    }[];
  };
}

export interface ExcelDataInfo {
  sheets: SheetInfo[];
  name: string;
}

export interface IFieldValue {
  record_id: string;
  value: IOpenCellValue;
}

export interface IUndefinedFieldValue {
  record_id: undefined;
  value: undefined;
}

export interface fieldMap {
  field: IFieldMeta;
  excel_field: string;
  config: {
    format?: string;
    separator?: string;
    boolValue?: {
      true: string[];
      false: string[];
    }
    [key: string]: any;
  }
}