"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { ChevronDown, ArrowRight } from "lucide-react"
import Link from "next/link"
import { GITHUB_URL, TECH_TAGS } from "@/config/constants"
import { EASE, EASE_SNAPPY, DUR, DUR_FAST, PAGE_START, PAGE_STEP } from "@/lib/animation"

export function HeroSection() {
  const ref = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 0.3], ["0%", "20%"])
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])

  return (
    <section ref={ref} className="relative flex min-h-screen items-center justify-center px-4" style={{ overflow: "clip" }}>

      {/* Grid bg */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.15 }}
        transition={{ duration: DUR, ease: EASE }}
        className="absolute inset-0 grid-bg"
      />

      {/* Radial glow */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: DUR * 2, ease: EASE }}
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 50% 40%, color-mix(in oklch, var(--primary) 8%, transparent) 0%, transparent 55%)"
        }}
      />

      {/* Floating orbs */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.025 }}
        transition={{ duration: DUR * 2, ease: EASE, delay: PAGE_START }}
        className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full pointer-events-none blur-3xl"
        style={{ background: "var(--primary)" }}
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.02 }}
        transition={{ duration: DUR * 2, ease: EASE, delay: PAGE_START + PAGE_STEP }}
        className="absolute bottom-1/4 right-1/4 h-80 w-80 rounded-full pointer-events-none blur-3xl"
        style={{ background: "var(--primary)" }}
      />

      <motion.div
        style={{ y, opacity, willChange: "transform, opacity" }}
        className="relative z-10 flex flex-col items-center gap-6 text-center max-w-4xl mx-auto"
      >

        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: DUR, ease: EASE_SNAPPY, delay: PAGE_START }}
          className="flex items-center gap-2.5 rounded-full border border-primary/20 bg-primary/5 px-5 py-2 backdrop-blur-md"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-primary" />
          </span>
          <span className="font-mono text-xs font-medium text-primary tracking-wide">Available for hire</span>
        </motion.div>

        {/* Name - clean fade-up */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: DUR, ease: EASE, delay: PAGE_START + PAGE_STEP }}
          className="text-5xl font-bold tracking-tight text-foreground sm:text-6xl md:text-7xl lg:text-8xl"
        >
          Reject<span className="text-primary">Modders</span>
        </motion.h1>

        {/* Accent line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: DUR, ease: EASE, delay: PAGE_START + PAGE_STEP * 2 }}
          className="h-1 w-32 rounded-full bg-primary origin-center"
        />

        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: DUR, ease: EASE, delay: PAGE_START + PAGE_STEP * 3 }}
          className="max-w-2xl space-y-3"
        >
          <p className="text-lg text-muted-foreground leading-relaxed sm:text-xl">
            Cybersecurity developer from Missouri, building things I actually care about.
          </p>
          <p className="text-base text-foreground/90 font-medium sm:text-lg">
            Security tools, open-source software, and founder of{" "}
            <a href="https://vulnradar.dev" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline underline-offset-2">VulnRadar</a>
            {" "}and{" "}
            <a href="https://github.com/wslatl" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline underline-offset-2">WSLATL LLC</a>.
          </p>
        </motion.div>

        {/* Tech tags */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: DUR, ease: EASE, delay: PAGE_START + PAGE_STEP * 4 }}
          className="flex flex-wrap justify-center gap-2 max-w-xl"
        >
          {TECH_TAGS.map((lang) => (
            <span
              key={lang}
              className="rounded-md border border-border/60 bg-card/50 px-3 py-1.5 font-mono text-xs text-muted-foreground backdrop-blur-sm hover:border-primary/30 hover:text-foreground transition-colors duration-200 cursor-default"
            >
              {lang}
            </span>
          ))}
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: DUR, ease: EASE, delay: PAGE_START + PAGE_STEP * 5 }}
          className="flex flex-col items-center gap-3 pt-2 w-full sm:flex-row sm:justify-center sm:gap-4"
        >
          <Link
            href="/projects"
            className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-7 py-3.5 font-semibold text-primary-foreground shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/25 transition-shadow duration-200 sm:w-auto"
          >
            View Projects
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
          <Link
            href="/about"
            className="inline-flex w-full items-center justify-center rounded-xl border border-border bg-card/50 px-7 py-3.5 font-semibold text-foreground backdrop-blur-sm hover:border-primary/30 hover:bg-card transition-colors duration-200 sm:w-auto"
          >
            About Me
          </Link>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center rounded-xl border border-border bg-card/50 px-7 py-3.5 font-semibold text-foreground backdrop-blur-sm hover:border-primary/30 hover:bg-card transition-colors duration-200 sm:w-auto"
          >
            GitHub
          </a>
        </motion.div>

      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: DUR, ease: EASE, delay: PAGE_START + PAGE_STEP * 6 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 sm:bottom-8"
      >
        <p className="font-mono text-[10px] text-muted-foreground/30 select-none hidden sm:block">
          {`// press Ctrl+K for commands`}
        </p>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ChevronDown className="h-5 w-5 text-muted-foreground/50 sm:h-6 sm:w-6" />
        </motion.div>
      </motion.div>
    </section>
  )
}
