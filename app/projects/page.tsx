import { Navbar } from "@/components/navbar"
import { FooterSection } from "@/components/footer-section"
import { ProjectsPageContent } from "@/components/projects-page-content"

// Cache page for 2 hours - serve completely static from cache
export const revalidate = 7200

export default function ProjectsPage() {
  return (
    <main className="relative min-h-screen">
      <Navbar />
      <ProjectsPageContent />
      <FooterSection />
    </main>
  )
}
