<script setup lang="ts">
import settingForm from "@/components/setting-form/index.vue"
import upload from "@/components/upload/index.vue"
import Info from "@/components/info/index.vue"
import { ref, onMounted, watch } from "vue"
import { bitable, ThemeModeType } from "@lark-base-open/js-sdk"
import { useI18n } from "vue-i18n"
import { Link } from "@element-plus/icons-vue"
import { ExcelDataInfo } from "./types/types"
import { useHead } from "@unhead/vue"
import { useTheme } from "@qww0302/use-bitable"
//@ts-ignore
import { default as Meta } from "virtual:meta"
import { useDark } from "@vueuse/core"

const isDark = useDark()

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

useTheme({
  onChanged: (theme) => {
    isDark.value = theme === ThemeModeType.DARK
  },
})
const data = ref<ExcelDataInfo>()
const isActive = ref(false)

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
})
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
</template>
