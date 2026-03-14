"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import { Github, ExternalLink, Mail, MapPin, Users, BookOpen, ArrowRight, MessageCircle, Shield } from "lucide-react"
import { GITHUB_URL, GITHUB_USER_API, VULNRADAR_URL, getEmail, SITE_LOCATION } from "@/config/constants"
import { EASE, EASE_BOUNCE, EASE_SMOOTH, DUR, DUR_SLOW, SCROLL_STEP } from "@/lib/animation"

// Animated number counter with smooth easing
function AnimatedNumber({ value, isInView }: { value: number; isInView: boolean }) {
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!isInView) return
    const duration = 800
    const startTime = performance.now()
    
    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(Math.round(value * eased))
      if (progress < 1) requestAnimationFrame(animate)
    }
    
    requestAnimationFrame(animate)
  }, [isInView, value])

  return <>{display}</>
}

interface GitHubStats { public_repos: number; followers: number; following: number; avatar_url: string }

export function ContactSection() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })
  const [stats, setStats] = useState<GitHubStats | null>(null)

  useEffect(() => {
    fetch(GITHUB_USER_API)
      .then(r => r.json()).then(d => { if (d.public_repos !== undefined) setStats(d) }).catch(() => {})
  }, [])

  const links = [
    { href: GITHUB_URL, icon: Github, label: "Follow on GitHub", description: "Check out my code", primary: true },
    { href: VULNRADAR_URL, icon: Shield, label: "VulnRadar", description: "Security scanning tool", primary: false },
    { href: getEmail(), icon: Mail, label: "Email Me", description: "For serious inquiries", primary: false, isEmail: true },
  ]

  const statItems = stats ? [
    { icon: BookOpen, label: "Repos",     value: stats.public_repos },
    { icon: Users,    label: "Followers", value: stats.followers },
    { icon: Users,    label: "Following", value: stats.following },
  ] : []

  return (
    <section ref={ref} id="contact" className="relative py-16 sm:py-24 md:py-32 scroll-mt-20" style={{ overflow: "clip" }}>
      {/* Ambient orbs with entrance animation */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.5 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 1.2, ease: EASE_SMOOTH }}
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, oklch(0.45 0.18 20 / 0.08) 0%, transparent 70%)" }} 
      />
      <motion.div 
        initial={{ opacity: 0, x: 50 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 1, delay: 0.2, ease: EASE_SMOOTH }}
        className="pointer-events-none absolute right-0 top-1/4 -z-10 h-64 w-64 rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, oklch(0.45 0.18 20 / 0.04) 0%, transparent 70%)" }} 
      />

      <div className="mx-auto max-w-5xl px-4">
        {/* Header with staggered entrance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} 
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: DUR_SLOW, ease: EASE }}
          className="mb-10 sm:mb-12 text-center"
        >
          <motion.span 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.3, delay: 0.1, ease: EASE_BOUNCE }}
            className="font-mono text-sm text-primary inline-block"
          >
            {'// connect'}
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
            animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: DUR_SLOW, delay: 0.15, ease: EASE_SMOOTH }}
            className="mt-2 text-3xl font-bold text-foreground sm:text-4xl md:text-5xl text-balance"
          >
            {"Let's Work Together"}
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }} 
            animate={isInView ? { scaleX: 1, opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.25, ease: EASE }} 
            style={{ originX: 0.5 }}
            className="mx-auto mt-3 h-1 w-20 rounded-full bg-primary"
          />
          <motion.p 
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: DUR, delay: 0.35, ease: EASE }}
            className="mt-4 text-muted-foreground max-w-lg mx-auto leading-relaxed"
          >
            Whether it's a project collab, security stuff, or you just want to chat, I'm usually around.
          </motion.p>
        </motion.div>

        {/* Card - slide up with scale */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.98 }} 
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: DUR_SLOW, delay: 0.2, ease: EASE }}
          className="card-hover relative overflow-hidden rounded-2xl border border-border bg-card p-6 sm:p-8 md:p-10"
        >
          {/* Inner glow */}
          <div className="pointer-events-none absolute inset-0 rounded-2xl"
            style={{ background: "linear-gradient(135deg, oklch(0.45 0.18 20 / 0.06) 0%, transparent 50%)" }} />
          <motion.div 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, delay: 0.4, ease: EASE_SMOOTH }}
            className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-primary/5 blur-3xl" 
          />

          {/* Main content - responsive grid */}
          <div className="relative grid gap-8 md:grid-cols-2 md:gap-10">
            {/* Left side - Avatar and info */}
            <div className="flex flex-col items-center md:items-start">
              {stats?.avatar_url && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.3, ease: EASE_BOUNCE }}
                  className="relative mb-4"
                >
                  <motion.div 
                    animate={{ scale: [1, 1.08, 1], opacity: [0.5, 0.15, 0.5] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute inset-0 rounded-2xl border-2 border-primary/30" 
                  />
                  <img 
                    src={`/api/avatar?url=${encodeURIComponent(stats.avatar_url)}`} 
                    alt="RejectModders"
                    className="relative h-24 w-24 sm:h-28 sm:w-28 rounded-2xl border-2 border-primary/20 shadow-xl shadow-primary/10 transition-transform duration-200 hover:scale-105" 
                  />
                </motion.div>
              )}
              <motion.div 
                initial={{ opacity: 0, y: 12 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: DUR, delay: 0.4, ease: EASE }}
                className="text-center md:text-left"
              >
                <h3 className="text-2xl font-bold text-foreground">RejectModders</h3>
                <p className="mt-1 flex items-center justify-center gap-1.5 text-sm text-muted-foreground md:justify-start">
                  <MapPin className="h-4 w-4 text-primary" /> {SITE_LOCATION}
                </p>
                <p className="mt-3 text-sm text-muted-foreground/80 max-w-xs leading-relaxed">
                  Cybersecurity developer focused on building tools that actually help people stay safe online.
                </p>
              </motion.div>

              {/* Stats - Staggered entrance */}
              {stats && (
                <div className="mt-6 grid w-full grid-cols-3 gap-2 sm:gap-3">
                  {statItems.map((s, i) => (
                    <motion.div 
                      key={s.label}
                      initial={{ opacity: 0, y: 16, scale: 0.9 }} 
                      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                      transition={{ duration: DUR, delay: 0.45 + i * 0.08, ease: EASE_BOUNCE }}
                      whileHover={{ scale: 1.05, y: -2, transition: { duration: 0.15 } }}
                      className="card-hover rounded-xl border border-border bg-secondary/50 p-3 text-center cursor-default"
                    >
                      <div className="flex items-center justify-center gap-1 text-[10px] text-muted-foreground uppercase tracking-wide">
                        <s.icon className="h-3 w-3" />{s.label}
                      </div>
                      <div className="mt-1 font-mono text-xl font-bold text-foreground">
                        <AnimatedNumber value={s.value} isInView={isInView} />
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Right side - Action buttons */}
            <div className="flex flex-col gap-3">
              <motion.p 
                initial={{ opacity: 0, x: -10 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.3, delay: 0.5, ease: EASE }}
                className="mb-2 font-mono text-xs text-primary/70 hidden md:block"
              >
                // get in touch
              </motion.p>
              {links.map((link, i) => {
                const isFirst = i === 0
                const sharedClass = `group flex items-center gap-4 rounded-xl px-5 py-4 font-medium border transition-all duration-200 ${
                  isFirst
                    ? "border-primary bg-primary text-primary-foreground shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30"
                    : "border-border bg-card hover:border-primary/30 hover:bg-card/80"
                }`
                const inner = (
                  <>
                    <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${isFirst ? "bg-primary-foreground/20" : "bg-primary/10 border border-primary/20"}`}>
                      <link.icon className={`h-5 w-5 ${isFirst ? "text-primary-foreground" : "text-primary"}`} />
                    </div>
                    <div className="flex-1 text-left">
                      <p className={`font-semibold ${isFirst ? "text-primary-foreground" : "text-foreground"}`}>{link.label}</p>
                      <p className={`text-xs ${isFirst ? "text-primary-foreground/70" : "text-muted-foreground"}`}>{link.description}</p>
                    </div>
                    <ArrowRight className={`h-5 w-5 transition-transform duration-200 group-hover:translate-x-1 ${isFirst ? "text-primary-foreground/70" : "text-muted-foreground/50"}`} />
                  </>
                )
                return (
                  <motion.div 
                    key={link.label}
                    initial={{ opacity: 0, x: 20 }} 
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: DUR, delay: 0.55 + i * 0.1, ease: EASE }}
                    whileHover={{ x: 4, transition: { duration: 0.15 } }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {link.isEmail ? (
                      <button
                        onClick={() => { window.location.href = `mailto:${link.href}` }}
                        className={`w-full cursor-pointer ${sharedClass}`}
                      >
                        {inner}
                      </button>
                    ) : (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={sharedClass}
                      >
                        {inner}
                      </a>
                    )}
                  </motion.div>
                )
              })}
              
              {/* Quick message - fade in last */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: DUR, delay: 0.85, ease: EASE }}
                className="mt-4 rounded-xl border border-dashed border-border/50 bg-muted/30 p-4 text-center"
              >
                <MessageCircle className="mx-auto mb-2 h-5 w-5 text-muted-foreground/40" />
                <p className="text-xs text-muted-foreground/60">Response time: Usually within 24 hours</p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
