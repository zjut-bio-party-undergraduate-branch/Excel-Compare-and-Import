import {
  IOpenCellValue,
  FieldType,
  IMultiSelectFieldMeta,
  ISingleSelectFieldMeta,
  IWidgetTable,
  IOpenSingleSelect,
  IOpenMultiSelect,
  IFieldConfig,
  IRecordValue,
  IRecord,
  IOpenSingleCellValue,
} from "@lark-base-open/js-sdk";
import {
  fieldMap,
  ExcelDataInfo,
  IFieldValue,
  IUndefinedFieldValue,
} from "@/types/types";
import { getCellValue } from "../cellValue";
import { hasNewElement, asyncFilter } from "./helper";
import { importLifeCircles, runLifeCircleEvent } from "./lifeCircle";
import { i18n } from "@/i18n";

export const optionsFieldType = [FieldType.SingleSelect, FieldType.MultiSelect];

async function setOptionsField(
  fieldsMaps: fieldMap[],
  excelData: ExcelDataInfo,
  sheetIndex: number,
  table: IWidgetTable,
  lifeCircleHook: any,
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
        progress: {
          number: fieldsMaps.length,
          current: fieldsMaps.findIndex((v) => v === fieldMap),
        },
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
        (v: any) => v.name,
      );
      const excelValues = Array.from(
        new Set(
          excelData.sheets[sheetIndex].tableData.records
            .map((v) => {
              return Array.from(
                (v[optionsField.excel_field] ?? "")?.split(
                  optionsField.config?.separator ?? ",",
                ),
              ) as string[];
            })
            .flat()
            .filter((v) => v !== ""),
        ),
      );
      if (hasNewElement(tableOptions, excelValues)) {
        const options = Array.from(
          new Set([...tableOptions, ...excelValues]),
        ) as string[];
        selects.push({
          id: optionsField.field.id as string,
          config: {
            type: optionsField.field.type,
            name: optionsField.field.name,
            property: {
              options: options.map((v) => {
                const opt = optionsField.field?.property?.options.find(
                  (i: ISingleSelectFieldMeta) => i.name === v,
                );
                console.log(
                  "v",
                  v,
                  optionsField,
                  opt,
                  optionsField?.property?.options,
                );
                if (opt) {
                  return {
                    name: v,
                    id: opt.id,
                    color: opt.color,
                  };
                } else {
                  return {
                    name: v,
                  };
                }
              }),
            },
          },
        });
        console.log("Selects", selects, optionsField);
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
        }),
      );
    }
  }

  return fieldsMaps;
}

async function batch(
  maxNumber: number = 500,
  interval: number = 500,
  records: any[],
  action: (records: any[]) => Promise<any> | any,
) {
  if (records.length === 0) return [];
  if (records.length <= maxNumber) {
    return await action(records);
  } else {
    const res: any[] = [];
    const count = Math.ceil(records.length / maxNumber);
    for (let i = 0; i < count; i++) {
      const currRes = (await action(
        records.slice(i * maxNumber, (i + 1) * maxNumber),
      )) as any[];
      // await delay(interval);
      res.push(currRes);
    }
    return res.flat();
  }
}

function addRecords(table: IWidgetTable, lifeCircleHook: any) {
  return async (records: { [key: string]: IOpenCellValue }[]) => {
    try {
      const addRes = await table.addRecords(
        records.map((record) => ({ fields: record })),
      );
      await lifeCircleHook(importLifeCircles.onAddRecords, {
        stage: importLifeCircles.onAddRecords,
        data: {
          res: addRes,
        },
      });
      return addRes;
    } catch (e) {
      console.log(e);
      await lifeCircleHook(importLifeCircles.onAddRecords, {
        stage: importLifeCircles.onAddRecords,
        data: {
          res: e,
        },
      });
      return [];
    }
  };
}

function updateRecords(table: IWidgetTable, lifeCircleHook: any) {
  return async (records: IRecord[]) => {
    try {
      const Res = await table.setRecords(records);
      await lifeCircleHook(importLifeCircles.onUpdateRecords, {
        stage: importLifeCircles.onUpdateRecords,
        data: {
          res: Res,
        },
      });
      return Res;
    } catch (e) {
      console.log(e);
      await lifeCircleHook(importLifeCircles.onUpdateRecords, {
        stage: importLifeCircles.onUpdateRecords,
        data: {
          res: e,
        },
      });
      return [];
    }
  };
}

