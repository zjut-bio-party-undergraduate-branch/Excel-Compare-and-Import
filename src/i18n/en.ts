export const en = {
  alert: {
    dateAsText: "Please convert the date format in Excel to text first",
  },
  button: {
    confirm: "Confirm",
    cancel: "Cancel",
    close: "Close",
    import: "Import",
    autoFill: "Auto Fill",
    clear: "Clear",
    exportConfig: "Export Config",
    importConfig: "Import Config File",
  },
  guide: "Guide Book",
  h: {
    upload: "Upload",
    settings: "Settings",
    chooseOrCreateFormat: "Choose or Create Input Format",
    setLink: "Link Settings",
  },
  input: {
    placeholder: {
      chooseField: "Search and Select Field",
      chooseIndex: "Search and Select Index",
      chooseSheet: "Choose Sheet",
      chooseTable: "Choose Table",
      chooseOrCreateFormat: "Choose or Create Input Format",
    },
    chooseAsPrimaryKey: "Choose as Primary Key",
  },
  form: {
    label: {
      index: "Index",
      fieldsMap: "Fields Map",
      sheet: "Excel Sheet",
      inputDateFormat: "Input Date Format",
      example: "Example",
      separator: "Separator",
      trueValue: "True Value",
      falseValue: "False Value",
      mode: "mode",
      primaryKey: "Primary Key",
      table: "Base Target Table",
      allowAdd: "Allow Add New Record to Link Table",
      linkTable: "Link Table",
      allowAction: "Allow Action",
      whenTwoSame: "When Two or More Records are the Same",
      saveFirst: "Save First",
      requestConfig: "Request Config",
      requestMethod: "Method",
      requestHeaders: "Headers",
      locationType: "Location Type",
    },
  },
  table: {
    baseField: "Base Field",
    excelField: "Excel Field",
  },
  upload: {
    tip: {
      common: "Drag and drop file here or click to upload",
      em: "click to upload",
      fileLimit: "xlsx/xls/csv file",
      fileSupport: "xlsx/xls/csv file support",
    },
  },
  mode: {
    append: "Append records directly",
    mergeDirect: "Cover original records",
    compareMerge: "Save original records",
    merge: "merge records",
  },
  toolTip: {
    setInputFormat: "Set input format",
    setOperator: "Set operator",
    setBoolValue: "Set bool value",
    pleaseReferTo: "Please refer to",
    indexInfo:
      "Index: the index column of the table, which is used to identify the uniqueness of the record, and the basis for merging records. In a Base, the index of each record should be unique. Example: ID card number.",
    importInfo: "Click to see the import info",
    clickToPreview: "Click to preview: {name}",
    about: "About",
    log: "Running Log",
    questions: "FAQ",
    autoField: "Auto Field",
    notSupportField:
      "Not Support field, only can be used as index, can't write value",
  },
  message: {
    chooseTableFirst: "Please choose a table first",
    uploadExcelFirst: "Please upload Excel file first",
    importSuccess: "Import success",
    sheetError: 'Sheet "{sheetName}" has wrong format',
    noSheet: "No correct sheet found",
    fileType: "File type error",
    getTableListError: "Get table list error",
    autoFieldNotAllowAdd: "Auto field not allow add new record",
    notSupportFieldNotAllowAdd: "Not support field not allow add new record",
    noIndex: "Merge mode must set index",
    indexNoExcelField: "Index field [{fields}] must have excel field",
    getTableFailure: "Get table [{id}] failed",
    getTableIndexFailure: "Get index value of [{id}] failed",
    getModifiedTimeFailure: "Get table [{id}] modified time failed",
    autoFieldInIndex:
      "Index contains auto field [{fields}], the plugin will not add new records to the table",
    configTableError: "Config file does not match the table",
    exportSuccess: "Export success",
  },
  loading: "Loading...",
  fieldType: {
    text: "Text",
    singleSelect: "singleSelect",
    multiSelect: "MultiSelect",
    number: "Number",
    dateTime: "DateTime",
    checkBox: "CheckBox",
    barCode: "Barcode",
    rating: "Rating",
    currency: "Currency",
    progress: "Progress",
    phone: "Phone",
    url: "Url",
    user: "User",
    singleLink: "SingleLink",
    duplexLink: "DuplexLink",
    formula: "Formula",
    createdTime: "CreatedTime",
    modifiedTime: "ModifiedTime",
    createdUser: "CreatedUser",
    modifiedUser: "ModifiedUser",
    attachment: "Attachment",
    location: "Location",
    autoNumber: "AutoNumber",
    groupChat: "GroupChat",
    denied: "Denied",
    notSupport: "NotSupport",
    email: "Email",
  },
  importInfo: {
    title: "Import Info",
    readFieldMap: "Analyze Field Map",
    analyzeRecords: "Analyze Records",
    updateRecords: "Update Records",
    deleteRecords: "Delete Records",
    addRecords: "Add Records",
    updateRecordsMessage: "Update table {table} records at 5000 records/time",
    deleteRecordsMessage:
      "Delete table {table} same records at 5000 records/time",
    addRecordsMessage: "Add table {table} records at 5000 records/time",
    success: "{successNumber} Success",
    error: "{errorNumber} Error",
    waiting: "{waitingNumber} Waiting",
    analysisRecordsMessage:
      "{updateNumber} Update, {deleteNumber} Delete, {addNumber} Add",
    findSameRecord:
      "Searching for same records of [{indexValue}], found {number} records",
    getSameRecord:
      "Getting same records of [{indexValue}], found {number} records",
    getLinkRecord:
      "Getting link records of link field {fieldName}[{fieldId}] in {table}",
    compareRecordField:
      "Comparing record {record} field {fieldName}[{fieldId}]",
    compareRecord: "Comparing record [{indexValue}]",
    analysisRecordField: "Analyzing field {field} of record {record}",
    getIndexField: "Getting index field {name}[{id}]",
    getFieldCellString:
      "Getting cellString of field {field} of record {record}",
    analyzeIndexFieldValue:
      "Analyzing index field {fieldName}[{fieldId}]'s value of record [{recordId}]",
    getTable: "Getting table {name}[{id}]",
    getRecordsModifiedTime: "Getting table records modified time",
    importComplete: "Import complete",
    getTableRecords: "Getting table [{table}] records",
    checkSelectFieldOptions:
      "Checking field {fieldName}[FieldId: {fieldId}] options",
    setSelectFieldOptions:
      "Field {fieldName}[FieldId: {fieldId}] has {newOptionsNum} new options, start setting",
    asyncData: "Getting remote data",
    createCell: "Creating cell of field [{fieldId}] in table [{tableId}]",
  },
  allowAction: {
    updateAndAdd: "Update same records and add new records",
    onlyUpdate: " Only update same records",
    onlyAdd: "Only add new records",
  },
  updateMode: {
    saveMost: "Save the record with the most non-empty fields",
    saveLeast: "Save the record with the least non-empty fields",
    saveOldest: "Save the earliest modified record",
    saveLatest: "Save the latest modified record",
    whenLastSame: "When the last one is the same",
  },
  advancedSetting: {
    parallel: "Parallel",
    interval: "Interval",
    intervalUnit: "ms",
    fields: "Fields",
    records: "Records",
    parallelTip: "Parallel is the number of records/fields processed at a time",
    intervalTip: "Interval is the time interval for each processing",
    advancedSetting: "Advanced Setting",
  },
  locationType: {
    geo: "Address Text",
    regeo: "Latitude and Longitude",
    auto: "Auto",
  },
}
