import {
  FieldType,
  type IField,
  type ICell,
  type IOpenCellValue,
} from "@lark-base-open/js-sdk"
import type { fieldMap } from "@/types/types"
import { Error, FieldNameList } from "@/utils"

interface Progress<C extends Record<string, any> = Record<string, any>> {
  total: number
  loaded: number
  pending?: Array<Progress & C>
}

export interface AsyncParams<
  T extends any = any,
  C extends Record<string, any> = Record<string, any>,
> {
  data: Array<T>
  onProgress?: (progress: Progress<C>) => void
  onError?: (error: any) => void
}

interface TranslatorOptions<
  T extends IField = any,
  K extends ICell = any,
  N = any,
> {
  fieldType: FieldType
  translate: (
    value: string,
    field: T,
    config?: fieldMap["config"],
  ) => Promise<K | null>
  refresh?: () => void
  normalization?: (value: string, config?: fieldMap["config"]) => Promise<N>
  name: string
  cache?: Record<string, any> | Array<any>
  async?: boolean
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
  return option as Translator
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

  constructor(options: CellTranslatorOptions) {
    const { translators } = options
    translators.forEach((translator) => {
      this.registryTranslator(translator)
    })
  }

  private registryTranslator(translator: TranslatorOptions) {
    const {
      refresh,
      translate,
      normalization,
      cache,
      async = false,
      asyncMethod,
    } = translator
    if (refresh && typeof refresh === "function") {
      this.refreshList.push(refresh)
    }
    if (normalization && typeof normalization === "function") {
      this.normalizations[translator.fieldType] = normalization
    }
    if (cache) {
      this.caches[translator.fieldType] = cache
    }
    if (async) {
      this.asyncTypes.push(translator.fieldType)
      if (asyncMethod && typeof asyncMethod === "function")
        this.asyncMethods[translator.fieldType] = asyncMethod
    }
    this.supportTypes.push(translator.fieldType)
    this.translators[translator.fieldType] = translate
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
    return asyncMethod(options)
  }
}
