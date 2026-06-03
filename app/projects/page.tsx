import { Navbar } from "@/components/layout/navbar"
import { FooterSection } from "@/components/layout/footer-section"
import { ProjectsPageContent } from "@/components/projects/projects-page-content"

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
