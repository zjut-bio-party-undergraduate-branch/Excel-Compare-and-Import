<script setup lang="ts">
import { ref, computed, watch, toRaw, onMounted } from "vue"
import { bitable } from "@lark-base-open/js-sdk"
import type { ITableMeta, IFieldMeta } from "@lark-base-open/js-sdk"
import { importModes, UpdateMode } from "@/types/types"
import type { ExcelDataInfo, fieldMap, ImportOptions } from "@/types/types"
import type { TableColumnCtx } from "element-plus"
import { Setting, Lock, Refresh, Key } from "@element-plus/icons-vue"
import { indexFieldType, Log, Error, Warn } from "@/utils"
import fieldSetting from "@/components/field-setting/index.vue"
import linkSetting from "@/components/link-setting/index.vue"
import { useI18n } from "vue-i18n"
import fieldIcon from "@/components/field-icon/index.vue"
import importInfo from "@/components/import-info/index.vue"
import { useSetting } from "./composables"
import { useSelection, useTable } from "@qww0302/use-bitable"
import { cellTranslator } from "@/utils/cellValue"
import { useStorage } from "@vueuse/core"
import defaultOptions from "../../../plugin.config.json"
import { validateIndex, validateIndexAuto } from "./utils"

const { t } = useI18n()
const props = defineProps({
  excelData: {
    type: Object as () => ExcelDataInfo,
    default: undefined,
  },
})
const modeSelect = ref(["append"])
const form = ref()
const chooseRef = ref()
const settingRef = ref()
const importInfoRef = ref()
const linkRef = ref()
const tableList = ref<ITableMeta[]>([])
const targetTableId = ref<string>("")
const tableFields = ref<IFieldMeta[]>()
const allowAdd = ref(true)
const AllowActionValue: Record<string, ImportOptions["allowAction"]> = {
  updateAndAdd: {
    add: true,
    update: true,
    delete: true,
  },
  onlyAdd: {
    add: true,
    update: false,
    delete: false,
  },
  onlyUpdate: {
    add: false,
    update: true,
    delete: true,
  },
}

enum AllowAction {
  updateAndAdd = "updateAndAdd",
  onlyAdd = "onlyAdd",
  onlyUpdate = "onlyUpdate",
}

const userId = ref<string>(await bitable.bridge.getUserId())
const userOptions = useStorage<ImportOptions>(
  `Excel_Compare_and_import-${userId.value}`,
  defaultOptions,
  undefined,
  {
    mergeDefaults: true,
  },
)
const getAllowAction = (actions: ImportOptions["allowAction"]) => {
  if (!actions) return AllowAction.updateAndAdd
  if (actions.add && actions.update && actions.delete) {
    return AllowAction.updateAndAdd
  }
  if (actions.add && !actions.update && !actions.delete) {
    return AllowAction.onlyAdd
  }
  if (!actions.add && actions.update && actions.delete) {
    return AllowAction.onlyUpdate
  }
  return AllowAction.updateAndAdd
}
const allowAction = ref<AllowAction>(
  getAllowAction(userOptions.value.allowAction),
)
const changeAllowAction = (value: any) => {
  userOptions.value.allowAction = AllowActionValue[value]
}

