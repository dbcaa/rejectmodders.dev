import { NextResponse } from "next/server"
import { SITE_NAME, SITE_URL, CACHE_DURATION_API, CACHE_DURATION_API_STALE } from "@/config/constants"

// Cache status for 10 minutes (600 seconds)
export const revalidate = 600

const BUILD_TIME = new Date().toISOString()

export async function GET() {
  return NextResponse.json(
    {
      status: "ok",
      owner: SITE_NAME,
      site: SITE_URL.replace("https://", ""),
      build_time: BUILD_TIME,
      timestamp: new Date().toISOString(),
      uptime_since: BUILD_TIME,
    },
    {
      headers: {
        "Cache-Control": `public, s-maxage=${CACHE_DURATION_API}, stale-while-revalidate=${CACHE_DURATION_API_STALE}`,
      },
    }
  )
}

