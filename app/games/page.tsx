import { GamesPageContent } from "@/components/games-page-content"
import { Navbar } from "@/components/navbar"
import { FooterSection } from "@/components/footer-section"
import { cacheConfig } from "@/config/cache.config"

export const revalidate = cacheConfig.page

export default function GamesPage() {
  return (
    <div className="relative min-h-screen">
      <Navbar />
      <GamesPageContent />
      <FooterSection />
    </div>
  )
}

