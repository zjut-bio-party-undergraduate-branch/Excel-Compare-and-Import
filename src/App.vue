<script setup lang="ts">
import settingForm from "@/components/setting-form/index.vue";
import upload from "@/components/upload/index.vue";
import { ref, onMounted, watch } from "vue";

const settingRef = ref();
const uploadRef = ref();

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

onMounted(() => {
  console.log(settingRef, uploadRef);
});
</script>

<template>
  <div v-if="isActive">
    <upload ref="uploadRef" />
  </div>
  <el-empty v-else description="Please choose a table" />
  <setting-form ref="settingRef" :excelData="data" />
</template>