function deleteRecords(table: IWidgetTable, lifeCircleHook: any) {
  return async (records: string[]) => {
    try {
      const addRes = await table.deleteRecords(records);
      await lifeCircleHook(importLifeCircles.onAddRecords, {
        stage: importLifeCircles.onDeleteRecords,
        data: {
          res: addRes,
        },
      });
      return addRes;
    } catch (e) {
      console.log(e);
      await lifeCircleHook(importLifeCircles.onDeleteRecords, {
        stage: importLifeCircles.onDeleteRecords,
        data: {
          res: e,
        },
      });
      return [];
    }
  };
}

async function batchRecords(
  records: { [key: string]: IOpenCellValue }[],
  table: IWidgetTable,
  maxNumber: number = 500,
  interval: number = 500,
  lifeCircleHook: any,
): Promise<(string | undefined)[]> {
  return await batch(
    maxNumber,
    interval,
    records,
    addRecords(table, lifeCircleHook),
  );
}

async function batchUpdateRecords(
  records: IRecord[],
  table: IWidgetTable,
  maxNumber: number = 500,
  interval: number = 500,
  lifeCircleHook: any,
) {
  return await batch(
    maxNumber,
    interval,
    records,
    updateRecords(table, lifeCircleHook),
  );
}

async function batchDeleteRecords(
  records: string[],
  table: IWidgetTable,
  maxNumber: number = 500,
  interval: number = 500,
  lifeCircleHook: any,
) {
  return await batch(
    maxNumber,
    interval,
    records,
    deleteRecords(table, lifeCircleHook),
  );
}

export enum importModes {
  append = "append",
  merge_direct = "merge_direct",
  compare_merge = "compare_merge",
}

function compareCellValue(
  excelValue: string,
  tableValue: string,
  mode: importModes.compare_merge | importModes.merge_direct,
): string {
  if (mode === importModes.compare_merge) {
    return excelValue ?? tableValue;
  }
  return excelValue;
}

// async function analysisRecords(
//   fieldsMaps: fieldMap[],
//   excelRecords: { [key: string]: string }[],
//   table: IWidgetTable,
//   mode: importModes,
//   index: string,
//   lifeCircleHook: any
// ): Promise<{
//   addList: { [key: string]: IOpenCellValue }[];
//   deleteList: { [key: string]: IOpenCellValue }[];
// }> {
//   const addList: { [key: string]: IOpenCellValue }[] = [];
//   const deleteList: { [key: string]: IOpenCellValue }[] = [];
//   await lifeCircleHook(importLifeCircles.onAnalysisRecords, {
//     stage: importLifeCircles.onAnalysisRecords,
//     data: {
//       number: excelRecords.length,
//       mode,
//     },
//   });
//   const excelIndexField: fieldMap | null = index
//     ? (fieldsMaps.find(
//         (fieldMap) => fieldMap.excel_field === index
//       ) as fieldMap)
//     : null;
//   const indexField = excelIndexField ? await table.getFieldByName(index) : null;
//   const tableIndexRecords: (IFieldValue | IUndefinedFieldValue)[] = indexField
//     ? await indexField.getFieldValueList()
//     : [];
// }

