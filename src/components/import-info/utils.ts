import { ref } from "vue";
import { IFieldMeta } from "@lark-base-open/web-api";
import { i18n } from "@/i18n";

export interface stage {
  state: string;
  disabled: boolean;
  message?: string;
  progress: boolean;
  stage: string;
  success: number;
  error: number;
  number: number;
  name: string | number;
  title: string;
  index: number;
}

const stageIndex = {
  checkFieldTypes: 0,
  checkOptions: 1,
  setOptions: 2,
  analysisRecords: 3,
  deleteRecords: 4,
  addRecords: 5,
};

export const currentStage = ref(0);

export const defaultStages = () => [
  {
    state: "waiting",
    disabled: false,
    message: "",
    progress: true,
    stage: "checkFieldTypes",
    success: 0,
    error: 0,
    number: 0,
    name: stageIndex["checkFieldTypes"],
    title: "importInfo.checkFieldTypes",
    index: stageIndex["checkFieldTypes"],
  },
  {
    state: "waiting",
    disabled: true,
    message: "",
    progress: false,
    stage: "checkOptions",
    success: 0,
    error: 0,
    number: 0,
    name: stageIndex["checkOptions"],
    title: "importInfo.checkOptions",
    index: stageIndex["checkOptions"],
  },
  {
    state: "waiting",
    disabled: true,
    message: "",
    progress: false,
    stage: "setOptions",
    success: 0,
    error: 0,
    number: 0,
    name: stageIndex["setOptions"],
    title: "importInfo.setOptions",
    index: stageIndex["setOptions"],
  },
  {
    state: "waiting",
    disabled: true,
    message: "",
    progress: false,
    stage: "analysisRecords",
    success: 0,
    error: 0,
    number: 0,
    name: stageIndex["analysisRecords"],
    title: "importInfo.analysisRecords",
    index: stageIndex["analysisRecords"],
  },
  {
    state: "waiting",
    disabled: true,
    message: "",
    progress: false,
    stage: "deleteRecords",
    success: 0,
    error: 0,
    number: 0,
    name: stageIndex["deleteRecords"],
    title: "importInfo.deleteRecords",
    index: stageIndex["deleteRecords"],
  },
  {
    state: "waiting",
    disabled: true,
    message: "",
    progress: false,
    stage: "addRecords",
    success: 0,
    error: 0,
    number: 0,
    name: stageIndex["addRecords"],
    title: "importInfo.addRecords",
    index: stageIndex["addRecords"],
  },
];

export const stages = ref<stage[]>(defaultStages());

export function beforeCheckFields({
  number,
}: {
  state: string;
  number: number;
}) {
  const index = stages.value.findIndex(
    (stage) => stage.index === stageIndex["checkFieldTypes"]
  );
  stages.value[index].number = number;
  if (number > 0) {
    stages.value[index].state = "loading";
    stages.value[index].progress = true;
  } else {
    stages.value[index].state = "success";
    stages.value[index].progress = false;
  }

  stages.value[index].disabled = false;
  currentStage.value = stageIndex["checkFieldTypes"];
}

const optionsFieldsNumber = ref(0);

export function onCheckFields({
  res,
}: {
  state?: string;
  field?: IFieldMeta;
  res?: boolean;
}) {
  const index = stages.value.findIndex(
    (stage) => stage.index === stageIndex["checkFieldTypes"]
  );
  stages.value[index].success += 1;
  if (res) {
    optionsFieldsNumber.value += 1;
    stages.value[index].message = i18n.global.t(
      "importInfo.checkFieldsMessage",
      {
        totalNumber: optionsFieldsNumber.value,
      }
    );
  }
  if (
    stages.value[index].success + stages.value[index].error ===
    stages.value[index].number
  ) {
    stages.value[index].progress = false;
    stages.value[index].state = "success";
  }
}

export function beforeCheckOptions({
  number,
}: {
  state: string;
  number: number;
}) {
  const index = stages.value.findIndex(
    (stage) => stage.index === stageIndex["checkOptions"]
  );
  stages.value[index].number = number;
  if (number > 0) {
    stages.value[index].state = "loading";
    stages.value[index].progress = true;
  } else {
    stages.value[index].state = "success";
    stages.value[index].progress = false;
  }
  stages.value[index].disabled = false;
  currentStage.value = stageIndex["checkOptions"];
}

