import {
  IOpenCellValue,
  FieldType,
  IMultiSelectFieldMeta,
  ISingleSelectFieldMeta,
  IWidgetTable,
  IOpenSingleSelect,
  IOpenMultiSelect,
  IFieldConfig,
} from "@lark-base-open/web-api";
import { dateTime, dateDefaultFormat } from "./date";
import { multiSelect } from "./multiSelect";
import { singleSelect } from "./singleSelect";
import { checkBox, defaultBoolValue } from "./checkBox";
import { text } from "./text";
import { url } from "./url";
import { phone } from "./phone";
import { currency } from "./currency";
import { progress } from "./progress";
import { rating } from "./rating";
import { barCode } from "./barCode";
import {
  fieldMap,
  ExcelDataInfo,
  IFieldValue,
  IUndefinedFieldValue,
} from "@/types/types";

export const ignoreFieldType = [
  FieldType.Lookup,
  FieldType.CreatedTime,
  FieldType.ModifiedTime,
  FieldType.Formula,
  FieldType.DuplexLink,
  FieldType.SingleLink,
  FieldType.CreatedUser,
  FieldType.ModifiedUser,
  FieldType.NotSupport,
  FieldType.Location,
  FieldType.AutoNumber,
  FieldType.GroupChat,
  FieldType.User,
  FieldType.Denied,
  FieldType.Attachment,
];

export const optionsFieldType = [FieldType.SingleSelect, FieldType.MultiSelect];

export async function getCellValue(
  fieldMap: fieldMap,
  value: string,
  table: IWidgetTable
): Promise<IOpenCellValue> {
  console.log("input value", value);
  const type = fieldMap.field.type;
  const field = fieldMap.field;
  const config = fieldMap.config;
  if (!value) return value;
  switch (type) {
    case FieldType.Url:
      return url(value);
    case FieldType.DateTime:
      return dateTime(value, config?.format ?? dateDefaultFormat);
    case FieldType.SingleSelect:
      return singleSelect(value, field as ISingleSelectFieldMeta, table);
    case FieldType.MultiSelect:
      return multiSelect(
        value,
        field as IMultiSelectFieldMeta,
        table,
        config?.separator ?? ","
      );
    case FieldType.Number:
      return Number(value.match(/-?\d+\.?\d*/g));
    case FieldType.Currency:
      return currency(value);
    case FieldType.Progress:
      return progress(value);
    case FieldType.Rating:
      return rating(value);
    case FieldType.Checkbox:
      return checkBox(value, config?.boolValue ?? defaultBoolValue);
    case FieldType.Text:
      return text(value) as IOpenCellValue;
    case FieldType.Barcode:
      return barCode(value) as IOpenCellValue;
    case FieldType.Phone:
      return phone(value);
    default:
      return value;
  }
}

function compareCellValue(
  excelValue: string,
  tableValue: string,
  mode: "merge_direct" | "compare_merge"
): string {
  if (mode === "compare_merge") {
    return excelValue ?? tableValue;
  }
  return excelValue;
}

function hasNewElement(target: string[], from: string[]): boolean {
  const res = !from.every((v) => target.includes(v));
  // console.log("hasNewElement", target, from, res);
  return res;
}

