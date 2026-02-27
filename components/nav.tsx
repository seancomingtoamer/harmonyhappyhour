"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Wine } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { TELEGRAM_LINK } from "@/lib/constants"

const links = [
  { href: "/", label: "Home" },
  { href: "/explore", label: "Explore" },
]

export function Nav() {
  const pathname = usePathname()

  return (
    <nav className="sticky top-0 z-50 border-b border-stone-200 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <Wine className="h-6 w-6 text-amber-500" />
          <span className="font-heading text-xl text-stone-900">Harmony Happy Hour</span>
        </Link>

        <div className="flex items-center gap-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-amber-600",
                pathname === link.href ? "text-amber-600" : "text-stone-600"
              )}
            >
              {link.label}
            </Link>
          ))}
          <a href={TELEGRAM_LINK} target="_blank" rel="noopener noreferrer">
            <Button size="sm">Join Telegram</Button>
          </a>
        </div>
      </div>
    </nav>
  )
}
