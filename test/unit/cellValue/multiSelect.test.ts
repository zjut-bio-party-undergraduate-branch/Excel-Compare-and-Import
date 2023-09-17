import { multiSelect } from "../../../src//utils/cellValue/multiSelect"
import { describe, it, expect } from "vitest"
import {
  checkers,
  IMultiSelectFieldMeta,
  FieldType,
  SelectOptionsType,
} from "@lark-base-open/js-sdk"

const field: IMultiSelectFieldMeta = {
  type: FieldType.MultiSelect,
  id: "feldxxxx",
  name: "多选",
  isPrimary: false,
  description: {
    content: [],
  },
  property: {
    options: [
      {
        id: "optxxx1",
        name: "选项1",
        color: 1,
      },
      {
        id: "optxxx2",
        name: "选项2",
        color: 2,
      },
      {
        id: "optxxx3",
        name: "选项3",
        color: 3,
      },
    ],
    optionsType: SelectOptionsType.STATIC,
  },
}
describe("multiSelect", () => {
  it("should return IOpenMultiSelect", () => {
    expect(
      checkers.isMultiSelect(multiSelect("选项1,选项2,选项3", field)),
    ).toBe(true)
    expect(multiSelect("选项1,选项2,选项3", field)).toMatchSnapshot()
  })
})
