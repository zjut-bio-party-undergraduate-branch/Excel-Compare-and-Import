import {
  IOpenCellValue,
  FieldType,
  IMultiSelectFieldMeta,
  ISingleSelectFieldMeta,
  IWidgetTable,
  ISelectFieldConfig,
  IRecordValue,
  IRecord,
  bitable,
} from "@lark-base-open/js-sdk"

import {
  fieldMap,
  ExcelDataInfo,
  IFieldValue,
  IUndefinedFieldValue,
  BitableTable,
  LinkField,
  Task,
  SheetInfo,
} from "@/types/types"
import { getCellValue, cellValueToString } from "../cellValue"
import { hasNewElement, delay } from "./helper"
import { importLifeCircles, runLifeCircleEvent } from "./lifeCircle"
import { i18n } from "@/i18n"
import { clearTree, walkTree, getTreeLength } from "./tree"
import { P } from "vitest/dist/reporters-cb94c88b.js"

export const optionsFieldType = [FieldType.SingleSelect, FieldType.MultiSelect]

async function setOptionsField(
  fieldsMaps: fieldMap[],
  sheet: SheetInfo,
  tables: { [key: IWidgetTable["id"]]: BitableTable },
  lifeCircleHook: any,
) {
  lifeCircleHook(importLifeCircles.beforeCheckFields, {
    stage: importLifeCircles.beforeCheckFields,
    data: {
      number: fieldsMaps.length,
    },
  })

  const optionsFields: fieldMap[] = []
  const length = getTreeLength(fieldsMaps)
  walkTree(fieldsMaps, (v) => {
    lifeCircleHook(importLifeCircles.onCheckFields, {
      stage: importLifeCircles.onCheckFields,
      data: {
        field: v.field,
        res: optionsFieldType.includes(v.field.type),
        progress: {
          number: length,
          current: fieldsMaps.findIndex((i) => i === v),
        },
      },
    })
    if (optionsFieldType.includes(v.field.type) && v.excel_field) {
      optionsFields.push(v)
    }
  })

  // refresh singleSelect and multiSelect options
  if (optionsFields.length > 0) {
    lifeCircleHook(importLifeCircles.beforeCheckOptions, {
      stage: importLifeCircles.beforeCheckOptions,
      data: {
        number: optionsFields.length,
      },
    })
    const selects: {
      id: string
      config: ISelectFieldConfig
      table: IWidgetTable["id"]
      field: fieldMap
    }[] = []
    optionsFields.forEach((optionsField) => {
      const tableOptions = (
        optionsField.field as ISingleSelectFieldMeta | IMultiSelectFieldMeta
      ).property.options.map((v: any) => v.name)
      const excelValues = Array.from(
        new Set(
          sheet.tableData.records
            .map((v) => {
              return Array.from(
                (v[optionsField.excel_field as string] ?? "")?.split(
                  optionsField.config?.separator ?? ",",
                ),
              ) as string[]
            })
            .flat()
            .filter((v) => v !== ""),
        ),
      )
      if (hasNewElement(tableOptions, excelValues)) {
        const options = Array.from(
          new Set([...tableOptions, ...excelValues]),
        ) as string[]
        selects.push({
          id: optionsField.field.id,
          table: optionsField.table,
          field: optionsField,
          config: {
            type: optionsField.field.type as
              | FieldType.SingleSelect
              | FieldType.MultiSelect,
            name: optionsField.field.name,
            property: {
              options: options.map((v) => ({ name: v })),
            },
          },
        })
      }
      lifeCircleHook(importLifeCircles.onCheckOptions, {
        stage: importLifeCircles.onCheckOptions,
        data: {
          field: optionsField.field,
          selects,
        },
      })
    })
    console.log(selects)
    lifeCircleHook(importLifeCircles.beforeSetOptions, {
      stage: importLifeCircles.beforeSetOptions,
      data: {
        number: selects.length,
      },
    })
    if (selects.length > 0) {
      await Promise.all(
        selects.map(async (select) => {
          const table = tables[select.table].table
          await table.setField(select.id, select.config)
          const newMeta = await table.getFieldMetaById(select.id)
          select.field.field = newMeta as fieldMap["field"]
        }),
      )
    }
  }
  await lifeCircleHook(importLifeCircles.onSetOptionsFieldEnd, {
    stage: importLifeCircles.onSetOptionsFieldEnd,
    data: {},
  })
}

async function batch(
  maxNumber: number = 5000,
  interval: number = 0,
  records: any[],
  action: (records: any[]) => Promise<any> | any,
) {
  if (records.length === 0) return []
  if (records.length <= maxNumber) {
    return await action(records)
  } else {
    const res: any[] = []
    const count = Math.ceil(records.length / maxNumber)
    for (let i = 0; i < count; i++) {
      const currRes = (await action(
        records.slice(i * maxNumber, (i + 1) * maxNumber),
      )) as any[]
      if (interval > 0) {
        await delay(interval)
      }

      res.push(...currRes)
    }
    return res
  }
}

