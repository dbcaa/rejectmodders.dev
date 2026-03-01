"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { useEffect, useState } from "react"
import { ArrowLeft, Terminal } from "lucide-react"

const EASE = [0.215, 0.61, 0.355, 1] as const

const terminalLines = [
  { text: "$ ping rejectmodders.is-a.dev",  delay: 0.5,  color: "text-foreground" },
  { text: "  Resolving host...",             delay: 0.9,  color: "text-muted-foreground" },
  { text: "  Request timeout for icmp_seq", delay: 1.3,  color: "text-red-400" },
  { text: "  Request timeout for icmp_seq", delay: 1.6,  color: "text-red-400" },
  { text: "",                               delay: 1.9,  color: "" },
  { text: "$ traceroute to this page",      delay: 2.0,  color: "text-foreground" },
  { text: "  1  * * *  (host unreachable)", delay: 2.4,  color: "text-orange-400" },
  { text: "",                               delay: 2.7,  color: "" },
  { text: "  404: route not found.",        delay: 2.8,  color: "text-primary" },
  { text: "  The page you're looking for doesn't exist.", delay: 3.1, color: "text-muted-foreground" },
]

function Glitch({ text }: { text: string }) {
  const [glitching, setGlitching] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitching(true)
      setTimeout(() => setGlitching(false), 150)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <span className="relative inline-block">
      <span className={glitching ? "opacity-0" : "opacity-100"}>{text}</span>
      {glitching && (
        <>
          <span className="absolute inset-0 translate-x-0.5 text-red-400 opacity-70">{text}</span>
          <span className="absolute inset-0 -translate-x-0.5 text-blue-400 opacity-70">{text}</span>
        </>
      )}
    </span>
  )
}

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center px-4" style={{ overflow: "clip" }}>

      {/* Grid bg */}
      <div className="absolute inset-0 grid-bg opacity-10" />

      {/* Ambient glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ background: "radial-gradient(circle, oklch(0.58 0.2 15 / 0.08) 0%, transparent 70%)" }} />

      <div className="relative z-10 w-full max-w-lg text-center">

        {/* 404 heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: EASE }}
        >
          <span className="font-mono text-sm text-primary">{"// error"}</span>
          <h1 className="mt-2 font-mono text-8xl font-bold tracking-tight text-foreground md:text-9xl">
            <Glitch text="404" />
          </h1>
          <p className="mt-3 font-mono text-lg text-muted-foreground">
            Host unreachable.
          </p>
        </motion.div>

        {/* Terminal card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15, ease: EASE }}
          className="mt-8 overflow-hidden rounded-xl border border-border bg-card text-left"
        >
          <div className="flex items-center gap-2 border-b border-border px-4 py-3">
            <div className="h-3 w-3 rounded-full bg-[#ff5f57]" />
            <div className="h-3 w-3 rounded-full bg-[#febc2e]" />
            <div className="h-3 w-3 rounded-full bg-[#28c840]" />
            <Terminal className="ml-3 h-3.5 w-3.5 text-muted-foreground" />
            <span className="font-mono text-xs text-muted-foreground">bash</span>
          </div>
          <div className="space-y-1.5 p-5 font-mono text-sm">
            {terminalLines.map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: line.delay, duration: 0.2 }}
                className={line.color}
              >
                {line.text || <span>&nbsp;</span>}
              </motion.div>
            ))}
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="inline-block h-4 w-2 rounded-sm bg-primary"
            />
          </div>
        </motion.div>

        {/* Back home */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3, ease: EASE }}
          className="mt-8"
        >
          <Link
            href="/"
            className="group card-hover inline-flex items-center gap-2 rounded-lg border border-primary bg-primary px-6 py-3 font-mono text-sm font-semibold text-primary-foreground glow-red transition-all hover:brightness-110"
          >
            <ArrowLeft className="h-4 w-4 transition-transform duration-150 group-hover:-translate-x-1" />
            Back to home
          </Link>
        </motion.div>

      </div>
    </div>
  )
}

