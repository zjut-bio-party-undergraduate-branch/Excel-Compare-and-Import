import { IWidgetTable, bitable } from "@lark-base-open/web-api";
import { importExcel, importModes } from "./import";
import {
  importLifeCircles,
  lifeCircleEventParams,
} from "./lifeCircle";
import { fieldMap, ExcelDataInfo } from "@/types/types";
function postLifeCircleEventInWorker(
  lifeCircle: importLifeCircles,
  e: lifeCircleEventParams
) {
  postMessage({
    lifeCircle: lifeCircle,
    params: e,
  });
}

onmessage = async (e) => {
  console.log("onmessage", e);
  const {
    fieldsMaps,
    excelData,
    sheet_index,
    table: tableId,
    index,
    mode,
  } = e.data;
  if (!fieldsMaps || !excelData || !tableId || !mode) {
    console.error("importWorker: 参数错误", e);
    return;
  }
  const table = await bitable.base.getTableById(tableId);
  await importExcel(
    fieldsMaps as fieldMap[],
    excelData as ExcelDataInfo,
    sheet_index as number,
    table as IWidgetTable,
    index as string | null,
    mode as importModes,
    postLifeCircleEventInWorker
  );
};
