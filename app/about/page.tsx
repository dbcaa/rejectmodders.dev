import { Navbar } from "@/components/layout/navbar"
import { FooterSection } from "@/components/layout/footer-section"
import { AboutPageContent } from "@/components/about/about-page-content"

export const revalidate = 7200

export default function AboutPage() {
  return (
    <main className="relative min-h-screen">
      <Navbar />
      <AboutPageContent />
      <FooterSection />
    </main>
  )
}
