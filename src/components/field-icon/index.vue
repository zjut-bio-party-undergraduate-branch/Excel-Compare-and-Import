<script lang="ts" setup>
import { FieldType } from "@lark-base-open/js-sdk"
import { iconList } from "@/utils/fieldIcons"

defineProps({
  type: {
    type: Number,
    required: true,
  },
})

const nameList: { [key: number]: string } = {
  [FieldType.DateTime]: "dateTime",
  [FieldType.Checkbox]: "checkBox",
  [FieldType.Phone]: "phone",
  [FieldType.Text]: "text",
  [FieldType.Barcode]: "barCode",
  [FieldType.MultiSelect]: "multiSelect",
  [FieldType.SingleSelect]: "singleSelect",
  [FieldType.Currency]: "currency",
  [FieldType.Number]: "number",
  [FieldType.Progress]: "progress",
  [FieldType.Rating]: "rating",
  [FieldType.Url]: "url",
  [FieldType.User]: "user",
  [FieldType.SingleLink]: "singleLink",
  [FieldType.DuplexLink]: "duplexLink",
}
</script>

<template>
  <el-tooltip>
    <template #content>
      <span>{{ $t(`fieldType.${nameList[type]}`) }}</span>
    </template>
    <el-icon><component :is="iconList[type]" /></el-icon>
  </el-tooltip>
</template>
