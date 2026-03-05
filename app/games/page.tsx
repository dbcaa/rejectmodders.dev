import { GamesPageContent } from "@/components/games-page-content"
import { Navbar } from "@/components/navbar"
import { FooterSection } from "@/components/footer-section"

// Cache page for 2 hours - serve completely static from cache
export const revalidate = 7200

export default function GamesPage() {
  return (
    <div className="relative min-h-screen">
      <Navbar />
      <GamesPageContent />
      <FooterSection />
    </div>
  )
}

