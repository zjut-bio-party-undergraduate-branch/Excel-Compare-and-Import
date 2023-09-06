export enum importLifeCircles {
  beforeCheckFields = "beforeCheckFields",
  onCheckFields = "onCheckFields",
  beforeCheckOptions = "beforeCheckOptions",
  onCheckOptions = "onCheckOptions",
  beforeSetOptions = "beforeSetOptions",
  onSetOptions = "onSetOptions",
  onSetOptionsFieldEnd = "onSetOptionsFieldEnd",
  beforeAnalysisRecords = "beforeAnalysisRecords",
  onAnalysisRecords = "onAnalysisRecords",
  beforeUpdateRecords = "beforeUpdateRecords",
  onUpdateRecords = "onUpdateRecords",
  beforeDeleteRecords = "beforeDeleteRecords",
  onDeleteRecords = "onDeleteRecords",
  beforeAddRecords = "beforeAddRecords",
  onAddRecords = "onAddRecords",
  onEnd = "onEnd",
}

export interface lifeCircleEventParams {
  stage: importLifeCircles;
  data: any;
}

export type lifeCircleEvent = (
  e: lifeCircleEventParams
) => Promise<void> | void;

export type importLifeCircleEvents = {
  [key in importLifeCircles]: lifeCircleEvent[];
};

export const lifeCircleEvents: importLifeCircleEvents = {
  beforeCheckFields: [],
  onCheckFields: [],
  beforeCheckOptions: [],
  onCheckOptions: [],
  beforeSetOptions: [],
  onSetOptions: [],
  onSetOptionsFieldEnd: [],
  beforeAnalysisRecords: [],
  onAnalysisRecords: [],
  beforeUpdateRecords: [],
  onUpdateRecords: [],
  beforeDeleteRecords: [],
  onDeleteRecords: [],
  beforeAddRecords: [],
  onAddRecords: [],
  onEnd: [],
};

export function addLifeCircleEvent(
  lifeCircle: importLifeCircles,
  callback: (e: any) => Promise<void> | void
) {
  lifeCircleEvents[lifeCircle].push(callback);
}

export function removeLifeCircleEvent(
  lifeCircle: importLifeCircles,
  callback: (e: any) => Promise<void> | void
) {
  const index = lifeCircleEvents[lifeCircle].indexOf(callback);
  if (index > -1) {
    lifeCircleEvents[lifeCircle].splice(index, 1);
  }
}

export function clearLifeCircleEvent(lifeCircle: importLifeCircles) {
  lifeCircleEvents[lifeCircle] = [];
}

export async function runLifeCircleEvent(
  lifeCircle: importLifeCircles,
  e: lifeCircleEventParams
): Promise<void> {
  if (lifeCircleEvents[lifeCircle].length === 0) return;
  Promise.all(lifeCircleEvents[lifeCircle].map((callback) => callback(e)));
}
