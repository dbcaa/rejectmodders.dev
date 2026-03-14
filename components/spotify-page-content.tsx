"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { Music2, Headphones, Radio, ExternalLink, Disc3, Play, Pause, Clock, Volume2, Heart, SkipForward, Shuffle, Repeat } from "lucide-react"
import { EASE, EASE_BOUNCE, EASE_SMOOTH, DUR, DUR_SLOW, PAGE_START, PAGE_STEP, SCROLL_STEP } from "@/lib/animation"

const SPOTIFY_UID = "31tfph3mamrlj4uch76albbptgay"

// Equalizer bars - enhanced design
function EqualizerBars({ playing = true, size = "md" }: { playing?: boolean; size?: "sm" | "md" | "lg" }) {
  const heights = size === "lg" ? [24, 32, 20, 28, 16, 26, 22] : size === "sm" ? [10, 14, 8, 12, 6, 11, 9] : [16, 22, 14, 20, 12, 18, 15]
  const widths = size === "lg" ? "w-1" : size === "sm" ? "w-0.5" : "w-0.75"
  
  return (
    <div className="flex items-end gap-0.5">
      {heights.map((h, i) => (
        <motion.div
          key={i}
          className={`${widths} rounded-full bg-[#1DB954]`}
          animate={playing ? { 
            scaleY: [1, 0.3, 1.1, 0.4, 1],
            opacity: [1, 0.7, 1, 0.8, 1]
          } : { scaleY: 0.2 }}
          transition={playing ? { 
            duration: 0.6 + i * 0.08, 
            repeat: Infinity, 
            ease: "easeInOut", 
            delay: i * 0.06 
          } : { duration: 0.3 }}
          style={{ height: h, originY: 1 }}
        />
      ))}
    </div>
  )
}

// Floating music notes
function FloatingNote({ delay, x, icon }: { delay: number; x: string; icon: string }) {
  return (
    <motion.div
      className="pointer-events-none absolute text-[#1DB954]/15 select-none font-bold text-3xl"
      style={{ left: x, bottom: "15%" }}
      initial={{ opacity: 0, y: 0 }}
      animate={{ opacity: [0, 0.5, 0], y: -150, x: [0, 10, -10, 0] }}
      transition={{ duration: 4, delay, repeat: Infinity, ease: "easeOut" }}
    >
      {icon}
    </motion.div>
  )
}

// Track card skeleton
function TrackSkeleton() {
  return (
    <div className="flex items-center gap-4 p-4 rounded-xl border border-[#1DB954]/10 bg-card/50">
      <div className="h-14 w-14 shrink-0 animate-pulse rounded-lg bg-[#1DB954]/10" />
      <div className="flex-1 space-y-2">
        <div className="h-4 w-3/4 animate-pulse rounded bg-[#1DB954]/10" />
        <div className="h-3 w-1/2 animate-pulse rounded bg-[#1DB954]/5" />
      </div>
      <div className="h-3 w-10 animate-pulse rounded bg-[#1DB954]/5" />
    </div>
  )
}

