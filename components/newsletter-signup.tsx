"use client"

import { useState } from "react"
import { Mail, Loader2, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function NewsletterSignup() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [message, setMessage] = useState("")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return

    setStatus("loading")
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()
      if (res.ok) {
        setStatus("success")
        setMessage("You're in! Check your inbox for a welcome from Harmony.")
        setEmail("")
      } else {
        setStatus("error")
        setMessage(data.error || "Something went wrong. Try again.")
      }
    } catch {
      setStatus("error")
      setMessage("Something went wrong. Try again.")
    }
  }

  return (
    <div className="rounded-2xl bg-amber-50 border border-amber-100 p-8 text-center">
      <Mail className="mx-auto h-8 w-8 text-amber-500 mb-3" />
      <h3 className="font-heading text-2xl text-stone-900 mb-2">
        Get the Friday Drop
      </h3>
      <p className="text-stone-500 mb-6 max-w-md mx-auto">
        Every Friday at 5pm, Harmony sends her curated picks for the best happy hours and date nights this weekend.
      </p>
      <form onSubmit={handleSubmit} className="flex gap-2 max-w-sm mx-auto">
        <Input
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={status === "loading" || status === "success"}
          className="flex-1"
        />
        <Button
          type="submit"
          disabled={status === "loading" || status === "success"}
        >
          {status === "loading" && <Loader2 className="h-4 w-4 animate-spin" />}
          {status === "success" && <Check className="h-4 w-4" />}
          {status === "idle" || status === "error" ? "Subscribe" : null}
        </Button>
      </form>
      {message && (
        <p className={`mt-3 text-sm ${status === "success" ? "text-emerald-600" : "text-red-500"}`}>
          {message}
        </p>
      )}
    </div>
  )
}
