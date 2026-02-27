import Image from "next/image"
import { MapPin } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { HarmonyPickBadge } from "@/components/harmony-pick-badge"
import { PriceIndicator } from "@/components/price-indicator"
import type { Spot } from "@/lib/types"
import type { Category } from "@/lib/types"

const categoryVariant: Record<Category, "dinner" | "drinks" | "activities" | "events" | "outdoor"> = {
  Dinner: "dinner",
  Drinks: "drinks",
  Activities: "activities",
  Events: "events",
  Outdoor: "outdoor",
}

export function SpotCard({ spot }: { spot: Spot }) {
  const linkUrl = spot.affiliateLink || spot.url || "#"

  return (
    <a href={linkUrl} target="_blank" rel="noopener noreferrer" className="group block">
      <Card className="overflow-hidden transition-all hover:shadow-md hover:-translate-y-0.5">
        <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
          <Image
            src={spot.imageUrl}
            alt={spot.title}
            fill
            className="object-cover transition-transform group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            unoptimized
          />
          {spot.harmonysPick && (
            <div className="absolute top-3 left-3">
              <HarmonyPickBadge />
            </div>
          )}
          <div className="absolute top-3 right-3">
            <Badge variant={categoryVariant[spot.category]}>{spot.category}</Badge>
          </div>
        </div>
        <div className="p-4">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-heading text-lg text-stone-900 leading-tight">{spot.title}</h3>
            <PriceIndicator range={spot.costRange} />
          </div>
          {spot.description && (
            <p className="mt-1.5 text-sm text-stone-500 line-clamp-2">{spot.description}</p>
          )}
          {spot.cityArea && (
            <div className="mt-2 flex items-center gap-1 text-xs text-stone-400">
              <MapPin className="h-3 w-3" />
              {spot.cityArea}
            </div>
          )}
        </div>
      </Card>
    </a>
  )
}
