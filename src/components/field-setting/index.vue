<script lang="ts" setup>
import { ref, watch } from "vue";
import { FieldType } from "@lark-base-open/js-sdk";
import { useI18n } from "vue-i18n";
import { fieldMap } from "@/types/types";
import { useFieldConfig } from "./composables/useFieldConfig";

const { t } = useI18n();
const props = defineProps({
  field: {
    type: Object as () => fieldMap,
  },
});

const config = ref<fieldMap["config"]>();
const type = ref<FieldType>();

watch(
  () => props.field,
  (newVal) => {
    console.log("config", newVal);
    config.value = newVal?.config;
    type.value = newVal?.field.type;
  },
  { deep: true }
);

const { configForm, allowConfig, refresh, configResult } = useFieldConfig(
  config,
  type
);

const isVisible = ref(false);

const emits = defineEmits<{
  (e: "confirmFormat", format: fieldMap["config"]): void;
}>();

function toggleVisible() {
  isVisible.value = !isVisible.value;
  refresh();
}

function confirm() {
  console.log("confirm", configResult.value);
  emits("confirmFormat", JSON.parse(JSON.stringify(configResult.value)));
  toggleVisible();
}

defineExpose({
  toggleVisible,
  isVisible,
  allowConfig,
});
</script>

<template>
  <el-dialog
    v-model="isVisible"
    lock-scroll
    width="75%"
    :title="t('h.chooseOrCreateFormat')"
  >
    <component :is="configForm" />
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="isVisible = false">{{
          t("button.cancel")
        }}</el-button>
        <el-button type="primary" @click="confirm()">{{
          t("button.confirm")
        }}</el-button>
      </span>
    </template>
  </el-dialog>
</template>
