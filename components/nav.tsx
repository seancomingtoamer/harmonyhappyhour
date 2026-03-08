"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Wine, Car, Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { TELEGRAM_LINK } from "@/lib/constants"

const links = [
  { href: "/", label: "Home" },
  { href: "/explore", label: "Explore" },
]

export function Nav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 border-b border-stone-200 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <Wine className="h-6 w-6 text-amber-500" />
          <span className="font-heading text-xl text-stone-900">Harmony Happy Hour</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
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
          <a
            href="https://t.me/+b3_v1rIaub82NzVh"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm font-medium text-stone-600 transition-colors hover:text-green-600"
          >
            <Car className="h-4 w-4" />
            Need a Ride?
          </a>
          <a href={TELEGRAM_LINK} target="_blank" rel="noopener noreferrer">
            <Button size="sm">Join Telegram</Button>
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 text-stone-600 hover:text-stone-900"
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-stone-200 bg-white px-4 py-4 space-y-4">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={cn(
                "block text-base font-medium transition-colors hover:text-amber-600",
                pathname === link.href ? "text-amber-600" : "text-stone-600"
              )}
            >
              {link.label}
            </Link>
          ))}
          <a
            href="https://t.me/+b3_v1rIaub82NzVh"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-base font-medium text-stone-600 transition-colors hover:text-green-600"
          >
            <Car className="h-4 w-4" />
            Need a Ride?
          </a>
          <a href={TELEGRAM_LINK} target="_blank" rel="noopener noreferrer" className="block">
            <Button size="sm" className="w-full">Join Telegram</Button>
          </a>
        </div>
      )}
    </nav>
  )
}