function addRecords(table: IWidgetTable, lifeCircleHook: any) {
  return async (records: { [key: string]: IOpenCellValue }[]) => {
    try {
      const addRes = await table.addRecords(
        records.map((record) => ({ fields: record })),
      )
      await lifeCircleHook(importLifeCircles.onAddRecords, {
        stage: importLifeCircles.onAddRecords,
        data: {
          res: addRes,
        },
      })
      return addRes
    } catch (e) {
      console.log(e)
      await lifeCircleHook(importLifeCircles.onAddRecords, {
        stage: importLifeCircles.onAddRecords,
        data: {
          res: e,
        },
      })
      return []
    }
  }
}

function updateRecords(table: IWidgetTable, lifeCircleHook: any) {
  return async (records: IRecord[]) => {
    try {
      const Res = await table.setRecords(records)
      await lifeCircleHook(importLifeCircles.onUpdateRecords, {
        stage: importLifeCircles.onUpdateRecords,
        data: {
          res: Res,
        },
      })
      return Res
    } catch (e) {
      console.log(e)
      await lifeCircleHook(importLifeCircles.onUpdateRecords, {
        stage: importLifeCircles.onUpdateRecords,
        data: {
          res: e,
        },
      })
      return []
    }
  }
}

function deleteRecords(table: IWidgetTable, lifeCircleHook: any) {
  return async (records: string[]) => {
    try {
      const addRes = await table.deleteRecords(records)
      await lifeCircleHook(importLifeCircles.onAddRecords, {
        stage: importLifeCircles.onDeleteRecords,
        data: {
          res: addRes,
        },
      })
      return addRes
    } catch (e) {
      console.log(e)
      await lifeCircleHook(importLifeCircles.onDeleteRecords, {
        stage: importLifeCircles.onDeleteRecords,
        data: {
          res: e,
        },
      })
      return []
    }
  }
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
  )
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
  )
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
  )
}

export enum importModes {
  append = "append",
  merge_direct = "merge_direct",
  compare_merge = "compare_merge",
}

/**
 * Get the value to be updated
 * @param excelValue
 * @param table
 * @param fieldId
 * @param recordId
 * @param mode "append" | "merge_direct" | "compare_merge"
 * @returns null: no need to update, string: update value
 */
async function compareCellValue(
  excelValue: string,
  table: BitableTable,
  fieldId: string,
  recordId: string,
  mode: importModes,
): Promise<string | null> {
  if (mode === importModes.append) {
    return excelValue
  } else {
    const field = table.fields[fieldId]
    const tableValue = await field.getCellString(recordId)
    if (excelValue === tableValue) {
      return null
    } else {
      if (mode === importModes.merge_direct) {
        return excelValue
      }
    }
  }
  return excelValue
}

/**
 * @description Collect the tables in the fieldMaps
 * @param fieldMaps
 * @returns
 */
async function collect(fieldMaps: fieldMap[]) {
  let tables: { [key: IWidgetTable["id"]]: BitableTable } = {}
  fieldMaps.forEach(async (i) => {
    if (!Object.keys(tables).includes(i.table)) {
      const id = i.table
      const table = await bitable.base.getTableById(id)
      const name = await table.getName()
      const fields = await table.getFieldMetaList()
      tables[id] = {
        id,
        table,
        name,
        indexName: [fields.filter((v) => v.isPrimary)[0].name],
        fields: await fields.reduce(
          async (c, o) => {
            const f = await c
            const field = await table.getFieldById(o.id)
            f[o.id] = field
            return f
          },
          {} as Promise<BitableTable["fields"]>,
        ),
      }
    }
    if (
      i.hasChildren &&
      !Object.keys(tables).includes((i.field as LinkField).property.tableId)
    ) {
      const id = (i.field as LinkField).property.tableId
      const table = await bitable.base.getTableById(id)
      const name = await table.getName()
      const fields = await table.getFieldMetaList()
      tables[id] = {
        table,
        id,
        name,
        indexName: [fields.filter((v) => v.isPrimary)[0].name],
        fields: await fields.reduce(
          async (c, o) => {
            const f = await c
            const field = await table.getFieldById(o.id)
            f[o.id] = field
            return f
          },
          {} as Promise<BitableTable["fields"]>,
        ),
      }
    }
    if (i.children?.length) {
      tables = { ...tables, ...(await collect(i.children)) }
    }
  })
  return tables
}

