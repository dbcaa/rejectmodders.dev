import { Navbar } from "@/components/navbar"
import { FooterSection } from "@/components/footer-section"
import { AboutPageContent } from "@/components/about-page-content"


// Cache page for 2 hours - serve completely static from cache
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
