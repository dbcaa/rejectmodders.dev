/**
 * Global animation constants — INSTANT animations, no delays.
 * Everything appears immediately with minimal transition time.
 */

// ── Timing Constants ─────────────────────────────────────────────────────────
/** Standard easing - instant snap */
export const EASE = [0, 0, 0.2, 1] as const

/** Snappy ease for micro-interactions */
export const EASE_SNAPPY = [0, 0, 0.1, 1] as const

/** Smooth ease for larger movements */
export const EASE_SMOOTH = [0, 0, 0.2, 1] as const

/** Bounce ease for playful elements */
export const EASE_BOUNCE = [0.2, 1.1, 0.4, 1] as const

/** Base duration - instant */
export const DUR = 0.1

/** Fast duration - instant */
export const DUR_FAST = 0.05

/** Slow duration - still fast */
export const DUR_SLOW = 0.15

/** Navbar animation duration */
export const NAV_DUR = 0.1

/** Page-load sequence: everything starts immediately */
export const PAGE_START = 0
export const PAGE_STEP = 0

/** Scroll-triggered stagger - instant */
export const SCROLL_STEP = 0

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
/** Card hover effect - INSTANT */
export const cardHover = {
  rest: { scale: 1, y: 0, transition: { duration: 0 } },
  hover: { scale: 1.01, y: -2, transition: { duration: 0 } },
  tap: { scale: 0.99, transition: { duration: 0 } },
}

/** Button hover effect - INSTANT */
export const buttonHover = {
  rest: { scale: 1, transition: { duration: 0 } },
  hover: { scale: 1.01, transition: { duration: 0 } },
  tap: { scale: 0.98, transition: { duration: 0 } },
}

/** Subtle lift effect - INSTANT */
export const subtleLift = {
  rest: { y: 0, transition: { duration: 0 } },
  hover: { y: -2, transition: { duration: 0 } },
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
    primary: PAGE_START + 0.05,
    secondary: PAGE_START + 0.1,
    tertiary: PAGE_START + 0.15,
    ambient: PAGE_START + 0.25,
  }
  return bases[order] + index * PAGE_STEP
}
