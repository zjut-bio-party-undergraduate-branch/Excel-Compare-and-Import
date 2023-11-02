<script lang="ts" setup>
import { iconList } from "@/utils/fieldIcons"
import { FieldNameList } from "@/utils"
import { FieldType } from "@lark-base-open/js-sdk"
import { defineAsyncComponent, computed } from "vue"

const props = defineProps({
  type: {
    type: Number as () => FieldType,
    required: true,
  },
})

const icon = computed(() => {
  return defineAsyncComponent({
    loader: iconList[props.type],
  })
})
</script>

<template>
  <el-tooltip>
    <template #content>
      <span>{{ $t(`fieldType.${FieldNameList[type]}`) }}</span>
    </template>
    <el-icon>
      <Suspense>
        <icon />
      </Suspense>
    </el-icon>
  </el-tooltip>
</template>
