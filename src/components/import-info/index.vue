<script lang="ts" setup>
import { ref } from "vue";
import { SuccessFilled, Loading, RemoveFilled } from "@element-plus/icons-vue";
import { useI18n } from "vue-i18n";
import {
  stages,
  defaultStages,
  beforeCheckFields,
  onCheckFields,
  currentStage,
  beforeAddRecords,
  onAddRecords,
  beforeAnalysisRecords,
  onAnalysisRecords,
  beforeCheckOptions,
  onCheckOptions,
  beforeUpdateRecords,
  onUpdateRecords,
  beforeDeleteRecords,
  onDeleteRecords,
  beforeSetOptions,
  onSetOptions,
} from "./utils";
import { addLifeCircleEvent, importLifeCircles } from "@/utils/import";

addLifeCircleEvent(importLifeCircles.beforeCheckFields, beforeCheckFields);
addLifeCircleEvent(importLifeCircles.onCheckFields, onCheckFields);
addLifeCircleEvent(importLifeCircles.beforeAddRecords, beforeAddRecords);
addLifeCircleEvent(importLifeCircles.onAddRecords, onAddRecords);
addLifeCircleEvent(
  importLifeCircles.beforeAnalysisRecords,
  beforeAnalysisRecords
);
addLifeCircleEvent(importLifeCircles.onAnalysisRecords, onAnalysisRecords);
addLifeCircleEvent(importLifeCircles.beforeCheckOptions, beforeCheckOptions);
addLifeCircleEvent(importLifeCircles.onCheckOptions, onCheckOptions);
addLifeCircleEvent(importLifeCircles.beforeUpdateRecords, beforeUpdateRecords);
addLifeCircleEvent(importLifeCircles.onUpdateRecords, onUpdateRecords)
addLifeCircleEvent(importLifeCircles.beforeDeleteRecords, beforeDeleteRecords);
addLifeCircleEvent(importLifeCircles.onDeleteRecords, onDeleteRecords);
// addLifeCircleEvent(importLifeCircles.beforeSetOptions, beforeSetOptions);
// addLifeCircleEvent(importLifeCircles.onSetOptions, onSetOptions);

const { t } = useI18n();

const isVisible = ref(false);

function toggleVisible() {
  isVisible.value = !isVisible.value;
}

function refresh() {
  stages.value = defaultStages();
  currentStage.value = 0;
  isVisible.value = false;
}

defineExpose({
  toggleVisible,
  refresh,
});
</script>

<template>
  <el-dialog v-model="isVisible" lock-scroll fullscreen accordion>
    <template #header> {{ t("importInfo.title") }} </template>
    <el-scrollbar height="70vh">
      <el-collapse v-model="currentStage">
        <el-collapse-item
          v-for="stage in stages"
          :key="stage.index"
          :name="stage.name"
          :disabled="stage.disabled"
        >
          <template #title>
            <el-icon
              v-show="stage.state === 'success'"
              color="var(--el-color-success)"
              size="20"
              ><SuccessFilled
            /></el-icon>
            <el-icon
              v-show="stage.state === 'loading'"
              size="20"
              class="is-loading"
              ><Loading
            /></el-icon>
            <el-icon v-show="stage.state === 'waiting'" size="20"
              ><RemoveFilled
            /></el-icon>
            {{ t(stage.title) }}
          </template>
          <el-progress
            v-if="stage.progress && stage.number"
            :percentage="((stage.success + stage.error) / stage.number) * 100"
            :striped="stage.success + stage.error < stage.number"
            striped-flow
          >
            <template #default>
              <span
                >{{ stage.success + stage.error }} / {{ stage.number }}</span
              >
            </template>
          </el-progress>
          <el-text type="success"
            >{{
              t("importInfo.success", { successNumber: stage.success ?? 0 })
            }},
          </el-text>
          <el-text type="danger" v-if="stage.error"
            >{{ t("importInfo.error", { errorNumber: stage.error ?? 0 }) }},
          </el-text>
          <el-text>{{
            t("importInfo.waiting", {
              waitingNumber: stage.number - (stage.success + stage.error) ?? 0,
            })
          }}</el-text
          ><br />
          <el-text>{{ stage.message }}</el-text>
        </el-collapse-item>
      </el-collapse>
    </el-scrollbar>
  </el-dialog>
</template>