async function setOptionsField(
  fieldsMaps: fieldMap[],
  excelData: ExcelDataInfo,
  sheetIndex: number,
  table: IWidgetTable,
  callback?: {
    beforeCheckFields?: (e: any) => void;
    onCheckFields?: (e: any) => void;
    beforeCheckOptions?: (e: any) => void;
    onCheckOptions?: (e: any) => void;
    beforeSetOptions?: (e: any) => void;
    onSetOptions?: (e: any) => void;
    onSetOptionsFieldEnd?: (e: any) => void;
  }
): Promise<fieldMap[]> {
  if (
    callback?.beforeCheckFields &&
    typeof callback.beforeCheckFields === "function"
  ) {
    callback.beforeCheckFields({
      state: "beforeCheckFields",
      number: fieldsMaps.length,
    });
  }
  const optionsFields = fieldsMaps.filter((fieldMap) => {
    const res = optionsFieldType.includes(fieldMap.field.type);
    if (
      callback?.onCheckFields &&
      typeof callback.onCheckFields === "function"
    ) {
      callback.onCheckFields({
        state: "onCheckFields",
        field: fieldMap.field,
        res,
      });
    }
    return res;
  });

  // refresh singleSelect and multiSelect options
  if (optionsFields.length > 0) {
    if (
      callback?.beforeCheckOptions &&
      typeof callback.beforeCheckOptions === "function"
    ) {
      callback.beforeCheckOptions({
        state: "beforeCheckOptions",
        number: optionsFields.length,
      });
    }
    const selects: { id: string; config: IFieldConfig }[] = [];
    optionsFields.forEach((optionsField) => {
      // const field = table.getFieldById(optionsField.field.id);
      const tableOptions = optionsField.field.property.options.map(
        (v: any) => v.name
      );
      const excelValues = Array.from(
        new Set(
          excelData.sheets[sheetIndex].tableData.records
            .map((v) => {
              return Array.from(
                (v[optionsField.excel_field] ?? "")?.split(
                  optionsField.config?.separator ?? ","
                )
              ) as string[];
            })
            .flat()
            .filter((v) => v !== "")
        )
      );
      if (hasNewElement(tableOptions, excelValues)) {
        const options = Array.from(
          new Set([...tableOptions, ...excelValues])
        ) as string[];
        selects.push({
          id: optionsField.field.id as string,
          config: {
            type: optionsField.field.type,
            name: optionsField.field.name,
            property: {
              options: options.map((v) => ({ name: v })),
            },
          },
        });
      }
      if (
        callback?.onCheckOptions &&
        typeof callback.onCheckOptions === "function"
      ) {
        callback.onCheckOptions({
          state: "onCheckOptions",
          field: optionsField.field,
          selects,
        });
      }
    });
    console.log(selects);
    // const optionsRecords: string[] = [];
    if (
      callback?.beforeSetOptions &&
      typeof callback.beforeSetOptions === "function"
    ) {
      callback.beforeSetOptions({
        state: "beforeSetOptions",
        number: selects.length,
      });
    }
    if (selects.length > 0) {
      await Promise.all(
        selects.map(async (select) => {
          let field = await table.getFieldById(select.id);
          const optionsRecords = await field.getFieldValueList();
          await table.setField(select.id, select.config);
          field = await table.getFieldById(select.id);
          const newMeta = await table.getFieldMetaById(select.id);
          fieldsMaps[
            fieldsMaps.findIndex((fieldMap) => fieldMap.field.id === select.id)
          ].field = newMeta as fieldMap["field"];
          const newOptions = (
            newMeta as ISingleSelectFieldMeta | IMultiSelectFieldMeta
          ).property.options;
          console.log("newOptions", newOptions, optionsRecords);
          await Promise.all(
            optionsRecords.map(async (record) => {
              const id: string = record.record_id as string;
              if (select.config.type === FieldType.MultiSelect) {
                const value = (record.value as IOpenMultiSelect).map((v) => {
                  const option = newOptions.find(
                    (option) => option.name === v.text
                  );
                  if (option) {
                    return {
                      text: option.name,
                      id: option.id,
                    };
                  }
                });
                const res = await table.setRecord(id, {
                  // @ts-ignore
                  fields: {
                    [select.id]: value,
                  },
                });
                console.log("setMultiSelectRecord", res);
                if (
                  callback?.onSetOptions &&
                  typeof callback.onSetOptions === "function"
                ) {
                  callback.onSetOptions({
                    state: "onSetOptions",
                    field: select,
                    record: res,
                  });
                }
              }

              if (select.config.type === FieldType.SingleSelect) {
                const value = record.value as IOpenSingleSelect;
                const option = newOptions.find(
                  (option) => option.name === value.text
                );
                if (option) {
                  const res = await table.setRecord(id, {
                    fields: {
                      [select.id]: {
                        text: option.name,
                        id: option.id,
                      },
                    },
                  });
                  console.log("setSingleSelectRecord", res);
                  if (
                    callback?.onSetOptions &&
                    typeof callback.onSetOptions === "function"
                  ) {
                    callback.onSetOptions({
                      state: "onSetOptions",
                      field: select,
                      record: res,
                    });
                  }
                }
              }
            })
          );
        })
      );
    }
  }
  if (
    callback?.onSetOptionsFieldEnd &&
    typeof callback.onSetOptionsFieldEnd === "function"
  ) {
    callback.onSetOptionsFieldEnd({
      state: "onEnd",
    });
  }
  return fieldsMaps;
}

