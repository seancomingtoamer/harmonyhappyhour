import type { Metadata } from "next"
import { DM_Serif_Display, Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Nav } from "@/components/nav"
import { Footer } from "@/components/footer"
import "./globals.css"

const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-heading",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
})

export const metadata: Metadata = {
  title: "Harmony Happy Hour | Best Happy Hours & Date Nights in Atlanta",
  description:
    "Atlanta's curated guide to the best happy hours, date nights, and weekend plans for the 30+ crowd. Curated by Harmony, delivered every Friday at 5pm.",
  keywords: [
    "best happy hours Atlanta",
    "date night Atlanta",
    "Atlanta happy hour guide",
    "Atlanta date ideas",
    "things to do in Atlanta this weekend",
    "Atlanta restaurants for couples",
    "Atlanta nightlife 30s",
    "Friday happy hour ATL",
    "Atlanta food and drink guide",
  ],
  openGraph: {
    title: "Harmony Happy Hour | Best Happy Hours & Date Nights in Atlanta",
    description:
      "Curated happy hours, date nights, and weekend plans for the 30+ crowd in Atlanta. Every Friday at 5pm.",
    type: "website",
    locale: "en_US",
    siteName: "Harmony Happy Hour",
    url: "https://harmonyhappyhour.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "Harmony Happy Hour",
    description:
      "Atlanta's best happy hours & date nights, curated for the 30+ crowd.",
  },
  robots: { index: true, follow: true },
  metadataBase: new URL("https://harmonyhappyhour.com"),
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Harmony Happy Hour",
              description:
                "Atlanta's curated guide to the best happy hours, date nights, and weekend plans for the 30+ crowd.",
              url: "https://harmonyhappyhour.com",
              areaServed: {
                "@type": "City",
                name: "Atlanta",
                addressRegion: "GA",
                addressCountry: "US",
              },
              knowsAbout: [
                "Happy Hours",
                "Date Nights",
                "Atlanta Restaurants",
                "Atlanta Nightlife",
              ],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ItemList",
              name: "Atlanta Happy Hours & Date Nights",
              description: "Curated list of the best spots in Atlanta",
              url: "https://harmonyhappyhour.com/explore",
              itemListOrder: "https://schema.org/ItemListOrderDescending",
            }),
          }}
        />
      </head>
      <body
        className={`${dmSerif.variable} ${inter.variable} font-body antialiased bg-background text-foreground`}
      >
        <Nav />
        {children}
        <Footer />
        <Analytics />
      </body>
    </html>
  )
}
