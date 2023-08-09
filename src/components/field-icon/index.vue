<script lang="ts" setup>
import { Calendar, CircleCheck } from "@element-plus/icons-vue";
import { FieldType } from "@base-open/web-api";

const props = defineProps({
  type: {
    type: Number,
    required: true,
  },
});

const iconList = {
  [FieldType.DateTime]: Calendar,
  [FieldType.Checkbox]: CircleCheck,
};
</script>

<template>
  <el-icon><component :is="iconList[type]" /></el-icon>
</template>