async function getTableIndex(
  table: IWidgetTable,
  index: string[],
  lifeCircleHook: any,
) {
  const indexFieldValue = await Promise.all(
    index.map(async (i) => {
      const field = await table.getFieldById(i)
      const value = await field.getFieldValueList()
      return value
    }),
  )
  /**
   * Get the recordIds
   */
  const recordIds: string[] = Array.from(
    new Set(
      indexFieldValue.map((v) => v.map((j) => j.record_id as string)).flat(),
    ),
  )
  const Index: {
    indexValue: string[]
    table: IWidgetTable["id"]
    recordId: string
  }[] = recordIds.map((recordId) => {
    const indexValue: string[] = []
    for (let i = 0; i < indexFieldValue.length; i++) {
      indexValue.push(
        cellValueToString(
          indexFieldValue[i].find((j) => j.record_id === recordId)?.value ??
            null,
        ) as string,
      )
    }
    return {
      indexValue,
      table: table.id,
      recordId,
    }
  })
  return Index
}

export async function getImportTasks(
  fieldsMaps: fieldMap[],
  sheet: SheetInfo,
  index: string[] | null = null,
  mode: importModes = importModes.append,
  lifeCircleHook: any = runLifeCircleEvent,
) {
  /**
   * Clear the tree structure of fieldsMaps
   */
  clearTree(fieldsMaps)

  /**
   * Collect the tables
   */
  const tables: {
    [key: IWidgetTable["id"]]: BitableTable
  } = await collect(fieldsMaps)

  /**
   * Set options
   */
  await setOptionsField(fieldsMaps, sheet, tables, lifeCircleHook)

  /**
   * Get Indexes
   */
  const rootIndex: {
    indexValue: string[]
    table: IWidgetTable["id"]
    recordId: string
  }[] = []
  if (index) {
    const rootTable = tables[fieldsMaps[0].table].table
    rootIndex.push(...(await getTableIndex(rootTable, index, lifeCircleHook)))
  }
  const tasks: Task[] = []
  const excelRecords = sheet.tableData.records
  await Promise.all(
    excelRecords.map(async (record) => {
      const recordFields: IRecordValue["fields"] = {}
      await Promise.all(
        fieldsMaps.map(async (fieldMap) => {
          if (fieldMap.excel_field) {
            const value = record[fieldMap.excel_field]
            if (value) {
              const tempValue = getCellValue(fieldMap, value)
              // if (tempValue) {
              //   recordFields[fieldMap.field.id] = tempValue
              // }
              if (mode === importModes.append || !rootIndex) {
                if (tempValue) {
                  recordFields[fieldMap.field.id] = tempValue
                }
              }
            }
          }
        }),
      )
    }),
  )
}

/**
 * @description Import excel data into bitable
 *
 * @param fieldsMaps
 * @param excelData
 * @param sheetIndex
 * @param index
 * @param mode
 * @param lifeCircleHook
 */