async function addRecords(
  records: { [key: string]: IOpenCellValue }[],
  table: IWidgetTable,
  callback?: (e: any) => void
): Promise<(string | undefined)[]> {
  const addRes = await Promise.all(
    records.map(async (record, index) => {
      try {
        const res = await table.addRecord({ fields: record });
        if (callback && typeof callback === "function") callback({ res, index });
        return res;
      } catch (e) {
        console.error("addRecord error", e, index);
      }
    })
  );
  return addRes;
}

function delay(t: number) {
  return new Promise(function (resolve) {
    setTimeout(resolve, t);
  });
}

async function batchRecords(
  records: { [key: string]: IOpenCellValue }[],
  table: IWidgetTable,
  maxNumber: number = 4000,
  interval: number = 3000,
  callback?: (e: any) => void
): Promise<(string | undefined)[]> {
  if (records.length === 0) return [];
  if (records.length <= maxNumber) {
    return await addRecords(records, table, callback);
  } else {
    const addRes: (string | undefined)[] = [];
    const currRes = await addRecords(
      records.slice(0, maxNumber),
      table,
      callback
    );
    await delay(interval);
    const nextRes = await batchRecords(
      records.slice(maxNumber),
      table,
      maxNumber,
      interval,
      callback
    );
    addRes.push(...currRes, ...nextRes);
    return addRes;
  }
}

// async function getRecordsNumber(
//   table: IWidgetTable,
//   deleteNumber: number,
//   addNumber: number
// ) {
//   const idList = await table.getRecordIdList();
//   const recordsNumber = idList.length - deleteNumber + addNumber;
//   return recordsNumber;
// }

