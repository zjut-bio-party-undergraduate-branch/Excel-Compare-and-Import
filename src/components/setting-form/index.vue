<script setup lang="ts">
import { ref, computed, watch, toRaw, onMounted } from "vue"
import { bitable, ITableMeta, IFieldMeta } from "@lark-base-open/js-sdk"
import { ExcelDataInfo, fieldMap, importModes } from "@/types/types"
import { ElMessage, TableColumnCtx } from "element-plus"
import { Setting, Lock, Refresh, Key } from "@element-plus/icons-vue"
import { indexFieldType } from "@/utils"
import fieldSetting from "@/components/field-setting/index.vue"
import linkSetting from "@/components/link-setting/index.vue"
import { useI18n } from "vue-i18n"
import fieldIcon from "@/components/field-icon/index.vue"
import importInfo from "@/components/import-info/index.vue"
import { useSetting } from "./composables"
import { useSelection, useTable } from "@qww0302/use-bitable"
import { cellTranslator } from "@/utils/cellValue"
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

async function importAction() {
  if (!activeTableId.value) {
    ElMessage({
      message: t("message.chooseTableFirst"),
      grouping: true,
      type: "warning",
      duration: 2000,
    })
    return
  }
  if (!props.excelData) {
    ElMessage({
      message: t("message.uploadExcelFirst"),
      grouping: true,
      type: "warning",
      duration: 2000,
    })
    return
  }

  console.log("sheetIndex", sheetIndex.value)
  console.log("table", activeTableId)
  console.log("start import")
  const sheet_index = sheetIndex.value
  // const table = await bitable.base.getTableById(tableId.value);
  const index = Index.value
  importLoading.value = true
  importInfoRef.value.toggleVisible()
  const { importExcel } = await import("@/utils/import/import.ts")
  await importExcel(
    toRaw(settingColumns.value),
    toRaw(props.excelData),
    sheet_index,
    // table,
    index,
    mode.value,
    // {
    //   end: () => {
    //     ElMessage({
    //       message: t("message.importSuccess"),
    //       grouping: true,
    //       type: "success",
    //       duration: 2000,
    //     });
    //     importLoading.value = false;
    //     importInfoRef.value.refresh();
    //   },
    // }
  )
  // const importWorker = (await import("@/utils/import/import.worker.ts?worker"))
  //   .default
  // const worker = new importWorker()
  // worker.postMessage({
  //   type: "import",
  //   payload: JSON.parse(
  //     JSON.stringify({
  //       fieldsMaps: toRaw(settingColumns.value),
  //       excelData: toRaw(props.excelData),
  //       sheetIndex: sheet_index,
  //       index,
  //       mode: toRaw(mode.value),
  //     }),
  //   ),
  // })
}

function autoFill() {
  if (!props.excelData) {
    ElMessage({
      message: t("message.uploadExcelFirst"),
      grouping: true,
      type: "warning",
      duration: 2000,
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
  console.log("getFormat", value)
  if (currentSetting.value) {
    currentSetting.value.config = value
  }
}

function setLinkField(
  linkConfig: fieldMap["linkConfig"],
  config: fieldMap["config"],
) {
  console.log("setLinkField", linkConfig)
  if (currentSetting.value) {
    currentSetting.value.linkConfig = linkConfig
    currentSetting.value.children?.forEach((field) => {
      if (linkConfig && field.field.id === linkConfig.primaryKey) {
        field.config = config
        console.log("setLinkField", settingColumns.value)
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
  bitable.base
    .getTableMetaList()
    .then((res) => {
      tableList.value = res
    })
    .catch((err) => {
      console.log(err)
      ElMessage({
        message: t("message.getTableListError"),
        grouping: true,
        type: "error",
        duration: 2000,
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
    <el-form-item :label="t('form.label.index')">
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
