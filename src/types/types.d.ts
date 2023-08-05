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