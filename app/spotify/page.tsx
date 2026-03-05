import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { FooterSection } from "@/components/footer-section"
import { SpotifyPageContent } from "@/components/spotify-page-content"
import { SITE_NAME, SITE_URL } from "@/config/constants"

export const metadata: Metadata = {
  title: "Spotify",
  description: `See what ${SITE_NAME} is currently listening to on Spotify.`,
  alternates: {
    canonical: `${SITE_URL}/spotify`,
  },
}

// Spotify data changes constantly — never cache this page
export const dynamic = 'force-dynamic'
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
