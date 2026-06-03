"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import {
  Shield, Code2, Terminal, MapPin, Calendar, ExternalLink,
  Users, BookOpen, Zap, Globe, Bot, Rocket, GitMerge, Search, Server
} from "lucide-react"
import { SKILLS } from "@/data/skills"
import { EASE, DUR, DUR_FAST, SCROLL_STEP } from "@/lib/animation"

interface GitHubStats {
  public_repos: number; followers: number; following: number
  avatar_url: string; created_at: string
}

const orgs = [
  {
    name: "Disutils Team",
    role: "Former Lead / Founder",
    url: "https://github.com/disutils",
    avatar: `/api/avatar?url=${encodeURIComponent("https://avatars.githubusercontent.com/u/184031343?v=4")}`,
    description: "An org I built around Discord tooling and bot development. We shipped useful stuff, ran a hosting service for a while, and eventually I moved on to focus fully on security work.",
    highlights: ["Disckit Framework", "DisMusic Bot", "Web Hosting", "Inactive"],
  },
  {
    name: "VulnRadar",
    role: "Founder",
    url: "https://vulnradar.dev",
    avatar: `/api/avatar?url=${encodeURIComponent("https://avatars.githubusercontent.com/u/261703628?v=4")}`,
    description: "My current main project. VulnRadar scans websites for security vulnerabilities and gives you a real report - severity ratings, what it found, and exactly how to fix it.",
    highlights: ["310+ Vulnerability Checks", "Instant Reports", "Fix Guidance", "Open Source"],
  },
  {
    name: "WSLATL LLC",
    role: "Founder",
    url: "https://github.com/wslatl",
    avatar: `/api/avatar?url=${encodeURIComponent("https://github.com/wslatl.png")}`,
    description: "A hosting company I started in early 2026. It grew out of the hosting work I was doing through Disutils Team. WSLATL has been picking up solid momentum since launch.",
    highlights: ["Web Hosting", "Growing since 2026", "LLC"],
  },
]

const timelineItems = [
  {
    year: "Early 2023",
    title: "Zero to Coder",
    description: "Started from nothing. Picked up Python with no real direction - just messing around and seeing what stuck.",
    icon: Zap,
    tag: "The Beginning",
  },
  {
    year: "Late 2023",
    title: "The Bot That Started It All",
    description: "Wanted to join a dev team called Loop but wasn't good enough yet. So I started building a Discord bot just to get noticed and improve.",
    icon: Bot,
    tag: "Origin",
  },
  {
    year: "Early 2024",
    title: "UniBot",
    description: "Turned that bot into a real project and started an org around it called UniBot. My first actual thing with a community.",
    icon: Bot,
    tag: "UniBot",
  },
  {
    year: "Mid 2024",
    title: "Disutils Team",
    description: "UniBot evolved and I rebranded the whole thing as Disutils Team. Built Disckit, DisMusic, Discord utilities, and even ran a hosting service for members.",
    icon: Code2,
    tag: "Disutils Team",
  },
  {
    year: "Late 2024 – Mid 2025",
    title: "A Full Year of Disutils",
    description: "Kept building and growing Disutils. Expanded the hosting side of things, picked up C, C++, and C# along the way.",
    icon: GitMerge,
    tag: "Expanding",
  },
  {
    year: "Mid 2025",
    title: "Zero-Trace",
    description: "Wound down Disutils after a great run and built Zero-Trace - a CLI security scanner for finding hidden vulnerabilities.",
    icon: Search,
    tag: "Zero-Trace",
  },
  {
    year: "Late 2025",
    title: "VulnRadar",
    description: "Zero-Trace evolved into something way bigger. Founded VulnRadar as a proper platform with 310+ vulnerability checks and full severity-rated reports.",
    icon: Shield,
    tag: "VulnRadar",
  },
  {
    year: "Early 2026",
    title: "WSLATL LLC",
    description: "Launched WSLATL LLC - a proper hosting company. It grew naturally out of the hosting work from Disutils days and has been picking up real momentum ever since.",
    icon: Server,
    tag: "WSLATL",
  },
  {
    year: "Now",
    title: "Right Now",
    description: "Growing VulnRadar, scaling WSLATL, shipping open-source security tools, and trying to get better at everything I do.",
    icon: Rocket,
    tag: "Present",
  },
]