const updateOptionSelector = () => [
  {
    value: UpdateMode.SAVE_MOST,
    label: t("updateMode.saveMost"),
    children: [
      {
        value: UpdateMode.SAVE_LATEST,
        label: t("updateMode.whenLastSame") + t("updateMode.saveLatest"),
      },
      {
        value: UpdateMode.SAVE_OLDEST,
        label: t("updateMode.whenLastSame") + t("updateMode.saveOldest"),
      },
    ],
  },
  {
    value: UpdateMode.SAVE_LEAST,
    label: t("updateMode.saveLeast"),
    children: [
      {
        value: UpdateMode.SAVE_LATEST,
        label: t("updateMode.whenLastSame") + t("updateMode.saveLatest"),
      },
      {
        value: UpdateMode.SAVE_OLDEST,
        label: t("updateMode.whenLastSame") + t("updateMode.saveOldest"),
      },
    ],
  },
  {
    value: UpdateMode.SAVE_LATEST,
    label: t("updateMode.saveLatest"),
    children: [
      {
        value: UpdateMode.SAVE_MOST,
        label: t("updateMode.whenLastSame") + t("updateMode.saveMost"),
      },
      {
        value: UpdateMode.SAVE_LEAST,
        label: t("updateMode.whenLastSame") + t("updateMode.saveLeast"),
      },
    ],
  },
  {
    value: UpdateMode.SAVE_OLDEST,
    label: t("updateMode.saveOldest"),
    children: [
      {
        value: UpdateMode.SAVE_MOST,
        label: t("updateMode.whenLastSame") + t("updateMode.saveMost"),
      },
      {
        value: UpdateMode.SAVE_LEAST,
        label: t("updateMode.whenLastSame") + t("updateMode.saveLeast"),
      },
    ],
  },
]

const { tableId: activeTableId } = useSelection()
const { table: targetTable, pending: tablePending } = useTable(targetTableId)

watch(
  () => activeTableId.value,
  (newVal) => {
    if (targetTableId.value === "") {
      targetTableId.value = newVal ?? ""
    }
  },
)

watch(
  () => targetTable.value,
  () => {
    if (!targetTable.value) return
    console.log("targetTable", targetTable.value)
    targetTable.value?.getFieldMetaList().then((res) => {
      tableFields.value = res
      fill()
    })
  },
)

const indexFields = computed(() =>
  (tableFields.value ?? []).filter((field) =>
    indexFieldType.includes(field.type),
  ),
)

const excelData = ref<ExcelDataInfo>()
const {
  mode,
  settingColumns,
  fill,
  excelFields,
  sheetIndex,
  Index,
  reset,
  pending: mapPending,
} = useSetting(tableFields, excelData, activeTableId)
const importLoading = ref(false)
const currentSetting = ref<fieldMap>()

watch(
  () => props.excelData,
  (newVal) => {
    excelData.value = newVal
  },
  { deep: true },
)

watch(
  () => modeSelect.value,
  (newVal) => {
    mode.value = newVal[newVal.length - 1] as importModes
  },
)

const filters = computed(() => {
  return settingColumns.value.map((item) => {
    return {
      text: item.field.name,
      value: item.field.name,
    }
  })
})

function filterHandler(
  value: string,
  row: fieldMap,
  column: TableColumnCtx<fieldMap>,
) {
  console.log(value, row, column)
  return row.field.name === value
}

const validate = () => {
  const indexes = Index.value.map(
    (i) => settingColumns.value.find((j) => j.field.id === i) as fieldMap,
  )
  const hasAuto = validateIndexAuto(indexes)
  const noEmpty = validateIndex(indexes)
  if (hasAuto) {
    changeAllowAction(AllowAction.onlyUpdate)
    allowAction.value = AllowAction.onlyUpdate
    allowAdd.value = false
  } else {
    allowAdd.value = true
  }
  return noEmpty && !hasAuto
}

async function importAction() {
  if (!activeTableId.value) {
    Warn({
      title: "chooseTableFirst",
      message: t("message.chooseTableFirst"),
      notice: true,
      noticeParams: {
        text: "message.chooseTableFirst",
      },
    })
    return
  }
  if (!props.excelData) {
    Warn({
      title: "NoExcelFile",
      message: t("message.uploadExcelFirst"),
      notice: true,
      noticeParams: {
        text: "message.uploadExcelFirst",
      },
    })
    return
  }
  if (mode.value !== importModes.append && !validate()) return
  const sheet_index = sheetIndex.value
  const index = Index.value
  importLoading.value = true
  importInfoRef.value.toggleVisible()
  const { importExcel } = await import("@/utils/import/import.ts")
  await importExcel(
    toRaw(settingColumns.value),
    toRaw(props.excelData),
    sheet_index,
    index,
    mode.value,
    userOptions.value,
  )
  importLoading.value = false
}

