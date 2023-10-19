import { options } from "./../log"
import {
  IOpenCellValue,
  FieldType,
  IWidgetTable,
  IRecordValue,
  IRecord,
  bitable,
  ICell,
  ITable,
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
import { TaskAction } from "@/utils/import/tasks"
import { getCell, cellValueToString } from "../cellValue"
import { delay, isArrayStrictEqual } from "./helper"
import { importLifeCircles, runLifeCircleEvent } from "./lifeCircle"
import { i18n } from "@/i18n"
import { clearTree, walkTree, getTreeLength } from "./tree"

export const optionsFieldType = [FieldType.SingleSelect, FieldType.MultiSelect]

export const linkFieldType = [FieldType.SingleLink, FieldType.DuplexLink]

/**
 * Batch processing
 * @param maxNumber
 * @param interval
 * @param records
 * @param action
 * @returns
 */
async function batch<T>(
  maxNumber: number = 5000,
  interval: number = 0,
  records: Array<T>,
  action: (records: Array<T>) => Promise<any> | any,
) {
  if (records.length === 0) return []
  if (records.length <= maxNumber) {
    return await action(records)
  } else {
    const res: T[] = []
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

/**
 * Update records
 * @param table
 * @param lifeCircleHook
 * @returns
 */
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

/**
 * Delete records
 * @param table
 * @param lifeCircleHook
 * @returns
 */
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

/**
 * Batch add records
 * @param records
 * @param table
 * @param maxNumber
 * @param interval
 * @param lifeCircleHook
 * @returns
 */
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
  mode: importModes.compare_merge | importModes.merge_direct,
  table: BitableTable,
  fieldId: string,
  recordId: string,
): Promise<string | null> {
  const field = table.fields[fieldId]
  const tableValue = await field.getCellString(recordId)
  if (excelValue === tableValue) return null
  if (mode === importModes.merge_direct || !tableValue) return excelValue
  return tableValue
}

async function getBitableTableById(id: string, root: boolean = false) {
  const table = await bitable.base.getTableById(id)
  const name = await table.getName()
  const fields = await table.getFieldMetaList()
  return {
    id,
    table,
    name,
    indexId: [fields.filter((v) => v.isPrimary)[0].id],
    root,
    fields: await fields.reduce(
      async (c, o) => {
        const f = await c
        const field = await table.getFieldById(o.id)
        f[o.id] = field
        return f
      },
      {} as Promise<BitableTable["fields"]>,
    ),
  } as BitableTable
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
      tables[id] = await getBitableTableById(id, i.root)
    }
    if (
      i.hasChildren &&
      !Object.keys(tables).includes((i.field as LinkField).property.tableId)
    ) {
      const id = (i.field as LinkField).property.tableId
      tables[id] = await getBitableTableById(id)
    }
    if (i.children?.length) {
      tables = { ...tables, ...(await collect(i.children)) }
    }
  })
  return tables
}

async function getTableIndex(
  table: ITable,
  index: string[],
  lifeCircleHook: Function,
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
    table: string
    recordId: string
  }[] = recordIds.map((recordId) => {
    const indexValue: string[] = []
    for (let i = 0; i < indexFieldValue.length; i++) {
      indexValue.push(
        cellValueToString(
          indexFieldValue[i].find((j) => j.record_id === recordId)?.value ??
            null,
        ) ?? "",
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

export interface ImportOptions {
  parallel?: {
    records: number
    fields: number
  }
  interval?: {
    records: number
    fields: number
  }
}

async function batchAnalyze<T, K>(
  targets: Array<T>,
  strategy: (item: T) => Promise<K | Array<K>>,
  parallel: number = 10000,
  interval: number = 0,
) {
  const res: Array<K> = []
  await batch(parallel, interval, targets, async (li) => {
    await Promise.all(
      li.map(async (target) => {
        const t = await strategy(target)
        if (Array.isArray(t)) res.push(...t)
        else res.push(t)
      }),
    )
  })
  return res
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
  excelData: ExcelDataInfo,
  sheetIndex: number,
  index: string[] | null = null,
  mode: importModes = importModes.append,
  options: ImportOptions = {},
  lifeCircleHook: any = runLifeCircleEvent,
) {
  const {
    parallel = {
      records: 10000,
      fields: 10,
    },
    interval = {
      records: 0,
      fields: 0,
    },
  } = options
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
   * Get Indexes
   */
  const rootIndex: Array<{
    indexValue: string[]
    table: IWidgetTable["id"]
    recordId: string
  }> = []
  if (index) {
    const rootTable = tables[fieldsMaps[0].table].table
    rootIndex.push(...(await getTableIndex(rootTable, index, lifeCircleHook)))
  }
  const linkIndexes: Record<
    IWidgetTable["id"],
    {
      indexValue: string[]
      table: IWidgetTable["id"]
      recordId: string
    }[]
  > = {}
  await Promise.all(
    Object.values(tables).map(async (linkTable) => {
      const index = linkTable.indexId
      const indexValue = await getTableIndex(
        linkTable.table,
        index,
        lifeCircleHook,
      )
      linkIndexes[linkTable.id] = indexValue
    }),
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
    const t = await batchAnalyze(
      excelRecords,
      async (record) => {
        const t: Task[] = []
        const cells: Array<ICell> = (
          await batchAnalyze(
            fieldsMaps,
            async (fieldMap) => {
              if (!fieldMap.excel_field) return
              const value = record[fieldMap.excel_field] ?? ""
              if (!value) return
              const field = tables[fieldMap.table].fields[fieldMap.field.id]
              const needLink = linkFieldType.includes(fieldMap.field.type)
              if (
                needLink &&
                fieldMap.hasChildren &&
                fieldMap.children?.length
              ) {
                const values = value.split(fieldMap.config.separator ?? ",")
                const children = fieldMap.children[0]
                const table =
                  tables[(fieldMap.field as LinkField).property.tableId]
                const index = linkIndexes[table.id]
                const disExistValues: Array<string> = []
                const existRecord = (
                  values
                    .map((i) => {
                      const r = index.filter((j) => j.indexValue[0] === i)
                      if (r.length === 0) {
                        disExistValues.push(i)
                        return null
                      }
                      return r.map((j) => j.recordId)
                    })
                    .flat()
                    .filter((i) => i !== null) as string[]
                ).join(fieldMap.config.separator ?? ",")
                if (!disExistValues.length) {
                  const cell = await getCell(field, fieldMap, existRecord)
                  if (cell) return cell
                  return
                }
                const linkField = table.fields[children.field.id]
                const cell = await getCell(
                  linkField,
                  children,
                  disExistValues.join(fieldMap.config.separator ?? ","),
                )
                if (cell) {
                  t.push({
                    table: {
                      name: table.name,
                      id: table.id,
                    },
                    action: TaskAction.Add,
                    data: [cell],
                    result: undefined,
                  })
                }
              }

              if (!needLink) {
                const cell = await getCell(field, fieldMap, value)
                if (cell) return cell
              }
            },
            parallel.fields,
            interval.fields,
          )
        ).filter((v) => v) as ICell[]
        t.push({
          table: {
            id: fieldsMaps[0].table,
            name: tables[fieldsMaps[0].table].name,
          },
          action: TaskAction.Add,
          data: cells,
          result: undefined,
        })
        return t
      },
      parallel.records,
      interval.records,
    )
    tasks.push(...t)
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
