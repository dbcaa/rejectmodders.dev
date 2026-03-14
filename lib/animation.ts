/**
 * Global animation constants and reusable variants — single source of truth.
 * Import from '@/lib/animation' for consistent motion across the site.
 * 
 * Animation choreography:
 * - Navbar: 0ms → 300ms (loads first, remains static)
 * - Content: 400ms+ (starts after navbar completes)
 */

// ── Timing Constants ─────────────────────────────────────────────────────────
/** Standard easing curve (smooth ease-out) */
export const EASE = [0.22, 1, 0.36, 1] as const

/** Snappy ease for micro-interactions */
export const EASE_SNAPPY = [0.32, 0.72, 0, 1] as const

/** Smooth ease for larger movements */
export const EASE_SMOOTH = [0.4, 0, 0.2, 1] as const

/** Bounce ease for playful elements */
export const EASE_BOUNCE = [0.34, 1.56, 0.64, 1] as const

/** Base duration - balanced */
export const DUR = 0.4

/** Fast duration for micro-interactions */
export const DUR_FAST = 0.2

/** Slow duration for dramatic entrances */
export const DUR_SLOW = 0.6

/** Navbar animation duration */
export const NAV_DUR = 0.35

/** Page-load sequence: navbar finishes ~0.35s, content starts at 0.45s */
export const PAGE_START = 0.45
export const PAGE_STEP = 0.08

/** Scroll-triggered stagger */
export const SCROLL_STEP = 0.06

// ── Reusable Variants ────────────────────────────────────────────────────────
/** Fade up animation - most common pattern */
export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: DUR, ease: EASE, delay },
  }),
}

/** Fade up with slight scale - for cards and important elements */
export const fadeUpScale = {
  hidden: { opacity: 0, y: 20, scale: 0.96 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: DUR, ease: EASE, delay },
  }),
}

/** Fade in (no movement) */
export const fadeIn = {
  hidden: { opacity: 0 },
  visible: (delay = 0) => ({
    opacity: 1,
    transition: { duration: DUR, ease: EASE, delay },
  }),
}

/** Scale up from smaller - for badges and small elements */
export const scaleUp = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: (delay = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: DUR_FAST, ease: EASE_BOUNCE, delay },
  }),
}

/** Scale in with bounce - for playful elements */
export const scaleBounce = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: (delay = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: DUR, ease: EASE_BOUNCE, delay },
  }),
}

/** Slide in from left */
export const slideInLeft = {
  hidden: { opacity: 0, x: -32 },
  visible: (delay = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: DUR, ease: EASE, delay },
  }),
}

/** Slide in from right */
export const slideInRight = {
  hidden: { opacity: 0, x: 32 },
  visible: (delay = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: DUR, ease: EASE, delay },
  }),
}

/** Slide up with blur - for hero elements */
export const slideUpBlur = {
  hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: DUR_SLOW, ease: EASE_SMOOTH, delay },
  }),
}

/** Expand from center - for underlines and decorative elements */
export const expandFromCenter = {
  hidden: { scaleX: 0, opacity: 0 },
  visible: (delay = 0) => ({
    scaleX: 1,
    opacity: 1,
    transition: { duration: DUR, ease: EASE, delay },
  }),
}

// ── Container Variants ───────────────────────────────────────────────────────
/** Stagger children on page load */
export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: PAGE_STEP,
      delayChildren: PAGE_START,
    },
  },
}

/** Stagger children on scroll */
export const scrollStaggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: SCROLL_STEP,
      delayChildren: 0.1,
    },
  },
}

/** Fast stagger for lists */
export const fastStaggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0.1,
    },
  },
}

// ── Hover & Gesture Variants ─────────────────────────────────────────────────
/** Card hover effect */
export const cardHover = {
  rest: { scale: 1, y: 0 },
  hover: { 
    scale: 1.02, 
    y: -4,
    transition: { duration: 0.2, ease: EASE_SNAPPY }
  },
  tap: { scale: 0.98 },
}

/** Button hover effect */
export const buttonHover = {
  rest: { scale: 1 },
  hover: { scale: 1.02, transition: { duration: 0.15 } },
  tap: { scale: 0.97 },
}

/** Subtle lift effect */
export const subtleLift = {
  rest: { y: 0 },
  hover: { y: -2, transition: { duration: 0.2, ease: EASE_SNAPPY } },
}

// ── Utility Functions ────────────────────────────────────────────────────────
/** Calculate delay for nth item in a sequence */
export const getStaggerDelay = (index: number, base = PAGE_START) => 
  base + index * PAGE_STEP

/** Calculate delay for scroll-triggered nth item */
export const getScrollDelay = (index: number) => 
  0.1 + index * SCROLL_STEP

/** Get animation delay based on element position in choreography */
export const getChoreographyDelay = (
  order: "hero" | "primary" | "secondary" | "tertiary" | "ambient",
  index = 0
) => {
  const bases = {
    hero: PAGE_START,
    primary: PAGE_START + 0.1,
    secondary: PAGE_START + 0.2,
    tertiary: PAGE_START + 0.3,
    ambient: PAGE_START + 0.5,
  }
  return bases[order] + index * PAGE_STEP
}
