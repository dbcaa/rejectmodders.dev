"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

interface NowPlayingData {
  isPlaying: boolean
  title?: string
  artist?: string
  songUrl?: string
}

export function NavNowPlaying() {
  const [data, setData] = useState<NowPlayingData | null>(null)

  useEffect(() => {
    const fetchNowPlaying = async () => {
      try {
        const res = await fetch("/api/now-playing")
        if (res.ok) setData(await res.json())
      } catch {}
    }
    fetchNowPlaying()
    const interval = setInterval(fetchNowPlaying, 30_000)
    return () => clearInterval(interval)
  }, [])

  if (!data?.isPlaying) return null

  return (
    <Link
      href="/spotify"
      className="group hidden max-w-45 items-center gap-2 rounded-full border border-[#1DB954]/20 bg-[#1DB954]/5 px-3 py-1.5 transition-all duration-150 hover:border-[#1DB954]/50 hover:bg-[#1DB954]/10 xl:flex"
      title={`${data.title} — ${data.artist}`}
    >
      {/* Animated bars */}
      <div className="flex shrink-0 items-end gap-px h-3">
        {[0.6, 1, 0.75].map((h, i) => (
          <span
            key={i}
            className="w-0.5 rounded-full bg-[#1DB954] animate-pulse"
            style={{
              height: `${h * 12}px`,
              animationDelay: `${i * 0.15}s`,
              animationDuration: "0.8s",
            }}
          />
        ))}
      </div>
      <span className="truncate font-mono text-[10px] text-[#1DB954]">
        {data.title}
      </span>
    </Link>
  )
}

