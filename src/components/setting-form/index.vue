<script setup lang="ts">
import { ref, onMounted, computed, watch } from "vue";
import {
  FieldType,
  IOpenSegmentType,
  IRecordValues,
  IWidgetTable,
  ViewType,
  bitable,
  IFieldMeta,
  IOpenCellValue,
} from "@base-open/web-api";
import type { ExcelDataInfo } from "@/types/types";
import { ElLoading, ElMessage } from "element-plus";

interface IFieldValue {
  record_id: string;
  value: IOpenCellValue;
}

interface IUndefinedFieldValue {
  record_id: undefined;
  value: undefined;
}

const props = defineProps({
  excelData: {
    type: Object as () => ExcelDataInfo | null,
    default: null,
  },
});

const isActive = ref(false);
const form = ref();
const chooseRef = ref();
const Index = ref("");
// const table = ref<IWidgetTable>();
// const view = ref<IWidgetView>();
const tableId = ref("");
const tableFields = ref<IFieldMeta[]>();
const indexFields = ref<IFieldMeta[]>();
const sheetIndex = ref(0);
const excelFields = computed(
  () => props.excelData?.sheets[sheetIndex.value]?.tableData.fields ?? []
);
const mode = ref<"append" | "merge_direct" | "compare_merge">("append");

export interface fieldMap {
  field: IFieldMeta;
  excel_field: string;
}

const settingColumns = ref<fieldMap[]>([]);

watch(
  () => tableFields.value,
  (newVal) => {
    if (!newVal) return;
    newVal.forEach((field) => {
      settingColumns.value.push({
        field,
        excel_field: "",
      });
    });
  },
  { deep: true }
);

// const chooseOptions = computed(() => {
//   const options: CascaderOption[] = [];
//   if (!props.excelData) return options;
//   props.excelData.sheets.forEach((sheet, index) => {
//     const fields = sheet.tableData.fields;
//     options.push({
//       value: index,
//       label: sheet.name,
//       children: fields.map((field) => ({
//         value: field.name,
//         label: field.name,
//       })),
//     });
//   });
//   return options;
// });

const ignoreFieldType = [
  FieldType.Lookup,
  FieldType.CreatedTime,
  FieldType.ModifiedTime,
  FieldType.Checkbox,
  FieldType.Formula,
  FieldType.AutoNumber,
  FieldType.DuplexLink,
  FieldType.SingleLink,
  FieldType.CreatedUser,
  FieldType.ModifiedUser,
  FieldType.NotSupport,
];

