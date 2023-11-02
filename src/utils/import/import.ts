import {
  FieldType,
  IWidgetTable,
  IRecord,
  bitable,
  ICell,
  IField,
  ITable,
  IModifiedTimeField,
  IOpenCellValue,
} from "@lark-base-open/js-sdk"

import {
  fieldMap,
  ExcelDataInfo,
  BitableTable,
  LinkField,
  Task,
  importModes,
  TaskStatus,
} from "@/types/types"
import { TaskAction } from "@/utils/import/tasks"
import { cellTranslator } from "../cellValue"
import {
  delay,
  isArrayStrictEqual,
  groupBy,
  ArrayHasNoEmpty,
  isNotEmpty,
  unique,
} from "./helper"
import { importLifeCircles, runLifeCircleEvent } from "./lifeCircle"
import { i18n } from "@/i18n"
import { clearTree } from "./tree"
import { autoFields, Error } from "@/utils"

export const optionsFieldType = [FieldType.SingleSelect, FieldType.MultiSelect]

export const linkFieldType = [FieldType.SingleLink, FieldType.DuplexLink]

/**
 * Batch processing
 *
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
  action: (records: Array<T>) => Promise<void>,
) {
  if (records.length === 0) return
  if (records.length <= maxNumber) {
    await action(records)
  } else {
    const count = Math.ceil(records.length / maxNumber)
    for (let i = 0; i < count; i++) {
      await action(records.slice(i * maxNumber, (i + 1) * maxNumber))
      if (interval > 0) {
        await delay(interval)
      }
    }
  }
}

function addRecords(table: ITable, lifeCircleHook: any) {
  return async (tasks: Task<ICell>[]) => {
    try {
      console.time("addRecords" + table.id)
      console.log(
        table.id,
        tasks.map((task) => task.data),
      )
      const addRes = await table.addRecords(tasks.map((task) => task.data))
      console.log("addRes", addRes)
      console.timeEnd("addRecords" + table.id)
      console.time("solveResults")
      tasks.forEach((task, index) => {
        if (addRes[index]) {
          task.result = addRes[index]
          task.status = TaskStatus.Success
        }
      })
      console.timeEnd("solveResults")
    } catch (e) {
      Error({
        title: "addRecordsFailure",
        message: String(e),
        error: e,
      })
      tasks.forEach((task) => {
        task.status = TaskStatus.Error
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
function updateRecords(table: ITable, lifeCircleHook: any) {
  return async (tasks: Task<IRecord>[]) => {
    try {
      console.time("updateRecords" + table.id)
      const updateRes = await table.setRecords(
        tasks.map((task) => task.data).flat(),
      )
      console.timeEnd("updateRecords" + table.id)
      tasks.forEach((task, index) => {
        if (updateRes[index]) {
          task.result = updateRes[index]
          task.status = TaskStatus.Success
        }
      })
    } catch (e) {
      Error({
        title: "updateRecordsFailure",
        message: String(e),
        error: e,
      })
      // await lifeCircleHook(importLifeCircles.onUpdateRecords, {
      //   stage: importLifeCircles.onUpdateRecords,
      //   data: {
      //     res: e,
      //   },
      // })
    }
  }
}

/**
 * Delete records
 * @param table
 * @param lifeCircleHook
 * @returns
 */
