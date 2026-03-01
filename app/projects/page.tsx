import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { FooterSection } from "@/components/footer-section"
import { ProjectsPageContent } from "@/components/projects-page-content"

export const metadata: Metadata = {
  title: "Projects",
  description: "Security scanners, Discord bots, and open-source tools. Everything I've built across my personal account, Disutils, and VulnRadar.",
  openGraph: {
    title: "Projects | RejectModders",
    description: "Security scanners, Discord bots, and open-source tools. Everything I've built across my personal account, Disutils, and VulnRadar.",
    url: "https://rejectmodders.is-a.dev/projects",
  },
  twitter: {
    title: "Projects | RejectModders",
    description: "Security scanners, Discord bots, and open-source tools built by RejectModders.",
  },
}

export default function ProjectsPage() {
  return (
    <main className="relative min-h-screen">
      <Navbar />
      <ProjectsPageContent />
      <FooterSection />
    </main>
  )
}
