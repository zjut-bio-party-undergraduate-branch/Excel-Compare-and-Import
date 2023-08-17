import {
  importLifeCircles,
  lifeCircleEventParams,
  runLifeCircleEvent,
} from "./lifeCircle";
import importWorker from "./import.worker?worker";


export const importWorkerInstance = new importWorker();

importWorkerInstance.onmessage = async (e) => {
  console.log("importWorkerInstance.onmessage", e);
  const { lifeCircle, params } = e.data;
  await runLifeCircleEvent(
    lifeCircle as importLifeCircles,
    params as lifeCircleEventParams
  );
};