function deleteRecords(table: ITable, lifeCircleHook: any) {
  return async (tasks: Task<string>[]) => {
    try {
      console.time("deleteRecords" + table.id)
      const deleteRes = await table.deleteRecords(
        tasks.map((task) => task.data).flat(),
      )
      console.timeEnd("deleteRecords" + table.id)
      if (deleteRes) {
        tasks.forEach((task) => {
          task.result = deleteRes
          task.status = TaskStatus.Success
        })
      }
    } catch (e) {
      Error({
        title: "deleteRecordsFailure",
        message: String(e),
        error: e,
      })
      // console.log(e)
      // await lifeCircleHook(importLifeCircles.onDeleteRecords, {
      //   stage: importLifeCircles.onDeleteRecords,
      //   data: {
      //     res: e,
      //   },
      // })
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
  lifeCircleHook: any,
) {
  await batch(maxNumber, interval, tasks, addRecords(table, lifeCircleHook))
}

async function batchUpdateRecords(
  records: Task<IRecord>[],
  table: ITable,
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
  tasks: Task<string>[],
  table: ITable,
  maxNumber: number = 500,
  interval: number = 500,
  lifeCircleHook: any,
) {
  return await batch(
    maxNumber,
    interval,
    tasks,
    deleteRecords(table, lifeCircleHook),
  )
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
  index?: Array<string>,
) {
  const table = await bitable.base.getTable(id)
  const [name, fields, fieldMetaList] = await Promise.all([
    table.getName(),
    table.getFieldList(),
    table.getFieldMetaList(),
  ])
  const primaryField = fieldMetaList.filter((v) => v.isPrimary)[0].id
  const res = {
    id,
    table,
    name,
    primaryField,
    indexId: index ?? [primaryField],
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
}

export enum UpdateMode {
  SAVE_MOST = 0,
  SAVE_LEAST = 1,
  SAVE_OLDEST = 2,
  SAVE_LATEST = 3,
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
  allowAction?: {
    add: boolean
    update: boolean
    delete: boolean
  }
  updateOption?: {
    mode: UpdateMode[]
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
  if (!disExistValues.length || !allowAdd) {
    const cell = await cellTranslator.getCell(
      field,
      fieldMap,
      existRecord.join(fieldMap.config.separator ?? ","),
    )
    if (cell) return cell
    return null
  }
  const linkField = targetTable.fields[primaryKey]
  const linkMap = fieldMap.children.find((i) => {
    return i.field.id === primaryKey
  })
  // console.log("linkMap", linkMap)
  if (
    linkMap &&
    disExistValues.length &&
    !autoFields.includes(linkMap.field.type) &&
    allowAdd
  ) {
    const link: Array<Task> = []
    for (const v of disExistValues) {
      const cell = await cellTranslator.getCell(linkField, linkMap, v)
      if (cell) {
        link.push({
          table: {
            name: targetTable.name,
            id: targetTable.id,
          },
          action: TaskAction.Add,
          data: [cell],
          result: undefined,
          status: TaskStatus.Wait,
        })
      }
    }
    tasks.push(...link)
    tasks.push({
      table: {
        name: targetTable.name,
        id: targetTable.id,
      },
      action: TaskAction.Link,
      data: existRecord,
      result: undefined,
      link,
      status: TaskStatus.Wait,
      target: linkTarget,
    })
  }
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
}

/**
 * Get the string value of the field
 *
 * @param field
 * @param recordIds
 * @returns
 */
async function getFieldStringValue(field: IField, recordIds: string[]) {
  const cellStrings = await Promise.all(
    recordIds.map(async (recordId) => {
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
async function collect(fieldMaps: fieldMap[]) {
  let tables: { [key: IWidgetTable["id"]]: BitableTable } = {}
  const id = fieldMaps[0].table
  tables[id] = await getBitableTableById(id, fieldMaps, fieldMaps[0].root)

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
  lifeCircleHook: Function,
) {
  console.log("getTableIndex", index)
  const recordIds = await table.getRecordIdList()
  const Index: {
    indexValue: (string | string[])[]
    table: string
    recordId: string
    fieldMaps: fieldMap[]
  }[] = await Promise.all(
    index.map(async (i) => {
      console.log("i", i)
      const field = await table.getField(i.field.id)
      const values = await getFieldStringValue(field, recordIds)
      return {
        values,
        fieldMap: i,
      }
    }),
  ).then((res) => {
    return Promise.all(
      recordIds.map(async (i) => {
        const indexValue: (string | string[])[] = []
        for (const j of res) {
          const value = j.values.find((v) => v.recordId === i)?.value
          if (value) {
            const normalized = (await cellTranslator.normalization(
              value,
              j.fieldMap,
            )) as string | string[]
            indexValue.push(normalized)
          }
        }
        return {
          indexValue,
          table: table.id,
          recordId: i,
          fieldMaps: index,
        }
      }),
    )
  })
  return Index
}

/**
 * Import excel data into bitable
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
  cellTranslator.refresh()

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
  /**
   * Clear the tree structure of fieldsMaps
   */
  // clearTree(fieldsMaps)

  /**
   * Collected tables
   */
  const tables: Record<IWidgetTable["id"], BitableTable> =
    await collect(fieldsMaps)
  console.log("tables", tables)

  const rootIndex: Array<{
    indexValue: (string | string[])[]
    table: IWidgetTable["id"]
    recordId: string
    modifiedTime: number
  }> = []
  const rootTable = tables[fieldsMaps[0].table].table
  const rootModifiedTimeFieldId = fieldsMaps.find(
    (i) => i.field.type === FieldType.ModifiedTime,
  )?.field.id
  const rootModifiedTimeField = rootModifiedTimeFieldId
    ? await rootTable.getField<IModifiedTimeField>(rootModifiedTimeFieldId)
    : undefined
  const modifiedTime = await getModifiedTime(rootTable, rootModifiedTimeField)
  const indexes: Record<
    string,
    {
      indexValue: (string | string[])[]
      table: string
      recordId: string
      modifiedTime: number
    }[]
  > = {}
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

  const tasks: Task[] = []

  console.log("fieldMaps", fieldsMaps)
  const excelRecords = excelData.sheets[sheetIndex].tableData.records
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
              return await addStrategy(record, fieldMap, tables, indexes, t)
            },
            parallel.fields,
            interval.fields,
          )
        ).filter((v) => v) as Array<ICell>
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
    console.log(
      "excelIndexField",
      excelIndexField,
      excelIndexField.every((i) => isNotEmpty(i?.excel_field)),
    )
    if (!ArrayHasNoEmpty(excelIndexField)) {
      Error({
        title: "indexFieldError",
        message: i18n.global.t("message.indexFieldError"),
      })
      return
    }
    if (!excelIndexField.every((i) => isNotEmpty(i.excel_field))) {
      Error({
        title: "indexFieldError",
        message: i18n.global.t("message.indexFieldError"),
      })
      return
    }
    const deleteList: Array<string> = []
    const t = await batchAnalyze(
      excelRecords,
      async (record) => {
        const t: Task[] = []
        const excelIndexValue = excelIndexField.map(
          (i) => record[i.excel_field!],
        )
        const sameRecords = rootIndex.filter((i) => {
          return isArrayStrictEqual(i.indexValue, excelIndexValue)
        })
        const tableRecords = []
        let updateRecord: {
          table: string
          id: string
          tableValues: Record<string, IOpenCellValue>
        } | null = null
        if (sameRecords.length >= 1) {
          tableRecords.push(
            ...(await Promise.all(
              sameRecords.map(async (i) => {
                const table = tables[i.table].table
                const cellValues = (await table.getRecordById(i.recordId))
                  .fields
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
                return res
              }),
            )),
          )
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
                .filter((i) => i.recordId !== updateRecord!.id)
                .map((i) => i.recordId)
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
        const cells = (
          await batchAnalyze(
            fieldsMaps,
            async (fieldMap) => {
              if (!fieldMap.excel_field || !fieldMap.writable) return null
              const excelValue = record[fieldMap.excel_field] ?? null
              if (!excelValue) return null
              const field = tables[fieldMap.table].fields[fieldMap.field.id]
              if (!fieldMap.excel_field || !fieldMap.writable) return null
              if (allowAction.add && !tableRecords.length) {
                return await addStrategy(
                  record,
                  fieldMap,
                  tables,
                  indexes,
                  t,
                  taskItem,
                )
              }
              if (!allowAction.update || !updateRecord) return null
              const needLink = linkFieldType.includes(fieldMap.field.type)
              const { linkConfig } = fieldMap
              const { primaryKey } = linkConfig ?? {}
              const tableValue =
                updateRecord.tableValues[fieldMap.field.id] ?? null
              if (
                needLink &&
                fieldMap.hasChildren &&
                fieldMap.children?.length &&
                primaryKey
              ) {
                if (mode === importModes.merge_direct || tableValue === null) {
                  return await linkStrategy(
                    excelValue,
                    fieldMap,
                    field,
                    tables,
                    indexes,
                    tasks,
                    taskItem,
                  )
                }
                if (mode === importModes.compare_merge && tableValue !== null) {
                  return null
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
                if (cell) return cell
              }
              return null
            },
            parallel.fields,
            interval.fields,
          )
        ).filter((v) => v) as Array<ICell>
        if (!cells.length) return t
        if (tableRecords.length) {
          taskItem.action = TaskAction.Update
          const fields: IRecord["fields"] = {}
          for (const i of cells) {
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
        taskItem.data.push(...cells)
        t.push(taskItem)
        return t
      },
      parallel.records,
      interval.records,
    )
    tasks.push(...t)
  }

  const groupedTasks = groupBy(tasks, "action")
  console.log("groupedTasks", groupedTasks)
  console.log("allowAction", allowAction.add)

  const deleteTasks = groupedTasks[TaskAction.Delete]
  console.log("deleteTasks", deleteTasks)
  if (deleteTasks && allowAction.delete && deleteTasks.length) {
    const groupedDeleteTasks = groupBy(deleteTasks, "table.id")
    console.log("groupedDeleteTasks", groupedDeleteTasks)
    const toDeleteTableIds = Object.keys(groupedDeleteTasks)
    for (const i of toDeleteTableIds) {
      const table = tables[i]
      const tasks = groupedDeleteTasks[i]
      await batchDeleteRecords(tasks, table.table, 5000, 0, lifeCircleHook)
    }
    console.log("deleteEnd", groupedDeleteTasks, tasks)
  }
  const addTasks = groupedTasks[TaskAction.Add]
  if (addTasks && allowAction.add && addTasks && addTasks.length) {
    const groupedAddTasks = groupBy(addTasks, "table.id")
    console.log("groupedAddTasks", groupedAddTasks)
    const toAddTableIds = Object.keys(groupedAddTasks)
    for (const i of toAddTableIds) {
      const table = tables[i]
      const tasks = groupedAddTasks[i]
      await batchAddRecords(tasks, table.table, 5000, 0, lifeCircleHook)
    }
    console.log("addEnd", groupedAddTasks, tasks)
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
  console.log("updateTasks", updateTasks)
  if (updateTasks && allowAction.update && updateTasks.length) {
    const groupedUpdateTasks = groupBy(updateTasks, "table.id")
    console.log("groupedUpdateTasks", groupedUpdateTasks)
    const toUpdateTableIds = Object.keys(groupedUpdateTasks)
    for (const i of toUpdateTableIds) {
      const table = tables[i]
      const tasks = groupedUpdateTasks[i]
      await batchUpdateRecords(tasks, table.table, 5000, 0, lifeCircleHook)
    }
    console.log("updateEnd", groupedUpdateTasks, tasks)
  }
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
