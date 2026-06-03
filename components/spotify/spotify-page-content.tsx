"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { Music2, Headphones, Radio, ExternalLink, Disc3 } from "lucide-react"

const SPOTIFY_UID = "31tfph3mamrlj4uch76albbptgay"

function EqualizerBars({ playing = true }: { playing?: boolean }) {
  const bars = [0.6, 1, 0.75, 0.9, 0.5, 0.8, 0.65]
  return (
    <div className="flex items-end gap-0.75 h-5">
      {bars.map((h, i) => (
        <motion.div
          key={i}
          className="w-0.75 rounded-full bg-[#1DB954]"
          animate={playing ? { scaleY: [h, 0.2, h * 1.1, 0.3, h] } : { scaleY: 0.15 }}
          transition={playing ? { duration: 0.8 + i * 0.1, repeat: Infinity, ease: "easeInOut", delay: i * 0.08 } : { duration: 0.3 }}
          style={{ height: 20, originY: 1 }}
        />
      ))}
    </div>
  )
}

function FloatingNote({ delay, x, icon }: { delay: number; x: string; icon: string }) {
  return (
    <motion.div
      className="pointer-events-none absolute text-[#1DB954]/20 select-none font-bold text-2xl"
      style={{ left: x, bottom: "10%" }}
      initial={{ opacity: 0, y: 0 }}
      animate={{ opacity: [0, 0.6, 0], y: -120 }}
      transition={{ duration: 3.5, delay, repeat: Infinity, ease: "easeOut" }}
    >
      {icon}
    </motion.div>
  )
}

function SpotifyCardSkeleton({ rows = 1 }: { rows?: number }) {
  return (
    <div className="space-y-3 p-4">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex items-center gap-3">
          <div className="h-10 w-10 shrink-0 animate-pulse rounded-md bg-[#1DB954]/10" />
          <div className="flex-1 space-y-2">
            <div className="h-2.5 w-3/4 animate-pulse rounded-full bg-[#1DB954]/10" />
            <div className="h-2 w-1/2 animate-pulse rounded-full bg-[#1DB954]/8" />
          </div>
        </div>
      ))}
    </div>
  )
}

function SpotifyImage({ src, alt, skeletonRows }: { src: string; alt: string; skeletonRows: number }) {
  const [loaded, setLoaded] = useState(false)

  return (
    <div className="relative">
      {!loaded && <SpotifyCardSkeleton rows={skeletonRows} />}
      <img
        src={src}
        alt={alt}
        onLoad={() => setLoaded(true)}
        className={`h-auto w-full rounded-xl ${loaded ? "opacity-100" : "opacity-0"}`}
        style={{ display: "block" }}
      />
    </div>
  )
}

