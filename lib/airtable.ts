import type { Spot } from "./types"
import { PLACEHOLDER_IMAGES } from "./constants"

const AIRTABLE_TOKEN = process.env.AIRTABLE_TOKEN!
const BASE_ID = "appNbcFPHeO45oSEY"

export const TABLES = {
  DATE_IDEAS: "tblLT1qXqTJugYkuD",
  SUBSCRIBERS: "tblYHAYbJHmOdNiMX",
  PROSPECTS: "tblEhhBeePtrLfT3z",
  PARTNERS: "tblInWoMGgSPchkhD",
  OUTREACH: "tblHO0z1DtcDBhR5V",
} as const

const AIRTABLE_BASE = `https://api.airtable.com/v0/${BASE_ID}`

export async function airtableFetch(
  tableId: string,
  options?: {
    filterByFormula?: string
    maxRecords?: number
    sort?: { field: string; direction: "asc" | "desc" }[]
  }
) {
  const params = new URLSearchParams()
  if (options?.filterByFormula) params.set("filterByFormula", options.filterByFormula)
  if (options?.maxRecords) params.set("maxRecords", String(options.maxRecords))
  if (options?.sort) {
    options.sort.forEach((s, i) => {
      params.set(`sort[${i}][field]`, s.field)
      params.set(`sort[${i}][direction]`, s.direction)
    })
  }
  const url = `${AIRTABLE_BASE}/${tableId}?${params.toString()}`
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${AIRTABLE_TOKEN}` },
    next: { revalidate: 300 },
  })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Airtable ${res.status}: ${text}`)
  }
  return res.json()
}

export async function airtableCreate(tableId: string, fields: Record<string, unknown>) {
  const res = await fetch(`${AIRTABLE_BASE}/${tableId}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${AIRTABLE_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ fields }),
  })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Airtable create ${res.status}: ${text}`)
  }
  return res.json()
}

export function recordToSpot(record: { id: string; fields: Record<string, unknown> }): Spot {
  const f = record.fields
  const category = (f.Category as Spot["category"]) || "Dinner"
  return {
    id: record.id,
    title: (f.Title as string) || "",
    description: (f.Description as string) || "",
    venue: (f.Venue as string) || "",
    url: (f.URL as string) || "",
    category,
    costRange: (f.Cost_Range as Spot["costRange"]) || "$$",
    cityArea: (f.City_Area as string) || "",
    status: (f.Status as Spot["status"]) || "Draft",
    imageUrl: (f.Image_URL as string) || PLACEHOLDER_IMAGES[category],
    harmonysPick: f.Harmonys_Pick === "Yes",
    affiliateLink: (f.Affiliate_Link as string) || undefined,
  }
}

export async function getPublishedSpots(): Promise<Spot[]> {
  const data = await airtableFetch(TABLES.DATE_IDEAS, {
    filterByFormula: '{Status} = "Published"',
    sort: [{ field: "Found_Date", direction: "desc" }],
  })
  return (data.records || []).map(recordToSpot)
}

export async function getHarmonysPicks(): Promise<Spot[]> {
  const data = await airtableFetch(TABLES.DATE_IDEAS, {
    filterByFormula: 'AND({Status} = "Published", {Harmonys_Pick} = "Yes")',
    maxRecords: 1,
    sort: [{ field: "Found_Date", direction: "desc" }],
  })
  return (data.records || []).map(recordToSpot)
}