export async function importExcel(
  fieldsMaps: fieldMap[],
  excelData: ExcelDataInfo,
  sheetIndex: number,
  table: IWidgetTable,
  index: string | null = null,
  mode: "append" | "merge_direct" | "compare_merge" = "append",
  callback?: {
    beforeCheckFields?: (e: any) => void;
    onCheckFields?: (e: any) => void;
    beforeCheckOptions?: (e: any) => void;
    onCheckOptions?: (e: any) => void;
    beforeSetOptions?: (e: any) => void;
    onSetOptions?: (e: any) => void;
    onSetOptionsFieldEnd?: (e: any) => void;
    beforeAnalysisRecords?: (e: any) => void;
    onAnalysisRecords?: (e: any) => void;
    beforeDeleteRecords?: (e: any) => void;
    onDeleteRecords?: (e: any) => void;
    beforeAddRecords?: (e: any) => void;
    onAddRecords?: (e: any) => void;
    end?: (e: any) => void;
  }
) {
  const {
    beforeCheckFields,
    onCheckFields,
    beforeCheckOptions,
    onCheckOptions,
    beforeSetOptions,
    onSetOptions,
    onSetOptionsFieldEnd,
    beforeAnalysisRecords,
    onAnalysisRecords: analysisRecords,
    beforeAddRecords,
    onAddRecords,
    beforeDeleteRecords,
    onDeleteRecords,
    end,
  } = callback || {};
  fieldsMaps = await setOptionsField(fieldsMaps, excelData, sheetIndex, table, {
    beforeCheckFields,
    onCheckFields,
    beforeCheckOptions,
    onCheckOptions,
    beforeSetOptions,
    onSetOptions,
    onSetOptionsFieldEnd,
  });
  console.log("fieldMaps", fieldsMaps);
  const excelRecords = excelData.sheets[sheetIndex].tableData.records;
  const newRecords: any[] = [];
  let deleteList: any[] = [];
  if (beforeAnalysisRecords && typeof beforeAnalysisRecords === "function") {
    beforeAnalysisRecords({
      state: "onStart",
      number: excelRecords.length,
      mode,
    });
  }
  if (mode === "append" || !index) {
    await Promise.all(
      excelRecords.map(async (record) => {
        const newRecord: { [key: string]: IOpenCellValue } = {};
        await Promise.all(
          fieldsMaps.map(async (fieldMap) => {
            const value = record[fieldMap.excel_field];
            if (value) {
              const tempValue = await getCellValue(fieldMap, value, table);
              if (tempValue) {
                newRecord[fieldMap.field.id] = tempValue;
              }
            }
          })
        );
        newRecords.push(newRecord);
        if (analysisRecords && typeof analysisRecords === "function") {
          analysisRecords({
            state: "onAnalysisRecords",
            records: newRecords,
            number: excelRecords.length,
            mode,
          });
        }
      })
    );
    console.log("newRecords", newRecords);
  } else {
    const excelIndexField: fieldMap = fieldsMaps.find(
      (fieldMap) => fieldMap.excel_field === index
    ) as fieldMap;
    const indexField = await table.getFieldByName(index);
    const tableIndexRecords: (IFieldValue | IUndefinedFieldValue)[] =
      await indexField.getFieldValueList();
    console.log("excelIndexField", excelIndexField, tableIndexRecords);
    await Promise.all(
      excelRecords.map(async (record) => {
        console.log("record", record, excelIndexField);
        const indexValue = record[excelIndexField.excel_field];
        const sameRecords = tableIndexRecords.filter(
          (tableIndexRecord) => tableIndexRecord.value[0].text === indexValue
        );
        console.log("sameRecords", sameRecords, indexValue, tableIndexRecords);
        if (sameRecords.length === 0) {
          const newRecord: { [key: string]: IOpenCellValue } = {};
          await Promise.all(
            fieldsMaps.map(async (fieldMap) => {
              const value = record[fieldMap.excel_field];
              const tempValue = await getCellValue(fieldMap, value, table);
              if (tempValue) {
                newRecord[fieldMap.field.id] = tempValue;
              }
            })
          );
          newRecords.push(newRecord);
          console.log("newRecord", newRecord);
          if (analysisRecords && typeof analysisRecords === "function") {
            analysisRecords({
              state: "onAnalysisRecords",
              records: newRecords,
              number: excelRecords.length,
              mode,
            });
          }
        } else {
          deleteList.push(
            ...sameRecords.map((sameRecord) => sameRecord.record_id)
          );
          const newRecord: { [key: string]: IOpenCellValue } = {};
          await Promise.all(
            fieldsMaps.map(async (fieldMap) => {
              const field = await table.getFieldById(fieldMap.field.id);
              await Promise.all(
                sameRecords.map(async (sameRecord) => {
                  const tableValue = await field.getCellString(
                    sameRecord.record_id as string
                  );
                  console.log("table string value", tableValue);
                  const excelValue = record[fieldMap.excel_field];
                  const value = compareCellValue(excelValue, tableValue, mode);
                  const tempValue = await getCellValue(fieldMap, value, table);
                  if (tempValue) {
                    newRecord[fieldMap.field.id] = tempValue;
                  }
                })
              );
            })
          );
          newRecords.push(newRecord);
          if (analysisRecords && typeof analysisRecords === "function") {
            analysisRecords({
              state: "onAnalysisRecords",
              records: newRecords,
              number: excelRecords.length,
              mode,
            });
          }
        }
      })
    );
    console.log(newRecords, deleteList);
  }
  if (beforeDeleteRecords && typeof beforeDeleteRecords === "function") {
    beforeDeleteRecords({
      state: "beforeDeleteRecords",
      deleteList,
    });
  }
  if (deleteList.length > 0) {
    deleteList = Array.from(new Set(deleteList));
    const deleteRes = await Promise.all(
      deleteList.map(async (id) => {
        if (typeof id === "string") {
          const res = await table.deleteRecord(id);
          if (onDeleteRecords && typeof onDeleteRecords === "function") {
            onDeleteRecords({
              state: "onDeleteRecords",
              res,
              number: deleteList.length,
            });
          }
          return res;
        }
      })
    );
    console.log("deleteRes", deleteRes);
  }
  console.log("start addRecords", newRecords);
  if (beforeAddRecords && typeof beforeAddRecords === "function") {
    beforeAddRecords({
      state: "beforeAddRecords",
      records: newRecords,
    });
  }
  const addRes = await batchRecords(
    newRecords,
    table,
    4000,
    3000,
    onAddRecords
  );
  console.log("addRes", addRes);
  if (end && typeof end === "function") end({ state: "end", res: addRes });
}
