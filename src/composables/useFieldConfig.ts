import { defaultBoolValue } from "@/utils/cellValue/checkBox"
import type { fieldMap } from "@/types/types"
import {
  type MaybeRefOrGetter,
  toValue,
  watch,
  h,
  type VNode,
  ref,
  shallowRef,
} from "vue"
import { FieldType } from "@lark-base-open/js-sdk"
import {
  ElInput,
  ElFormItem,
  ElTooltip,
  ElText,
  ElLink,
  ElIcon,
  ElSelectV2,
} from "element-plus"
import { InfoFilled } from "@element-plus/icons-vue"
import { i18n } from "@/i18n"
import dayjs from "dayjs"

const dateFormatList = [
  "YYYY/MM/DD",
  "YYYY/MM/DD HH:mm:ss",
  "YYYY/M/D HH:mm",
  "YYYY-MM-DD",
  "YYYY-MM-DD HH:mm:ss",
  "YYYY-MM-DD HH:mm",
  "YYYY-MM-DD HH",
  "YYYY-MM",
  "YYYY",
  "MM-DD",
  "MM-DD HH:mm:ss",
  "MM-DD HH:mm",
  "MM-DD HH",
]

export function useFieldConfig(
  config: MaybeRefOrGetter<fieldMap["config"] | undefined>,
  type: MaybeRefOrGetter<FieldType | undefined>,
  except: MaybeRefOrGetter<string[]> = [],
) {
  const configList = ref<string[]>([])
  const configForm = shallowRef<() => VNode | VNode[]>()
  const configResult = ref<fieldMap["config"]>({})
  const formatExample = ref<any>("")
  watch(
    () => toValue(config),
    (newVal) => {
      if (!newVal) return
      configList.value = Object.keys(newVal).filter(
        (v) => !toValue(except).includes(v),
      )
      configResult.value = JSON.parse(JSON.stringify(newVal))
      if (newVal.format) {
        formatExample.value = formatExamples[
          toValue(type) as keyof typeof formatExamples
        ](newVal.format)
      }
      render()
    },
    { deep: true },
  )

  const render = () => {
    configForm.value = () =>
      configList.value.map((v) => configFormItem[v]?.()).flat()
  }

  const configFormItem: { [key: string]: any } = {
    format: () => [
      h(
        ElFormItem,
        {},
        {
          default: () => [
            h(ElSelectV2, {
              modelValue: configResult.value.format,
              ["onUpdate:modelValue"]: (v: string) => {
                configResult.value.format = v
                formatExample.value =
                  formatExamples[toValue(type) as keyof typeof formatExamples](
                    v,
                  )
              },
              filterable: true,
              allowCreate: true,
              placeholder: i18n.global.t(
                "input.placeholder.chooseOrCreateFormat",
              ),
              defaultFirstOption: true,
              options: formatList[toValue(type) as keyof typeof formatList].map(
                (v) => ({ label: v, value: v }),
              ),
            }),
          ],
          label: () =>
            h("label", [
              i18n.global.t("form.label.inputDateFormat"),
              h(
                ElTooltip,
                { effect: "dark" },
                {
                  content: () =>
                    h(
                      ElText,
                      { type: "info" },
                      {
                        default: () => [
                          i18n.global.t("toolTip.pleaseReferTo"),
                          h(
                            ElLink,
                            {
                              type: "primary",
                              href: "https://dayjs.gitee.io/docs/en/parse/string-format",
                              target: "_blank",
                            },
                            {
                              default: () => "dayjs",
                            },
                          ),
                        ],
                      },
                    ),
                  default: () => h(ElIcon, {}, () => h(InfoFilled)),
                },
              ),
            ]),
        },
      ),
      h(
        ElFormItem,
        {
          label: i18n.global.t("form.label.example"),
        },
        {
          default: () =>
            h(ElInput, {
              modelValue: formatExample.value,
              readonly: true,
              ["onUpdate:modelValue"]: () => {
                // do nothing
              },
            }),
        },
      ),
    ],
    separator: () => [
      h(
        ElFormItem,
        {
          label: i18n.global.t("form.label.separator"),
        },
        {
          default: () =>
            h(ElInput, {
              modelValue: configResult.value.separator,
              ["onUpdate:modelValue"]: (v: string) => {
                configResult.value.separator = v
              },
            }),
        },
      ),
    ],
    boolValue: () => [
      h(
        ElFormItem,
        {
          label: i18n.global.t("form.label.trueValue"),
        },
        {
          default: () =>
            h(ElSelectV2, {
              multiple: true,
              modelValue: configResult.value.boolValue?.true,
              ["onUpdate:modelValue"]: (v: string[]) => {
                //@ts-ignore
                configResult.value.boolValue.true = v
              },
              filterable: true,
              allowCreate: true,
              defaultFirstOption: true,
              options: defaultBoolValue.true.map((v) => ({
                label: v,
                value: v,
              })),
              style: "width: 100%",
            }),
        },
      ),
      h(
        ElFormItem,
        {
          label: i18n.global.t("form.label.falseValue"),
        },
        {
          default: () =>
            h(ElSelectV2, {
              multiple: true,
              modelValue: configResult.value.boolValue?.false,
              ["onUpdate:modelValue"]: (v: string[]) => {
                //@ts-ignore
                configResult.value.boolValue.false = v
              },
              filterable: true,
              allowCreate: true,
              defaultFirstOption: true,
              options: defaultBoolValue.false.map((v) => ({
                label: v,
                value: v,
              })),
              style: "width: 100%",
            }),
        },
      ),
    ],
  }

  const formatExamples: { [key: number]: (format: string) => string } = {
    [FieldType.DateTime]: (format) => dayjs().format(format),
  }

  const formatList: { [key: number]: string[] } = {
    [FieldType.DateTime]: dateFormatList,
  }

  const refresh = () => {
    configResult.value = toValue(config) ?? {}
  }

  const allowConfig = ref(Object.keys(configFormItem))

  return {
    configList,
    configForm,
    allowConfig,
    refresh,
    configResult,
    render,
  }
}
