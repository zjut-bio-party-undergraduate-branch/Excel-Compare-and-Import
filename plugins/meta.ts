const ID = "/virtual-meta"

export function Meta(stage: { [key: string]: any }) {
  return {
    name: "meta",
    resolveId(id: string) {
      return id === ID ? ID : null
    },
    load(id: string) {
      if (id !== ID) return null
      return `export default ${JSON.stringify(stage)}`
    },
  }
}