function autoFill() {
  if (!props.excelData) {
    Warn({
      title: "NoExcelFile",
      message: t("message.uploadExcelFirst"),
      notice: true,
      noticeParams: {
        text: "message.uploadExcelFirst",
      },
    })
    return
  }

  if (excelFields.value.length === 0) {
    return
  }
  fill()
}

function settingField(row: fieldMap) {
  currentSetting.value = row
  settingRef.value.toggleVisible()
}

function settingLink(row: fieldMap) {
  currentSetting.value = row
  linkRef.value.toggleVisible()
}

function getFormat(value: fieldMap["config"]) {
  // console.log("getFormat", value)
  if (currentSetting.value) {
    currentSetting.value.config = value
  }
}

function setLinkField(
  linkConfig: fieldMap["linkConfig"],
  config: fieldMap["config"],
) {
  // console.log("setLinkField", linkConfig)
  if (currentSetting.value) {
    currentSetting.value.linkConfig = linkConfig
    currentSetting.value.children?.forEach((field) => {
      if (linkConfig && field.field.id === linkConfig.primaryKey) {
        field.config = config
        // console.log("setLinkField", settingColumns.value)
      }
    })
  }
}

function getModeList(): any[] {
  return [
    {
      value: "append",
      label: t("mode.append"),
    },
    {
      value: "merge",
      label: t("mode.merge"),
      children: [
        {
          value: "merge_direct",
          label: t("mode.mergeDirect"),
        },
        {
          value: "compare_merge",
          label: t("mode.compareMerge"),
        },
      ],
    },
  ]
}

onMounted(() => {
  Log({
    title: "userOptions",
    message: JSON.stringify(userOptions.value),
  })
  bitable.base
    .getTableMetaList()
    .then((res) => {
      tableList.value = res
    })
    .catch((err) => {
      Error({
        title: "getTableListError",
        message: JSON.stringify(err),
        error: err,
        notice: true,
        noticeParams: {
          text: "message.getTableListError",
        },
      })
    })
})

defineExpose({
  index: Index,
  tableId: activeTableId,
  autoFill,
})
</script>

