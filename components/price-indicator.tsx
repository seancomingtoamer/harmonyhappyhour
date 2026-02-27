import { cn } from "@/lib/utils"
import type { CostRange } from "@/lib/types"

export function PriceIndicator({ range }: { range: CostRange }) {
  const levels = range.length

  return (
    <span className="text-sm font-medium whitespace-nowrap" title={`${range} price range`}>
      {[1, 2, 3].map((i) => (
        <span key={i} className={cn(i <= levels ? "text-amber-500" : "text-stone-200")}>
          $
        </span>
      ))}
    </span>
  )
}
