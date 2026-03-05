import { GamesPageContent } from "@/components/games-page-content"
import { Navbar } from "@/components/navbar"
import { FooterSection } from "@/components/footer-section"
import type { Metadata } from "next"
import { CACHE_DURATION_PAGE, SITE_URL } from "@/config/constants"

export const metadata: Metadata = {
  title: "Games",
  description: "A small arcade — classic games built in the browser.",
  alternates: {
    canonical: `${SITE_URL}/games`,
  },
}

// Cache page for 2 hours - serve completely static from cache
export const revalidate = CACHE_DURATION_PAGE
export const dynamic = 'force-static'

export default function GamesPage() {
  return (
    <div className="relative min-h-screen">
      <Navbar />
      <GamesPageContent />
      <FooterSection />
    </div>
  )
}

