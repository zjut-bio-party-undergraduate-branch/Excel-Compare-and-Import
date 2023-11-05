import {
  FieldType,
  type IField,
  type ICell,
  type IOpenCellValue,
} from "@lark-base-open/js-sdk"
import type { fieldMap } from "@/types/types"
import { Error, FieldNameList } from "@/utils"

interface TranslatorOptions<T extends IField = any, K extends ICell = any> {
  fieldType: FieldType
  translate: (
    value: string,
    field: T,
    config?: fieldMap["config"],
  ) => Promise<K>
  refresh?: (type: fieldMap) => void
  normalization?: (value: string, config?: fieldMap["config"]) => Promise<any>
  name: string
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
  private refreshList: Function[] = []
  private normalizations: Record<number, Translator["normalization"]> = {}
  public supportTypes: FieldType[] = []

  constructor(options: CellTranslatorOptions) {
    const { translators } = options
    translators.forEach((translator) => {
      this.registryTranslator(translator)
    })
  }

  private registryTranslator(translator: TranslatorOptions) {
    const { refresh, translate, normalization } = translator
    if (refresh) {
      this.refreshList.push(refresh)
    }
    if (normalization) {
      this.normalizations[translator.fieldType] = normalization
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
}
