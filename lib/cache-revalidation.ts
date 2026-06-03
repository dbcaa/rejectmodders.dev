let warmupDone = false

/**
 * Warm the caches on first cold start by triggering the revalidation endpoint.
 * Only runs once per server process lifetime - harmless on hot reloads.
 *
 * For recurring revalidation, schedule a cron job pointing at POST /api/cron/revalidate.
 */
export async function warmCachesOnStartup() {
  if (warmupDone) return
  warmupDone = true

  const timestamp = new Date().toISOString()
  console.log(`[Cron] [${timestamp}] Warming caches on startup...`)

  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
    const response = await fetch(`${baseUrl}/api/cron/revalidate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    })

    if (!response.ok) {
      throw new Error(`API returned status ${response.status}`)
    }

    console.log(`[Cron] [${timestamp}] Cache warm-up completed successfully`)
  } catch (error) {
    // Non-fatal - caches will still populate on first real request
    console.warn(`[Cron] [${timestamp}] Cache warm-up warning:`, error)
  }
}


