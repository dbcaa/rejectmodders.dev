import { Navbar } from "@/components/layout/navbar"
import { FooterSection } from "@/components/layout/footer-section"
import { HeroSection } from "@/components/home/hero-section"
import { IntroStrip } from "@/components/home/intro-strip"
import { VulnRadarSection } from "@/components/home/vulnradar-section"
import { ProjectsSection } from "@/components/home/projects-section"
import { ContactSection } from "@/components/home/contact-section"

export const revalidate = 7200

export default function Home() {
  return (
    <main id="main-content" className="relative min-h-screen">
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