export async function importExcel(
  fieldsMaps: fieldMap[],
  excelData: ExcelDataInfo["sheets"],
  sheetIndex: number,
  index: string[] | null = null,
  mode: importModes = importModes.append,
  lifeCircleHook: any = runLifeCircleEvent,
) {
  /**
   * Clear the tree structure of fieldsMaps
   */
  clearTree(fieldsMaps)

  /**
   * Collect the tables
   */
  const tables: { [key: IWidgetTable["id"]]: BitableTable } =
    await collect(fieldsMaps)

  /**
   * Set options
   */
  await setOptionsField(
    fieldsMaps,
    excelData,
    sheetIndex,
    tables,
    lifeCircleHook,
  )

  const tasks: any[] = []

  console.log("fieldMaps", fieldsMaps)
  const excelRecords = excelData.sheets[sheetIndex].tableData.records
  const newRecords: IRecordValue["fields"][] = []
  let deleteList: string[] = []
  const updateList: IRecord[] = []
  await lifeCircleHook(importLifeCircles.beforeAnalysisRecords, {
    stage: importLifeCircles.beforeAnalysisRecords,
    data: {
      number: excelRecords.length,
      mode,
    },
  })
  if (mode === importModes.append || !index) {
    await Promise.all(
      excelRecords.map(async (record) => {
        const newRecord: IRecordValue["fields"] = {}
        await Promise.all(
          fieldsMaps.map(async (fieldMap) => {
            const value = record[fieldMap.excel_field]
            if (value) {
              const tempValue = getCellValue(fieldMap, value)
              if (tempValue) {
                newRecord[fieldMap.field.id] = tempValue
              }
            }
          }),
        )
        newRecords.push(newRecord)
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
        })
      }),
    )
    console.log("newRecords", newRecords)
  } else {
    const excelIndexField: fieldMap = fieldsMaps.find(
      (fieldMap) => fieldMap.excel_field === index,
    ) as fieldMap
    await lifeCircleHook(importLifeCircles.onAnalysisRecords, {
      stage: importLifeCircles.onAnalysisRecords,
      data: {
        addNumber: newRecords.length,
        updateNumber: updateList.length,
        deleteNumber: deleteList.length,
        message: i18n.global.t("importInfo.getIndexField"),
      },
    })
    const indexField = await table.getFieldByName(index)
    await lifeCircleHook(importLifeCircles.onAnalysisRecords, {
      stage: importLifeCircles.onAnalysisRecords,
      data: {
        addNumber: newRecords.length,
        updateNumber: updateList.length,
        deleteNumber: deleteList.length,
        message: i18n.global.t("importInfo.getIndexFieldValue"),
      },
    })
    const tableIndexRecords: (IFieldValue | IUndefinedFieldValue)[] =
      await indexField.getFieldValueList()
    console.log("excelIndexField", excelIndexField, tableIndexRecords)
    await Promise.all(
      excelRecords.map(async (record) => {
        console.log("record", record, excelIndexField)
        const indexValue = record[excelIndexField.excel_field]
        const deleteIndex: number[] = []
        const sameRecords = tableIndexRecords.filter(
          (tableIndexRecord, index) => {
            if (tableIndexRecord.value[0].text === indexValue) {
              deleteIndex.push(index)
              return true
            }
            return false
          },
        )
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
        })
        for (let i = deleteIndex.length - 1; i >= 0; i--) {
          tableIndexRecords.splice(deleteIndex[i], 1)
        }
        console.log("sameRecords", sameRecords, indexValue, tableIndexRecords)
        if (sameRecords.length === 0) {
          const newRecord: IRecordValue["fields"] = {}
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
              })
              const value = record[fieldMap.excel_field]
              const tempValue = getCellValue(fieldMap, value)
              if (tempValue) {
                newRecord[fieldMap.field.id] = tempValue
              }
            }),
          )
          newRecords.push(newRecord)
          console.log("newRecord", newRecord)
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
          })
        } else if (sameRecords.length === 1) {
          const newRecord: IRecord["fields"] = {}
          await Promise.all(
            fieldsMaps.map(async (fieldMap) => {
              const field = await table.getFieldById(fieldMap.field.id)
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
              })
              const tableValue = await field.getCellString(
                sameRecords[0].record_id as string,
              )
              const excelValue = record[fieldMap.excel_field]
              const value = compareCellValue(excelValue, tableValue, mode)
              const tempValue = getCellValue(fieldMap, value)
              if (tempValue) {
                newRecord[fieldMap.field.id] = tempValue
              }
            }),
          )
          updateList.push({
            recordId: sameRecords[0].record_id as string,
            fields: newRecord,
          })
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
          })
        } else {
          deleteList.push(
            ...sameRecords.map((sameRecord) => sameRecord.record_id as string),
          )
          const newRecord: { [key: string]: IOpenCellValue } = {}
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
              })
              const field = await table.getFieldById(fieldMap.field.id)
              await Promise.all(
                sameRecords.map(async (sameRecord) => {
                  const tableValue = await field.getCellString(
                    sameRecord.record_id as string,
                  )
                  console.log("table string value", tableValue)
                  const excelValue = record[fieldMap.excel_field]
                  const value = compareCellValue(excelValue, tableValue, mode)
                  const tempValue = getCellValue(fieldMap, value)
                  if (tempValue) {
                    newRecord[fieldMap.field.id] = tempValue
                  }
                }),
              )
            }),
          )
          newRecords.push(newRecord)
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
          })
        }
      }),
    )
    console.log(newRecords, deleteList)
  }
  await lifeCircleHook(importLifeCircles.beforeUpdateRecords, {
    stage: importLifeCircles.beforeUpdateRecords,
    data: {
      updateList,
    },
  })
  if (updateList.length > 0) {
    const updateRes = await batchUpdateRecords(
      updateList,
      table,
      500,
      500,
      lifeCircleHook,
    )
    console.log("updateRes", updateRes)
  }

  await lifeCircleHook(importLifeCircles.beforeDeleteRecords, {
    stage: importLifeCircles.beforeDeleteRecords,
    data: {
      deleteList,
    },
  })
  if (deleteList.length > 0) {
    deleteList = Array.from(new Set(deleteList))
    const deleteRes = await batchDeleteRecords(
      deleteList,
      table,
      500,
      500,
      lifeCircleHook,
    )
    console.log("deleteRes", deleteRes)
  }
  console.log("start addRecords", newRecords)
  await lifeCircleHook(importLifeCircles.beforeAddRecords, {
    stage: importLifeCircles.beforeAddRecords,
    data: {
      records: newRecords,
      number: newRecords.length,
    },
  })
  if (newRecords.length > 0) {
    const addRes = await batchRecords(
      newRecords,
      table,
      500,
      500,
      lifeCircleHook,
    )
    console.log("addRes", addRes)
  }
  await lifeCircleHook(importLifeCircles.onEnd, {
    stage: importLifeCircles.onEnd,
  })
}
