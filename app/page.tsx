import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { OrgsSection } from "@/components/orgs-section"
import { VulnRadarSection } from "@/components/vulnradar-section"
import { ProjectsSection } from "@/components/projects-section"
import { ContactSection } from "@/components/contact-section"
import { FooterSection } from "@/components/footer-section"

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <OrgsSection />
      <VulnRadarSection />
      <ProjectsSection />
      <ContactSection />
      <FooterSection />
    </main>
  )
}
