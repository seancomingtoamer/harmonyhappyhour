import Image from "next/image"
import Link from "next/link"
import { Sparkles, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SpotGrid } from "@/components/spot-grid"
import { NewsletterSignup } from "@/components/newsletter-signup"
import { TelegramCTA } from "@/components/telegram-cta"
import { HarmonyPickBadge } from "@/components/harmony-pick-badge"
import { PriceIndicator } from "@/components/price-indicator"
import { CATEGORIES, TELEGRAM_LINK, HERO_IMAGE } from "@/lib/constants"
import { getPublishedSpots, getHarmonysPicks } from "@/lib/airtable"
import { PLACEHOLDER_SPOTS } from "@/lib/placeholder-data"
import type { Spot, Category } from "@/lib/types"

async function getSpots(): Promise<Spot[]> {
  try {
    const spots = await getPublishedSpots()
    return spots.length > 0 ? spots : PLACEHOLDER_SPOTS
  } catch {
    return PLACEHOLDER_SPOTS
  }
}

async function getPick(): Promise<Spot | null> {
  try {
    const picks = await getHarmonysPicks()
    if (picks.length > 0) return picks[0]
  } catch {
    // fallback
  }
  return PLACEHOLDER_SPOTS.find((s) => s.harmonysPick) || null
}

const categoryVariant: Record<Category, "dinner" | "drinks" | "activities" | "events" | "outdoor"> = {
  Dinner: "dinner",
  Drinks: "drinks",
  Activities: "activities",
  Events: "events",
  Outdoor: "outdoor",
}

export default async function HomePage() {
  const [spots, pick] = await Promise.all([getSpots(), getPick()])

  const hotSpots = spots.slice(0, 6)
  const categoryCounts = spots.reduce(
    (acc, s) => {
      acc[s.category] = (acc[s.category] || 0) + 1
      return acc
    },
    {} as Record<string, number>
  )

  return (
    <main>
      {/* Hero */}
      <section className="relative h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <Image
          src={HERO_IMAGE}
          alt="Atlanta dining scene"
          fill
          className="object-cover"
          priority
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-b from-stone-900/60 via-stone-900/40 to-stone-900/70" />
        <div className="relative z-10 text-center px-4 max-w-3xl">
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl text-white mb-4 leading-tight">
            Atlanta&apos;s Best Happy Hours &amp; Date Nights
          </h1>
          <p className="text-lg text-stone-200 mb-8 max-w-xl mx-auto">
            Curated by Harmony. Every weekend, the best spots for couples and friends who know what they like.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/explore">
              <Button size="lg">Explore Spots</Button>
            </Link>
            <a href={TELEGRAM_LINK} target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" size="lg" className="border border-white/60 text-white bg-white/10 hover:bg-white/20 hover:text-white">
                Join the Telegram
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Harmony's Pick */}
      {pick && (
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 -mt-16 relative z-20">
          <a href={pick.affiliateLink || pick.url || "#"} target="_blank" rel="noopener noreferrer" className="group block">
            <Card className="overflow-hidden md:flex">
              <div className="relative md:w-1/2 aspect-[16/9] md:aspect-auto min-h-[250px] overflow-hidden">
                <Image
                  src={pick.imageUrl}
                  alt={pick.title}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                  unoptimized
                />
              </div>
              <div className="p-6 md:p-8 md:w-1/2 flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-3">
                  <HarmonyPickBadge />
                  <span className="text-xs text-stone-400 uppercase tracking-wide">Pick of the Week</span>
                </div>
                <h2 className="font-heading text-3xl text-stone-900 mb-2">{pick.title}</h2>
                <p className="text-stone-500 mb-4">{pick.description}</p>
                <div className="flex items-center gap-4 text-sm text-stone-400">
                  <Badge variant={categoryVariant[pick.category]}>{pick.category}</Badge>
                  <PriceIndicator range={pick.costRange} />
                  {pick.cityArea && (
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {pick.cityArea}
                    </span>
                  )}
                </div>
              </div>
            </Card>
          </a>
        </section>
      )}

      {/* Category Browse */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="font-heading text-3xl text-stone-900 text-center mb-8">Browse by Vibe</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {CATEGORIES.map(({ value, label, icon: Icon, color }) => (
            <Link
              key={value}
              href={`/explore?category=${value}`}
              className="group flex flex-col items-center gap-2 rounded-xl border border-stone-200 bg-white p-6 transition-all hover:shadow-md hover:-translate-y-0.5"
            >
              <Icon className={`h-8 w-8 ${color} transition-transform group-hover:scale-110`} />
              <span className="font-medium text-stone-700">{label}</span>
              <span className="text-xs text-stone-400">{categoryCounts[value] || 0} spots</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Hot Right Now */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-heading text-3xl text-stone-900">
            <Sparkles className="inline h-6 w-6 text-amber-500 mr-2" />
            Hot Right Now
          </h2>
          <Link href="/explore" className="text-sm text-amber-600 hover:text-amber-700 font-medium">
            View all &rarr;
          </Link>
        </div>
        <SpotGrid spots={hotSpots} />
      </section>

      {/* Social Proof */}
      <section className="border-y border-stone-200 bg-stone-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-wrap justify-center gap-8 text-center">
            <div>
              <p className="font-heading text-3xl text-amber-500">{spots.length}+</p>
              <p className="text-sm text-stone-500">Spots Curated</p>
            </div>
            <div>
              <p className="font-heading text-3xl text-amber-500">15+</p>
              <p className="text-sm text-stone-500">Neighborhoods</p>
            </div>
            <div>
              <p className="font-heading text-3xl text-amber-500">Fridays</p>
              <p className="text-sm text-stone-500">at 5pm</p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <NewsletterSignup />
      </section>

      {/* Telegram CTA */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16">
        <TelegramCTA />
      </section>
    </main>
  )
}
