<script setup lang="ts">
import { ref } from "vue";
import { Upload, Close } from "@element-plus/icons-vue";
import { genFileId } from "element-plus";
import type { UploadInstance, UploadFile, UploadRawFile } from "element-plus";
import * as XLSX from "xlsx";
import type { ExcelDataInfo } from "@/types/types";
import { useI18n } from "vue-i18n";
import uploadIcon from "@/components/icons/upload-icon.vue";
import excelIcon from "@/components/icons/excel-icon.vue";

const upload = ref<UploadInstance>();
const data = ref<ExcelDataInfo | null>(null);
const { t } = useI18n();

async function readExcel(file: UploadFile): Promise<ExcelDataInfo | null> {
  if (!file) return null;
  if (!/\.(xls|xlsx)$/.test(file.name.toLowerCase())) return null;
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = e.target?.result;
        const workbook = XLSX.read(data, { type: "binary" });
        console.log("workbook", workbook);
        const sheets = workbook.SheetNames.map((name) => {
          const sheet = workbook.Sheets[name];
          const tableData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
          console.log("tableData", tableData)
          if (tableData.length <= 1) return null;
          // @ts-ignore
          const fields = tableData[0]?.map((name: string) => ({ name }));
          console.log(tableData);
          const records = tableData
            .slice(1)
            // @ts-ignore
            .map((row: string[]) => {
              const record: { [key: string]: string } = {};
              row.forEach((value, index) => {
                console.log({ value, index }, value ? String(value) : "");
                record[fields[index].name] = value ? String(value) : "";
              });
              return record;
            })
            .filter((record) => {
              return Object.values(record).some((value) => {
                return value;
              });
            });
          // console.log({ name, tableData: { fields, records } })
          return { name, tableData: { fields, records } };
        }).filter(sheet => sheet !== null);
        resolve({ sheets, name: file.name });
      } catch (e) {
        reject(e);
      }
    };
    reader.readAsBinaryString(file.raw as Blob);
  });
}

async function analyzeExcel(file: UploadFile): Promise<void> {
  data.value = await readExcel(file);
  console.log("readExcel", data.value);
}

function exceedHandler(files: File[]): void {
  upload.value!.clearFiles();
  const file = files[0] as UploadRawFile;
  file.uid = genFileId();
  upload.value!.handleStart(file);
}

function closeFileCard(): void {
  data.value = null;
  upload.value!.clearFiles();
}

defineExpose({
  data,
});
</script>

<template>
  <h3>
    <el-icon><Upload /></el-icon>
    {{ t("h.upload") }}
  </h3>
  <el-upload
    v-show="!data"
    ref="upload"
    drag
    :on-change="analyzeExcel"
    accept=".xls,.xlsx"
    :limit="1"
    :auto-upload="false"
    :on-exceed="exceedHandler"
    :show-file-list="false"
  >
    <el-icon color="#2962f1" size="30" class="el-icon--upload"
      ><uploadIcon style="color: var(--color)"
    /></el-icon>
    <div class="el-upload__text">
      <el-text>{{ t("upload.tip.common") }}</el-text>
    </div>
    <div class="el-upload__text">
      <el-text size="small">{{ t("upload.tip.fileSupport") }}</el-text>
    </div>
  </el-upload>
  <el-card v-show="data" shadow="hover">
    <el-row>
      <el-col :span="4">
        <el-icon size="2em"><excelIcon /></el-icon>
      </el-col>
      <el-col :span="18">
        <el-space style="height: 100%" alignment="center">
          <el-text truncated>{{ data?.name }}</el-text>
        </el-space>
      </el-col>
      <el-col :span="2">
        <el-button text @click="closeFileCard">
          <el-icon>
            <close />
          </el-icon>
        </el-button>
      </el-col>
    </el-row>
  </el-card>
</template>
