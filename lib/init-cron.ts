// Server-side initialization - warm caches once on cold start.
// The 12-hour recurring schedule is handled by a Vercel Cron Job in vercel.json
// (POST /api/cron/revalidate every 12 h) so setInterval is not needed.

import { warmCachesOnStartup } from './cache-revalidation'

let initialized = false

if (!initialized) {
  initialized = true
  warmCachesOnStartup().catch((err) => {
    console.error('[Init] Cache warm-up failed:', err)
  })
}


