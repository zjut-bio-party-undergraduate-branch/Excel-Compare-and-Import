<script lang="ts" setup>
import { Calendar, Phone } from "@element-plus/icons-vue";
import { FieldType } from "@lark-base-open/web-api";
import textIcon from "@/components/icons/text-icon.vue";
import barCodeIcon from "@/components/icons/barCode-icon.vue";
import multiSelectIcon from "@/components/icons/multiSelect-icon.vue";
import checkBoxIcon from "@/components/icons/checkBox-icon.vue";
import singleSelectIcon from "@/components/icons/singleSelect-icon.vue";
import currencyIcon from "@/components/icons/currency-icon.vue";
import numberIcon from "@/components/icons/number-icon.vue";
import progressIcon from "@/components/icons/progress-icon.vue";
import ratingIcon from "@/components/icons/rating-icon.vue";
import urlIcon from "@/components/icons/url-icon.vue";

defineProps({
  type: {
    type: Number,
    required: true,
  },
});

const iconList: { [key: number]: any } = {
  [FieldType.DateTime]: Calendar,
  [FieldType.Checkbox]: checkBoxIcon,
  [FieldType.Phone]: Phone,
  [FieldType.Text]: textIcon,
  [FieldType.Barcode]: barCodeIcon,
  [FieldType.MultiSelect]: multiSelectIcon,
  [FieldType.SingleSelect]: singleSelectIcon,
  [FieldType.Currency]: currencyIcon,
  [FieldType.Number]: numberIcon,
  [FieldType.Progress]: progressIcon,
  [FieldType.Rating]: ratingIcon,
  [FieldType.Url]: urlIcon,
};

const nameList: { [key: number]: string } = {
  [FieldType.DateTime]: 'dateTime',
  [FieldType.Checkbox]: 'checkBox',
  [FieldType.Phone]: 'phone',
  [FieldType.Text]: 'text',
  [FieldType.Barcode]: 'barCode',
  [FieldType.MultiSelect]: 'multiSelect',
  [FieldType.SingleSelect]: 'singleSelect',
  [FieldType.Currency]: 'currency',
  [FieldType.Number]: 'number',
  [FieldType.Progress]: 'progress',
  [FieldType.Rating]: 'rating',
  [FieldType.Url]: 'url',
};
</script>

<template>
  <el-tooltip>
  <template #content>
    <span>{{ $t(`fieldType.${nameList[type]}`) }}</span>
  </template>
    <el-icon><component :is="iconList[type]" /></el-icon>
  </el-tooltip>
</template>
