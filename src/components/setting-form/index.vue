<script setup lang="ts">
import { ref, computed, watch, toRaw } from "vue"
import {
  FieldType,
  IWidgetTable,
  ViewType,
  bitable,
  ISingleLinkFieldProperty,
} from "@lark-base-open/js-sdk"
import type { ExcelDataInfo, fieldMap } from "@/types/types"
import { ElLoading, ElMessage } from "element-plus"
import { Setting, Lock, Refresh } from "@element-plus/icons-vue"
import {
  ignoreFieldType,
  configField,
  hasChildrenFieldType,
  indexFieldType,
} from "./utils"
import fieldSetting from "@/components/field-setting/index.vue"
import { useI18n } from "vue-i18n"
import fieldIcon from "@/components/field-icon/index.vue"
import importInfo from "@/components/import-info/index.vue"
import { importExcel, importModes } from "@/utils/import"
import { useSetting } from "./composables"
import { useBitableSelection, useBitableTable } from "@/utils/useBitable"
import { iconList } from "@/utils/fieldIcons"
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
const isGrid = ref(false)
const refresh = async (table: IWidgetTable | null) => {
  const loading = ElLoading.service({
    lock: true,
    text: "Loading...",
    background: "rgba(0, 0, 0, 0.7)",
  })
  console.log("refresh", table, viewId.value, tableId.value)
  if (!table) return
  if (!viewId.value) return
  const view = await table.getViewById(viewId.value)
  const type = await view.getType()
  if (type !== ViewType.Grid) {
    isGrid.value = false
  } else {
    isGrid.value = true
  }
  loading.close()
}

const { tableId, viewId } = useBitableSelection()
const { fields: tableFields } = useBitableTable(tableId, refresh)

const indexFields = computed(() =>
  tableFields.value.filter((field) => indexFieldType.includes(field.type)),
)

const excelData = ref<ExcelDataInfo>()
const { mode, settingColumns, fill, excelFields, sheetIndex, Index } =
  useSetting(tableFields, excelData, tableId)
const defaultSetting = ref<any>()
const importLoading = ref(false)
const currentSetting = ref<fieldMap>()
const settingType = ref<FieldType>()

const isActive = computed(() => !!tableId.value && isGrid.value)

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
  // column: TableColumnCtx<fieldMap>
) {
  return row.field.name === value
}

async function loadLinkTable(
  row: fieldMap,
  _: any,
  resolve: (data: fieldMap[]) => void,
) {
  if (row.hasChildren) {
    const prop = row.field.property as ISingleLinkFieldProperty
    const linkTable = await bitable.base.getTableById(prop.tableId)
    const linkFields = await linkTable.getFieldMetaList()
    row.children = linkFields
      .filter((i) => !ignoreFieldType.includes(i.type) && !i.isPrimary)
      .map((field) => {
        console.log(field.name, prop.tableId, tableId.value)
        return {
          key: `${row.key}-${field.id}`,
          field,
          excel_field: undefined,
          table: linkTable.id,
          config: configField(field.type),
          root: false,
          hasChildren:
            hasChildrenFieldType.includes(field.type) &&
            prop.tableId !==
              (field.property as ISingleLinkFieldProperty).tableId &&
            (field.property as ISingleLinkFieldProperty).tableId !==
              tableId.value,
          // hasChildren: false,
          children: [],
        }
      })

    resolve(row.children)
  } else {
    resolve([])
  }
}

async function importAction() {
  if (!tableId.value) {
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
  console.log("table", tableId)
  console.log("start import")
  const sheet_index = sheetIndex.value
  // const table = await bitable.base.getTableById(tableId.value);
  const index = Index.value
  importLoading.value = true
  importInfoRef.value.toggleVisible()
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
}

function autoFill() {
  if (settingColumns.value.length === 0) {
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

  if (excelFields.value.length === 0) {
    return
  }
  fill()
}

function settingField(row: fieldMap) {
  defaultSetting.value = row.config
  currentSetting.value = row
  console.log("settingField", row, settingType.value)
  settingRef.value.toggleVisible()
}

function getFormat(value: fieldMap["config"]) {
  console.log("getFormat", value)
  if (currentSetting.value) {
    currentSetting.value.config = value
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

defineExpose({
  isActive,
  index: Index,
  tableId,
  autoFill,
})
</script>

<template>
  <h3>
    <el-icon><Setting /></el-icon>
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
        :disabled="!excelData || !isActive"
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
        </div>
      </template>
      <el-table
        ref="chooseRef"
        stripe
        max-height="250"
        :load="loadLinkTable"
        lazy
        :data="settingColumns"
        row-key="key"
      >
        <el-table-column
          :label="t('table.baseField')"
          :filters="filters"
          :filter-method="filterHandler"
          prop="field.name"
          filter-placement="bottom-end"
        >
          <template #default="scope">
            <field-icon :type="scope.row.field.type" />
            {{ scope.row.field.name }}
          </template>
        </el-table-column>
        <el-table-column :label="t('table.excelField')">
          <template #default="{ row }">
            <el-select-v2
              v-model="row.excel_field"
              :disabled="!(excelFields.length > 0) || !isActive"
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
                :disabled="!(excelFields.length > 0) || !isActive"
                :icon="Setting"
                @click="settingField(row)"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </el-form-item>
    <el-form-item :label="t('form.label.mode')">
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
          <el-icon><Lock /></el-icon>
        </el-tooltip>
      </template>
      <el-select-v2
        v-model="Index"
        :disabled="!isActive"
        :options="
          indexFields.map((i) => ({
            label: i.name,
            value: i.id,
            icon: iconList[i.type],
          }))
        "
        :placeholder="t('input.placeholder.chooseIndex')"
        style="width: 240px"
        filterable
        clearable
        multiple
      >
        <template #default="{ item }">
          <span>
            <el-icon style="margin-right: 5px; position: relative; right: 0px">
              <component :is="item.icon" />
            </el-icon>
          </span>
          <span>{{ item.label }}</span>
        </template>
      </el-select-v2>
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
        ><Refresh
      /></el-icon>
    </el-tooltip>
  </el-space>

  <fieldSetting
    ref="settingRef"
    @confirmFormat="getFormat"
    :field="currentSetting"
  ></fieldSetting>
  <importInfo ref="importInfoRef" />
</template>
