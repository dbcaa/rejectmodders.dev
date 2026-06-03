import { NextResponse } from "next/server"
import { GITHUB_USERNAME, GITHUB_API_URL, CACHE_DURATION_API, CACHE_DURATION_API_STALE } from "@/config/constants"

export const dynamic = "force-dynamic"

const ORGS = ["disutils", "vulnradar", "wslatl"]

function ghHeaders(): Record<string, string> {
  const h: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  }
  if (process.env.GITHUB_TOKEN) {
    h["Authorization"] = `Bearer ${process.env.GITHUB_TOKEN}`
    console.log("[github/stats] Using GITHUB_TOKEN (authenticated)")
  } else {
    console.warn("[github/stats] No GITHUB_TOKEN - unauthenticated (60 req/hr limit)")
  }
  return h
}

async function safeFetch(label: string, url: string, opts: RequestInit) {
  console.log(`[github/stats] Fetching ${label}: ${url}`)
  try {
    const res = await fetch(url, opts)
    console.log(`[github/stats] ${label} -> HTTP ${res.status}`)
    if (!res.ok) {
      const body = await res.text().catch(() => "(unreadable)")
      console.error(`[github/stats] ${label} failed: ${body.slice(0, 200)}`)
      return null
    }
    return res.json()
  } catch (err) {
    console.error(`[github/stats] Network error for ${label}:`, err)
    return null
  }
}

export async function GET() {
  try {
    console.log("[github/stats] GET /api/github/stats")
    const headers = ghHeaders()
    const opts = { headers, cache: "no-store" as const }

    const [user, userRepos, ...orgRepos] = await Promise.all([
      safeFetch("user", `${GITHUB_API_URL}/users/${GITHUB_USERNAME}`, opts),
      safeFetch("userRepos", `${GITHUB_API_URL}/users/${GITHUB_USERNAME}/repos?per_page=100&type=public`, opts),
      ...ORGS.map(org =>
        safeFetch(`org:${org}`, `${GITHUB_API_URL}/orgs/${org}/repos?per_page=100`, opts)
      ),
    ])

    const allRepos = [
      ...(Array.isArray(userRepos) ? userRepos : []),
      ...orgRepos.flatMap(r => Array.isArray(r) ? r : []),
    ]

    console.log(`[github/stats] ${allRepos.length} total repos for star count`)

    const seen = new Set<number>()
    const stars = allRepos
      .filter(r => { if (seen.has(r.id)) return false; seen.add(r.id); return true })
      .reduce((acc: number, r: { stargazers_count?: number }) => acc + (r.stargazers_count ?? 0), 0)

    const result = {
      public_repos: user?.public_repos ?? 0,
      followers: user?.followers ?? 0,
      stars,
    }
    console.log("[github/stats] Result:", result)

    return NextResponse.json(result, {
      headers: { "Cache-Control": `public, s-maxage=${CACHE_DURATION_API}, stale-while-revalidate=${CACHE_DURATION_API_STALE}` },
    })
  } catch (err) {
    console.error("[github/stats] Unhandled error:", err)
    return NextResponse.json({ public_repos: 0, followers: 0, stars: 0 }, { status: 500 })
  }
}