// Now Playing Card - Custom design
function NowPlayingCard({ isInView }: { isInView: boolean }) {
  const [isPlaying, setIsPlaying] = useState(true)
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: EASE }}
      className="relative overflow-hidden rounded-3xl border border-[#1DB954]/20 bg-gradient-to-br from-card via-card to-[#1DB954]/5"
    >
      {/* Ambient glow */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-[#1DB954]/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-[#1DB954]/5 blur-2xl" />
      
      <div className="relative p-6 sm:p-8">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1DB954]/10 border border-[#1DB954]/20">
              <EqualizerBars playing={isPlaying} size="sm" />
            </div>
            <div>
              <p className="font-mono text-xs text-[#1DB954]/70 uppercase tracking-wider">Now Playing</p>
              <p className="text-sm font-medium text-foreground">Live from Spotify</p>
            </div>
          </div>
          <motion.div 
            animate={{ rotate: isPlaying ? 360 : 0 }} 
            transition={{ duration: 3, repeat: isPlaying ? Infinity : 0, ease: "linear" }}
          >
            <Disc3 className="h-6 w-6 text-[#1DB954]" />
          </motion.div>
        </div>
        
        {/* Album art and track info */}
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
          {/* Album art with vinyl effect */}
          <div className="relative">
            <motion.div 
              className="relative h-40 w-40 overflow-hidden rounded-2xl shadow-2xl shadow-black/30 sm:h-48 sm:w-48"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#1DB954]/20 to-transparent z-10 pointer-events-none" />
              <img 
                src="/placeholder.svg?height=192&width=192" 
                alt="Album cover"
                className="h-full w-full object-cover"
              />
            </motion.div>
            {/* Vinyl peek effect */}
            <motion.div 
              className="absolute -right-4 top-1/2 -translate-y-1/2 h-36 w-36 rounded-full bg-zinc-900 shadow-xl sm:h-44 sm:w-44"
              style={{ zIndex: -1 }}
              animate={isPlaying ? { rotate: 360 } : {}}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <div className="absolute inset-4 rounded-full bg-zinc-800" />
              <div className="absolute inset-[45%] rounded-full bg-[#1DB954]/30" />
            </motion.div>
          </div>
          
          {/* Track info */}
          <div className="flex-1 text-center sm:text-left">
            <h3 className="text-xl font-bold text-foreground sm:text-2xl">Currently Vibing</h3>
            <p className="mt-1 text-muted-foreground">Check my Spotify for live track</p>
            
            {/* Progress bar mock */}
            <div className="mt-6 space-y-2">
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#1DB954]/10">
                <motion.div 
                  className="h-full rounded-full bg-[#1DB954]"
                  initial={{ width: "0%" }}
                  animate={{ width: "65%" }}
                  transition={{ duration: 2, ease: "easeOut" }}
                />
              </div>
              <div className="flex justify-between text-xs text-muted-foreground/60 font-mono">
                <span>2:15</span>
                <span>3:28</span>
              </div>
            </div>
            
            {/* Playback controls */}
            <div className="mt-6 flex items-center justify-center gap-4 sm:justify-start">
              <button className="text-muted-foreground/50 hover:text-[#1DB954] transition-colors">
                <Shuffle className="h-4 w-4" />
              </button>
              <button className="text-muted-foreground/50 hover:text-foreground transition-colors">
                <SkipForward className="h-5 w-5 rotate-180" />
              </button>
              <button 
                onClick={() => setIsPlaying(!isPlaying)}
                className="flex h-12 w-12 items-center justify-center rounded-full bg-[#1DB954] text-black hover:scale-105 hover:bg-[#1ed760] transition-all shadow-lg shadow-[#1DB954]/30"
              >
                {isPlaying ? <Pause className="h-5 w-5 fill-current" /> : <Play className="h-5 w-5 fill-current ml-0.5" />}
              </button>
              <button className="text-muted-foreground/50 hover:text-foreground transition-colors">
                <SkipForward className="h-5 w-5" />
              </button>
              <button className="text-muted-foreground/50 hover:text-[#1DB954] transition-colors">
                <Repeat className="h-4 w-4" />
              </button>
            </div>
            
            {/* Volume */}
            <div className="mt-4 flex items-center justify-center gap-2 sm:justify-start">
              <Volume2 className="h-4 w-4 text-muted-foreground/40" />
              <div className="h-1 w-20 overflow-hidden rounded-full bg-[#1DB954]/10">
                <div className="h-full w-3/4 rounded-full bg-[#1DB954]/40" />
              </div>
            </div>
          </div>
        </div>
        
        {/* Open in Spotify */}
        <div className="mt-6 pt-4 border-t border-[#1DB954]/10">
          <a 
            href={`https://open.spotify.com/user/${SPOTIFY_UID}`}
            target="_blank" 
            rel="noopener noreferrer"
            className="group flex items-center justify-center gap-2 font-mono text-sm text-muted-foreground hover:text-[#1DB954] transition-colors"
          >
            <ExternalLink className="h-4 w-4" />
            Open Spotify Profile
            <motion.span 
              className="inline-block"
              whileHover={{ x: 3 }}
            >
              →
            </motion.span>
          </a>
        </div>
      </div>
    </motion.div>
  )
}

