"use client"

import { cn } from "@/lib/utils"
import { CATEGORIES } from "@/lib/constants"
import type { Category } from "@/lib/types"

interface CategoryPillsProps {
  selected: Category | null
  onSelect: (category: Category | null) => void
  counts?: Record<Category, number>
}

export function CategoryPills({ selected, onSelect, counts }: CategoryPillsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onSelect(null)}
        className={cn(
          "inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-all",
          !selected
            ? "bg-amber-500 text-white shadow-sm"
            : "bg-stone-100 text-stone-600 hover:bg-stone-200"
        )}
      >
        All
      </button>
      {CATEGORIES.map(({ value, label, icon: Icon, color }) => (
        <button
          key={value}
          onClick={() => onSelect(selected === value ? null : value)}
          className={cn(
            "inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-all",
            selected === value
              ? "bg-amber-500 text-white shadow-sm"
              : "bg-stone-100 text-stone-600 hover:bg-stone-200"
          )}
        >
          <Icon className={cn("h-4 w-4", selected === value ? "text-white" : color)} />
          {label}
          {counts && counts[value] > 0 && (
            <span className="text-xs opacity-70">({counts[value]})</span>
          )}
        </button>
      ))}
    </div>
  )
}