async function getActiveTable(ignoreFields = ignoreFieldType) {
  const selection = await bitable.base.getSelection();
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

function getCellValue(field: IFieldMeta, value: string): IOpenCellValue {
  const type = field.type;
  if (!value) return value;
  switch (type) {
    case FieldType.Url:
      return [
        {
          text: value,
          type: IOpenSegmentType.Url,
          link: value,
        },
      ];
    case FieldType.DateTime:
      return Number(new Date(value));
    case FieldType.Number:
      return Number(value);
    case FieldType.SingleSelect:
      const id =
        field.property?.options.find((option) => option.name === value)?.id ??
        "";
      return {
        text: value,
        id,
      };
    case FieldType.MultiSelect:
      return Array.from(value.split(",")).map((v) => {
        const id =
          field.property?.options.find((option) => option.name === v)?.id ?? "";
        return {
          text: v,
          id,
        };
      });
    case FieldType.Currency:
      return Number(value);
    case FieldType.Progress:
      return Number(value);
    case FieldType.Rating:
      return Number(value);
    case FieldType.Text:
      return [
        {
          text: String(value),
          type: IOpenSegmentType.Text,
        },
      ];
    default:
      return value;
  }
}

async function importExcel(
  fieldsMaps: fieldMap[],
  excelData: ExcelDataInfo,
  sheetIndex: number,
  tableId: string,
  index: string | null = null,
  mode: "append" | "merge_direct" | "compare_merge" = "append"
) {
  if (!fieldsMaps || !excelData || !tableId) return;
  const tableItem = await bitable.base.getTableById(tableId);
  const sheet = excelData.sheets[sheetIndex];
  const records = sheet.tableData.records;
  async function addRecord() {
    const res = await Promise.all(
      records.map(async (record) => {
        const newRecord: IRecordValues = { fields: {} };
        fieldsMaps.forEach((field_map) => {
          const field = field_map.field;
          // console.log("record", record);
          newRecord.fields[field.id] = getCellValue(
            field,
            record[field_map.excel_field]
          );
        });
        console.log("newRecord", newRecord);
        return tableItem.addRecord(newRecord);
      })
    );
    return res;
  }
  function compare(
    excelVal: string,
    tableVal: string,
    mode: "merge_direct" | "compare_merge"
  ) {
    if (mode === "merge_direct") {
      return excelVal;
    } else {
      if (excelVal === "") {
        return tableVal;
      } else {
        return excelVal;
      }
    }
  }
  if (!index || mode === "append") {
    // 直接向表中追加记录
    const res = addRecord();
    console.log("addRecord", res);
  } else {
    console.log("index", index);
    const indexField = await tableItem.getFieldByName(index);
    const index_res: (IFieldValue | IUndefinedFieldValue)[] =
      await indexField.getFieldValueList();
    console.log("getFieldValueList", index_res);
    const excelIndexField =
      fieldsMaps.find((item) => item.field.name === index)?.excel_field ?? null;
    if (!excelIndexField) return;
    let deleteList: Array<string> = [];
    const newRecords: Array<{ fields: { [key: string]: IOpenCellValue } }> = [];
    records.forEach(async (record) => {
      const sameRecordIds = index_res
        .filter((item) => item.value[0].text === record[excelIndexField])
        .map((item) => item.record_id);
      console.log("sameRecordIds", sameRecordIds);
      if (sameRecordIds.length === 0) {
        const newRecord: IRecordValues = { fields: {} };
        fieldsMaps.forEach((field_map) => {
          const field = field_map.field;
          // console.log("record", record);
          newRecord.fields[field.id] = getCellValue(
            field,
            record[field_map.excel_field]
          );
        });
        newRecords.push(newRecord);
        console.log("newRecording", newRecords.length, newRecord);
        // return tableItem.addRecord(newRecord);
      } else {
        deleteList.push(...sameRecordIds);
        const newRecord: IRecordValues = { fields: {} };
        fieldsMaps.forEach(async (field_map) => {
          const field = await tableItem.getFieldByName(field_map.field.name);
          sameRecordIds.forEach(async (tableRecordId) => {
            const tableValueStr = await field.getCellString(tableRecordId);
            const excelValue = String(record[field_map.excel_field]);
            record[field_map.excel_field] = compare(
              excelValue,
              tableValueStr,
              mode
            );
          });
          newRecord.fields[field.id] = getCellValue(
            field_map.field,
            record[field_map.excel_field]
          );
          // return tableItem.addRecord(newRecord);
        });
        newRecords.push(newRecord);
        console.log("newRecording", newRecords.length, newRecord);
      }
    });
    console.log("new", newRecords);
    deleteList = Array.from(new Set(deleteList));
    console.log("delete", deleteList);
    Promise.all(
      deleteList.map((id) => {
        if (!id) return;
        return tableItem.deleteRecord(id);
      })
    )
      .then((res) => {
        console.log("delete success", res);
        console.log("addRecord", newRecords);
        Promise.all(
          newRecords.map((record) => {
            return tableItem.addRecord(record);
          })
        ).then((res) => {
          console.log("add success", res);
        });
      })
      .catch((err) => {
        console.log("delete error", err);
      });
  }
}

function importAction() {
  if (tableId.value === "") {
    ElMessage({
      message: "Please choose a table first",
      grouping: true,
      type: "warning",
      duration: 2000,
    });
    return;
  }
  if (!props.excelData) {
    ElMessage({
      message: "Please upload excel file first",
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
  const index = Index.value === "" ? null : Index.value;
  importExcel(
    settingColumns.value,
    props.excelData,
    sheet_index,
    id,
    index,
    mode.value
  );
}

function autoFill() {
  if (settingColumns.value.length === 0) {
    ElMessage({
      message: "Please choose a table first",
      grouping: true,
      type: "warning",
      duration: 2000,
    });
    return;
  }

  if (!props.excelData) {
    ElMessage({
      message: "Please upload excel file first",
      grouping: true,
      type: "warning",
      duration: 2000,
    });
    return;
  }

  if (excelFields.value.length === 0) {
    return;
  }
  const excelFieldsArray = excelFields.value.map((field) => field.name);
  settingColumns.value.forEach((column) => {
    if (excelFieldsArray.includes(column.field.name)) {
      column.excel_field = column.field.name;
    }
  });
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

defineExpose({
  isActive,
  index: Index,
  tableId,
  unlisten,
});
</script>

<template>
  <h2>Settings</h2>
  <el-form ref="form" label-position="top">
    <el-form-item label="Index">
      <el-select
        v-model="Index"
        :disabled="!isActive"
        placeholder="Choose index"
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
    <el-form-item label="Sheet" required>
      <el-select
        v-model="sheetIndex"
        :disabled="!excelData || !isActive"
        placeholder="Choose sheet"
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
    <el-form-item label="Fields Map" required>
      <el-table ref="chooseRef" stripe max-height="250" :data="settingColumns">
        <el-table-column label="Table Field" prop="field.name" />
        <el-table-column label="Excel Field">
          <template #default="{ $index }">
            <el-select
              v-model="settingColumns[$index].excel_field"
              :disabled="!(excelFields.length > 0) || !isActive"
              @change="console.log(excelFields, settingColumns)"
              placeholder="Choose Field"
              clearable
            >
              <el-option
                v-for="(field, index) in excelFields"
                :key="index"
                :value="field.name"
                :label="field.name"
              />
            </el-select>
          </template>
        </el-table-column>
      </el-table>
    </el-form-item>
    <el-form-item label="Mode">
      <el-radio-group v-model="mode">
        <el-radio label="append" name="append"
          >Append records directly</el-radio
        >
        <el-radio label="merge_direct" name="merge_direct"
          >Merge records directly according index</el-radio
        >
        <el-radio label="compare_merge" name="compare_merge"
          >Merge records after comparing according index</el-radio
        >
      </el-radio-group>
    </el-form-item>
  </el-form>
  <el-button type="primary" @click="importAction()">Import</el-button>
  <el-button type="default" @click="autoFill">Auto Fill</el-button>
  <!-- <el-button type="danger" @click="deleteTest">Delete Test</el-button> -->
</template>
