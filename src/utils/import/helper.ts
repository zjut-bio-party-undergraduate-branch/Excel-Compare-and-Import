export function hasNewElement(target: string[], from: string[]): boolean {
  const res = !from.every((v) => target.includes(v))
  return res
}

export function delay(t: number) {
  return new Promise(function (resolve) {
    setTimeout(resolve, t)
  })
}

export async function asyncFilter(
  arr: any[],
  predicate: (item: any) => Promise<boolean>,
) {
  const results = await Promise.all(arr.map(predicate))
  return arr.filter((_v, index) => results[index])
}

export function isArrayEqual(arr1: any[], arr2: any[]): boolean {
  return (
    arr1.length === arr2.length &&
    arr1.every((v) => {
      return arr2.includes(v)
    })
  )
}

export function isArrayStrictEqual(arr1: any[], arr2: any[]): boolean {
  return (
    arr1.length === arr2.length &&
    arr1.every((v, i) => {
      if (Array.isArray(v)) {
        return isArrayEqual(v, arr2[i])
      }
      return v === arr2[i]
    })
  )
}

export function groupBy<T extends Record<string, any>>(
  arr: Array<T>,
  key: string,
) {
  const res: Record<string, T[]> = {}
  const keys = key.split(".")
  arr.forEach((v) => {
    let k: any = v
    for (const key of keys) {
      k = k[key]
    }
    if (!res[k]) {
      res[k] = []
    }
    res[k].push(v)
  })
  // arr.forEach((v) => {
  //   const k = v[key]
  //   if (!res[k]) {
  //     res[k] = []
  //   }
  //   res[k].push(v)
  // })
  return res
}

export function isNotNull<T>(v: T | null): v is T {
  return v !== null
}

export function isNotEmpty<T>(v: T | null | undefined): v is T {
  return v !== null && v !== undefined
}

export function isNotEmptyString(v: string | null | undefined): v is string {
  return v !== null && v !== undefined && v !== ""
}

export function isNotEmptyArray<T>(v: T[] | null | undefined): v is T[] {
  return v !== null && v !== undefined && v.length > 0
}

export function ArrayHasNoEmpty<T>(v: (T | null | undefined)[]): v is T[] {
  return v.every(isNotEmpty)
}

export function unique<T>(arr: T[]): T[] {
  return Array.from(new Set(arr))
}
