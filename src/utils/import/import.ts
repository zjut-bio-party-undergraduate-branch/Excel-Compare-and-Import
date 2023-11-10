import type {
  IWidgetTable,
  IRecord,
  ICell,
  IField,
  ITable,
  IModifiedTimeField,
  IOpenCellValue,
} from "@lark-base-open/js-sdk"
import { FieldType, bitable } from "@lark-base-open/js-sdk"
import type {
  fieldMap,
  ExcelDataInfo,
  BitableTable,
  LinkField,
  Task,
  ImportOptions,
} from "@/types/types"
import { importModes, TaskStatus, UpdateMode } from "@/types/types"
import { TaskAction } from "@/utils/import/tasks"
import { cellTranslator } from "../cellValue"
import {
  delay,
  isArrayStrictEqual,
  groupBy,
  isNotEmpty,
  unique,
} from "./helper"
import type { lifeCircleEventParams } from "./lifeCircle"
import { importLifeCircles, runLifeCircleEvent } from "./lifeCircle"
import { Error, Log, Info } from "@/utils"

export const optionsFieldType = [FieldType.SingleSelect, FieldType.MultiSelect]

export const linkFieldType = [FieldType.SingleLink, FieldType.DuplexLink]

/**
 * Batch processing
 *
 * @param maxNumber
 * @param interval
 * @param list
 * @param action
 * @returns
 */
async function batch<T>(
  maxNumber: number = 5000,
  interval: number = 0,
  list: Array<T>,
  action: (list: Array<T>) => Promise<void>,
) {
  if (list.length === 0) return
  if (list.length <= maxNumber) {
    await action(list)
  } else {
    const count = Math.ceil(list.length / maxNumber)
    for (let i = 0; i < count; i++) {
      await action(list.slice(i * maxNumber, (i + 1) * maxNumber))
      if (interval > 0) {
        await delay(interval)
      }
    }
  }
}

async function addRecords(
  table: ITable,
  lifeCircleHook: (
    stage: importLifeCircles,
    params: lifeCircleEventParams,
  ) => void,
) {
  const tableName = await table.getName()
  return async (tasks: Task<ICell>[]) => {
    try {
      const addRes = await table.addRecords(tasks.map((task) => task.data))
      tasks.forEach((task, index) => {
        if (addRes[index]) {
          task.result = addRes[index]
          task.status = TaskStatus.Success
        }
      })
      lifeCircleHook(importLifeCircles.onAddRecords, {
        stage: "addRecords",
        data: {
          success: tasks,
          message: {
            text: "importInfo.addRecordsMessage",
            params: {
              table: tableName,
            },
          },
        },
      })
    } catch (e) {
      Error({
        title: "addRecordsFailure",
        message: String(e),
        error: e,
      })
      tasks.forEach((task) => {
        task.status = TaskStatus.Error
      })
      lifeCircleHook(importLifeCircles.onAddRecords, {
        stage: "addRecords",
        data: {
          error: tasks,
        },
      })
    }
  }
}

/**
 * Update records
 * @param table
 * @param lifeCircleHook
 * @returns
 */
async function updateRecords(
  table: ITable,
  lifeCircleHook: (
    stage: importLifeCircles,
    params: lifeCircleEventParams,
  ) => void,
) {
  const tableName = await table.getName()
  return async (tasks: Task<IRecord>[]) => {
    try {
      // console.time("updateRecords" + table.id)
      const updateRes = await table.setRecords(
        tasks.map((task) => task.data).flat(),
      )
      // console.timeEnd("updateRecords" + table.id)
      tasks.forEach((task, index) => {
        if (updateRes[index]) {
          task.result = updateRes[index]
          task.status = TaskStatus.Success
        }
      })
      lifeCircleHook(importLifeCircles.onUpdateRecords, {
        stage: "updateRecords",
        data: {
          success: tasks,
          message: {
            text: "importInfo.updateRecordsMessage",
            params: {
              table: tableName,
            },
          },
        },
      })
    } catch (e) {
      Error({
        title: "updateRecordsFailure",
        message: String(e),
        error: e,
      })
      tasks.forEach((task) => {
        task.status = TaskStatus.Error
      })
      lifeCircleHook(importLifeCircles.onUpdateRecords, {
        stage: "updateRecords",
        data: {
          error: tasks,
        },
      })
    }
  }
}

/**
 * Delete records
 * @param table
 * @param lifeCircleHook
 * @returns
 */