<template>
  <h3>
    <el-icon>
      <Setting />
    </el-icon>
    {{ t("h.settings") }}
  </h3>
  <el-form
    ref="form"
    label-position="top"
  >
    <el-form-item
      :label="t('form.label.sheet')"
      required
    >
      <el-select
        v-model="sheetIndex"
        :disabled="!excelData"
        :placeholder="t('input.placeholder.chooseSheet')"
      >
        <el-option
          v-for="(sheet, index) in excelData?.sheets"
          :key="index"
          :value="index"
          :label="sheet.name"
        />
      </el-select>
    </el-form-item>
    <el-form-item
      :label="t('form.label.table')"
      required
    >
      <el-select
        v-model="targetTableId"
        :placeholder="t('input.placeholder.chooseTable')"
      >
        <el-option
          v-for="(table, index) in tableList"
          :key="index"
          :value="table.id"
          :label="table.name"
        />
      </el-select>
    </el-form-item>
    <el-form-item
      :label="t('form.label.fieldsMap')"
      label-width="auto"
      required
    >
      <template #label="{ label }">
        <label>{{ label }}</label>
        <div
          style="display: inline; margin-left: 20px"
          class="el-form-item__content"
        >
          <el-button
            type="primary"
            size="default"
            @click="autoFill"
          >
            {{ t("button.autoFill") }}
          </el-button>
          <el-button
            type="danger"
            size="default"
            @click="reset"
          >
            {{ t("button.clear") }}
          </el-button>
        </div>
      </template>
      <el-table
        v-loading="tablePending || mapPending"
        ref="chooseRef"
        stripe
        max-height="250"
        :data="
          settingColumns.filter(
            (i) =>
              cellTranslator.supportTypes.includes(i.field.type) ||
              indexFieldType.includes(i.field.type),
          )
        "
        row-key="key"
      >
        <el-table-column
          :label="t('table.baseField')"
          :filters="filters"
          :filter-method="filterHandler"
          prop="field.name"
          filter-placement="bottom-end"
        >
          <template #default="{ row }">
            <field-icon :type="row.field.type" />

            {{ row.field.name }}
            <el-tooltip
              v-if="row.linkConfig"
              :content="t('toolTip.setInputFormat')"
            >
              <el-button
                :icon="Key"
                @click="settingLink(row)"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column :label="t('table.excelField')">
          <template #default="{ row }">
            <el-select-v2
              v-if="row.root"
              v-model="row.excel_field"
              :disabled="!(excelFields.length > 0)"
              :options="
                excelFields.map((i) => ({ label: i.name, value: i.name }))
              "
              :placeholder="t('input.placeholder.chooseField')"
              @change="console.log(excelFields, settingColumns)"
              filterable
              clearable
            />
            <el-tooltip
              v-if="
                Object.keys(row.config).some((i) =>
                  settingRef.allowConfig.includes(i),
                )
              "
              :content="t('toolTip.setInputFormat')"
            >
              <el-button
                :disabled="!(excelFields.length > 0)"
                :icon="Setting"
                @click="settingField(row)"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </el-form-item>
    <el-form-item
      :label="t('form.label.mode')"
      required
    >
      <el-cascader
        v-model="modeSelect"
        :options="getModeList()"
      />
    </el-form-item>
    <el-form-item
      v-if="modeSelect[0] !== 'append'"
      :label="t('form.label.index')"
      required
    >
      <template #label="{ label }">
        {{ label }}
        <el-tooltip effect="dark">
          <template #content>
            {{ t("toolTip.indexInfo") }}
          </template>
          <el-icon>
            <Lock />
          </el-icon>
        </el-tooltip>
      </template>
      <el-select
        v-model="Index"
        :placeholder="t('input.placeholder.chooseIndex')"
        @change="validate"
        filterable
        clearable
        multiple
      >
        <el-option
          v-for="item of indexFields"
          :value="item.id"
          :label="item.name"
        >
          <template #default>
            <span style="margin-right: 5px; position: relative; right: 0px">
              <field-icon :type="item.type" />
            </span>
            <span style="user-select: none">{{ item.name }}</span>
          </template>
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item
      :label="t('form.label.allowAction')"
      v-if="modeSelect[0] !== 'append'"
      required
    >
      <el-radio-group
        v-model="allowAction"
        style="display: flex; flex-direction: column; align-items: flex-start"
        @change="changeAllowAction"
      >
        <el-radio
          :label="AllowAction.updateAndAdd"
          :disabled="!allowAdd"
          >{{ t("allowAction.updateAndAdd") }}</el-radio
        >
        <el-radio
          :label="AllowAction.onlyAdd"
          :disabled="!allowAdd"
          >{{ t("allowAction.onlyAdd") }}</el-radio
        >
        <el-radio :label="AllowAction.onlyUpdate">{{
          t("allowAction.onlyUpdate")
        }}</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item
      :label="t('form.label.whenTwoSame')"
      v-if="modeSelect[0] !== 'append' && userOptions.allowAction?.update"
      required
    >
      <el-cascader
        :placeholder="t('form.label.saveFirst')"
        :options="updateOptionSelector()"
        v-model="userOptions.updateOption!.mode"
        separator=">"
      ></el-cascader>
    </el-form-item>
  </el-form>
  <el-space>
    <el-button
      type="primary"
      :loading="importLoading"
      @click="importAction"
      >{{ t("button.import") }}</el-button
    >
    <el-tooltip
      v-if="importLoading"
      effect="dark"
    >
      <template #content>
        {{ t("toolTip.importInfo") }}
      </template>
      <el-icon
        size="20"
        @click="importInfoRef.toggleVisible"
        style="cursor: pointer"
        class="is-loading"
      >
        <Refresh />
      </el-icon>
    </el-tooltip>
  </el-space>

  <fieldSetting
    ref="settingRef"
    @confirmFormat="getFormat"
    :field="currentSetting"
  ></fieldSetting>
  <linkSetting
    ref="linkRef"
    @confirmSetting="setLinkField"
    :field="currentSetting"
  />
  <importInfo ref="importInfoRef" />
</template>