export async function importExcel(
  fieldsMaps: fieldMap[],
  excelData: ExcelDataInfo,
  sheetIndex: number,
  table: IWidgetTable,
  index: string | null = null,
  mode: importModes = importModes.append,
  lifeCircleHook: any = runLifeCircleEvent,
) {
  // fieldsMaps = fieldsMaps.filter(
  //   (fieldMap) => fieldMap.excel_field,
  // ) as fieldMap[];
  fieldsMaps = await setOptionsField(
    fieldsMaps,
    excelData,
    sheetIndex,
    table,
    lifeCircleHook,
  );
  console.log("fieldMaps", fieldsMaps);
  const excelRecords = excelData.sheets[sheetIndex].tableData.records;
  const newRecords: IRecordValue["fields"][] = [];
  let deleteList: string[] = [];
  const updateList: IRecord[] = [];
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
        const newRecord: IRecordValue["fields"] = {};
        await Promise.all(
          fieldsMaps.map(async (fieldMap) => {
            const value = record[fieldMap.excel_field];
            if (value) {
              const tempValue = getCellValue(fieldMap, value);
              if (tempValue) {
                newRecord[fieldMap.field.id] = tempValue;
              }
            }
          }),
        );
        newRecords.push(newRecord);
        await lifeCircleHook(importLifeCircles.onAnalysisRecords, {
          stage: importLifeCircles.onAnalysisRecords,
          data: {
            records: newRecords,
            number: excelRecords.length,
            mode,
            updateNumber: updateList.length,
            deleteNumber: deleteList.length,
            addNumber: newRecords.length,
            message: i18n.global.t("importInfo.analysisRecordsMessage", {
              updateNumber: updateList.length,
              deleteNumber: deleteList.length,
              addNumber: newRecords.length,
            }),
          },
        });
      }),
    );
    console.log("newRecords", newRecords);
  } else {
    const excelIndexField: fieldMap = fieldsMaps.find(
      (fieldMap) => fieldMap.excel_field === index,
    ) as fieldMap;
    const indexField = await table.getFieldByName(index);
    const tableIndexRecords: (IFieldValue | IUndefinedFieldValue)[] =
      await indexField.getFieldValueList();
    console.log("excelIndexField", excelIndexField, tableIndexRecords);
    await Promise.all(
      excelRecords.map(async (record) => {
        console.log("record", record, excelIndexField);
        const indexValue = record[excelIndexField.excel_field];
        const deleteIndex: number[] = [];
        const sameRecords = tableIndexRecords.filter(
          (tableIndexRecord, index) => {
            if (tableIndexRecord.value[0].text === indexValue) {
              deleteIndex.push(index);
              return true;
            }
            return false;
          },
        );
        await lifeCircleHook(importLifeCircles.onAnalysisRecords, {
          stage: importLifeCircles.onAnalysisRecords,
          data: {
            addNumber: newRecords.length,
            updateNumber: updateList.length,
            deleteNumber: deleteList.length,
            message: i18n.global.t("importInfo.findSameRecord", {
              indexValue,
              sameNumber: sameRecords.length,
            }),
          },
        });
        for (let i = deleteIndex.length - 1; i >= 0; i--) {
          tableIndexRecords.splice(deleteIndex[i], 1);
        }
        console.log("sameRecords", sameRecords, indexValue, tableIndexRecords);
        if (sameRecords.length === 0) {
          const newRecord: IRecordValue["fields"] = {};
          await Promise.all(
            fieldsMaps.map(async (fieldMap) => {
              await lifeCircleHook(importLifeCircles.onAnalysisRecords, {
                stage: importLifeCircles.onAnalysisRecords,
                data: {
                  updateNumber: updateList.length,
                  deleteNumber: deleteList.length,
                  addNumber: newRecords.length,
                  message: i18n.global.t("importInfo.compareRecord", {
                    indexValue,
                    fieldName: fieldMap.field.name,
                  }),
                },
              });
              const value = record[fieldMap.excel_field];
              const tempValue = getCellValue(fieldMap, value);
              if (tempValue) {
                newRecord[fieldMap.field.id] = tempValue;
              }
            }),
          );
          newRecords.push(newRecord);
          console.log("newRecord", newRecord);
          await lifeCircleHook(importLifeCircles.onAnalysisRecords, {
            stage: importLifeCircles.onAnalysisRecords,
            data: {
              records: newRecords,
              number: excelRecords.length,
              mode,
              updateNumber: updateList.length,
              deleteNumber: deleteList.length,
              addNumber: newRecords.length,
              message: i18n.global.t("importInfo.analysisRecordsMessage", {
                updateNumber: updateList.length,
                deleteNumber: deleteList.length,
                addNumber: newRecords.length,
              }),
            },
          });
        } else if (sameRecords.length === 1) {
          const newRecord: IRecord["fields"] = {};
          await Promise.all(
            fieldsMaps.map(async (fieldMap) => {
              const field = await table.getFieldById(fieldMap.field.id);
              await lifeCircleHook(importLifeCircles.onAnalysisRecords, {
                stage: importLifeCircles.onAnalysisRecords,
                data: {
                  updateNumber: updateList.length,
                  deleteNumber: deleteList.length,
                  addNumber: newRecords.length,
                  curRecord: indexValue,
                  curField: fieldMap.field.name,
                  message: i18n.global.t("importInfo.compareRecord", {
                    indexValue,
                    fieldName: fieldMap.field.name,
                  }),
                },
              });
              const tableValue = await field.getCellString(
                sameRecords[0].record_id as string,
              );
              const excelValue = record[fieldMap.excel_field];
              const value = compareCellValue(excelValue, tableValue, mode);
              const tempValue = getCellValue(fieldMap, value);
              if (tempValue) {
                newRecord[fieldMap.field.id] = tempValue;
              }
            }),
          );
          updateList.push({
            recordId: sameRecords[0].record_id as string,
            fields: newRecord,
          });
          await lifeCircleHook(importLifeCircles.onAnalysisRecords, {
            stage: importLifeCircles.onAnalysisRecords,
            data: {
              records: newRecords,
              number: excelRecords.length,
              mode,
              updateNumber: updateList.length,
              deleteNumber: deleteList.length,
              addNumber: newRecords.length,
              message: i18n.global.t("importInfo.analysisRecordsMessage", {
                updateNumber: updateList.length,
                deleteNumber: deleteList.length,
                addNumber: newRecords.length,
              }),
            },
          });
        } else {
          deleteList.push(
            ...sameRecords.map((sameRecord) => sameRecord.record_id as string),
          );
          const newRecord: { [key: string]: IOpenCellValue } = {};
          await Promise.all(
            fieldsMaps.map(async (fieldMap) => {
              await lifeCircleHook(importLifeCircles.onAnalysisRecords, {
                stage: importLifeCircles.onAnalysisRecords,
                data: {
                  updateNumber: updateList.length,
                  deleteNumber: deleteList.length,
                  addNumber: newRecords.length,
                  curRecord: indexValue,
                  curField: fieldMap.field.name,
                  message: i18n.global.t("importInfo.compareRecord", {
                    indexValue,
                    fieldName: fieldMap.field.name,
                  }),
                },
              });
              const field = await table.getFieldById(fieldMap.field.id);
              await Promise.all(
                sameRecords.map(async (sameRecord) => {
                  const tableValue = await field.getCellString(
                    sameRecord.record_id as string,
                  );
                  console.log("table string value", tableValue);
                  const excelValue = record[fieldMap.excel_field];
                  const value = compareCellValue(excelValue, tableValue, mode);
                  const tempValue = getCellValue(fieldMap, value);
                  if (tempValue) {
                    newRecord[fieldMap.field.id] = tempValue;
                  }
                }),
              );
            }),
          );
          newRecords.push(newRecord);
          await lifeCircleHook(importLifeCircles.onAnalysisRecords, {
            stage: importLifeCircles.onAnalysisRecords,
            data: {
              records: newRecords,
              number: excelRecords.length,
              mode,
              updateNumber: updateList.length,
              deleteNumber: deleteList.length,
              addNumber: newRecords.length,
              message: i18n.global.t("importInfo.analysisRecordsMessage", {
                updateNumber: updateList.length,
                deleteNumber: deleteList.length,
                addNumber: newRecords.length,
              }),
            },
          });
        }
      }),
    );
    console.log(newRecords, deleteList);
  }
  await lifeCircleHook(importLifeCircles.beforeUpdateRecords, {
    stage: importLifeCircles.beforeUpdateRecords,
    data: {
      updateList,
    },
  });
  if (updateList.length > 0) {
    const updateRes = await batchUpdateRecords(
      updateList,
      table,
      500,
      500,
      lifeCircleHook,
    );
    console.log("updateRes", updateRes);
  }

  await lifeCircleHook(importLifeCircles.beforeDeleteRecords, {
    stage: importLifeCircles.beforeDeleteRecords,
    data: {
      deleteList,
    },
  });
  if (deleteList.length > 0) {
    deleteList = Array.from(new Set(deleteList));
    const deleteRes = await batchDeleteRecords(
      deleteList,
      table,
      500,
      500,
      lifeCircleHook,
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
  if (newRecords.length > 0) {
    const addRes = await batchRecords(
      newRecords,
      table,
      500,
      500,
      lifeCircleHook,
    );
    console.log("addRes", addRes);
  }
  await lifeCircleHook(importLifeCircles.onEnd, {
    stage: importLifeCircles.onEnd,
  });
}
