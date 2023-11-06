import { ref } from "vue"
import { lifeCircleEventParams } from "@/utils/import/lifeCircle"
import { Task } from "@/types/types"
import { i18n } from "@/i18n"

export interface stage {
  state: string
  disabled: boolean
  message: string
  progress: boolean
  stage: string
  success: number
  error: number
  number: number
  name: string | number
  title: string
  index: number
}

export const currentStage = ref(0)

export const stages = ref<stage[]>([])

export function beforeStage(params: lifeCircleEventParams<Task>) {
  const { stage, data } = params
  const { progress = false, success = 0, error = 0, number = 0 } = data || {}
  const index = stages.value.length
  stages.value.push({
    progress,
    state: "loading",
    index,
    title: stage,
    disabled: false,
    stage,
    name: index,
    number: Array.isArray(number) ? number.length : number,
    success: Array.isArray(success) ? success.length : success,
    error: Array.isArray(error) ? error.length : error,
    message: "",
  })
  currentStage.value = index
}

export function onStage(params: lifeCircleEventParams<Task>) {
  const { stage, data } = params
  const { success = 0, error = 0, message } = data || {}
  const stageItem = stages.value[currentStage.value]
  if (stage !== stageItem.stage) return
  if (success) {
    stageItem.success += typeof success === "number" ? success : success.length
  }
  if (error) {
    stageItem.error += typeof error === "number" ? error : error.length
  }
  if (message) {
    stageItem.message = i18n.global.t(message.text, message.params ?? {})
  }
  if (
    stages.value[index].success + stages.value[index].error ===
    stages.value[index].number
  ) {
    stages.value[index].progress = false
    stages.value[index].state = "success"
  }
}

export function beforeAnalysisRecords(e: lifeCircleEventParams) {
  const { number } = e.data
  const index = stages.value.findIndex(
    (stage) => stage.index === stageIndex["analysisRecords"],
  )
  stages.value[index].number = number
  if (number > 0) {
    stages.value[index].state = "loading"
    stages.value[index].progress = true
  } else {
    stages.value[index].state = "success"
    stages.value[index].progress = false
  }
  stages.value[index].disabled = false
  currentStage.value = stageIndex["analysisRecords"]
}

export function onAnalysisRecords(e: lifeCircleEventParams) {
  const { updateNumber, addNumber, message } = e.data
  const index = stages.value.findIndex(
    (stage) => stage.index === stageIndex["analysisRecords"],
  )
  stages.value[index].success = updateNumber + addNumber
  stages.value[index].message = message
  if (stages.value[index].success === stages.value[index].number) {
    stages.value[index].progress = false
    stages.value[index].state = "success"
  }
}

export function beforeUpdateRecords(e: lifeCircleEventParams) {
  const { updateList } = e.data
  const index = stages.value.findIndex(
    (stage) => stage.index === stageIndex["updateRecords"],
  )
  stages.value[index].number = updateList.length
  if (updateList.length > 0) {
    stages.value[index].state = "loading"
    stages.value[index].progress = true
  } else {
    stages.value[index].state = "success"
    stages.value[index].progress = false
  }
  stages.value[index].disabled = false
  currentStage.value = stageIndex["updateRecords"]
}

export function onUpdateRecords(e: lifeCircleEventParams) {
  const { res } = e.data
  const index = stages.value.findIndex(
    (stage) => stage.index === stageIndex["updateRecords"],
  )
  if (res) {
    console.log("onUpdateRecords", res)
    stages.value[index].success += res.filter((item: any) => item).length
    stages.value[index].error += res.filter((item: any) => !item).length
  }
  if (
    stages.value[index].success + stages.value[index].error ===
    stages.value[index].number
  ) {
    stages.value[index].progress = false
    stages.value[index].state = "success"
  }
}

export function beforeDeleteRecords(e: lifeCircleEventParams) {
  const { deleteList } = e.data
  const index = stages.value.findIndex(
    (stage) => stage.index === stageIndex["deleteRecords"],
  )
  stages.value[index].number = deleteList.length
  if (deleteList.length > 0) {
    stages.value[index].state = "loading"
    stages.value[index].progress = true
  } else {
    stages.value[index].state = "success"
    stages.value[index].progress = false
  }
  stages.value[index].disabled = false
  currentStage.value = stageIndex["deleteRecords"]
}

export function onDeleteRecords(e: lifeCircleEventParams) {
  const { res, number } = e.data
  const index = stages.value.findIndex(
    (stage) => stage.index === stageIndex["deleteRecords"],
  )
  if (res) {
    stages.value[index].success += number
  } else {
    stages.value[index].error += number
  }
  if (
    stages.value[index].success + stages.value[index].error ===
    stages.value[index].number
  ) {
    stages.value[index].progress = false
    stages.value[index].state = "success"
  }
}

export function beforeAddRecords(e: lifeCircleEventParams) {
  const { number } = e.data
  const index = stages.value.findIndex(
    (stage) => stage.index === stageIndex["addRecords"],
  )
  stages.value[index].number = number
  stages.value[index].message = i18n.global.t("importInfo.addRecordsMessage")
  if (number > 0) {
    stages.value[index].state = "loading"
    stages.value[index].progress = true
  } else {
    stages.value[index].state = "success"
    stages.value[index].progress = false
  }
  stages.value[index].disabled = false
  currentStage.value = stageIndex["addRecords"]
}

export function onAddRecords(e: lifeCircleEventParams) {
  const { res } = e.data
  const index = stages.value.findIndex(
    (stage) => stage.index === stageIndex["addRecords"],
  )
  if (res) {
    console.log("onAddRecords", res)
    stages.value[index].success += res.filter((item) => item).length
    stages.value[index].error += res.filter((item) => !item).length
  }
  if (
    stages.value[index].success + stages.value[index].error ===
    stages.value[index].number
  ) {
    stages.value[index].state = "success"
  }
}