async function deleteRecords(
  table: ITable,
  lifeCircleHook: (
    stage: importLifeCircles,
    params: lifeCircleEventParams,
  ) => void,
) {
  const tableName = await table.getName()
  return async (tasks: Task<string>[]) => {
    try {
      // console.time("deleteRecords" + table.id)
      const deleteRes = await table.deleteRecords(
        tasks.map((task) => task.data).flat(),
      )
      // console.timeEnd("deleteRecords" + table.id)
      if (deleteRes) {
        tasks.forEach((task) => {
          task.result = deleteRes
          task.status = TaskStatus.Success
        })
      }
      lifeCircleHook(importLifeCircles.onDeleteRecords, {
        stage: "deleteRecords",
        data: {
          success: tasks,
          message: {
            text: "importInfo.deleteRecordsMessage",
            params: {
              table: tableName,
            },
          },
        },
      })
    } catch (e) {
      Error({
        title: "deleteRecordsFailure",
        message: String(e),
        error: e,
      })
      tasks.forEach((task) => {
        task.status = TaskStatus.Error
      })
      // console.log(e)
      lifeCircleHook(importLifeCircles.onDeleteRecords, {
        stage: "deleteRecords",
        data: {
          error: tasks,
        },
      })
    }
  }
}

/**
 * Batch add records
 * @param tasks
 * @param table
 * @param maxNumber
 * @param interval
 * @param lifeCircleHook
 * @returns
 */
async function batchAddRecords(
  tasks: Task<ICell>[],
  table: ITable,
  maxNumber: number = 500,
  interval: number = 500,
  lifeCircleHook: (
    stage: importLifeCircles,
    params: lifeCircleEventParams,
  ) => void,
) {
  await batch(
    maxNumber,
    interval,
    tasks,
    await addRecords(table, lifeCircleHook),
  )
}

async function batchUpdateRecords(
  records: Task<IRecord>[],
  table: ITable,
  maxNumber: number = 500,
  interval: number = 500,
  lifeCircleHook: (
    stage: importLifeCircles,
    params: lifeCircleEventParams,
  ) => void,
) {
  return await batch(
    maxNumber,
    interval,
    records,
    await updateRecords(table, lifeCircleHook),
  )
}

async function batchDeleteRecords(
  tasks: Task<string>[],
  table: ITable,
  maxNumber: number = 500,
  interval: number = 500,
  lifeCircleHook: (
    stage: importLifeCircles,
    params: lifeCircleEventParams,
  ) => void,
) {
  return await batch(
    maxNumber,
    interval,
    tasks,
    await deleteRecords(table, lifeCircleHook),
  )
}

/**
 * Get the value that need to be added
 *
 * @param excelValue
 * @param tableValue
 * @param mode
 * @param field
 * @param fieldMap
 * @returns
 */
async function compareCellValue(
  excelValue: string,
  tableValue: IOpenCellValue | null,
  mode: importModes.compare_merge | importModes.merge_direct,
  field: IField,
  fieldMap: fieldMap,
) {
  if (excelValue === tableValue) return null
  if (mode === importModes.merge_direct || tableValue === null)
    return await cellTranslator.getCell(field, fieldMap, excelValue)
  return await cellTranslator.getCell(field, fieldMap, tableValue)
}

async function getBitableTableById(
  id: string,
  fieldMaps: fieldMap[],
  root: boolean = false,
  lifeCircleHook: (
    stage: importLifeCircles,
    params: lifeCircleEventParams,
  ) => void,
  index?: Array<string>,
) {
  try {
    const table = await bitable.base.getTable(id)
    const [name, fields, fieldMetaList] = await Promise.all([
      table.getName(),
      table.getFieldList(),
      table.getFieldMetaList(),
    ])
    lifeCircleHook(importLifeCircles.onReadFieldMap, {
      stage: "readFieldMap",
      data: {
        message: {
          text: "importInfo.getTable",
          params: {
            name,
            id,
          },
        },
      },
    })
    const primaryField = fieldMetaList.filter((v) => v.isPrimary)[0].id
    const res = {
      id,
      table,
      name,
      primaryField,
      indexId: index?.length ? index : [primaryField],
      root,
      fields: fields.reduce(
        (pre, cur) => {
          pre[cur.id] = cur
          return pre
        },
        {} as Record<string, IField>,
      ),
      fieldMaps,
    } as BitableTable

    return res
  } catch (e) {
    Error({
      title: "getTableFailure",
      message: String(e),
      error: e,
      notice: true,
      noticeParams: {
        text: "message.getTableFailure",
        params: {
          id,
        },
      },
    })
    throw e
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
    await Promise.allSettled(
      li.map(async (target) => {
        const t = await strategy(target)
        if (Array.isArray(t)) res.push(...t)
        else res.push(t)
      }),
    )
  })
  return res
}