export function SpotifyPageContent() {
  const [timestamp, setTimestamp] = useState<number>(0)
  const headerRef = useRef<HTMLDivElement>(null)
  const nowPlayingRef = useRef<HTMLDivElement>(null)
  const recentRef = useRef<HTMLDivElement>(null)
  
  const headerInView = useInView(headerRef, { once: true, amount: 0.5 })
  const nowPlayingInView = useInView(nowPlayingRef, { once: true, amount: 0.3 })
  const recentInView = useInView(recentRef, { once: true, amount: 0.3 })
  
  useEffect(() => { setTimestamp(Date.now()) }, [])

  return (
    <div className="relative pt-24 pb-16 md:pt-32 md:pb-24" style={{ overflow: "clip" }}>
      {/* Ambient orb with animation */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 0.04, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="pointer-events-none absolute left-1/2 top-1/3 -z-10 h-150 w-150 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ background: "radial-gradient(circle, #1DB954 0%, transparent 70%)" }}
      />

      {/* Floating notes */}
      <FloatingNote delay={0} x="10%" icon="♪" />
      <FloatingNote delay={1.2} x="25%" icon="♫" />
      <FloatingNote delay={0.6} x="70%" icon="♩" />
      <FloatingNote delay={2} x="85%" icon="♪" />
      <FloatingNote delay={1.8} x="50%" icon="♬" />

      <div className="mx-auto max-w-4xl px-4">
        {/* Header with animations */}
        <motion.div 
          ref={headerRef}
          className="mb-16 text-center"
          initial="hidden"
          animate={headerInView ? "visible" : "hidden"}
        >
          <motion.div 
            variants={{
              hidden: { opacity: 0, y: -20, scale: 0.9 },
              visible: { opacity: 1, y: 0, scale: 1 }
            }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#1DB954]/30 bg-[#1DB954]/5 px-4 py-1.5"
          >
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }}>
              <Disc3 className="h-4 w-4 text-[#1DB954]" />
            </motion.div>
            <span className="font-mono text-xs text-[#1DB954]">Spotify Connected</span>
          </motion.div>

          <motion.span 
            variants={{
              hidden: { opacity: 0, x: -20 },
              visible: { opacity: 1, x: 0 }
            }}
            transition={{ duration: 0.4, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="block font-mono text-sm text-primary"
          >
            {'// music'}
          </motion.span>
          
          <motion.h1 
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            transition={{ duration: 0.5, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="mt-2 text-4xl font-bold text-foreground md:text-5xl lg:text-6xl"
          >
            What I&apos;m <span className="text-gradient">Listening To</span>
          </motion.h1>
          
          <motion.div
            initial={{ scaleX: 0 }}
            animate={headerInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto mt-3 h-1 w-20 rounded-full bg-[#1DB954] origin-center"
          />
          
          <motion.p 
            variants={{
              hidden: { opacity: 0, y: 15 },
              visible: { opacity: 1, y: 0 }
            }}
            transition={{ duration: 0.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mt-4 text-lg text-muted-foreground"
          >
            Whatever I've been playing recently. Taste varies a lot, fair warning.
          </motion.p>
        </motion.div>

        <div className="flex flex-col items-center gap-12">
          {/* Now Playing */}
          <motion.div 
            ref={nowPlayingRef}
            className="w-full max-w-lg"
            initial={{ opacity: 0, y: 30 }}
            animate={nowPlayingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={nowPlayingInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="mb-4 flex items-center gap-3"
            >
              <div className="flex items-center gap-2">
                <EqualizerBars playing />
                <span className="font-mono text-sm font-semibold text-[#1DB954]">Now Playing</span>
              </div>
              <motion.div 
                initial={{ scaleX: 0 }}
                animate={nowPlayingInView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="h-px flex-1 bg-[#1DB954]/20 origin-left" 
              />
              <Music2 className="h-4 w-4 text-[#1DB954]/60" />
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={nowPlayingInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="card-hover relative overflow-hidden rounded-2xl border border-[#1DB954]/20 bg-card"
            >
              <div className="pointer-events-none absolute inset-0 opacity-[0.04]"
                style={{ background: "radial-gradient(ellipse at 50% 0%, #1DB954, transparent 60%)" }} />

              <a
                href={`https://spotify-github-profile.kittinanx.com/api/view?uid=${SPOTIFY_UID}&redirect=true`}
                target="_blank" rel="noopener noreferrer"
                className="relative block p-1"
              >
                <SpotifyImage
                  src={`/api/avatar?url=${encodeURIComponent(`https://spotify-github-profile.kittinanx.com/api/view?uid=${SPOTIFY_UID}&cover_image=true&theme=default&show_offline=true&background_color=0d0d0d&interchange=true&bar_color=1DB954&t=${timestamp}`)}`}
                  alt="Spotify Now Playing"
                  skeletonRows={1}
                />
              </a>

              <div className="border-t border-[#1DB954]/10 px-4 py-3">
                <a href={`https://open.spotify.com/user/${SPOTIFY_UID}`} target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 font-mono text-xs text-muted-foreground hover:text-[#1DB954]">
                  <ExternalLink className="h-3 w-3" /> Open Spotify Profile
                </a>
              </div>
            </motion.div>
          </motion.div>

          {/* Recently Played */}
          <motion.div 
            ref={recentRef}
            className="w-full max-w-lg"
            initial={{ opacity: 0, y: 30 }}
            animate={recentInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={recentInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="mb-4 flex items-center gap-3"
            >
              <div className="flex items-center gap-2">
                <Headphones className="h-4 w-4 text-[#1DB954]" />
                <span className="font-mono text-sm font-semibold text-[#1DB954]">Recently Played</span>
              </div>
              <motion.div 
                initial={{ scaleX: 0 }}
                animate={recentInView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="h-px flex-1 bg-[#1DB954]/20 origin-left" 
              />
              <Radio className="h-4 w-4 text-[#1DB954]/60" />
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={recentInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="card-hover relative overflow-hidden rounded-2xl border border-[#1DB954]/20 bg-card"
            >
              <div className="pointer-events-none absolute inset-0 opacity-[0.03]"
                style={{ background: "radial-gradient(ellipse at 50% 0%, #1DB954, transparent 60%)" }} />

              <div className="relative p-1">
                <SpotifyImage
                  src={`/api/avatar?url=${encodeURIComponent(`https://spotify-recently-played-readme.vercel.app/api?user=${SPOTIFY_UID}&count=5&unique=true&width=500&t=${timestamp}`)}`}
                  alt="Recently Played on Spotify"
                  skeletonRows={5}
                />
              </div>

              <div className="border-t border-[#1DB954]/10 px-4 py-3">
                <a href={`https://open.spotify.com/user/${SPOTIFY_UID}`} target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 font-mono text-xs text-muted-foreground hover:text-[#1DB954]">
                  <ExternalLink className="h-3 w-3" /> View Full History
                </a>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
