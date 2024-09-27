<script lang="ts" setup>
import { useI18n } from "vue-i18n"
import heartIcon from "../icons/heart-icon.vue"
defineProps<{
  qrCode: string
  author: string
}>()

const { t } = useI18n()
</script>

<template>
  <div class="reward-container">
    <el-popover
      :width="220"
      trigger="click"
    >
      <template #reference>
        <el-button
          class="reward-button"
          :icon="heartIcon"
          round
        >
          {{ t("reward.rewardAuthor") }}
        </el-button>
      </template>
      <template #default>
        <div class="reward-popover">
          <div class="reward-popover-author">
            <span class="left">{{ t("reward.author") }}</span>
            <span class="name">{{ author }}</span>
          </div>
          <div class="reward-popover-tips">{{ t("reward.tip") }}</div>
          <div class="reward-popover-img">
            <el-image
              :src="qrCode"
              fit="fill"
              loading="lazy"
              alt="qrCode"
            >
              <template #placeholder>
                <el-skeleton style="width: 200px"> </el-skeleton>
              </template>
            </el-image>
          </div>
        </div>
      </template>
    </el-popover>
  </div>
</template>

<style>
html.light {
  --semi-grey-1: 230, 232, 234;
  --semi-grey-4: 136, 141, 146;
  --semi-grey-5: 107, 112, 117;
  --semi-grey-9: 28, 31, 35;
  --semi-blue-5: 0, 100, 250;
}
html.dark {
  --semi-grey-1: 46, 50, 56;
  --semi-grey-4: 107, 112, 117;
  --semi-grey-5: 136, 141, 146;
  --semi-grey-9: 249, 249, 249;
  --semi-blue-5: 84, 169, 255;
}
html {
  --semi-color-primary: rgba(var(--semi-blue-5), 1);
  --semi-color-tertiary: rgba(var(--semi-grey-5), 1);
  --semi-color-text-0: rgba(var(--semi-grey-9), 1);
  --semi-color-tertiary-light-hover: rgba(var(--semi-grey-1), 1);
}
.reward {
  width: 100%;
  padding: 80px 0 10px 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
.reward-container button {
  border: 1px solid var(--semi-color-primary);
  color: var(--semi-color-primary);
  border-radius: 20px;
}
.reward-container .el-popover.el-popper {
  padding: 12px 16px;
}
.reward-popover-author {
  height: 22px;
  line-height: 22px;
  font-size: 14px;
}
.reward-popover-author .left {
  color: var(--semi-color-tertiary);
}
.reward-popover-author .name {
  color: var(--semi-color-text-0);
  margin-left: 16px;
}
.reward-popover-tips {
  color: rgba(var(--semi-grey-4), 1);
  font-size: 12px;
  text-align: center;
  height: 20px;
  line-height: 20px;
  margin-bottom: 4px;
}
.reward-popover-img {
  width: 200px;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--semi-color-tertiary-light-hover);
}
.reward-popover-img img {
  display: block;
  /* width: 100%; */
  height: 200px;
}
</style>