async function linkStrategy(
  value: string,
  fieldMap: fieldMap,
  field: IField,
  tables: Record<IWidgetTable["id"], BitableTable>,
  linkIndexes: Record<
    string,
    {
      indexValue: (string | string[])[]
      table: string
      recordId: string
    }[]
  >,
  tasks: Task[],
  lifeCircleHook: (
    stage: importLifeCircles,
    params: lifeCircleEventParams,
  ) => void,
  linkTarget?: Task,
) {
  if (!fieldMap.children?.length) return null
  const { linkConfig } = fieldMap
  const { allowAdd, primaryKey } = linkConfig ?? {}
  if (!primaryKey || allowAdd === undefined) return null
  const values = (await cellTranslator.normalization(
    value,
    fieldMap,
  )) as string[]
  const targetTable = tables[(fieldMap.field as LinkField).property.tableId]
  const index = linkIndexes[targetTable.id]
  const disExistValues: Array<string> = []
  lifeCircleHook(importLifeCircles.onAnalyzeRecords, {
    stage: "analyzeRecords",
    data: {
      message: {
        text: "importInfo.getLinkRecord",
        params: {
          indexValue: values.join("|"),
          fieldName: fieldMap.field.name,
          fieldId: field.id,
          table: targetTable.name,
        },
      },
    },
  })
  const existRecord = values
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
  if ((!disExistValues.length || !allowAdd) && existRecord.length) {
    const cell = await cellTranslator.getCell(
      field,
      fieldMap,
      existRecord.join(fieldMap.config.separator ?? ","),
    )
    if (cell) return cell
    return null
  }
  // const linkField = targetTable.fields[primaryKey]
  // const linkMap = fieldMap.children.find((i) => {
  //   return i.field.id === primaryKey
  // })
  // // console.log("linkMap", linkMap)
  // if (
  //   allowAdd &&
  //   linkMap &&
  //   disExistValues.length &&
  //   !autoFields.includes(linkMap.field.type)
  // ) {
  //   const link: Array<Task> = []
  //   for (const v of disExistValues) {
  //     const cell = await cellTranslator.getCell(linkField, linkMap, v)
  //     if (cell) {
  //       link.push({
  //         table: {
  //           name: targetTable.name,
  //           id: targetTable.id,
  //         },
  //         action: TaskAction.Add,
  //         data: [cell],
  //         result: undefined,
  //         status: TaskStatus.Wait,
  //       })
  //     }
  //   }
  //   tasks.push(...link)
  //   tasks.push({
  //     table: {
  //       name: targetTable.name,
  //       id: targetTable.id,
  //     },
  //     action: TaskAction.Link,
  //     data: existRecord,
  //     result: undefined,
  //     link,
  //     status: TaskStatus.Wait,
  //     target: linkTarget,
  //   })
  // }
}

async function addStrategy(
  record: Record<string, string>,
  fieldMap: fieldMap,
  tables: Record<IWidgetTable["id"], BitableTable>,
  linkIndexes: Record<
    string,
    {
      indexValue: (string | string[])[]
      table: string
      recordId: string
    }[]
  >,
  tasks: Task[],
  lifeCircleHook: (
    stage: importLifeCircles,
    params: lifeCircleEventParams,
  ) => void,
  linkTarget?: Task,
): Promise<ICell | null> {
  if (!fieldMap.excel_field || !fieldMap.writable) return null
  const value = record[fieldMap.excel_field] ?? null
  if (!value) return null
  const field = tables[fieldMap.table].fields[fieldMap.field.id]
  const needLink = linkFieldType.includes(fieldMap.field.type)
  const { linkConfig } = fieldMap
  const { primaryKey } = linkConfig ?? {}
  if (
    needLink &&
    fieldMap.hasChildren &&
    fieldMap.children?.length &&
    primaryKey
  ) {
    return await linkStrategy(
      value,
      fieldMap,
      field,
      tables,
      linkIndexes,
      tasks,
      lifeCircleHook,
      linkTarget,
    )
  }
  if (!needLink) {
    const cell = await cellTranslator.getCell(field, fieldMap, value)
    if (cell) return cell
  }
  return null
}

/**
 * Get the modified time of records in the table
 *
 * If a modifiedTime field does not be provided, it will be created automatically
 *
 * @param table
 * @param modifiedTimeField
 * @returns
 */
async function getModifiedTime(
  table: ITable,
  modifiedTimeField?: IModifiedTimeField,
) {
  try {
    let needDelete = false
    if (!modifiedTimeField) {
      const modifiedFieldId = await table.addField({
        type: FieldType.ModifiedTime,
      })
      modifiedTimeField =
        await table.getField<IModifiedTimeField>(modifiedFieldId)
      needDelete = true
    }
    const records = await modifiedTimeField.getFieldValueList()
    if (needDelete) table.deleteField(modifiedTimeField)
    return records.reduce(
      (pre, cur) => {
        if (!cur.record_id) return pre
        pre[cur.record_id] = cur.value as number
        return pre
      },
      {} as Record<string, number>,
    )
  } catch (e) {
    Error({
      title: "getModifiedTimeFailure",
      message: String(e),
      error: e,
      notice: true,
      noticeParams: {
        text: "message.getModifiedTimeFailure",
        params: {
          id: table.id,
        },
      },
    })
    return {}
  }
}

