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
// const wrapRef = ref()
// const { toggle, isSupported } = useFullscreen(wrapRef)
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
  const theme = await bitable.bridge.getTheme()
  isDark.value = theme === ThemeModeType.DARK
})
</script>

<template>
  <el-scrollbar height="100vh">
    <div
      ref="wrapRef"
      style="padding: 10px"
    >
      <el-row justify="space-between">
        <el-link
          target="_blank"
          href="https://ct8hv7vfy1.feishu.cn/docx/EOALdRssWoxksuxy7gucmECQnEc"
        >
          <el-icon>
            <Link />
          </el-icon>
          {{ t("guide") }}
        </el-link>
        <span>
          <!-- <el-link
          v-if="isSupported"
          type="primary"
          @click="toggle"
        >
          <el-icon><FullScreen /></el-icon>
        </el-link> -->
          <Info />
        </span>
      </el-row>
      <upload ref="uploadRef" />
      <setting-form
        ref="settingRef"
        :excelData="data"
      />
    </div>
  </el-scrollbar>
</template>

<style>
body {
  padding: 0;
  margin: 0;
  overflow: hidden;
}
</style>
