<script setup lang="ts">
import { ref } from "vue"
import { Upload, Close } from "@element-plus/icons-vue"
import { genFileId, ElMessage } from "element-plus"
import type { UploadInstance, UploadFile, UploadRawFile } from "element-plus"
import type { ExcelDataInfo, SheetInfo } from "@/types/types"
import { useI18n } from "vue-i18n"
import uploadIcon from "@/components/icons/upload-icon.vue"
import excelIcon from "@/components/icons/excel-icon.vue"
import { useFileReader } from "@qww0302/use-bitable"
import { Error } from "@/utils"
import viewXLSX from "@/components/view-xlsx/index.vue"

const showView = ref(false)
function toggleShowView() {
  showView.value = !showView.value
}

const upload = ref<UploadInstance>()
const { t } = useI18n()
const excelFile = ref<File | null>(null)

const { data, pending, name } = useFileReader<ExcelDataInfo | null>(excelFile, {
  load: async (data, resolve) => {
    if (typeof Worker === "undefined") {
      try {
        const XLSX = await import("xlsx")
        const cptable = await import("xlsx/dist/cpexcel.full.mjs")
        XLSX.set_cptable(cptable)
        const workbook = XLSX.read(data, {
          type: "binary",
          raw: true,
          codepage: 65001,
        })
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
            if (records.length) return { name, tableData: { fields, records } }
            return null
          } catch (e) {
            Error({
              title: t("message.sheetError", { sheetName: name }),
              message: String(e),
            })
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
    } else {
      const worker = (await import("./readXLSX.worker.ts?worker")).default
      const reader = new worker()
      reader.onmessage = (e) => {
        const { data } = e
        const { type, payload } = data
        if (type === "readXLSX") {
          console.log(payload)
          if (payload === null) excelFile.value = null
          resolve(payload)
          reader.terminate()
        }
        if (type === "error") {
          if (payload === "message.sheetError") {
            ElMessage.error(
              t("message.sheetError", { sheetName: excelFile.value?.name }),
            )
            Error({
              title: t("message.sheetError", {
                sheetName: excelFile.value?.name,
              }),
              message: t("message.sheetError", {
                sheetName: excelFile.value?.name,
              }),
            })
          }
          if (payload === "message.noSheet") {
            ElMessage.error(t(payload))
            Error({
              title: t(payload),
              message: t(payload),
            })
            excelFile.value = null
          }
        }
      }
      reader.postMessage({
        payload: { data, name: excelFile.value?.name },
        type: "readXLSX",
      })
    }
  },
})

function getFile(file: UploadFile) {
  if (!/\.(xlsx|xls|csv)?$/.test(file.name)) {
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
    accept=".xls,.xlsx,.csv"
    :limit="1"
    :auto-upload="false"
    :on-exceed="exceedHandler"
    :show-file-list="false"
  >
    <KeepAlive>
      <el-icon
        color="#2962f1"
        size="30"
        class="el-icon--upload"
      >
        <uploadIcon style="color: var(--color)" />
      </el-icon>
    </KeepAlive>

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
        <div
          style="
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 100%;
          "
        >
          <el-auto-resizer style="display: flex">
            <template #default="{ width }">
              <el-tooltip>
                <template #content>
                  <span>{{ t("toolTip.clickToPreview", { name }) }}</span>
                </template>
                <el-text
                  class="file-name"
                  @click="toggleShowView"
                  :style="{
                    width: width - 50 + 'px',
                    cursor: 'pointer',
                  }"
                  truncated
                  >{{ name }}</el-text
                >
              </el-tooltip>
              <!-- <el-text
                class="file-name"
                @click="toggleShowView"
                :style="{
                  width: width - 50 + 'px',
                  cursor: 'pointer',
                }"
                truncated
                >{{ name }}</el-text
              > -->
            </template>
          </el-auto-resizer>
        </div>
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

  <el-dialog
    v-model="showView"
    fullscreen
  >
    <viewXLSX :data="data" />
  </el-dialog>
</template>
<style scoped>
.file-name:hover {
  text-decoration: underline;
}
</style>