/**
 * Get the string value of the field
 *
 * @param field
 * @param recordIds
 * @returns
 */
async function getFieldStringValue(
  field: IField,
  recordIds: string[],
  lifeCircleHook: (
    stage: importLifeCircles,
    params: lifeCircleEventParams,
  ) => void,
) {
  const cellStrings = await Promise.all(
    recordIds.map(async (recordId) => {
      lifeCircleHook(importLifeCircles.onReadFieldMap, {
        stage: "readFieldMap",
        data: {
          message: {
            text: "importInfo.getFieldCellString",
            params: {
              field: field.id,
              record: recordId,
            },
          },
        },
      })
      const value = await field.getCellString(recordId)
      return {
        recordId,
        value,
      }
    }),
  )
  return cellStrings
}

/**
 * Collect the tables in the fieldMaps
 *
 * @param fieldMaps
 * @returns
 */
async function collect(
  fieldMaps: fieldMap[],
  rootIndex: string[],
  lifeCircleHook: (
    stage: importLifeCircles,
    params: lifeCircleEventParams,
  ) => void,
) {
  let tables: Record<string, BitableTable> = {}
  const id = fieldMaps[0].table
  tables[id] = await getBitableTableById(
    id,
    fieldMaps,
    fieldMaps[0].root,
    lifeCircleHook,
    rootIndex,
  )

  for (const i of fieldMaps) {
    if (
      i.excel_field &&
      i.hasChildren &&
      i.linkConfig &&
      !Object.keys(tables).includes((i.field as LinkField).property.tableId)
    ) {
      const id = (i.field as LinkField).property.tableId
      tables[id] = await getBitableTableById(
        id,
        i.children ?? [],
        false,
        lifeCircleHook,
        i.linkConfig.primaryKey ? [i.linkConfig.primaryKey] : undefined,
      )
    }
    // if (i.children?.length) {
    //   tables = { ...tables, ...(await collect(i.children)) }
    // }
  }
  return tables
}

/**
 * Get the index value of the table
 *
 * @param table
 * @param index
 * @param lifeCircleHook
 * @returns
 */
async function getTableIndex(
  table: ITable,
  index: fieldMap[],
  lifeCircleHook: (
    stage: importLifeCircles,
    params: lifeCircleEventParams,
  ) => void,
) {
  // console.log("index", index)
  const recordIds = await table.getRecordIdList()
  const Index: {
    indexValue: (string | string[])[]
    table: string
    recordId: string
    fieldMaps: fieldMap[]
  }[] = await Promise.all(
    index.map(async (i) => {
      const field = await table.getField(i.field.id)
      lifeCircleHook(importLifeCircles.onReadFieldMap, {
        stage: "readFieldMap",
        data: {
          message: {
            text: "importInfo.getIndexField",
            params: {
              name: i.field.name,
              id: i.field.id,
            },
          },
        },
      })
      const values = await getFieldStringValue(field, recordIds, lifeCircleHook)
      return {
        values,
        fieldMap: i,
      }
    }),
  ).then(async (res) => {
    // console.log("res", res)
    return Promise.all(
      recordIds.map(async (i) => {
        const indexValue: (string | string[])[] = []
        for (const j of res) {
          const value = j.values.find((v) => v.recordId === i)?.value ?? ""
          lifeCircleHook(importLifeCircles.onReadFieldMap, {
            stage: "readFieldMap",
            data: {
              message: {
                text: "importInfo.analyzeIndexFieldValue",
                params: {
                  fieldName: j.fieldMap.field.name,
                  fieldId: j.fieldMap.field.id,
                  recordId: i,
                },
              },
            },
          })
          const normalized = (await cellTranslator.normalization(
            value,
            j.fieldMap,
            {
              separator: ",",
              format: [
                "yyyy/MM/dd",
                "yyyy/MM/dd HH:mm",
                "yyyy-MM-dd HH:mm",
                "yyyy-MM-dd",
                "MM-dd",
                "MM/dd/yyyy",
                "dd/MM/yyyy",
              ],
            },
          )) as string | string[]
          // console.log(value)
          indexValue.push(normalized)
        }
        return {
          indexValue,
          table: table.id,
          recordId: i,
          fieldMaps: index,
        }
      }),
    ).catch((e) => {
      Error({
        title: "getTableIndexFailure",
        message: String(e),
        error: e,
        notice: true,
        noticeParams: {
          text: "message.getTableIndexFailure",
          params: {
            id: table.id,
          },
        },
      })
      throw e
    })
  })
  return Index
}

