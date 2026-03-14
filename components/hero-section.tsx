"use client"

import { motion, useScroll, useTransform, useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { ChevronDown, ArrowRight } from "lucide-react"
import Link from "next/link"
import dynamic from "next/dynamic"
import { GITHUB_URL, TECH_TAGS } from "@/config/constants"

const Particles = dynamic(() => import("@/components/particles"), { ssr: false })

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

const fadeInScale = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 }
  }
}

const letterAnimation = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 }
}

export function HeroSection() {
  const ref = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)
  const isInView = useInView(contentRef, { once: true, amount: 0.3 })
  
  useEffect(() => {
    setMounted(true)
  }, [])

  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 0.3], ["0%", "30%"])
  const opacity = useTransform(scrollYProgress, [0, 0.25], [1, 0])

  const nameText = "Reject"
  const brandText = "Modders"

  return (
    <section ref={ref} className="relative flex min-h-screen items-center justify-center px-4" style={{ overflow: "clip" }}>

      {/* Grid bg with fade in */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.15 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="absolute inset-0 grid-bg" 
      />

      {/* Particles */}
      {mounted && <Particles count={55} />}

      {/* Radial glow with pulse */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="absolute inset-0 pointer-events-none" 
        style={{ 
          background: "radial-gradient(ellipse at 50% 40%, color-mix(in oklch, var(--primary) 8%, transparent) 0%, transparent 55%)"
        }} 
      />

      {/* Floating orbs with animation */}
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 0.025, x: 0 }}
        transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
        className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full pointer-events-none blur-3xl" 
        style={{ background: "var(--primary)" }} 
      />
      <motion.div 
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 0.02, x: 0 }}
        transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
        className="absolute bottom-1/4 right-1/4 h-80 w-80 rounded-full pointer-events-none blur-3xl" 
        style={{ background: "var(--primary)" }} 
      />

      <motion.div 
        ref={contentRef}
        style={{ y, opacity, willChange: "transform, opacity" }} 
        className="relative z-10 flex flex-col items-center gap-6 text-center max-w-4xl mx-auto"
      >

        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.9 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-2.5 rounded-full border border-primary/20 bg-primary/5 px-5 py-2 backdrop-blur-md"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-primary" />
          </span>
          <span className="font-mono text-xs font-medium text-primary tracking-wide">Available for hire</span>
        </motion.div>

        {/* Name with letter-by-letter animation */}
        <motion.h1 
          className="text-5xl font-bold tracking-tight text-foreground sm:text-6xl md:text-7xl lg:text-8xl overflow-hidden"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          {nameText.split("").map((char, i) => (
            <motion.span
              key={`name-${i}`}
              variants={letterAnimation}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="inline-block"
            >
              {char}
            </motion.span>
          ))}
          <span className="text-primary">
            {brandText.split("").map((char, i) => (
              <motion.span
                key={`brand-${i}`}
                variants={letterAnimation}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="inline-block"
              >
                {char}
              </motion.span>
            ))}
          </span>
        </motion.h1>

        {/* Animated underline */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="h-1 w-32 rounded-full bg-primary origin-left"
        />

        {/* Subtitle */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl space-y-3"
        >
          <p className="text-lg text-muted-foreground leading-relaxed sm:text-xl">
            Cybersecurity developer from Missouri, building things I actually care about.
          </p>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="text-base text-foreground/90 font-medium sm:text-lg"
          >
            Right now that means security tools and keeping people safe online.
          </motion.p>
        </motion.div>

        {/* Tech tags with stagger */}
        <motion.div 
          className="flex flex-wrap justify-center gap-2 max-w-xl"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0 },
            visible: { 
              opacity: 1, 
              transition: { staggerChildren: 0.03, delayChildren: 0.5 } 
            }
          }}
        >
          {TECH_TAGS.map((lang, i) => (
            <motion.span
              key={lang}
              variants={{
                hidden: { opacity: 0, scale: 0.8, y: 10 },
                visible: { opacity: 1, scale: 1, y: 0 }
              }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-md border border-border/60 bg-card/50 px-3 py-1.5 font-mono text-xs text-muted-foreground backdrop-blur-sm hover:border-primary/30 hover:text-foreground cursor-default"
            >
              {lang}
            </motion.span>
          ))}
        </motion.div>

        {/* CTA buttons with stagger */}
        <motion.div 
          className="flex flex-col items-center gap-3 pt-2 w-full sm:flex-row sm:justify-center sm:gap-4"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0 },
            visible: { 
              opacity: 1, 
              transition: { staggerChildren: 0.1, delayChildren: 0.6 } 
            }
          }}
        >
          <motion.div
            variants={fadeInUp}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="w-full sm:w-auto"
          >
            <Link href="/projects" className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-7 py-3.5 font-semibold text-primary-foreground shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/25 sm:w-auto">
              View Projects
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1" />
            </Link>
          </motion.div>
          <motion.div
            variants={fadeInUp}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="w-full sm:w-auto"
          >
            <Link href="/about" className="inline-flex w-full items-center justify-center rounded-xl border border-border bg-card/50 px-7 py-3.5 font-semibold text-foreground backdrop-blur-sm hover:border-primary/30 hover:bg-card sm:w-auto">
              About Me
            </Link>
          </motion.div>
          <motion.div
            variants={fadeInUp}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="w-full sm:w-auto"
          >
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center rounded-xl border border-border bg-card/50 px-7 py-3.5 font-semibold text-foreground backdrop-blur-sm hover:border-primary/30 hover:bg-card sm:w-auto"
            >
              GitHub
            </a>
          </motion.div>
        </motion.div>

      </motion.div>

      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1, ease: "easeOut" }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 sm:bottom-8"
      >
        <p className="font-mono text-[10px] text-muted-foreground/30 select-none hidden sm:block">
          {`// press Ctrl+K for magic`}
        </p>
        <motion.div 
          animate={{ y: [0, 6, 0] }} 
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <ChevronDown className="h-5 w-5 text-muted-foreground/50 sm:h-6 sm:w-6" />
        </motion.div>
      </motion.div>
    </section>
  )
}
