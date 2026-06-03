import { NextResponse } from "next/server"
import { GITHUB_USERNAME, GITHUB_API_URL, CACHE_DURATION_API, CACHE_DURATION_API_STALE } from "@/config/constants"

export const dynamic = "force-dynamic"

const INTERESTING = ["PushEvent", "CreateEvent", "PullRequestEvent", "IssuesEvent", "WatchEvent"]

function ghHeaders(): Record<string, string> {
  const h: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  }
  if (process.env.GITHUB_TOKEN) {
    h["Authorization"] = `Bearer ${process.env.GITHUB_TOKEN}`
    console.log("[github/activity] Using GITHUB_TOKEN (authenticated)")
  } else {
    console.warn("[github/activity] No GITHUB_TOKEN - unauthenticated (60 req/hr limit)")
  }
  return h
}

export async function GET() {
  const url = `${GITHUB_API_URL}/users/${GITHUB_USERNAME}/events/public?per_page=30`
  console.log(`[github/activity] GET /api/github/activity -> fetching ${url}`)
  try {
    const res = await fetch(url, { headers: ghHeaders(), cache: "no-store" })
    console.log(`[github/activity] HTTP ${res.status} ${res.statusText}`)

    if (!res.ok) {
      const body = await res.text().catch(() => "(unreadable)")
      console.error(`[github/activity] Failed: ${body.slice(0, 300)}`)
      return NextResponse.json([], { status: res.status })
    }

    const data = await res.json()
    const filtered = Array.isArray(data)
      ? data.filter((e: { type: string }) => INTERESTING.includes(e.type)).slice(0, 8)
      : []

    console.log(`[github/activity] ${Array.isArray(data) ? data.length : 0} events -> ${filtered.length} filtered`)

    return NextResponse.json(filtered, {
      headers: {
        "Cache-Control": `public, s-maxage=${CACHE_DURATION_API}, stale-while-revalidate=${CACHE_DURATION_API_STALE}`,
      },
    })
  } catch (err) {
    console.error("[github/activity] Unhandled error:", err)
    return NextResponse.json([], { status: 500 })
  }
}