async function getTableRecords(table: ITable) {
  const tableCells: IRecord[] = []
  let pageToken: string | undefined = undefined
  while (true) {
    const records = await table.getRecords({
      pageSize: 5000,
      pageToken,
    })
    pageToken = records.pageToken
    tableCells.push(...records.records)
    if (!records.hasMore || !pageToken) break
  }
  return tableCells.reduce(
    (pre, cur) => {
      pre[cur.recordId] = cur.fields
      return pre
    },
    {} as Record<string, Record<string, IOpenCellValue>>,
  )
}

/**
 * Import excel
 *
 * @param fieldsMaps
 * @param excelData
 * @param sheetIndex
 * @param index
 * @param mode
 * @param options
 * @param lifeCircleHook
 */
export async function importExcel(
  fieldsMaps: fieldMap[],
  excelData: ExcelDataInfo,
  sheetIndex: number,
  index: string[] | null = null,
  mode: importModes = importModes.append,
  options: ImportOptions = {},
  lifeCircleHook: (
    stage: importLifeCircles,
    params: lifeCircleEventParams,
  ) => void = runLifeCircleEvent,
) {
  lifeCircleHook(importLifeCircles.onStart, {
    stage: "start",
  })
  cellTranslator.refresh()
  lifeCircleHook(importLifeCircles.beforeReadFieldMap, {
    stage: "readFieldMap",
    data: {
      progress: false,
    },
  })
  const {
    parallel = {
      records: 10000,
      fields: 10,
    },
    interval = {
      records: 0,
      fields: 0,
    },
    allowAction = {
      add: true,
      update: true,
      delete: true,
    },
    updateOption = {
      mode: [UpdateMode.SAVE_MOST, UpdateMode.SAVE_LATEST],
    },
  } = options
  Info({
    title: "importInfo.start",
    message: `
    Mode: ${mode}
    SheetIndex: ${sheetIndex}
    index: ${index}
    parallel:
      - fields: ${parallel.fields}
      - records: ${parallel.records}
    interval:
      - fields: ${interval.fields}
      - records: ${interval.records}
    allowAction:
      - add: ${allowAction.add}
      - update: ${allowAction.update}
      - delete: ${allowAction.delete}
    updateOption:
      - mode: ${updateOption.mode}
    `,
  })

  /**
   * Collected tables
   */
  const tables: Record<string, BitableTable> = await collect(
    fieldsMaps,
    index ?? [],
    lifeCircleHook,
  )
  Log({
    title: "tables",
    message: JSON.stringify(tables, null, 2),
  })

  const rootIndex: Array<{
    indexValue: (string | string[])[]
    table: IWidgetTable["id"]
    recordId: string
    modifiedTime: number
  }> = []
  const rootTable = tables[fieldsMaps[0].table].table
  let modifiedTime: Record<string, number> = {}
  if (mode !== importModes.append) {
    lifeCircleHook(importLifeCircles.onReadFieldMap, {
      stage: "readFieldMap",
      data: {
        message: {
          text: "importInfo.getRecordsModifiedTime",
        },
      },
    })
    const rootModifiedTimeFieldId = fieldsMaps.find(
      (i) => i.field.type === FieldType.ModifiedTime,
    )?.field.id
    const rootModifiedTimeField = rootModifiedTimeFieldId
      ? await rootTable.getField<IModifiedTimeField>(rootModifiedTimeFieldId)
      : undefined
    modifiedTime = await getModifiedTime(rootTable, rootModifiedTimeField)
  }
  const indexes: Record<
    string,
    {
      indexValue: (string | string[])[]
      table: string
      recordId: string
      modifiedTime: number
    }[]
  > = {}
  // console.log("tables", tables)
  await Promise.all(
    Object.values(tables).map(async (linkTable) => {
      const index = linkTable.indexId
      const indexValue = await getTableIndex(
        linkTable.table,
        index.map((i) => {
          return linkTable.fieldMaps.find((j) => j.field.id === i)
        }) as fieldMap[],
        lifeCircleHook,
      )
      indexes[linkTable.id] = indexValue.map((i) => {
        return {
          ...i,
          modifiedTime: modifiedTime[i.recordId] ?? 0,
        }
      })
    }),
  )

  if (index && index.length) {
    rootIndex.push(...indexes[rootTable.id])
  }

  lifeCircleHook(importLifeCircles.onReadFieldMapEnd, {
    stage: "readFieldMap",
  })

  const tasks: Task[] = []
  const excelRecords = excelData.sheets[sheetIndex].tableData.records
  lifeCircleHook(importLifeCircles.beforeAnalyzeRecords, {
    stage: "analyzeRecords",
    data: {
      progress: true,
      number: excelRecords.length,
      success: 0,
      error: 0,
    },
  })
  if (mode === importModes.append || !index) {
    const t = await batchAnalyze(
      excelRecords,
      async (record) => {
        const t: Task[] = []
        const addTask: Task<ICell> = {
          table: {
            id: fieldsMaps[0].table,
            name: tables[fieldsMaps[0].table].name,
          },
          action: TaskAction.Add,
          data: [],
          result: undefined,
          status: TaskStatus.Wait,
        }
        const cells = (
          await batchAnalyze(
            fieldsMaps,
            async (fieldMap) => {
              return await addStrategy(
                record,
                fieldMap,
                tables,
                indexes,
                t,
                lifeCircleHook,
                addTask,
              )
            },
            parallel.fields,
            interval.fields,
          )
        ).filter((v) => v) as Array<ICell>
        lifeCircleHook(importLifeCircles.onAnalyzeRecords, {
          stage: "analyzeRecords",
          data: {
            number: excelRecords.length,
            success: 1,
            error: 0,
          },
        })
        if (cells.length) {
          addTask.data.push(...cells)
          t.push(addTask)
        }
        return t
      },
      parallel.records,
      interval.records,
    )
    tasks.push(...t)
  } else {
    const excelIndexField = index.map((i) => {
      const fieldMap = fieldsMaps.find((j) => j.field.id === i)
      if (!fieldMap) {
        return null
      }
      return fieldMap
    })
    Info({
      title: "excelIndexField",
      message: JSON.stringify(excelIndexField, null, 2),
    })
    lifeCircleHook(importLifeCircles.onAnalyzeRecords, {
      stage: "analyzeRecords",
      data: {
        message: {
          text: "importInfo.getTableRecords",
          params: {
            table: rootTable.id,
          },
        },
      },
    })
    const rootTableRecords = await getTableRecords(rootTable)
    const deleteList: Array<string> = []
    const t = await batchAnalyze(
      excelRecords,
      async (record) => {
        const t: Task[] = []
        const excelIndexValue = await Promise.all(
          excelIndexField.map(
            async (i) =>
              await cellTranslator.normalization(
                record[i!.excel_field!] ?? "",
                i!,
              ),
          ),
        )
        const sameRecords = rootIndex.filter((i) => {
          return isArrayStrictEqual(i.indexValue, excelIndexValue)
        })

        lifeCircleHook(importLifeCircles.onAnalyzeRecords, {
          stage: "analyzeRecords",
          data: {
            message: {
              text: "importInfo.findSameRecord",
              params: {
                indexValue: excelIndexValue.join("|"),
                number: String(sameRecords.length),
              },
            },
          },
        })
        const tableRecords = []
        let updateRecord: {
          table: string
          id: string
          tableValues: Record<string, IOpenCellValue>
        } | null = null
        const r = Math.random()
        console.time("getSameRecord " + excelIndexValue.join("|") + r)
        if (sameRecords.length >= 1) {
          for (const i of sameRecords) {
            lifeCircleHook(importLifeCircles.onAnalyzeRecords, {
              stage: "analyzeRecords",
              data: {
                message: {
                  text: "importInfo.getSameRecord",
                  params: {
                    indexValue: excelIndexValue.join("|"),
                    recordId: i.recordId,
                  },
                },
              },
            })
            const cellValues = rootTableRecords[i.recordId]
            const res = {
              ...i,
              tableValues: Object.keys(cellValues).reduce(
                (pre, cur) => {
                  if (cellValues[cur] !== null) pre[cur] = cellValues[cur]
                  return pre
                },
                {} as Record<string, IOpenCellValue>,
              ),
            }
            tableRecords.push(res)
          }
          if (tableRecords.length > 1) {
            const { mode } = updateOption
            if (
              [UpdateMode.SAVE_LATEST, UpdateMode.SAVE_OLDEST].includes(mode[0])
            ) {
              const rulers = unique(tableRecords.map((i) => i.modifiedTime))
              const targetValue =
                mode[0] === UpdateMode.SAVE_LATEST
                  ? Math.max(...rulers)
                  : Math.min(...rulers)
              const targets = tableRecords.filter(
                (i) => i.modifiedTime === targetValue,
              )
              if (targets.length === 1) {
                const target = targets[0]
                updateRecord = {
                  id: target.recordId,
                  table: target.table,
                  tableValues: target.tableValues,
                }
              } else {
                targets.sort((a, b) => {
                  return (
                    Object.values(a.tableValues).length -
                    Object.values(b.tableValues).length
                  )
                })
                const target =
                  mode[1] === UpdateMode.SAVE_MOST
                    ? targets[targets.length - 1]
                    : targets[0]
                updateRecord = {
                  id: target.recordId,
                  table: target.table,
                  tableValues: target.tableValues,
                }
              }
            } else {
              const rulers = unique(
                tableRecords.map((i) => Object.values(i.tableValues).length),
              )
              const targetValue =
                mode[0] === UpdateMode.SAVE_MOST
                  ? Math.max(...rulers)
                  : Math.min(...rulers)

              const targets = tableRecords.filter(
                (i) => Object.values(i.tableValues).length === targetValue,
              )
              if (targets.length === 1) {
                const target = targets[0]
                updateRecord = {
                  id: target.recordId,
                  table: target.table,
                  tableValues: target.tableValues,
                }
              } else {
                targets.sort((a, b) => {
                  return a.modifiedTime - b.modifiedTime
                })
                const target =
                  mode[1] === UpdateMode.SAVE_LATEST
                    ? targets[targets.length - 1]
                    : targets[0]
                updateRecord = {
                  id: target.recordId,
                  table: target.table,
                  tableValues: target.tableValues,
                }
              }
            }
            if (isNotEmpty(updateRecord)) {
              const deleteRecordIds = tableRecords
                .map((i) => i.recordId)
                .filter((i) => i !== updateRecord!.id)
                .filter((i) => !deleteList.includes(i))
              deleteList.push(...deleteRecordIds)
              t.push(
                ...deleteRecordIds.map((id) => ({
                  table: {
                    id: rootTable.id,
                    name: tables[rootTable.id].name,
                  },
                  action: TaskAction.Delete,
                  data: [id],
                  result: undefined,
                  status: TaskStatus.Wait,
                })),
              )
            }
          } else {
            const target = tableRecords[0]
            updateRecord = {
              id: target.recordId,
              table: target.table,
              tableValues: target.tableValues,
            }
          }
        }
        console.timeEnd("getSameRecord " + excelIndexValue.join("|") + r)
        const taskItem: Task = {
          table: {
            id: rootTable.id,
            name: tables[rootTable.id].name,
          },
          action: TaskAction.Add,
          data: [],
          result: undefined,
          status: TaskStatus.Wait,
        }
        const cells: Array<ICell | null> = []
        for (const fieldMap of fieldsMaps) {
          if (!fieldMap.excel_field || !fieldMap.writable) continue
          const excelValue = record[fieldMap.excel_field] ?? ""
          const field = tables[fieldMap.table].fields[fieldMap.field.id]
          lifeCircleHook(importLifeCircles.onAnalyzeRecords, {
            stage: "analyzeRecords",
            data: {
              message: {
                text: "importInfo.compareRecordField",
                params: {
                  fieldName: fieldMap.field.name,
                  fieldId: field.id,
                  indexValue: excelIndexValue.join("|"),
                },
              },
            },
          })
          if (allowAction.add && !sameRecords.length) {
            const r = Math.random()
            console.time("addStrategy " + r)
            const cell = await addStrategy(
              record,
              fieldMap,
              tables,
              indexes,
              t,
              lifeCircleHook,
              taskItem,
            )
            console.timeEnd("addStrategy " + r)
            cells.push(cell)
          }
          if (!allowAction.update || !updateRecord) continue
          const needLink = linkFieldType.includes(fieldMap.field.type)
          const { linkConfig } = fieldMap
          const { primaryKey } = linkConfig ?? {}
          const tableValue = updateRecord.tableValues[fieldMap.field.id] ?? null
          if (
            needLink &&
            fieldMap.hasChildren &&
            fieldMap.children?.length &&
            primaryKey
          ) {
            if (mode === importModes.merge_direct || tableValue === null) {
              const cell = await linkStrategy(
                excelValue,
                fieldMap,
                field,
                tables,
                indexes,
                tasks,
                lifeCircleHook,
                taskItem,
              )
              cells.push(cell)
            }
          }
          if (!needLink) {
            const cell = await compareCellValue(
              excelValue,
              tableValue,
              mode,
              field,
              fieldMap,
            )
            if (cell) cells.push(cell)
          }
        }
        lifeCircleHook(importLifeCircles.onAnalyzeRecords, {
          stage: "analyzeRecords",
          data: {
            number: excelRecords.length,
            success: 1,
            error: 0,
          },
        })
        if (!cells.length) return t
        if (tableRecords.length) {
          taskItem.action = TaskAction.Update
          const fields: IRecord["fields"] = {}
          for (const i of cells.filter((i) => i !== null) as ICell[]) {
            const [fieldId, cellVal] = await Promise.all([
              i.getFieldId(),
              i.getValue(),
            ])
            fields[fieldId] = cellVal
          }
          const update: IRecord = {
            recordId: updateRecord!.id,
            fields,
          }
          taskItem.data.push(update)
          t.push(taskItem)
          return t
        }
        taskItem.data.push(...(cells.filter((i) => i !== null) as ICell[]))
        t.push(taskItem)
        return t
      },
      parallel.records,
      interval.records,
    )
    tasks.push(...t)
  }
  lifeCircleHook(importLifeCircles.onAnalyzeRecordsEnd, {
    stage: "analyzeRecords",
  })

  const groupedTasks = groupBy(tasks, "action")
  const deleteTasks = groupedTasks[TaskAction.Delete]
  if (deleteTasks && allowAction.delete && deleteTasks.length) {
    lifeCircleHook(importLifeCircles.beforeDeleteRecords, {
      stage: "deleteRecords",
      data: {
        progress: true,
        number: deleteTasks.length,
        success: [],
        error: [],
      },
    })
    const groupedDeleteTasks = groupBy(deleteTasks, "table.id")
    const toDeleteTableIds = Object.keys(groupedDeleteTasks)
    for (const i of toDeleteTableIds) {
      const table = tables[i]
      const tasks = groupedDeleteTasks[i]
      await batchDeleteRecords(tasks, table.table, 5000, 0, lifeCircleHook)
    }
    lifeCircleHook(importLifeCircles.onDeleteRecordsEnd, {
      stage: "deleteRecords",
    })
  }

  const addTasks = groupedTasks[TaskAction.Add]
  if (addTasks && allowAction.add && addTasks && addTasks.length) {
    lifeCircleHook(importLifeCircles.beforeAddRecords, {
      stage: "addRecords",
      data: {
        progress: true,
        number: addTasks.length,
        success: [],
        error: [],
      },
    })
    const groupedAddTasks = groupBy(addTasks, "table.id")
    // console.log("groupedAddTasks", groupedAddTasks)
    const toAddTableIds = Object.keys(groupedAddTasks)
    for (const i of toAddTableIds) {
      const table = tables[i]
      const tasks = groupedAddTasks[i]
      await batchAddRecords(tasks, table.table, 5000, 0, lifeCircleHook)
    }
    lifeCircleHook(importLifeCircles.onAddRecordsEnd, {
      stage: "addRecords",
    })
    // console.log("addEnd", groupedAddTasks, tasks)
  }

  /**
   * 等待官方找到 bug
   */
  // const linkTasks = groupedTasks[TaskAction.Link]
  // if (linkTasks && linkTasks && groupedTasks[TaskAction.Link].length) {
  //   const poly = polyLinkTasks(linkTasks)
  //   console.log("poly", poly)
  // }

  const updateTasks = groupedTasks[TaskAction.Update]
  // console.log("updateTasks", updateTasks)
  if (updateTasks && allowAction.update && updateTasks.length) {
    lifeCircleHook(importLifeCircles.beforeUpdateRecords, {
      stage: "updateRecords",
      data: {
        progress: true,
        number: updateTasks.length,
        success: [],
        error: [],
      },
    })
    const groupedUpdateTasks = groupBy(updateTasks, "table.id")
    // console.log("groupedUpdateTasks", groupedUpdateTasks)
    const toUpdateTableIds = Object.keys(groupedUpdateTasks)
    for (const i of toUpdateTableIds) {
      const table = tables[i]
      const tasks = groupedUpdateTasks[i]
      await batchUpdateRecords(tasks, table.table, 5000, 0, lifeCircleHook)
    }
    lifeCircleHook(importLifeCircles.onUpdateRecordsEnd, {
      stage: "updateRecords",
    })
    // console.log("updateEnd", groupedUpdateTasks, tasks)
  }

  lifeCircleHook(importLifeCircles.onEnd, {
    stage: "end",
  })
}

// function polyLinkTasks(tasks: Array<Task>) {
//   const res: Array<Task> = []
//   const groupedTasks = groupBy(tasks, "table.id")
//   for (const i of Object.keys(groupedTasks)) {
//     const groupAction = groupBy(groupedTasks[i], "action")
//     for (const k of Object.values(groupAction)) {
//       const newTask: Task = {
//         table: {
//           id: i,
//           name: k[0].table.name,
//         },
//         action: k[0].action,
//         data: k.map((j) => j.data).flat(),
//         result: undefined,
//         status: TaskStatus.Wait,
//         link: k
//           .map((j) => j.link)
//           .flat()
//           .filter((j) => j !== undefined) as Array<Task>,
//       }
//       res.push(newTask)
//     }
//   }
//   return res
// }
