import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "border-transparent bg-amber-500 text-white",
        secondary: "border-transparent bg-stone-100 text-stone-700",
        outline: "border-stone-300 text-stone-700",
        dinner: "border-rose-500/20 bg-rose-500/10 text-rose-500",
        drinks: "border-violet-500/20 bg-violet-500/10 text-violet-500",
        activities: "border-cyan-500/20 bg-cyan-500/10 text-cyan-500",
        events: "border-orange-500/20 bg-orange-500/10 text-orange-500",
        outdoor: "border-emerald-500/20 bg-emerald-500/10 text-emerald-500",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }
