import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { FooterSection } from "@/components/footer-section"
import { AboutPageContent } from "@/components/about-page-content"

export const metadata: Metadata = {
  title: "About",
  description: "I'm RejectModders, a self-taught cybersecurity developer from Missouri. Started with Discord bots, built Disutils, then shifted to security tooling and VulnRadar.",
  openGraph: {
    title: "About | RejectModders",
    description: "I'm RejectModders, a self-taught cybersecurity developer from Missouri. Started with Discord bots, built Disutils, then shifted to security tooling and VulnRadar.",
    url: "https://rejectmodders.is-a.dev/about",
  },
  twitter: {
    title: "About | RejectModders",
    description: "I'm RejectModders, a self-taught cybersecurity developer from Missouri.",
  },
}

export default function AboutPage() {
  return (
    <main className="relative min-h-screen">
      <Navbar />
      <AboutPageContent />
      <FooterSection />
    </main>
  )
}
