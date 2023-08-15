<script setup lang="ts">
import settingForm from "@/components/setting-form/index.vue";
import upload from "@/components/upload/index.vue";
import { ref, onMounted, watch, onUnmounted } from "vue";
import { bitable, ThemeModeType } from "@lark-base-open/web-api";
import { isDark } from "./utils";
import { useI18n } from "vue-i18n";

const settingRef = ref();
const uploadRef = ref();
const { t } = useI18n();

const off = bitable.bridge.onThemeChange((ev) => {
  console.log("theme change");
  isDark.value = ev.data.theme === ThemeModeType.DARK;
});

const data = ref(null);
const isActive = ref(false);

watch(
  () => uploadRef.value?.data,
  (newVal) => {
    data.value = newVal;
  },
  { deep: true }
);

watch(
  () => settingRef.value?.isActive,
  (newVal) => {
    isActive.value = newVal;
  }
);

onMounted(async () => {
  console.log(settingRef, uploadRef);
  const theme = await bitable.bridge.getTheme();
  isDark.value = theme === ThemeModeType.DARK;
});

onUnmounted(() => {
  settingRef.value.unlisten();
  off();
});
</script>

<template>
  <div v-if="isActive">
    <upload ref="uploadRef" />
  </div>
  <el-empty v-else :description="t('message.chooseTableFirst')" />
  <setting-form ref="settingRef" :excelData="data" />
</template>
