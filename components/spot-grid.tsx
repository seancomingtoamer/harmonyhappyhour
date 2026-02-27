import { SpotCard } from "@/components/spot-card"
import type { Spot } from "@/lib/types"

export function SpotGrid({ spots }: { spots: Spot[] }) {
  if (spots.length === 0) {
    return (
      <div className="py-16 text-center">
        <p className="text-stone-400 text-lg">No spots found. Check back soon!</p>
      </div>
    )
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {spots.map((spot) => (
        <SpotCard key={spot.id} spot={spot} />
      ))}
    </div>
  )
}
