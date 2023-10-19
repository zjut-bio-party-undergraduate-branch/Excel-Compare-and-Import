import { defaultBoolValue } from "./../../../utils/cellValue/checkBox"
import { fieldMap } from "@/types/types"
import { MaybeRefOrGetter, toValue, watch, h, VNode, ref } from "vue"
import { FieldType } from "@lark-base-open/js-sdk"
import {
  ElInput,
  ElFormItem,
  ElTooltip,
  ElText,
  ElLink,
  ElIcon,
  ElSelectV2,
  ElForm,
} from "element-plus"
import { InfoFilled } from "@element-plus/icons-vue"
import { i18n } from "@/i18n"
import dayjs from "dayjs"
import { bitable } from "@lark-base-open/js-sdk"

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

async function loadFields() {
  const table = await bitable.base.getActiveTable()
}

export function useFieldConfig(
  config: MaybeRefOrGetter<fieldMap["config"] | undefined>,
  type: MaybeRefOrGetter<FieldType | undefined>,
) {
  const configList = ref<string[]>([])
  const configForm = ref<VNode>()
  const configResult = ref<fieldMap["config"]>({})
  const formatExample = ref<any>("")
  watch(
    () => toValue(config),
    (newVal) => {
      if (!newVal) return
      configList.value = Object.keys(newVal)
      configResult.value = JSON.parse(JSON.stringify(newVal))
      if (newVal.format) {
        console.log(newVal.format, toValue(type))
        formatExample.value = formatExamples[
          toValue(type) as keyof typeof formatExamples
        ](newVal.format)
      }
    },
    { deep: true },
  )

  watch(
    () => toValue(type),
    (newVal) => {
      console.log(newVal)
      if (!newVal) return
      configForm.value = h(
        ElForm,
        {},
        {
          default: () =>
            configList.value.map((v) => configFormItem[v]()).flat(),
        },
      )
      console.log(configForm.value)
    },
  )

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
    primaryKey: () => [
      h(
        ElFormItem,
        {
          label: i18n.global.t("form.label.primaryKey"),
        },
        {
          default: () =>
            h(ElSelectV2, {
              multiple: true,
              modelValue: configResult.value.primaryKey,
              ["onUpdate:modelValue"]: (v: string) => {
                //@ts-ignore
                configResult.value.primaryKey = v
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
    ],
  }

  const formatExamples: { [key: number]: (format: string) => string } = {
    [FieldType.DateTime]: (format) => dayjs().format(format),
  }

  const formatList: { [key: number]: string[] } = {
    [FieldType.DateTime]: dateFormatList,
  }

  function refresh() {
    configResult.value = toValue(config) ?? {}
  }

  const allowConfig = ref(Object.keys(configFormItem))

  return {
    configList,
    configForm,
    allowConfig,
    refresh,
    configResult,
  }
}
