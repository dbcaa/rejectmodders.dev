import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { FooterSection } from "@/components/footer-section"
import { ProjectsPageContent } from "@/components/projects-page-content"
import { CACHE_DURATION_PAGE, SITE_NAME, SITE_URL } from "@/config/constants"

export const metadata: Metadata = {
  title: "Projects",
  description: `Explore open-source projects and security tools built by ${SITE_NAME}. From VulnRadar to Discord bots and more.`,
  alternates: {
    canonical: `${SITE_URL}/projects`,
  },
}

// Cache page for 2 hours - serve completely static from cache
export const revalidate = CACHE_DURATION_PAGE
export const dynamic = 'force-static'

export default function ProjectsPage() {
  return (
    <main className="relative min-h-screen">
      <Navbar />
      <ProjectsPageContent />
      <FooterSection />
    </main>
  )
}