export function onCheckOptions({
  selects,
}: {
  selects: any[];
  state?: string;
  field?: IFieldMeta;
}) {
  const index = stages.value.findIndex(
    (stage) => stage.index === stageIndex["checkOptions"]
  );
  console.log("onCheckOptions", selects, stages.value[index]);
  stages.value[index].success += 1;
  stages.value[index].message = i18n.global.t(
    "importInfo.checkOptionsMessage",
    {
      totalNumber: selects.length,
    }
  );
  if (
    stages.value[index].success + stages.value[index].error ===
    stages.value[index].number
  ) {
    stages.value[index].progress = false;
    stages.value[index].state = "success";
  }
}

export function beforeSetOptions({
  number,
}: {
  state: string;
  number: number;
}) {
  const index = stages.value.findIndex(
    (stage) => stage.index === stageIndex["setOptions"]
  );
  stages.value[index].number = number;
  if (number > 0) {
    stages.value[index].state = "loading";
    stages.value[index].progress = true;
  } else {
    stages.value[index].state = "success";
  }
  stages.value[index].disabled = false;
  currentStage.value = stageIndex["setOptions"];
}

export function onSetOptions({ record }: { state?: string; record?: string }) {
  const index = stages.value.findIndex(
    (stage) => stage.index === stageIndex["setOptions"]
  );
  if (record) {
    stages.value[index].success += 1;
  } else {
    stages.value[index].error += 1;
  }
}

export function beforeAnalysisRecords({
  number,
}: {
  state: string;
  number: number;
  mode: string;
}) {
  const index = stages.value.findIndex(
    (stage) => stage.index === stageIndex["analysisRecords"]
  );
  stages.value[index].number = number;
  if (number > 0) {
    stages.value[index].state = "loading";
    stages.value[index].progress = true;
  } else {
    stages.value[index].state = "success";
    stages.value[index].progress = false;
  }
  stages.value[index].disabled = false;
  currentStage.value = stageIndex["analysisRecords"];
}

export function onAnalysisRecords({
  records,
}: {
  state?: string;
  records: any[];
  mode?: string;
}) {
  const index = stages.value.findIndex(
    (stage) => stage.index === stageIndex["analysisRecords"]
  );
  stages.value[index].success = records.length;
  if (records.length === stages.value[index].number) {
    stages.value[index].progress = false;
    stages.value[index].state = "success";
  }
}

export function beforeDeleteRecords({
  deleteList,
}: {
  state: string;
  deleteList: any[];
}) {
  const index = stages.value.findIndex(
    (stage) => stage.index === stageIndex["deleteRecords"]
  );
  stages.value[index].number = deleteList.length;
  if (deleteList.length > 0) {
    stages.value[index].state = "loading";
    stages.value[index].progress = true;
  } else {
    stages.value[index].state = "success";
    stages.value[index].progress = false;
  }
  stages.value[index].disabled = false;
  currentStage.value = stageIndex["deleteRecords"];
}

export function onDeleteRecords({ res }: { state?: string; res?: boolean }) {
  const index = stages.value.findIndex(
    (stage) => stage.index === stageIndex["deleteRecords"]
  );
  if (res) {
    stages.value[index].success += 1;
  } else {
    stages.value[index].error += 1;
  }
  if (
    stages.value[index].success + stages.value[index].error ===
    stages.value[index].number
  ) {
    stages.value[index].progress = false;
    stages.value[index].state = "success";
  }
}

export function beforeAddRecords({
  records,
}: {
  state: string;
  records: any[];
}) {
  const index = stages.value.findIndex(
    (stage) => stage.index === stageIndex["addRecords"]
  );
  stages.value[index].number = records.length;
  stages.value[index].message = i18n.global.t("importInfo.addRecordsMessage");
  if (records.length > 0) {
    stages.value[index].state = "loading";
    stages.value[index].progress = true;
  } else {
    stages.value[index].state = "success";
    stages.value[index].progress = false;
  }
  stages.value[index].disabled = false;
  currentStage.value = stageIndex["addRecords"];
}

export function onAddRecords({ res }: { res: string }) {
  const index = stages.value.findIndex(
    (stage) => stage.index === stageIndex["addRecords"]
  );
  if (res) {
    stages.value[index].success += 1;
  } else {
    stages.value[index].error += 1;
  }
  if (
    stages.value[index].success + stages.value[index].error ===
    stages.value[index].number
  ) {
    stages.value[index].state = "success";
  }
}
