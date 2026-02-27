import { Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { TELEGRAM_LINK } from "@/lib/constants"

export function TelegramCTA() {
  return (
    <div className="rounded-2xl bg-stone-900 p-8 text-center text-white">
      <Send className="mx-auto h-8 w-8 text-amber-400 mb-3" />
      <h3 className="font-heading text-2xl mb-2">
        Join the Community
      </h3>
      <p className="text-stone-400 mb-6 max-w-md mx-auto">
        Harmony drops real-time recs, last-minute deals, and answers your &quot;where should we go tonight?&quot; questions in Telegram.
      </p>
      <a href={TELEGRAM_LINK} target="_blank" rel="noopener noreferrer">
        <Button className="bg-amber-500 hover:bg-amber-600 text-white" size="lg">
          <Send className="h-4 w-4" />
          Join Harmony&apos;s Telegram
        </Button>
      </a>
    </div>
  )
}
