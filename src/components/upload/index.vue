<script setup lang="ts">
import { ref } from "vue";
import { UploadFilled, Upload } from "@element-plus/icons-vue";
import { genFileId } from "element-plus";
import type { UploadInstance, UploadFile, UploadRawFile } from "element-plus";
import * as XLSX from "xlsx";
import type { ExcelDataInfo } from "@/types/types";

const upload = ref<UploadInstance>();
const data = ref<ExcelDataInfo | null>(null);

async function readExcel(file: UploadFile): Promise<ExcelDataInfo | null> {
  if (!file) return null;
  if (!/\.(xls|xlsx)$/.test(file.name.toLowerCase())) return null;
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = e.target?.result;
        const workbook = XLSX.read(data, { type: "binary" });
        const sheets = workbook.SheetNames.map((name) => {
          const sheet = workbook.Sheets[name];
          const tableData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
          const fields = tableData[0].map((name: string) => ({ name }));
          const records = tableData
            .slice(1)
            .map((row: string[]) => {
              const record: { [key: string]: string } = {};
              row.forEach((value, index) => {
                record[fields[index].name] = value ? String(value) : "";
              });
              return record;
            })
            .filter((record) => {
              return Object.values(record).every(
                (value) => value && value !== ""
              );
            });
          // console.log({ name, tableData: { fields, records } })
          return { name, tableData: { fields, records } };
        });
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

defineExpose({
  data,
});
</script>

<template>
  <h2>
    <el-icon><Upload /></el-icon>Upload
  </h2>
  <el-upload
    ref="upload"
    drag
    :on-change="analyzeExcel"
    accept=".xls,.xlsx"
    :limit="1"
    :auto-upload="false"
    :on-exceed="exceedHandler"
  >
    <el-icon class="el-icon--upload"><upload-filled /></el-icon>
    <div class="el-upload__text">
      Drop file here or <em>click to upload</em>
    </div>
    <template #tip>
      <div class="el-upload__tip">xlsx/xls file</div>
    </template>
  </el-upload>
</template>
