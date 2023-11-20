import {
  FieldType,
  type IField,
  type ICell,
  type IOpenCellValue,
} from "@lark-base-open/js-sdk"
import type { fieldMap } from "@/types/types"
import { Error, FieldNameList } from "@/utils"

interface Progress {
  total: number
  loaded: number
  message?: string
}

export interface AsyncParams<T extends any = any> {
  data: Array<T>
  onProgress?: (progress: Progress) => void
  onError?: (error: any) => void
}

export enum FieldRole {
  AUTO = "auto",
  HAS_OPTIONS = "hasOptions",
  ASYNC = "async",
  NORMAL = "normal",
}

interface TranslatorOptions<
  T extends IField = any,
  K extends ICell = any,
  N = any,
> {
  fieldType: FieldType
  translate?: (
    value: string,
    field: T,
    config?: fieldMap["config"],
  ) => Promise<K | null>
  refresh?: () => void
  normalization: (value: string, config?: fieldMap["config"]) => Promise<N>
  name: string
  cache?: Record<string, any> | Array<any>
  roles?: Array<FieldRole>
  asyncMethod?: (
    options: AsyncParams,
    config?: fieldMap["config"],
  ) => Promise<N>
}

interface Translator extends TranslatorOptions {
  onRegistry?: (translator: TranslatorOptions) => void
  onDestroy?: (translator: TranslatorOptions) => void
}

export function defineTranslator<T extends IField, K extends ICell>(
  option: TranslatorOptions<T, K>,
) {
  const { roles } = option
  option.roles = [...(roles ?? []), FieldRole.NORMAL]
  return {
    ...option,
  }
}

interface CellTranslatorOptions {
  translators: Array<TranslatorOptions>
}

export class CellTranslator {
  private translators: Record<number, Translator["translate"]> = {}
  private refreshList: Array<Function> = []
  private normalizations: Record<number, Translator["normalization"]> = {}
  private asyncMethods: Record<number, Translator["asyncMethod"]> = {}
  public supportTypes: Array<FieldType> = []
  public caches: Record<string, any> = {}
  public asyncTypes: Array<FieldType> = []
  public autoTypes: Array<FieldType> = []
  public hasOptionsTypes: Array<FieldType> = []
  private roleMap: Record<FieldRole, Array<FieldType>> = {
    [FieldRole.AUTO]: this.autoTypes,
    [FieldRole.HAS_OPTIONS]: this.hasOptionsTypes,
    [FieldRole.ASYNC]: this.asyncTypes,
    [FieldRole.NORMAL]: this.supportTypes,
  }

  constructor(options: CellTranslatorOptions) {
    const { translators } = options
    translators.forEach((translator) => {
      this.registryTranslator(translator)
    })
  }

  private registryTranslator(translator: TranslatorOptions) {
    const { refresh, translate, normalization, cache, asyncMethod, roles } =
      translator
    if (refresh && typeof refresh === "function") {
      this.refreshList.push(refresh)
    }
    if (cache) {
      this.caches[translator.fieldType] = cache
    }
    if (asyncMethod && typeof asyncMethod === "function") {
      this.asyncMethods[translator.fieldType] = asyncMethod
    }
    if (roles) {
      roles.forEach((role) => {
        this.roleMap[role].push(translator.fieldType)
      })
    }
    if (translate && typeof translate === "function") {
      this.translators[translator.fieldType] = translate
    }
    this.normalizations[translator.fieldType] = normalization
  }

  public async getCell(
    field: IField,
    fieldMap: fieldMap,
    value: string | IOpenCellValue,
  ) {
    try {
      if (typeof value !== "string") return field.createCell(value)
      const type = fieldMap.field.type
      const translator = this.translators[type]
      if (!translator) {
        return null
      }
      return await translator(value, field, fieldMap.config)
    } catch (error) {
      Error({
        title: `CellTranslator.getCell: Translate ${
          fieldMap.field.name
        }[FieldType: ${FieldNameList[fieldMap.field.type]}] error`,
        message: String(error),
        error,
      })
      return null
    }
  }

  public refresh() {
    this.refreshList.forEach((refresh) => {
      refresh()
    })
  }

  public async normalization(
    value: string,
    fieldMap: fieldMap,
    config?: fieldMap["config"],
  ) {
    const normalization = this.normalizations[fieldMap.field.type]
    if (!normalization) {
      return value
    }
    return normalization(value, config ?? fieldMap.config)
  }

  public async asyncMethod(
    options: AsyncParams,
    fieldMap: fieldMap,
    config?: fieldMap["config"],
  ) {
    const asyncMethod = this.asyncMethods[fieldMap.field.type]
    if (!asyncMethod) {
      return
    }
    return asyncMethod(options, config ?? fieldMap.config)
  }
}
