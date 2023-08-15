<script setup lang="ts">
import { ref, onMounted, computed, watch, toRaw } from "vue";
import {
  FieldType,
  IWidgetTable,
  ViewType,
  bitable,
  IFieldMeta,
} from "@lark-base-open/web-api";
import type { ExcelDataInfo, fieldMap } from "@/types/types";
import { ElLoading, ElMessage } from "element-plus";
import { Setting, Lock, Refresh } from "@element-plus/icons-vue";
import { ignoreFieldType, importExcel } from "./utils";
import { dateDefaultFormat } from "./utils/date";
import fieldSetting from "@/components/field-setting/index.vue";
import { defaultSeparator } from "./utils/multiSelect";
import { defaultBoolValue } from "./utils/checkBox";
import { useI18n } from "vue-i18n";
import fieldIcon from "@/components/field-icon/index.vue";
import importInfo from "@/components/import-info/index.vue";

const { t } = useI18n();

const props = defineProps({
  excelData: {
    type: Object as () => ExcelDataInfo | null,
    default: null,
  },
});

// const modeList = ref<any[]>([]);

const modeSelect = ref(["append"]);

const isActive = ref(false);
const form = ref();
const chooseRef = ref();
const settingRef = ref();
const importInfoRef = ref();
const Index = ref("");
const tableId = ref("");
const tableFields = ref<IFieldMeta[]>();
const indexFields = ref<IFieldMeta[]>();
const sheetIndex = ref(0);
const excelFields = computed(
  () => props.excelData?.sheets[sheetIndex.value]?.tableData.fields ?? []
);
const defaultSetting = ref<any>(dateDefaultFormat);
const mode = ref<"append" | "merge_direct" | "compare_merge">("append");
const importLoading = ref(false);
const currentSettingIndex = ref(0);
const settingType = ref<FieldType>(FieldType.DateTime);
const settingColumns = ref<fieldMap[]>([]);

watch(
  () => tableFields.value,
  (newVal) => {
    if (!newVal) return;
    settingColumns.value = [];
    newVal.forEach((field) => {
      const field_map: fieldMap = {
        field: toRaw(field),
        excel_field: "",
        config: {},
      };
      if (field.type === FieldType.DateTime) {
        field_map.config.format = dateDefaultFormat;
      }
      if (field.type === FieldType.MultiSelect) {
        field_map.config.separator = defaultSeparator;
      }
      if (field.type === FieldType.Checkbox) {
        field_map.config.bool_value = defaultBoolValue;
      }
      settingColumns.value.push(field_map);
    });
  },
  { deep: true }
);

watch([() => props.excelData, () => tableFields.value], () => {
  console.log("excelData", props.excelData);
  if (!props.excelData) {
    settingColumns.value = settingColumns.value.map((column) => {
      column.excel_field = "";
      return column;
    });
    return;
  } else {
    Fill();
  }
});

watch(
  () => modeSelect.value,
  (newVal) => {
    mode.value = newVal[newVal.length - 1] as
      | "append"
      | "merge_direct"
      | "compare_merge";
  }
);

async function getActiveTable(ignoreFields = ignoreFieldType) {
  const selection = await bitable.base.getSelection();
  tableFields.value = [];
  if (!selection.tableId) return null;

  const table: IWidgetTable = await bitable.base.getTableById(
    selection.tableId
  );
  if (!selection.viewId) {
    return null;
  }
  tableFields.value = (await table.getFieldMetaList()).filter(
    (field) => !ignoreFields.includes(field.type)
  );
  indexFields.value = tableFields.value.filter(
    (field) => field.type === FieldType.Text
  );
  const view = await table.getViewById(selection.viewId);
  const type = await view.getType();
  if (type !== ViewType.Grid) {
    return null;
  }
  return selection.tableId;
}

const unlisten = bitable.base.onSelectionChange(async () => {
  await refresh();
  console.log("selection changed", tableFields.value);
});

const refresh = async () => {
  const loading = ElLoading.service({
    lock: true,
    text: "Loading...",
    background: "rgba(0, 0, 0, 0.7)",
  });
  const t = await getActiveTable();
  if (!t) {
    isActive.value = false;
  } else {
    isActive.value = true;
    tableId.value = t;
  }
  loading.close();
};

async function importAction() {
  if (tableId.value === "") {
    ElMessage({
      message: t("message.chooseTableFirst"),
      grouping: true,
      type: "warning",
      duration: 2000,
    });
    return;
  }
  if (!props.excelData) {
    ElMessage({
      message: t("message.uploadExcelFirst"),
      grouping: true,
      type: "warning",
      duration: 2000,
    });
    return;
  }

  console.log("sheetIndex", sheetIndex.value);
  console.log("table", tableId);
  console.log("start import");
  const sheet_index = sheetIndex.value;
  const id = tableId.value;
  const table = await bitable.base.getTableById(id);
  const index = Index.value === "" ? null : Index.value;
  importLoading.value = true;
  importInfoRef.value.toggleVisible();
  await importExcel(
    toRaw(settingColumns.value),
    toRaw(props.excelData),
    sheet_index,
    table,
    index,
    mode.value,
    {
      ...importInfoRef.value.importCallback,
      end: () => {
        ElMessage({
          message: t("message.importSuccess"),
          grouping: true,
          type: "success",
          duration: 2000,
        });
        importLoading.value = false;
        importInfoRef.value.refresh();
      },
    }
  );
}

