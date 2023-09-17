import { fieldMap } from "@/types/types"

export function clearTree(tree: fieldMap[]) {
  tree.forEach((v) => {
    if (v.hasChildren && v.children?.length && v.excel_field) {
      v.children = v.children.filter((i) => {
        if (i.field.isPrimary) {
          i.excel_field = v.excel_field
        }
        return i.field.isPrimary || i.excel_field
      })
      clearTree(v.children)
    } else {
      v.children = undefined
    }
  })
}

export function walkTree(
  tree: fieldMap[],
  callback: (v: fieldMap, i: number, tree: fieldMap[], depth: number) => void,
  depth: number = 0,
) {
  tree.forEach((v, i) => {
    callback(v, i, tree, depth)
    if (v.hasChildren && v.children?.length) {
      walkTree(v.children, callback, depth + 1)
    }
  })
}

export function getChild(tree: fieldMap[], key: string) {
  let res: fieldMap | undefined
  walkTree(tree, (v) => {
    if (v.key === key) {
      res = v
    }
  })
  return res
}

export function getTreeChildren(tree: fieldMap[], key: string) {
  let res: fieldMap[] | undefined
  walkTree(tree, (v) => {
    if (v.key === key) {
      res = v.children
    }
  })
  return res
}

export function getTreeLength(tree: fieldMap[]) {
  let res = 0
  walkTree(tree, () => {
    res++
  })
  return res
}

export function getTreeDepth(tree: fieldMap[]) {
  let res = 0
  walkTree(tree, (_v, _i, _tree, depth) => {
    res = Math.max(res, depth)
  })
  return res + 1
}
