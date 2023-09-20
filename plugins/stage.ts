const ID = "/virtual-stage"

export function Stage(stage: { [key: string]: any }) {
  return {
    name: "stage",
    resolveId(id: string) {
      return id === ID ? ID : null
    },
    load(id: string) {
      if (id !== ID) return null
      return `export default ${JSON.stringify(stage)}`
    },
  }
}
