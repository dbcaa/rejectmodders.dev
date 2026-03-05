import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { IntroStrip } from "@/components/intro-strip"
import { VulnRadarSection } from "@/components/vulnradar-section"
import { ProjectsSection } from "@/components/projects-section"
import { ContactSection } from "@/components/contact-section"
import { FooterSection } from "@/components/footer-section"
import { CACHE_DURATION_PAGE } from "@/config/constants"

// Cache page for 2 hours - serve completely static from cache
export const revalidate = CACHE_DURATION_PAGE
export const dynamic = 'force-static'

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <Navbar />
      <HeroSection />
      <IntroStrip />
      <VulnRadarSection />
      <ProjectsSection />
      <ContactSection />
      <FooterSection />
    </main>
  )
}