function SectionHeader({ tag, title, isInView }: { tag: string; title: string; isInView: boolean }) {
  return (
    <motion.div
      initial={false}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: DUR, ease: EASE }}
      className="mb-10"
    >
      <span className="font-mono text-sm text-primary inline-block">{tag}</span>
      <h2 className="mt-2 text-3xl font-bold text-foreground md:text-4xl">{title}</h2>
      <motion.div
        initial={false}
        animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: DUR, delay: SCROLL_STEP, ease: EASE }}
        className="mt-2 h-1 w-16 rounded-full bg-primary origin-left"
      />
    </motion.div>
  )
}

export function AboutPageContent() {
  const [stats, setStats] = useState<GitHubStats | null>(null)
  const heroRef     = useRef(null)
  const skillsRef   = useRef(null)
  const orgsRef     = useRef(null)
  const timelineRef = useRef(null)

  const heroInView     = useInView(heroRef,     { once: true, margin: "-80px" })
  const skillsInView   = useInView(skillsRef,   { once: true, margin: "-80px" })
  const orgsInView     = useInView(orgsRef,     { once: true, margin: "-80px" })
  const timelineInView = useInView(timelineRef, { once: true, margin: "-80px" })

  useEffect(() => {
    fetch("https://api.github.com/users/RejectModders")
      .then(r => r.json()).then(d => { if (d.public_repos !== undefined) setStats(d) }).catch(() => {})
  }, [])

  return (
    <div className="relative pt-24 pb-16 md:pt-32 md:pb-24">
      <div className="mx-auto max-w-5xl px-4">

        {/* Hero */}
        <div ref={heroRef} className="mb-20">
          <motion.div
            initial={false}
            animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: DUR, ease: EASE }}
            className="mb-8"
          >
            <span className="font-mono text-sm text-primary inline-block">{'// about'}</span>
            <h1 className="mt-2 text-4xl font-bold text-foreground md:text-5xl lg:text-6xl">
              About <span className="text-gradient">Me</span>
            </h1>
          </motion.div>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Avatar + stats */}
            <motion.div
              initial={false}
              animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: DUR, delay: SCROLL_STEP, ease: EASE }}
              className="flex flex-col items-center lg:items-start"
            >
              {stats?.avatar_url && (
                <div className="relative mb-6">
                  <img
                    src={`/api/avatar?url=${encodeURIComponent(stats.avatar_url)}`}
                    alt="RejectModders"
                    className="relative h-40 w-40 rounded-2xl border-2 border-primary/20 object-cover transition-transform duration-300 hover:scale-105"
                  />
                  <div className="absolute -bottom-2 -right-2 rounded-full border border-primary/30 bg-background px-3 py-1 font-mono text-xs text-primary animate-pulse-glow">
                    Hireable
                  </div>
                </div>
              )}
              <div className="grid w-full grid-cols-2 gap-3">
                {[
                  { icon: BookOpen, value: stats?.public_repos || "9+", label: "Repos" },
                  { icon: Users,    value: stats?.followers    || "6",  label: "Followers" },
                  { icon: Calendar, value: "2023",                       label: "Joined GH" },
                  { icon: MapPin,   value: "Missouri",                   label: "Location", small: true },
                ].map((s, i) => (
                  <motion.div
                    key={s.label}
                    initial={false}
                    animate={heroInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 16, scale: 0.96 }}
                    transition={{ duration: DUR, delay: SCROLL_STEP + i * SCROLL_STEP, ease: EASE }}
                    className="card-hover rounded-lg border border-border bg-card p-3 text-center cursor-default"
                  >
                    <s.icon className="mx-auto mb-1 h-4 w-4 text-primary" />
                    <div className={`font-mono font-bold text-foreground ${s.small ? "text-sm" : "text-lg"}`}>
                      {s.value}
                    </div>
                    <div className="text-[10px] text-muted-foreground">{s.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Bio */}
            <motion.div
              initial={false}
              animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: DUR, delay: SCROLL_STEP * 2, ease: EASE }}
              className="lg:col-span-2"
            >
              <div className="card-hover rounded-xl border border-border bg-card p-6 md:p-8">
                <div className="mb-6 flex items-center gap-2">
                  {[["bg-[#ff5f57]","border-[#e0443e]"], ["bg-[#febc2e]","border-[#d4a012]"], ["bg-[#28c840]","border-[#1aab29]"]].map(([bg, border], i) => (
                    <div key={i} className={`h-3 w-3 rounded-full border ${bg} ${border}`} />
                  ))}
                  <span className="ml-2 font-mono text-xs text-muted-foreground">about.md</span>
                </div>
                <div className="space-y-5 leading-relaxed text-muted-foreground">
                  {[
                    { icon: Shield, text: <>{"Hey, I'm "}<strong className="text-foreground">RejectModders</strong>{" - cybersecurity developer out of "}<span className="inline-flex items-center gap-1 text-foreground"><MapPin className="h-3.5 w-3.5 text-primary" /> Missouri</span>{". I got into security because I genuinely enjoy figuring out how things break."}</> },
                    { icon: Code2, text: <>Mostly writing <strong className="text-foreground">Python, C, C++, and C#</strong>. I've built everything from security scanners to Discord bots. I just like building useful things.</> },
                    { icon: Server, text: <>Started a hosting company through <strong className="text-foreground">Disutils Team</strong>, and in 2026 spun that out into <strong className="text-foreground">WSLATL LLC</strong>. It's been growing steadily since launch.</> },
                    { icon: Globe, text: <>Most of my focus right now is on <strong className="text-foreground">VulnRadar</strong> - a proper vulnerability scanning platform. Open source, 310+ checks, and built the way I actually wanted a scanner to work.</> },
                  ].map(({ icon: Icon, text }, i) => (
                    <motion.p
                      key={i}
                      initial={false}
                      animate={heroInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -16 }}
                      transition={{ duration: DUR, delay: SCROLL_STEP * 2 + i * SCROLL_STEP, ease: EASE }}
                      className="flex items-start gap-3"
                    >
                      <Icon className="mt-1 h-5 w-5 shrink-0 text-primary" />
                      <span>{text}</span>
                    </motion.p>
                  ))}
                </div>
                <motion.div
                  initial={false}
                  animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
                  transition={{ duration: DUR, delay: SCROLL_STEP * 6, ease: EASE }}
                  className="mt-6 flex flex-wrap gap-3"
                >
                  <a
                    href="https://github.com/RejectModders"
                    target="_blank" rel="noopener noreferrer"
                    className="card-hover flex items-center gap-1.5 rounded-md border border-primary/30 bg-primary/5 px-3 py-1.5 text-xs text-primary hover:bg-primary/10 transition-colors"
                  >
                    <ExternalLink className="h-3 w-3" /> GitHub Profile
                  </a>
                  <a
                    href="https://vulnradar.dev"
                    target="_blank" rel="noopener noreferrer"
                    className="card-hover flex items-center gap-1.5 rounded-md border border-border bg-secondary px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <ExternalLink className="h-3 w-3 text-primary" /> vulnradar.dev
                  </a>
                  <a
                    href="https://github.com/wslatl"
                    target="_blank" rel="noopener noreferrer"
                    className="card-hover flex items-center gap-1.5 rounded-md border border-border bg-secondary px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <ExternalLink className="h-3 w-3 text-primary" /> wslatl on github
                  </a>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Skills */}
        <div ref={skillsRef} className="mb-20">
          <SectionHeader tag="// skills" title="Tech Stack" isInView={skillsInView} />
          <motion.div
            initial={false}
            animate={skillsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: DUR, delay: SCROLL_STEP, ease: EASE }}
            className="card-hover rounded-xl border border-border bg-card p-6 md:p-8"
          >
            <div className="mb-6 flex items-center gap-2">
              {[["bg-[#ff5f57]","border-[#e0443e]"], ["bg-[#febc2e]","border-[#d4a012]"], ["bg-[#28c840]","border-[#1aab29]"]].map(([bg, border], i) => (
                <div key={i} className={`h-3 w-3 rounded-full border ${bg} ${border}`} />
              ))}
              <span className="ml-2 font-mono text-xs text-muted-foreground">skills.json</span>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              {SKILLS.map((skill, i) => (
                <motion.div
                  key={skill.name}
                  initial={false}
                  animate={skillsInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -16 }}
                  transition={{ duration: DUR, delay: SCROLL_STEP + i * 0.05, ease: EASE }}
                >
                  <div className="mb-1.5 flex items-center justify-between">
                    <span className="text-sm font-medium text-foreground">{skill.name}</span>
                    <span className="font-mono text-xs text-primary">{skill.level}%</span>
                  </div>
                  <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-secondary">
                    <motion.div
                      initial={false}
                      animate={skillsInView ? { width: `${Math.min(skill.level, 100)}%` } : { width: 0 }}
                      transition={{ duration: 0.8, delay: SCROLL_STEP * 2 + i * 0.06, ease: EASE }}
                      className="h-full rounded-full bg-primary"
                      style={{ boxShadow: "0 0 8px color-mix(in oklch, var(--primary) 50%, transparent)" }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Organizations */}
        <div ref={orgsRef} className="mb-20">
          <SectionHeader tag="// organizations" title="My Organizations" isInView={orgsInView} />
          <div className="grid gap-6 md:grid-cols-3">
            {orgs.map((org, i) => (
              <motion.a
                key={org.name}
                initial={false}
                animate={orgsInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 24, scale: 0.98 }}
                transition={{ duration: DUR, delay: i * SCROLL_STEP * 2, ease: EASE }}
                href={org.url}
                target="_blank"
                rel="noopener noreferrer"
                className="card-hover group rounded-xl border border-border bg-card p-6"
              >
                <div className="mb-4 flex items-center gap-4">
                  <img src={org.avatar} alt={org.name} className="h-12 w-12 rounded-xl border border-border object-cover" />
                  <div className="min-w-0 flex-1">
                    <h3 className="truncate text-base font-bold text-foreground group-hover:text-primary transition-colors">{org.name}</h3>
                    <span className="font-mono text-xs text-primary">{org.role}</span>
                  </div>
                  <ExternalLink className="h-4 w-4 shrink-0 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <p className="mb-4 text-sm leading-relaxed text-muted-foreground">{org.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {org.highlights.map((h) => (
                    <span
                      key={h}
                      className="rounded-md border border-primary/20 bg-primary/5 px-2 py-0.5 font-mono text-[10px] text-primary/80"
                    >
                      {h}
                    </span>
                  ))}
                </div>
              </motion.a>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div ref={timelineRef}>
          <SectionHeader tag="// journey" title="My Timeline" isInView={timelineInView} />
          <div className="relative">
            <motion.div
              initial={false}
              animate={timelineInView ? { scaleY: 1 } : { scaleY: 0 }}
              transition={{ duration: 0.8, ease: EASE }}
              className="absolute left-5 top-0 bottom-0 w-px bg-border origin-top md:left-1/2 md:-translate-x-px"
            />
            {timelineItems.map((item, i) => {
              const Icon = item.icon
              const isRight = i % 2 !== 0
              return (
                <motion.div
                  key={item.year}
                  initial={false}
                  animate={timelineInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isRight ? 24 : -24 }}
                  transition={{ duration: DUR, delay: SCROLL_STEP + i * 0.08, ease: EASE }}
                  className={`relative mb-10 flex flex-col gap-2 pl-14 md:w-1/2 md:pl-0 ${isRight ? "md:ml-auto md:pl-12" : "md:pr-12 md:text-right"}`}
                >
                  <motion.div
                    initial={false}
                    animate={timelineInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                    transition={{ duration: DUR_FAST, delay: SCROLL_STEP * 2 + i * 0.08, ease: EASE }}
                    className={`absolute left-1.5 top-0.5 flex h-8 w-8 items-center justify-center rounded-full border-2 border-primary bg-background transition-colors hover:bg-primary/10 ${isRight ? "md:-left-4" : "md:left-auto md:-right-4"}`}
                  >
                    <Icon className="h-3.5 w-3.5 text-primary" />
                  </motion.div>

                  <div className={`flex items-center gap-2 ${isRight ? "" : "md:flex-row-reverse md:justify-end"}`}>
                    <span className="font-mono text-sm font-bold text-primary">{item.year}</span>
                    <span className="rounded-full border border-primary/20 bg-primary/5 px-2 py-0.5 font-mono text-[10px] text-primary/70">
                      {item.tag}
                    </span>
                  </div>

                  <h3 className="text-base font-semibold text-foreground">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>

      </div>
    </div>
  )
}

