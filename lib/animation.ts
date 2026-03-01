/**
 * Global animation constants — single source of truth for the entire site.
 */

// Standard easing curve (snappy ease-out)
export const EASE = [0.215, 0.61, 0.355, 1] as const

// Base duration used everywhere
export const DUR = 0.4

// Page-load sequence: navbar finishes ~0.35s, content starts at 0.45s
export const PAGE_START = 0.45
export const PAGE_STEP  = 0.08

// Scroll-triggered stagger
export const SCROLL_STEP = 0.07