function Fill() {
  if (!props.excelData || !tableFields) return;
  const excelFieldsArray = excelFields.value.map((field) => field.name);
  settingColumns.value.forEach((column) => {
    if (excelFieldsArray.includes(column.field.name)) {
      column.excel_field = column.field.name;
    }
  });
}

function autoFill() {
  if (settingColumns.value.length === 0) {
    ElMessage({
      message: t("message.chooseTableFirst"),
      grouping: true,
      type: "warning",
      duration: 2000,
    });
    return;
  }

  if (!props.excelData) {
    ElMessage({
      message: t("message.uploadExcelFirst"),
      grouping: true,
      type: "warning",
      duration: 2000,
    });
    return;
  }

  if (excelFields.value.length === 0) {
    return;
  }
  Fill();
}

onMounted(() => {
  refresh();
});

// async function deleteTest() {
//   const table = await bitable.base.getTableById(tableId.value);
//   const recordIds = await table.getRecordIdList(); // 获取所有记录id
//   const res = await table.deleteRecord(recordIds[0]);
//   console.log("delete", recordIds[0], res);
// }

function settingField(index: number, config: fieldMap["config"]) {
  const type = settingColumns.value[index].field.type;
  if (type === FieldType.MultiSelect) {
    defaultSetting.value = config.separator;
  }
  if (type === FieldType.Checkbox) {
    defaultSetting.value = config.bool_value;
  }
  if (type === FieldType.DateTime) {
    defaultSetting.value = config.format;
  }
  currentSettingIndex.value = index;
  settingType.value = type;
  settingRef.value.toggleVisible();
}

function getFormat(value: any) {
  const type = settingColumns.value[currentSettingIndex.value].field.type;
  if (type === FieldType.MultiSelect) {
    settingColumns.value[currentSettingIndex.value].config.separator = value;
  }
  if (type === FieldType.Checkbox) {
    settingColumns.value[currentSettingIndex.value].config.bool_value = value;
  }
  if (type === FieldType.DateTime) {
    settingColumns.value[currentSettingIndex.value].config.format = value;
  }
  console.log(settingColumns.value[currentSettingIndex.value]);
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
  ];
}

defineExpose({
  isActive,
  index: Index,
  tableId,
  unlisten,
  autoFill,
});
</script>

<template>
  <h3>
    <el-icon><Setting /></el-icon>
    {{ t("h.settings") }}
  </h3>
  <el-form ref="form" label-position="top">
    <el-form-item :label="t('form.label.sheet')" required>
      <el-select
        v-model="sheetIndex"
        :disabled="!excelData || !isActive"
        :placeholder="t('input.placeholder.chooseSheet')"
        clearable
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
          <el-button type="primary" size="default" @click="autoFill">{{
            t("button.autoFill")
          }}</el-button>
        </div>
      </template>
      <el-table ref="chooseRef" stripe max-height="250" :data="settingColumns">
        <el-table-column :label="t('table.baseField')" prop="field.name">
          <template #default="scope">
            <field-icon :type="scope.row.field.type" />
            {{ scope.row.field.name }}
          </template>
        </el-table-column>
        <el-table-column :label="t('table.excelField')">
          <template #default="{ $index }">
            <el-select
              v-model="settingColumns[$index].excel_field"
              :disabled="!(excelFields.length > 0) || !isActive"
              @change="console.log(excelFields, settingColumns)"
              :placeholder="t('input.placeholder.chooseField')"
              clearable
            >
              <el-option
                v-for="(field, index) in excelFields"
                :key="index"
                :value="field.name"
                :label="field.name"
              />
            </el-select>
            <el-tooltip
              v-if="Object.values(settingColumns[$index].config).length > 0"
              :content="t('toolTip.setInputFormat')"
            >
              <el-button
                :disabled="!(excelFields.length > 0) || !isActive"
                :icon="Setting"
                @click="settingField($index, settingColumns[$index].config)"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </el-form-item>
    <el-form-item :label="t('form.label.mode')">
      <el-cascader v-model="modeSelect" :options="getModeList()" />
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
      <el-select
        v-model="Index"
        :disabled="!isActive"
        :placeholder="t('input.placeholder.chooseIndex')"
        clearable
      >
        <el-option
          v-for="field in indexFields"
          :key="field.id"
          :value="field.name"
          :label="field.name"
        />
      </el-select>
    </el-form-item>
  </el-form>
  <el-space>
    <el-button type="primary" :loading="importLoading" @click="importAction">{{
      t("button.import")
    }}</el-button>
    <el-tooltip v-if="importLoading" effect="dark">
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
    :default="defaultSetting"
    :type="settingType"
  ></fieldSetting>
  <importInfo ref="importInfoRef" />
  <!-- <el-button type="default" @click="autoFill">Auto Fill</el-button> -->
  <!-- <el-button type="danger" @click="deleteTest">Delete Test</el-button> -->
</template>
