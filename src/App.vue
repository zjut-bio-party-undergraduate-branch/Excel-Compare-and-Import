<script setup lang="ts">
import settingForm from "@/components/setting-form/index.vue"
import upload from "@/components/upload/index.vue"
import Info from "@/components/info/index.vue"
import { ref, onMounted, watch } from "vue"
import {
  bitable,
  ThemeModeType,
  HostContainerSize,
} from "@lark-base-open/js-sdk"
import { isDark } from "@/utils/index"
import { useI18n } from "vue-i18n"
import { Link } from "@element-plus/icons-vue"
import { useBitableTheme } from "@/utils/index"
import { ExcelDataInfo } from "./types/types"
import { useHead } from "@unhead/vue"
//@ts-ignore
import { default as Meta } from "virtual:meta"

useHead({
  meta: [
    {
      name: "description",
      content: Meta.description,
    },
    {
      name: "keywords",
      content: String(Meta.keywords),
    },
    {
      name: "author",
      content: Meta.author.name,
    },
    {
      name: "viewport",
      content: "width=device-width, initial-scale=1.0",
    },
  ],
})

const settingRef = ref()
const uploadRef = ref()
const { t } = useI18n()

const { themeMode } = useBitableTheme()
const data = ref<ExcelDataInfo>()
const isActive = ref(false)

watch(
  () => themeMode.value,
  (newVal) => {
    isDark.value = newVal === ThemeModeType.DARK
  },
)

watch(
  () => uploadRef.value?.data,
  (newVal) => {
    data.value = newVal
  },
  { deep: true },
)

watch(
  () => settingRef.value?.isActive,
  (newVal) => {
    isActive.value = newVal
  },
)

onMounted(async () => {
  console.log(settingRef, uploadRef)
  console.log(window.location)
  const theme = await bitable.bridge.getTheme()
  isDark.value = theme === ThemeModeType.DARK
  // await bitable.ui.setHostContainerSize(HostContainerSize.Large)
})

// async function test() {
//   const table = await bitable.base.getTableById("tblxarg8wkDhmjW1")
//   await table.addRecord({
//     fields: {
//       fldfW6yZsr: {
//         tableId: "tbl8ZrlK3haHTHeM",
//         recordIds: ["recqsEpIxU", "recQxzfKuH"],
//       },
//     },
//   })
// }
</script>

<template>
  <el-row justify="space-between">
    <el-link
      target="blank"
      href="https://ct8hv7vfy1.feishu.cn/docx/EOALdRssWoxksuxy7gucmECQnEc"
    >
      <el-icon>
        <Link />
      </el-icon>
      {{ t("guide") }}
    </el-link>
    <span>
      <Info />
    </span>
  </el-row>

  <div v-if="isActive">
    <upload ref="uploadRef" />
  </div>
  <el-empty
    v-else
    :description="t('message.chooseTableFirst')"
  />
  <setting-form
    ref="settingRef"
    :excelData="data"
  />
  <!-- <el-button @click="test">test</el-button> -->
</template>
