import { NextRequest, NextResponse } from "next/server"
import { getPublishedSpots } from "@/lib/airtable"
import { PLACEHOLDER_SPOTS } from "@/lib/placeholder-data"

export async function GET(req: NextRequest) {
  try {
    let spots = await getPublishedSpots()
    if (spots.length === 0) spots = PLACEHOLDER_SPOTS

    const { searchParams } = req.nextUrl
    const category = searchParams.get("category")
    const neighborhood = searchParams.get("neighborhood")
    const price = searchParams.get("price")

    if (category) {
      spots = spots.filter((s) => s.category === category)
    }
    if (neighborhood) {
      spots = spots.filter((s) => s.cityArea === neighborhood)
    }
    if (price) {
      spots = spots.filter((s) => s.costRange === price)
    }

    return NextResponse.json({ spots })
  } catch {
    return NextResponse.json({ spots: PLACEHOLDER_SPOTS })
  }
}
