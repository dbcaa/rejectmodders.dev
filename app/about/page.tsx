import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { FooterSection } from "@/components/footer-section"
import { AboutPageContent } from "@/components/about-page-content"
import { CACHE_DURATION_PAGE, SITE_NAME, SITE_URL } from "@/config/constants"

export const metadata: Metadata = {
  title: "About",
  description: `Learn more about ${SITE_NAME} - a cybersecurity-focused developer from Missouri building security tools and open-source projects.`,
  alternates: {
    canonical: `${SITE_URL}/about`,
  },
}

// Cache page for 2 hours - serve completely static from cache
export const revalidate = CACHE_DURATION_PAGE
export const dynamic = 'force-static'

export default function AboutPage() {
  return (
    <main className="relative min-h-screen">
      <Navbar />
      <AboutPageContent />
      <FooterSection />
    </main>
  )
}
