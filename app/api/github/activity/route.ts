import { NextResponse } from "next/server"
import { GITHUB_USERNAME, GITHUB_API_URL, CACHE_DURATION_API, CACHE_DURATION_API_STALE } from "@/config/constants"

// Cache activity for 10 minutes (600 seconds) for fresh activity updates
export const revalidate = 600

const INTERESTING = ["PushEvent", "CreateEvent", "PullRequestEvent", "IssuesEvent", "WatchEvent"]

export async function GET() {
  try {
    const res = await fetch(
      `${GITHUB_API_URL}/users/${GITHUB_USERNAME}/events/public?per_page=30`,
      {
        headers: {
          Accept: "application/vnd.github+json",
          "X-GitHub-Api-Version": "2022-11-28",
        },
        next: { revalidate: CACHE_DURATION_API, tags: ["github-activity"] },
      }
    )
    if (!res.ok) return NextResponse.json([], { status: res.status })
    const data = await res.json()
    const filtered = Array.isArray(data)
      ? data.filter((e: { type: string }) => INTERESTING.includes(e.type)).slice(0, 8)
      : []

    return NextResponse.json(filtered, {
      headers: { "Cache-Control": `public, s-maxage=${CACHE_DURATION_API}, stale-while-revalidate=${CACHE_DURATION_API_STALE}` },
    })
  } catch {
    return NextResponse.json([], { status: 500 })
  }
}

