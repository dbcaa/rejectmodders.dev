"use client"

import { motion, AnimatePresence } from "framer-motion"
import { usePathname } from "next/navigation"
import { useEffect, useRef, useState } from "react"

/** Thin progress bar that animates to ~85% while loading, then to 100% on complete */
function ProgressBar({ loading }: { loading: boolean }) {
  const [width, setWidth] = useState(0)
  const [visible, setVisible] = useState(false)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (loading) {
      setVisible(true)
      setWidth(0)
      // Quickly jump to 20% then smoothly inch toward 85%
      requestAnimationFrame(() => setWidth(20))
      timerRef.current = setInterval(() => {
        setWidth(w => {
          if (w >= 85) { clearInterval(timerRef.current!); return 85 }
          return w + (85 - w) * 0.08
        })
      }, 80)
    } else {
      if (timerRef.current) clearInterval(timerRef.current)
      setWidth(100)
      const t = setTimeout(() => { setVisible(false); setWidth(0) }, 250)
      return () => clearTimeout(t)
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [loading])

  if (!visible) return null

  return (
    <div className="fixed inset-x-0 top-0 z-[9999] h-0.5">
      <div
        className="h-full"
        style={{
          width: `${width}%`,
          background: "var(--primary)",
          boxShadow: "0 0 8px var(--primary), 0 0 3px var(--primary)",
          transition: width === 100 ? "width 200ms ease-out" : "width 150ms linear",
        }}
      />
    </div>
  )
}

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [loading, setLoading] = useState(false)
  const [displayChildren, setDisplayChildren] = useState(children)
  const [displayKey, setDisplayKey] = useState(pathname)
  const pendingPathname = useRef(pathname)

  // When pathname changes, the new page has fully loaded - stop loading
  useEffect(() => {
    if (pathname !== pendingPathname.current) {
      pendingPathname.current = pathname
    }
    setLoading(false)
    setDisplayChildren(children)
    setDisplayKey(pathname)
  }, [pathname, children])

  // Intercept all link clicks to start the loading state immediately
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const target = (e.target as Element).closest("a")
      if (!target) return
      const href = target.getAttribute("href")
      if (!href) return
      // Only intercept same-origin, non-hash, non-external links
      if (
        href.startsWith("/") &&
        !href.startsWith("//") &&
        !e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey &&
        target.getAttribute("target") !== "_blank"
      ) {
        const destination = href.split("?")[0].split("#")[0]
        if (destination !== pathname) {
          pendingPathname.current = destination
          setLoading(true)
        }
      }
    }
    document.addEventListener("click", handleClick)
    return () => document.removeEventListener("click", handleClick)
  }, [pathname])

  return (
    <>
      <ProgressBar loading={loading} />
      <AnimatePresence mode="wait">
        <motion.div
          key={displayKey}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {displayChildren}
        </motion.div>
      </AnimatePresence>
    </>
  )
}

