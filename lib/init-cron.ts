// Server-side initialization - warm caches once on cold start.

import { warmCachesOnStartup } from './cache-revalidation'

let initialized = false

if (!initialized) {
  initialized = true
  warmCachesOnStartup().catch((err) => {
    console.error('[Init] Cache warm-up failed:', err)
  })
}


