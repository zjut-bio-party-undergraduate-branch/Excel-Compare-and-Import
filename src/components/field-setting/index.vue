<script lang="ts" setup>
import { ref, watch, computed } from "vue";
import dayjs from "dayjs";
import { InfoFilled } from "@element-plus/icons-vue";
import { FieldType } from "@lark-base-open/web-api";
import { defaultBoolValue } from "@/components/setting-form/utils/checkBox";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const props = defineProps({
  default: {
    default: "",
  },
  type: {
    type: Number,
    required: true,
  },
});

const canSetType = [
  FieldType.DateTime,
  FieldType.MultiSelect,
  FieldType.Checkbox,
];

const isVisible = ref(false);
const settingInput = ref<any>(props.default);
watch([() => isVisible.value, () => props.default], () => {
  settingInput.value = props.default;
});

const dateFormatList = ref([
  "YYYY/MM/DD",
  "YYYY/MM/DD HH:mm:ss",
  "YYYY/M/D HH:mm",
  "YYYY-MM-DD",
  "YYYY-MM-DD HH:mm:ss",
  "YYYY-MM-DD HH:mm",
  "YYYY-MM-DD HH",
  "YYYY-MM",
  "YYYY",
  "MM-DD",
  "MM-DD HH:mm:ss",
  "MM-DD HH:mm",
  "MM-DD HH",
]);
const emits = defineEmits<{
  (e: "confirmFormat", format: string): void;
}>();
const dateExample = computed(() => {
  if (typeof settingInput.value !== "string") return "";
  return dayjs().format(settingInput.value);
});

function toggleVisible() {
  isVisible.value = !isVisible.value;
}

watch(
  () => props.default,
  (newVal) => {
    settingInput.value = newVal;
  }
);

function confirm() {
  console.log("confirm", settingInput.value);
  emits("confirmFormat", settingInput.value);

  toggleVisible();
}

defineExpose({
  toggleVisible,
  isVisible,
  canSetType,
});
</script>

<template>
  <el-dialog
    v-model="isVisible"
    width="75%"
    :title="t('h.chooseOrCreateFormat')"
  >
    <el-form>
      <el-form-item v-if="type === FieldType.DateTime">
        <template #label>
          <label>
            {{ t("form.label.inputDateFormat") }}
            <el-tooltip effect="dark">
              <template #content>
                <el-text type="info"
                  >{{ t("toolTip.pleaseReferTo")
                  }}<el-link
                    type="primary"
                    href="https://dayjs.gitee.io/docs/en/parse/string-format"
                    target="_blank"
                    >dayjs</el-link
                  ></el-text
                >
              </template>
              <el-icon><InfoFilled /></el-icon>
            </el-tooltip>
          </label>
        </template>
        <el-select
          filterable
          allow-create
          default-first-option
          v-model="settingInput"
          :placeholder="t('input.placeholder.chooseOrCreateFormat')"
        >
          <el-option
            v-for="item in dateFormatList"
            :key="item"
            :label="item"
            :value="item"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        v-if="type === FieldType.DateTime"
        :label="t('form.label.example')"
      >
        <el-input v-model="dateExample" disabled></el-input>
      </el-form-item>
      <el-form-item
        v-if="type === FieldType.MultiSelect"
        :label="t('form.label.separator')"
      >
        <el-input v-model="settingInput"></el-input>
      </el-form-item>
      <el-form-item
        v-if="type === FieldType.Checkbox"
        :label="t('form.label.trueValue')"
      >
        <el-select
          multiple
          filterable
          allow-create
          default-first-option
          v-model="settingInput.true"
        >
          <el-option
            v-for="item in defaultBoolValue.true"
            :key="item"
            :label="item"
            :value="item"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        v-if="type === FieldType.Checkbox"
        :label="t('form.label.falseValue')"
      >
        <el-select
          multiple
          filterable
          allow-create
          default-first-option
          v-model="settingInput.false"
        >
          <el-option
            v-for="item in defaultBoolValue.false"
            :key="item"
            :label="item"
            :value="item"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
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
