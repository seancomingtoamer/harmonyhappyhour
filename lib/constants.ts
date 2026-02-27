import { UtensilsCrossed, Wine, Sparkles, Calendar, TreePine } from "lucide-react"
import type { Category } from "./types"

export const SITE_NAME = "Harmony Happy Hour"
export const SITE_DESCRIPTION = "Atlanta's curated happy hours & date nights for the 30+ crowd"
export const SITE_URL = "https://harmonyhappyhour.com"

export const TELEGRAM_LINK = "https://t.me/harmonyhappyhour"
export const TELEGRAM_INNER_CIRCLE = "https://t.me/harmonyhappyhour_vip"

export const CATEGORIES: { value: Category; label: string; icon: typeof UtensilsCrossed; color: string }[] = [
  { value: "Dinner", label: "Dinner", icon: UtensilsCrossed, color: "text-rose-500" },
  { value: "Drinks", label: "Drinks", icon: Wine, color: "text-violet-500" },
  { value: "Activities", label: "Activities", icon: Sparkles, color: "text-cyan-500" },
  { value: "Events", label: "Events", icon: Calendar, color: "text-orange-500" },
  { value: "Outdoor", label: "Outdoor", icon: TreePine, color: "text-emerald-500" },
]

export const CATEGORY_COLORS: Record<Category, string> = {
  Dinner: "bg-rose-500/10 text-rose-500 border-rose-500/20",
  Drinks: "bg-violet-500/10 text-violet-500 border-violet-500/20",
  Activities: "bg-cyan-500/10 text-cyan-500 border-cyan-500/20",
  Events: "bg-orange-500/10 text-orange-500 border-orange-500/20",
  Outdoor: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
}

export const NEIGHBORHOODS = [
  "Midtown",
  "Buckhead",
  "Old Fourth Ward",
  "Inman Park",
  "East Atlanta Village",
  "Decatur",
  "West Midtown",
  "Poncey-Highland",
  "Virginia-Highland",
  "Westside",
  "Downtown",
  "Castleberry Hill",
  "Krog Street",
  "Grant Park",
  "Reynoldstown",
]

export const PLACEHOLDER_IMAGES: Record<Category, string> = {
  Dinner: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=400&fit=crop",
  Drinks: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=600&h=400&fit=crop",
  Activities: "https://images.unsplash.com/photo-1543007630-9710e4a00a20?w=600&h=400&fit=crop",
  Events: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&h=400&fit=crop",
  Outdoor: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=600&h=400&fit=crop",
}

export const HERO_IMAGE = "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&h=600&fit=crop"
