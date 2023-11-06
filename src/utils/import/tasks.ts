import { Task } from "@/types/types"

async function runTasks() {}

export function processTasks(tasks: Task[]) {}
export enum TaskAction {
  Update = "update",
  Delete = "delete",
  Add = "add",
  Link = "link",
}
