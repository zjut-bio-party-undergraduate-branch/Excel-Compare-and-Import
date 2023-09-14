<script lang="ts" setup>
import { InfoFilled } from "@element-plus/icons-vue"
import { ref } from "vue"
//@ts-ignore
import { default as Meta } from "/virtual-meta"

const isShow = ref(false)

enum Stage {
  DEV = "Dev",
  ALPHA = "Alpha",
  BETA = "Beta",
  Stable = "Stable",
}
const stage = ref<Stage>(Meta.stage)
const dependencies = ref(Meta.dependencies)
const stageColor = {
  [Stage.DEV]: "info",
  [Stage.ALPHA]: "danger",
  [Stage.BETA]: "warning",
  [Stage.Stable]: "success",
}
</script>

<template>
  <el-button
    type="text"
    @click="isShow = true"
  >
    <el-icon>
      <InfoFilled />
    </el-icon>
  </el-button>

  <el-dialog
    v-model="isShow"
    fullscreen
    lock-scroll
  >
    <el-scrollbar height="calc(100vh - 100px)">
      <el-row justify="center">
        <el-avatar
          size="large"
          shape="square"
          src="/favicon.PNG"
        ></el-avatar>
      </el-row>
      <el-row justify="center">
        <el-text tag="b">
          {{
            Meta.name
              .replace(/_/g, " ")
              .toLowerCase()
              .replace(/( |^)[a-z]/g, (L: string) => L.toUpperCase())
          }}
        </el-text>
      </el-row>
      <el-row justify="center">
        <el-text tag="b">
          v{{
            Meta.version +
            (stage !== Stage.Stable ? `-${stage.toLowerCase()}` : "")
          }}
          <el-tag
            :type="stageColor[stage]"
            effect="dark"
          >
            {{ stage }}
          </el-tag>
        </el-text>
      </el-row>
      <el-row justify="center">
        <el-link
          :href="Meta.author.url ?? undefined"
          target="_blank"
        >
          @{{ Meta.author.name }}
        </el-link>
      </el-row>
      <el-row justify="center">
        <el-text
          type="info"
          tag="p"
        >
          {{ Meta.description }}
        </el-text>
      </el-row>
      <el-row justify="center">
        <el-card
          width="100%"
          header="Dependencies"
          shadow="hover"
        >
          <el-scrollbar max-height="100px">
            <ul class="dependencies">
              <li v-for="i of dependencies">
                <el-tooltip
                  :disabled="!i.description || !i.author?.name"
                  effect="light"
                >
                  <template #content>
                    <el-text
                      type=""
                      tag="p"
                      >{{ i.description }}</el-text
                    >
                    <el-text
                      v-if="i.author?.name"
                      type=""
                      tag="p"
                      >@author: {{ i.author.name }}</el-text
                    >
                  </template>
                  <el-link
                    :href="i.homepage"
                    target="_blank"
                  >
                    <code>
                      <b>{{ i.name }}</b>
                    </code>
                  </el-link>
                </el-tooltip>
                :
                <code>{{ i.version }}</code>
              </li>
            </ul>
          </el-scrollbar>
        </el-card>
      </el-row>
      <el-row justify="center">
        <el-text type="info">
          Released under&nbsp;
          <el-link
            target="_blank"
            href="https://github.com/zjut-bio-party-undergraduate-branch/Excel-Compare-and-Import/blob/main/LICENSE"
          >
            {{ Meta.license }}
          </el-link>
          &nbsp;license.
        </el-text>
      </el-row>
      <el-row justify="center">
        <el-text type="info">Copyright © 2023 {{ Meta.author.name }}</el-text>
      </el-row>
    </el-scrollbar>
  </el-dialog>
</template>

<style scoped>
.el-row {
  margin-bottom: 10px;
}

.dependencies {
  list-style: none;
  padding: 0;
  margin: 0;
  font-size: 12px;
  line-height: 1.5;
}

p {
  overflow-wrap: break-word;
  word-break: keep-all;
}

.dependencies li {
  margin-bottom: 2px;
}

.dependencies code {
  border-radius: 5px;
  /* padding: 2px 5px; */
  background-color: var(--el-border-color-light);
  font-size: 14px;
}
</style>
