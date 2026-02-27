import Link from "next/link"
import { Wine, Send, Mail } from "lucide-react"
import { TELEGRAM_LINK, SITE_NAME } from "@/lib/constants"

export function Footer() {
  return (
    <footer className="border-t border-stone-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Wine className="h-5 w-5 text-amber-500" />
              <span className="font-heading text-lg text-stone-900">{SITE_NAME}</span>
            </div>
            <p className="text-sm text-stone-500 max-w-xs">
              Atlanta&apos;s curated guide to the best happy hours, date nights, and weekend plans for the 30+ crowd.
            </p>
          </div>

          <div>
            <h4 className="font-heading text-base text-stone-900 mb-3">Explore</h4>
            <div className="flex flex-col gap-2">
              <Link href="/explore" className="text-sm text-stone-500 hover:text-amber-600 transition-colors">
                All Spots
              </Link>
              <Link href="/explore?category=Dinner" className="text-sm text-stone-500 hover:text-amber-600 transition-colors">
                Dinner
              </Link>
              <Link href="/explore?category=Drinks" className="text-sm text-stone-500 hover:text-amber-600 transition-colors">
                Drinks
              </Link>
              <Link href="/explore?category=Activities" className="text-sm text-stone-500 hover:text-amber-600 transition-colors">
                Activities
              </Link>
            </div>
          </div>

          <div>
            <h4 className="font-heading text-base text-stone-900 mb-3">Connect</h4>
            <div className="flex flex-col gap-2">
              <a
                href={TELEGRAM_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-stone-500 hover:text-amber-600 transition-colors"
              >
                <Send className="h-4 w-4" />
                Telegram Community
              </a>
              <a
                href="mailto:harmonyhappyhour@agentmail.to"
                className="flex items-center gap-2 text-sm text-stone-500 hover:text-amber-600 transition-colors"
              >
                <Mail className="h-4 w-4" />
                harmonyhappyhour@agentmail.to
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-stone-200 pt-8 text-center">
          <p className="text-xs text-stone-400">
            &copy; {new Date().getFullYear()} {SITE_NAME}. Curated with love in Atlanta.
          </p>
        </div>
      </div>
    </footer>
  )
}
