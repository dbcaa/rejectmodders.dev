"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Sun, Moon, Search } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"
import { NAV_LINKS, GITHUB_URL } from "@/config/constants"
import { EASE, EASE_SNAPPY, DUR, DUR_FAST, SCROLL_STEP } from "@/lib/animation"

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()

  useEffect(() => { setMounted(true) }, [])
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])
  useEffect(() => { setMobileOpen(false) }, [pathname])

  return (
    <>
      {/* Header with slide-down animation */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: DUR, ease: EASE_SNAPPY }}
        className={`fixed inset-x-0 top-0 z-40 transition-colors duration-200 ${
          scrolled
            ? "border-b border-border bg-background/80 backdrop-blur-xl"
            : "bg-transparent"
        }`}
      >
        <nav aria-label="Main navigation" className="mx-auto grid max-w-6xl grid-cols-[1fr_auto_1fr] items-center px-4 py-4">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: DUR, delay: 0.1, ease: EASE_SNAPPY }}
          >
            <Link href="/" className="group font-mono text-sm font-bold text-foreground">
              {"<"}
              <span className="text-primary transition-colors group-hover:text-foreground">RM</span>
              {" />"}
            </Link>
          </motion.div>

          {/* Desktop nav links - centered */}
          <div className="hidden items-center justify-center gap-8 md:flex">
            {NAV_LINKS.map((link, i) => {
              const isActive = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href.replace("/#", "/"))
              return (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: DUR_FAST, delay: 0.05 + i * SCROLL_STEP, ease: EASE_SNAPPY }}
                >
                  <Link
                    href={link.href}
                    className={`animated-underline font-mono text-sm transition-colors hover:text-primary ${
                      isActive ? "text-primary" : "text-muted-foreground"
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              )
            })}
          </div>

          {/* Desktop action buttons - right */}
          <div className="hidden items-center justify-end gap-3 md:flex">
            {/* GitHub button */}
            <motion.a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: DUR_FAST, delay: 0.35, ease: EASE_SNAPPY }}
              className="rounded-md border border-primary/30 bg-primary/10 px-4 py-1.5 font-mono text-sm text-primary transition-all hover:bg-primary/20 hover:shadow-[0_0_15px_oklch(0.58_0.2_15/0.2)]"
            >
              GitHub
            </motion.a>

            {/* Cmd+K button */}
            <motion.button
              onClick={() => window.dispatchEvent(new KeyboardEvent("keydown", { key: "k", metaKey: true, bubbles: true }))}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: DUR_FAST, delay: 0.4, ease: EASE_SNAPPY }}
              className="flex items-center gap-1.5 rounded-md border border-border px-2.5 py-1.5 font-mono text-xs text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
              aria-label="Search site, press Command K"
            >
              <Search className="h-3.5 w-3.5" aria-hidden="true" />
              <kbd className="hidden text-[10px] sm:inline" aria-hidden="true">⌘K</kbd>
            </motion.button>

            {/* Theme toggle */}
            {mounted && (
              <motion.button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                transition={{ duration: DUR, delay: 0.45, ease: EASE_SNAPPY }}
                className="flex h-8 w-8 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
                aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
              >
                <motion.div
                  key={theme}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ duration: DUR_FAST, ease: EASE_SNAPPY }}
                >
                  {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                </motion.div>
              </motion.button>
            )}
          </div>

          {/* Mobile toggle */}
          <motion.button
            onClick={() => setMobileOpen(!mobileOpen)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: DUR_FAST, delay: 0.2 }}
            className="col-start-3 justify-self-end text-foreground md:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={mobileOpen ? "close" : "open"}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                {mobileOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
              </motion.div>
            </AnimatePresence>
          </motion.button>
        </nav>
      </motion.header>

      {/* Mobile menu with slide animation */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="fixed inset-0 z-30 bg-background/60 backdrop-blur-sm md:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0, y: -20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: DUR_FAST, ease: EASE_SNAPPY }}
              className="fixed inset-x-0 top-15 z-40 border-b border-border bg-background/95 backdrop-blur-xl md:hidden"
              role="navigation"
              aria-label="Mobile navigation"
            >
              <div className="flex flex-col gap-1 px-4 py-4">
                {NAV_LINKS.map((link, i) => (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: DUR_FAST, delay: i * 0.05, ease: EASE_SNAPPY }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="block rounded-md px-3 py-2.5 font-mono text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
                <motion.div 
                  className="mt-2 flex gap-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: DUR_FAST, delay: 0.25, ease: EASE_SNAPPY }}
                >
                  <a
                    href={GITHUB_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMobileOpen(false)}
                    className="flex-1 block rounded-md bg-primary px-3 py-2.5 text-center font-mono text-sm text-primary-foreground"
                  >
                    GitHub
                  </a>
                  {mounted && (
                    <button
                      onClick={() => { setTheme(theme === "dark" ? "light" : "dark"); setMobileOpen(false) }}
                      className="flex items-center justify-center rounded-md border border-border px-3 py-2.5 font-mono text-sm text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
                      title="Toggle theme"
                    >
                      {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                    </button>
                  )}
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
