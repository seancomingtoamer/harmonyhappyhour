export interface Spot {
  id: string
  title: string
  description: string
  venue: string
  url: string
  category: "Dinner" | "Drinks" | "Activities" | "Events" | "Outdoor"
  costRange: "$" | "$$" | "$$$"
  cityArea: string
  status: "Draft" | "Published" | "Archived"
  imageUrl: string
  harmonysPick: boolean
  affiliateLink?: string
}

export interface Subscriber {
  id: string
  email: string
  status: string
  signupDate: string
}

export type Category = Spot["category"]
export type CostRange = Spot["costRange"]
