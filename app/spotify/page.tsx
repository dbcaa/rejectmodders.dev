import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { FooterSection } from "@/components/footer-section"
import { SpotifyPageContent } from "@/components/spotify-page-content"

export const metadata: Metadata = {
  title: "Spotify",
  description: "Whatever I've been playing recently. Taste varies a lot, fair warning.",
  openGraph: {
    title: "Spotify | RejectModders",
    description: "Whatever I've been playing recently. Taste varies a lot, fair warning.",
    url: "https://rejectmodders.is-a.dev/spotify",
  },
  twitter: {
    title: "Spotify | RejectModders",
    description: "Whatever I've been playing recently on Spotify.",
  },
}

export default function SpotifyPage() {
  return (
    <main className="relative min-h-screen bg-background text-foreground">
      <Navbar />
      <SpotifyPageContent />
      <FooterSection />
    </main>
  )
}
