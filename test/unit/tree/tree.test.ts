import { FieldType } from "@lark-base-open/js-sdk"
import { fieldMap } from "../../../src/types/types"
import {
  walkTree,
  getTreeLength,
  clearTree,
  getChild,
  getTreeChildren,
  getTreeDepth,
} from "../../../src/utils/import/tree"
import { describe, it, expect } from "vitest"

describe("tree test", () => {
  const fieldsMaps: fieldMap[] = [
    {
      key: "tbl",
      table: "tbl",
      hasChildren: true,
      root: true,
      excel_field: "tbl",
      field: {
        type: FieldType.SingleLink,
        name: "tbl",
        isPrimary: false,
        id: "field_id",
        description: {
          content: [],
        },
        property: {
          tableId: "tbl",
          multiple: false,
        },
      },
      config: {},
      children: [
        {
          key: "tbl1",
          table: "tbl2",
          root: false,
          hasChildren: false,
          excel_field: undefined,
          field: {
            name: "tbl1",
            type: FieldType.Text,
            id: "field_id",
            property: null,
            isPrimary: true,
            description: {
              content: [],
            },
          },
          config: {},
        },
        {
          key: "tbl2",
          table: "tbl3",
          root: false,
          hasChildren: true,
          excel_field: undefined,
          field: {
            name: "tbl1",
            type: FieldType.SingleLink,
            id: "field_id",
            property: {
              tableId: "tbl",
              multiple: false,
            },
            isPrimary: false,
            description: {
              content: [],
            },
          },
          config: {},
          children: [
            {
              key: "tbl3",
              table: "tbl1",
              root: true,
              hasChildren: false,
              excel_field: "tbl1",
              field: {
                name: "tbl1",
                type: FieldType.Text,
                id: "field_id",
                property: null,
                isPrimary: false,
                description: {
                  content: [],
                },
              },
              config: {},
            },
          ],
        },
      ],
    },
    {
      key: "tbl3",
      table: "tbl1",
      root: true,
      hasChildren: false,
      excel_field: "tbl1",
      field: {
        name: "tbl1",
        type: FieldType.Text,
        id: "field_id",
        property: null,
        isPrimary: false,
        description: {
          content: [],
        },
      },
      config: {},
    },
  ]

  it("clearTree", () => {
    const copy = JSON.parse(JSON.stringify(fieldsMaps))
    clearTree(copy)
    expect(copy).toMatchSnapshot()
    expect(
      Object.is(copy[0].excel_field, copy[0].children?.[0].excel_field),
    ).toBe(true)
  })

  it("walkTree: is same child", () => {
    const arr: any[] = []
    walkTree(fieldsMaps, (v: any) => {
      if (v.hasChildren) {
        arr.push(v)
      }
    })
    expect(Object.is(arr[0], fieldsMaps[0])).toBe(true)
  })

  it("getChild: is same child", () => {
    expect(
      Object.is(
        getChild(fieldsMaps, "tbl1"),
        (fieldsMaps[0].children as fieldMap["children"])?.[0],
      ),
    ).toBe(true)
  })

  it("getTreeChildren: is same child", () => {
    expect(
      Object.is(
        getTreeChildren(fieldsMaps, "tbl"),
        (fieldsMaps[0] as fieldMap).children,
      ),
    ).toBe(true)
  })

  it("getTreeLength", () => {
    expect(getTreeLength(fieldsMaps)).toBe(5)
  })

  it("getTreeDepth", () => {
    expect(getTreeDepth(fieldsMaps)).toBe(3)
  })
})
