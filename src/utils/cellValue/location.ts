import {
  type ILocationField,
  FieldType,
  IOpenLocation,
} from "@lark-base-open/js-sdk"
import { defineTranslator, type AsyncParams, FieldRole } from "./cell"
import { unique, batch } from "@/utils"
import type { fieldMap } from "@/types/types"

let locationCache: Record<string, IOpenLocation> = {}

interface LocationResponse {
  record_id: string
  address: string
  adname: string
  cityname: string
  full_address: string
  location: string
  name: string
  pname: string
}

// Thanks to Chris Chou's help for providing the API
const GEO_URL = "https://base-translator-api.replit.app/base_geo"
const REGEO_URL = "https://base-translator-api.replit.app/base_regeo"
const LIMIT_NUMBER = 50
const LIMIT_INTERVAL = 1000

const geoHeader = new Headers()
geoHeader.append("Content-Type", "application/json")
geoHeader.append("Referer", "https://location-utils.plz.click")

/**
 * location text to base location
 *
 * @param locations
 * @returns
 */
async function geo(locations: string[]) {
  const fetchOptions = {
    method: "POST",
    headers: geoHeader,
    body: JSON.stringify({
      brand: "feishu",
      location_list: locations.map((i) => {
        return {
          record_id: i,
          input: i,
        }
      }),
    }),
    redirect: "follow" as RequestRedirect,
  }
  return fetch(GEO_URL, fetchOptions)
    .then((response) => response.text())
    .then((res) => JSON.parse(res) as LocationResponse[])
}

const regeoHeader = new Headers()
regeoHeader.append("Content-Type", "application/json")
regeoHeader.append("Referer", "https://location-utils.plz.click")

/**
 * Latitude and longitude to base location
 *
 * @param locations
 * @returns
 */
async function regeo(locations: string[]) {
  const fetchOptions = {
    method: "POST",
    headers: regeoHeader,
    body: JSON.stringify({
      brand: "feishu",
      location_list: locations.map((i) => {
        return {
          record_id: i,
          input: i,
        }
      }),
    }),
    redirect: "follow" as RequestRedirect,
  }
  return fetch(REGEO_URL, fetchOptions)
    .then((response) => response.text())
    .then((res) => JSON.parse(res) as LocationResponse[])
}

function isLatLongitude(value: string) {
  const regoReg = /^(\d+(\.\d+)?),(\d+(\.\d+)?)$/
  return regoReg.test(value)
}

async function batchLocation(
  locations: string[],
  method: (list: string[]) => Promise<LocationResponse[]>,
  onProgress?: (num: number) => void,
) {
  await batch(LIMIT_NUMBER, LIMIT_INTERVAL, locations, async (list) => {
    const res = await method(list)
    res.forEach((i) => {
      locationCache[i.record_id] = {
        address: i.address,
        adname: i.adname,
        cityname: i.cityname,
        full_address: i.full_address,
        location: i.location,
        name: i.name,
        pname: i.pname,
        fullAddress: i.full_address,
      }
      onProgress?.(1)
    })
  })
}

async function getLocation(
  locations: string[],
  options?: {
    type: "geo" | "regeo" | "auto"
    onProgress?: AsyncParams["onProgress"]
  },
) {
  const { type = "auto", onProgress } = options ?? {}
  let loaded = 0
  if (type === "auto") {
    const geoList = unique(locations.filter((i) => !isLatLongitude(i)))
    const regeoList = unique(locations.filter(isLatLongitude))
    if (geoList.length) {
      await batchLocation(geoList, geo, (num) => {
        onProgress?.({
          total: locations.length,
          loaded: loaded + num,
          message: `rate limit: ${LIMIT_NUMBER}/time`,
        })
      })
    }
    if (regeoList.length) {
      await batchLocation(regeoList, regeo, (num) => {
        onProgress?.({
          total: locations.length,
          loaded: loaded + num,
          message: `rate limit: ${LIMIT_NUMBER}/time`,
        })
      })
    }
    return
  }
  const method = type === "geo" ? geo : regeo
  await batchLocation(locations, method, (num) => {
    onProgress?.({
      total: locations.length,
      loaded: loaded + num,
      message: `rate limit: ${LIMIT_NUMBER}/time`,
    })
  })
}

async function location(value: string, field: ILocationField) {
  if (!value) return null
  const location = locationCache[value]
  if (!location) return null
  return field.createCell(location)
}

export const LocationTranslator = defineTranslator({
  fieldType: FieldType.Location,
  translate: location,
  normalization: async (value) => value,
  name: "Location",
  asyncMethod: async (
    options: AsyncParams<string>,
    config?: fieldMap["config"],
  ) => {
    const { data, onProgress, onError } = options
    const { locationConfig } = config ?? {}
    try {
      await getLocation(
        data.map((i) => i.trim()),
        {
          type: locationConfig?.type ?? "auto",
          onProgress,
        },
      )
    } catch (error) {
      onError?.(error)
    }
  },
  roles: [FieldRole.ASYNC],
  refresh: () => {
    locationCache = {}
  },
  reset: () => {},
})