// Recently Played Track Card
function TrackCard({ track, index, isInView }: { track: { title: string; artist: string; duration: string; album: string }; index: number; isInView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -24, scale: 0.97 }}
      animate={isInView ? { opacity: 1, x: 0, scale: 1 } : {}}
      transition={{ duration: 0.4, delay: 0.1 + index * SCROLL_STEP, ease: EASE }}
      whileHover={{ x: 4, scale: 1.01, transition: { duration: 0.15 } }}
      className="group flex items-center gap-4 p-4 rounded-xl border border-border/50 bg-card/50 hover:border-[#1DB954]/30 hover:bg-card transition-all duration-200"
    >
      {/* Track number / Album art */}
      <div className="relative h-12 w-12 shrink-0 rounded-lg bg-[#1DB954]/10 overflow-hidden flex items-center justify-center">
        <span className="font-mono text-lg font-bold text-[#1DB954]/40 group-hover:opacity-0 transition-opacity">{index + 1}</span>
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-[#1DB954]/20">
          <Play className="h-5 w-5 text-[#1DB954] fill-current" />
        </div>
      </div>
      
      {/* Track info */}
      <div className="flex-1 min-w-0">
        <p className="font-medium text-foreground truncate group-hover:text-[#1DB954] transition-colors">{track.title}</p>
        <p className="text-sm text-muted-foreground truncate">{track.artist}</p>
      </div>
      
      {/* Like button */}
      <button className="text-muted-foreground/30 hover:text-[#1DB954] transition-colors opacity-0 group-hover:opacity-100">
        <Heart className="h-4 w-4" />
      </button>
      
      {/* Duration */}
      <div className="flex items-center gap-1.5 text-xs text-muted-foreground/50 font-mono">
        <Clock className="h-3 w-3" />
        {track.duration}
      </div>
    </motion.div>
  )
}

// Sample data for recently played (would come from API in real implementation)
const SAMPLE_TRACKS = [
  { title: "Check my Spotify", artist: "For live data", duration: "3:24", album: "Album 1" },
  { title: "Music varies daily", artist: "Different genres", duration: "4:12", album: "Album 2" },
  { title: "Rock to Electronic", artist: "Anything goes", duration: "2:58", album: "Album 3" },
  { title: "Always exploring", artist: "New artists", duration: "3:45", album: "Album 4" },
  { title: "Open to suggestions", artist: "Hit me up", duration: "4:01", album: "Album 5" },
]

