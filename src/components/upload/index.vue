<script setup lang="ts">
import { ref } from "vue"
import { Upload, Close } from "@element-plus/icons-vue"
import { genFileId, ElMessage } from "element-plus"
import type { UploadInstance, UploadFile, UploadRawFile } from "element-plus"
import * as XLSX from "xlsx"
import type { ExcelDataInfo, SheetInfo } from "@/types/types"
import { useI18n } from "vue-i18n"
import uploadIcon from "@/components/icons/upload-icon.vue"
import excelIcon from "@/components/icons/excel-icon.vue"
import { useFileReader } from "@qww0302/use-bitable"

const upload = ref<UploadInstance>()
const { t } = useI18n()
const excelFile = ref<File | null>(null)

const { data, pending, name } = useFileReader<ExcelDataInfo | null>(excelFile, {
  load: (data, resolve) => {
    try {
      const workbook = XLSX.read(data, { type: "binary" })
      const sheets = workbook.SheetNames.map((name) => {
        const sheet = workbook.Sheets[name]
        const tableData = XLSX.utils.sheet_to_json(sheet, {
          header: 1,
        }) as any[][]
        if (tableData.length <= 1) return null
        try {
          const fields = tableData[0]?.map((name: string) => ({
            name: String(name),
          }))
          const records = tableData
            .slice(1)
            .map((row: string[]) => {
              const record: { [key: string]: string } = {}
              row.forEach((value, index) => {
                record[fields[index].name] = value ? String(value) : ""
              })
              return record
            })
            .filter((record) => {
              return Object.values(record).some((value) => {
                return value
              })
            })
          return { name, tableData: { fields, records } }
        } catch (e) {
          console.log(e)
          ElMessage.error(t("message.sheetError", { sheetName: name }))
          return null
        }
      }).filter((sheet) => sheet !== null) as SheetInfo[]
      if (sheets.length === 0) {
        ElMessage.error(t("message.noSheet"))
        excelFile.value = null
        resolve(null)
        return
      }
      resolve({ sheets, name: (excelFile.value as File).name })
    } catch (e) {
      console.error(e)
    }
  },
})

function getFile(file: UploadFile) {
  if (!/\.xls[x]?$/.test(file.name)) {
    ElMessage.error(t("message.fileType"))
    return
  }
  excelFile.value = file.raw as File
}

function exceedHandler(files: File[]): void {
  upload.value!.clearFiles()
  const file = files[0] as UploadRawFile
  file.uid = genFileId()
  upload.value!.handleStart(file)
}

function closeFileCard(): void {
  excelFile.value = null
  upload.value!.clearFiles()
}

defineExpose({
  data,
})
</script>

<template>
  <h3>
    <el-icon>
      <Upload />
    </el-icon>
    {{ t("h.upload") }}
  </h3>
  <el-upload
    v-show="!excelFile"
    ref="upload"
    drag
    :on-change="getFile"
    accept=".xls,.xlsx"
    :limit="1"
    :auto-upload="false"
    :on-exceed="exceedHandler"
    :show-file-list="false"
  >
    <el-icon
      color="#2962f1"
      size="30"
      class="el-icon--upload"
    >
      <uploadIcon style="color: var(--color)" />
    </el-icon>
    <div class="el-upload__text">
      <el-text>{{ t("upload.tip.common") }}</el-text>
    </div>
    <div class="el-upload__text">
      <el-text size="small">{{ t("upload.tip.fileSupport") }}</el-text>
    </div>
  </el-upload>
  <el-card
    v-loading="pending"
    v-show="excelFile"
    shadow="hover"
  >
    <el-row>
      <el-col :span="4">
        <el-icon size="2em">
          <excelIcon />
        </el-icon>
      </el-col>
      <el-col :span="18">
        <el-space
          style="height: 100%"
          alignment="center"
        >
          <el-text truncated>{{ name }}</el-text>
        </el-space>
      </el-col>
      <el-col :span="2">
        <el-button
          text
          @click="closeFileCard"
        >
          <el-icon>
            <close />
          </el-icon>
        </el-button>
      </el-col>
    </el-row>
  </el-card>
</template>
