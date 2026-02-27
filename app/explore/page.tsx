"use client"

import { useState, useEffect, useCallback, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Search } from "lucide-react"
import { CategoryPills } from "@/components/category-pills"
import { SpotGrid } from "@/components/spot-grid"
import { Input } from "@/components/ui/input"
import { NEIGHBORHOODS } from "@/lib/constants"
import type { Spot, Category, CostRange } from "@/lib/types"

function ExploreContent() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const [spots, setSpots] = useState<Spot[]>([])
  const [loading, setLoading] = useState(true)
  const [category, setCategory] = useState<Category | null>(
    (searchParams.get("category") as Category) || null
  )
  const [neighborhood, setNeighborhood] = useState(searchParams.get("neighborhood") || "")
  const [price, setPrice] = useState<CostRange | "">(
    (searchParams.get("price") as CostRange) || ""
  )

  const fetchSpots = useCallback(async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (category) params.set("category", category)
      if (neighborhood) params.set("neighborhood", neighborhood)
      if (price) params.set("price", price)

      const res = await fetch(`/api/spots?${params.toString()}`)
      const data = await res.json()
      setSpots(data.spots || [])
    } catch {
      setSpots([])
    }
    setLoading(false)
  }, [category, neighborhood, price])

  useEffect(() => {
    fetchSpots()
  }, [fetchSpots])

  useEffect(() => {
    const params = new URLSearchParams()
    if (category) params.set("category", category)
    if (neighborhood) params.set("neighborhood", neighborhood)
    if (price) params.set("price", price)
    const query = params.toString()
    router.replace(`/explore${query ? `?${query}` : ""}`, { scroll: false })
  }, [category, neighborhood, price, router])

  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="font-heading text-4xl text-stone-900 mb-2">Explore Spots</h1>
        <p className="text-stone-500">Find your next happy hour or date night in Atlanta.</p>
      </div>

      {/* Filters */}
      <div className="space-y-4 mb-8">
        <CategoryPills selected={category} onSelect={setCategory} />
        <div className="flex flex-wrap gap-3">
          <select
            value={neighborhood}
            onChange={(e) => setNeighborhood(e.target.value)}
            className="h-10 rounded-lg border border-stone-200 bg-white px-3 text-sm text-stone-700 focus:ring-2 focus:ring-amber-500"
          >
            <option value="">All Neighborhoods</option>
            {NEIGHBORHOODS.map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
          <select
            value={price}
            onChange={(e) => setPrice(e.target.value as CostRange | "")}
            className="h-10 rounded-lg border border-stone-200 bg-white px-3 text-sm text-stone-700 focus:ring-2 focus:ring-amber-500"
          >
            <option value="">Any Price</option>
            <option value="$">$ — Budget Friendly</option>
            <option value="$$">$$ — Mid Range</option>
            <option value="$$$">$$$ — Splurge</option>
          </select>
        </div>
      </div>

      {/* Results */}
      {loading ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="animate-pulse rounded-xl border border-stone-200 bg-white overflow-hidden">
              <div className="aspect-[4/3] bg-stone-100" />
              <div className="p-4 space-y-3">
                <div className="h-5 bg-stone-100 rounded w-3/4" />
                <div className="h-4 bg-stone-100 rounded w-full" />
                <div className="h-3 bg-stone-100 rounded w-1/3" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <>
          <p className="text-sm text-stone-400 mb-4">{spots.length} spot{spots.length !== 1 ? "s" : ""} found</p>
          <SpotGrid spots={spots} />
        </>
      )}
    </main>
  )
}

export default function ExplorePage() {
  return (
    <Suspense fallback={
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-10 bg-stone-100 rounded w-48" />
          <div className="h-6 bg-stone-100 rounded w-72" />
        </div>
      </div>
    }>
      <ExploreContent />
    </Suspense>
  )
}