export function SpotifyPageContent() {
  const ref = useRef<HTMLDivElement>(null)
  const recentRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)

  const isInView = useInView(ref, { once: true })
  const recentInView = useInView(recentRef, { once: true })
  const statsInView = useInView(statsRef, { once: true })

  return (
    <div ref={ref} className="relative pt-24 pb-16 md:pt-32 md:pb-24" style={{ overflow: "clip" }}>

      {/* Ambient effects */}
      <div className="pointer-events-none absolute left-1/2 top-1/4 -z-10 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#1DB954]/5 blur-3xl" />
      <div className="pointer-events-none absolute right-0 bottom-1/4 -z-10 h-[300px] w-[300px] rounded-full bg-[#1DB954]/3 blur-3xl" />

      {/* Floating notes */}
      <FloatingNote delay={0} x="5%" icon="♪" />
      <FloatingNote delay={1.5} x="20%" icon="♫" />
      <FloatingNote delay={0.8} x="75%" icon="♩" />
      <FloatingNote delay={2.2} x="90%" icon="♪" />
      <FloatingNote delay={1.2} x="50%" icon="♬" />

      <div className="mx-auto max-w-5xl px-4">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
          animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: DUR_SLOW, delay: PAGE_START, ease: EASE_SMOOTH }}
          className="mb-12 text-center sm:mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: PAGE_START, ease: EASE_BOUNCE }}
            className="mb-6 inline-flex items-center gap-3 rounded-full border border-[#1DB954]/20 bg-[#1DB954]/5 px-5 py-2.5 backdrop-blur-sm"
          >
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }}>
              <Disc3 className="h-5 w-5 text-[#1DB954]" />
            </motion.div>
            <span className="font-mono text-sm font-medium text-[#1DB954]">Spotify Connected</span>
            <div className="h-2 w-2 rounded-full bg-[#1DB954] animate-pulse" />
          </motion.div>

          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: DUR, delay: PAGE_START + PAGE_STEP, ease: EASE }}
            className="block font-mono text-sm text-primary mb-3"
          >{'// music'}</motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: DUR, delay: PAGE_START + PAGE_STEP * 2, ease: EASE }}
            className="text-4xl font-bold text-foreground sm:text-5xl lg:text-6xl"
          >
            What I'm{" "}
            <span className="relative">
              <span className="text-[#1DB954]">Listening To</span>
              <motion.div 
                className="absolute -bottom-2 left-0 right-0 h-1 rounded-full bg-[#1DB954]"
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.5, delay: PAGE_START + PAGE_STEP * 3, ease: "easeOut" }}
                style={{ originX: 0 }}
              />
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: DUR, delay: PAGE_START + PAGE_STEP * 4, ease: EASE }}
            className="mt-6 text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed"
          >
            Whatever I've been playing recently. Taste varies a lot - rock, electronic, hip-hop, whatever fits the mood. Fair warning.
          </motion.p>
        </motion.div>

        {/* Now Playing Section */}
        <div className="mb-16">
          <NowPlayingCard isInView={isInView} />
        </div>

        {/* Stats Row */}
        <div ref={statsRef} className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={statsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: DUR, ease: EASE }}
            className="grid grid-cols-2 gap-4 sm:grid-cols-4"
          >
            {[
              { label: "Playlists", value: "20+", icon: Music2 },
              { label: "Liked Songs", value: "500+", icon: Heart },
              { label: "Hours/Week", value: "15+", icon: Clock },
              { label: "Top Genre", value: "Mixed", icon: Radio },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={statsInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: DUR, delay: 0.1 + i * SCROLL_STEP, ease: EASE_BOUNCE }}
                whileHover={{ scale: 1.05, y: -2, transition: { duration: 0.15 } }}
                className="flex flex-col items-center gap-2 rounded-2xl border border-[#1DB954]/10 bg-card/50 p-5 text-center hover:border-[#1DB954]/30 transition-colors"
              >
                <stat.icon className="h-5 w-5 text-[#1DB954]" />
                <p className="font-mono text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Recently Played Section */}
        <div ref={recentRef}>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={recentInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: DUR, ease: EASE }}
            className="mb-6 flex items-center gap-3"
          >
            <div className="flex items-center gap-2">
              <Headphones className="h-5 w-5 text-[#1DB954]" />
              <span className="font-mono text-sm font-semibold text-[#1DB954]">Recently Played</span>
            </div>
            <div className="h-px flex-1 bg-[#1DB954]/20" />
            <span className="font-mono text-xs text-muted-foreground/50">last 5 tracks</span>
          </motion.div>

          <div className="space-y-3">
            {SAMPLE_TRACKS.map((track, i) => (
              <TrackCard key={i} track={track} index={i} isInView={recentInView} />
            ))}
          </div>

          {/* View more link */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={recentInView ? { opacity: 1 } : {}}
            transition={{ duration: DUR, delay: 0.4, ease: EASE }}
            className="mt-8 text-center"
          >
            <a
              href={`https://open.spotify.com/user/${SPOTIFY_UID}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-xl border border-[#1DB954]/30 bg-[#1DB954]/5 px-6 py-3 font-mono text-sm text-[#1DB954] hover:bg-[#1DB954]/10 hover:border-[#1DB954]/50 transition-all duration-200"
            >
              <ExternalLink className="h-4 w-4" />
              View Full Listening History
              <motion.span className="inline-block group-hover:translate-x-1 transition-transform">→</motion.span>
            </a>
          </motion.div>
        </div>

      </div>
    </div>
  )
}
