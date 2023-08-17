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
import {
  fieldMap,
  ExcelDataInfo,
  IFieldValue,
  IUndefinedFieldValue,
} from "@/types/types";
import { getCellValue } from "../cellValue";
import { hasNewElement, delay, asyncFilter } from "./helper";
import { importLifeCircles, runLifeCircleEvent } from "./lifeCircle";

export const optionsFieldType = [FieldType.SingleSelect, FieldType.MultiSelect];

async function setOptionsField(
  fieldsMaps: fieldMap[],
  excelData: ExcelDataInfo,
  sheetIndex: number,
  table: IWidgetTable,
  lifeCircleHook: any
): Promise<fieldMap[]> {
  await lifeCircleHook(importLifeCircles.beforeCheckFields, {
    stage: importLifeCircles.beforeCheckFields,
    data: {
      number: fieldsMaps.length,
    },
  });
  const optionsFields = await asyncFilter(fieldsMaps, async (fieldMap) => {
    const res = optionsFieldType.includes(fieldMap.field.type);
    await lifeCircleHook(importLifeCircles.onCheckFields, {
      stage: importLifeCircles.onCheckFields,
      data: {
        field: fieldMap.field,
        res,
      },
    });
    return res;
  });

  // refresh singleSelect and multiSelect options
  if (optionsFields.length > 0) {
    await lifeCircleHook(importLifeCircles.beforeCheckOptions, {
      stage: importLifeCircles.beforeCheckOptions,
      data: {
        number: optionsFields.length,
      },
    });
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
      lifeCircleHook(importLifeCircles.onCheckOptions, {
        stage: importLifeCircles.onCheckOptions,
        data: {
          field: optionsField.field,
          selects,
        },
      });
    });
    console.log(selects);
    await lifeCircleHook(importLifeCircles.beforeSetOptions, {
      stage: importLifeCircles.beforeSetOptions,
      data: {
        number: selects.length,
      },
    });
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
                lifeCircleHook(importLifeCircles.onSetOptions, {
                  stage: importLifeCircles.onSetOptions,
                  data: {
                    field: select,
                    record: res,
                  },
                });
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
                  await lifeCircleHook(importLifeCircles.onSetOptions, {
                    stage: importLifeCircles.onSetOptions,
                    data: {
                      field: select,
                      record: res,
                    },
                  });
                }
              }
            })
          );
        })
      );
    }
  }
  await lifeCircleHook(importLifeCircles.onSetOptionsFieldEnd, {
    stage: importLifeCircles.onSetOptionsFieldEnd,
    data: {},
  });
  return fieldsMaps;
}

async function addRecords(
  records: { [key: string]: IOpenCellValue }[],
  table: IWidgetTable,
  lifeCircleHook: any
): Promise<(string | undefined)[]> {
  const addRes = await Promise.all(
    records.map(async (record, index) => {
      try {
        const res = await table.addRecord({ fields: record });
        await lifeCircleHook(importLifeCircles.onAddRecords, {
          stage: importLifeCircles.onAddRecords,
          data: {
            res,
            index,
          },
        });
        return res;
      } catch (e) {
        console.error("addRecord error", e, index);
      }
    })
  );
  return addRes;
}

async function batchRecords(
  records: { [key: string]: IOpenCellValue }[],
  table: IWidgetTable,
  maxNumber: number = 4000,
  interval: number = 3000,
  lifeCircleHook: any
): Promise<(string | undefined)[]> {
  if (records.length === 0) return [];
  if (records.length <= maxNumber) {
    return await addRecords(records, table, lifeCircleHook);
  } else {
    const addRes: (string | undefined)[] = [];
    const count = Math.ceil(records.length / maxNumber);
    for (let i = 0; i < count; i++) {
      const currRes = await addRecords(
        records.slice(i * maxNumber, (i + 1) * maxNumber),
        table,
        lifeCircleHook
      );
      await delay(interval);
      addRes.push(...currRes);
    }
    return addRes;
  }
}

export enum importModes {
  append = "append",
  merge_direct = "merge_direct",
  compare_merge = "compare_merge",
}

function compareCellValue(
  excelValue: string,
  tableValue: string,
  mode: importModes.compare_merge | importModes.merge_direct
): string {
  if (mode === importModes.compare_merge) {
    return excelValue ?? tableValue;
  }
  return excelValue;
}

export async function importExcel(
  fieldsMaps: fieldMap[],
  excelData: ExcelDataInfo,
  sheetIndex: number,
  table: IWidgetTable,
  index: string | null = null,
  mode: importModes = importModes.append,
  lifeCircleHook: any = runLifeCircleEvent
) {
  fieldsMaps = await setOptionsField(
    fieldsMaps,
    excelData,
    sheetIndex,
    table,
    lifeCircleHook
  );
  console.log("fieldMaps", fieldsMaps);
  const excelRecords = excelData.sheets[sheetIndex].tableData.records;
  const newRecords: any[] = [];
  let deleteList: any[] = [];
  await lifeCircleHook(importLifeCircles.beforeAnalysisRecords, {
    stage: importLifeCircles.beforeAnalysisRecords,
    data: {
      number: excelRecords.length,
      mode,
    },
  });
  if (mode === importModes.append || !index) {
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
        await lifeCircleHook(importLifeCircles.onAnalysisRecords, {
          stage: importLifeCircles.onAnalysisRecords,
          data: {
            records: newRecords,
            number: excelRecords.length,
            mode,
          },
        });
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
          await lifeCircleHook(importLifeCircles.onAnalysisRecords, {
            stage: importLifeCircles.onAnalysisRecords,
            data: {
              records: newRecords,
              number: excelRecords.length,
              mode,
            },
          });
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
          await lifeCircleHook(importLifeCircles.onAnalysisRecords, {
            stage: importLifeCircles.onAnalysisRecords,
            data: {
              records: newRecords,
              number: excelRecords.length,
              mode,
            },
          });
        }
      })
    );
    console.log(newRecords, deleteList);
  }
  await lifeCircleHook(importLifeCircles.beforeDeleteRecords, {
    stage: importLifeCircles.beforeDeleteRecords,
    data: {
      deleteList,
    },
  });
  if (deleteList.length > 0) {
    deleteList = Array.from(new Set(deleteList));
    const deleteRes = await Promise.all(
      deleteList.map(async (id) => {
        if (typeof id === "string") {
          const res = await table.deleteRecord(id);
          await lifeCircleHook(importLifeCircles.onDeleteRecords, {
            stage: importLifeCircles.onDeleteRecords,
            data: {
              res,
              number: deleteList.length,
            },
          });
          return res;
        }
      })
    );
    console.log("deleteRes", deleteRes);
  }
  console.log("start addRecords", newRecords);
  await lifeCircleHook(importLifeCircles.beforeAddRecords, {
    stage: importLifeCircles.beforeAddRecords,
    data: {
      records: newRecords,
      number: newRecords.length,
    },
  });
  const addRes = await batchRecords(
    newRecords,
    table,
    4000,
    3000,
    lifeCircleHook
  );
  console.log("addRes", addRes);
  await lifeCircleHook(importLifeCircles.onEnd, {
    stage: importLifeCircles.onEnd,
    data: {
      res: addRes,
    },
  });
}
