import { Navbar } from "@/components/layout/navbar"
import { FooterSection } from "@/components/layout/footer-section"
import { SpotifyPageContent } from "@/components/spotify/spotify-page-content"

export const revalidate = 0

export default function SpotifyPage() {
  return (
    <main className="relative min-h-screen bg-background text-foreground">
      <Navbar />
      <SpotifyPageContent />
      <FooterSection />
    </main>
  )
}
