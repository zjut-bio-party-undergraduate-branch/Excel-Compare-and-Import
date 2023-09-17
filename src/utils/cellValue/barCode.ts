/**
 * Get barcode cell value
 * @param value
 * @returns
 */
export function barCode(value: string) {
  return [
    {
      text: String(value),
      type: "text",
    },
  ]
}
