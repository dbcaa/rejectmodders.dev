import { NextResponse } from "next/server"

const BUILD_TIME = new Date().toISOString()

export async function GET() {
  return NextResponse.json({
    status: "ok",
    owner: "RejectModders",
    site: "rejectmodders.is-a.dev",
    built_with: ["Next.js 15", "Tailwind CSS", "Framer Motion", "TypeScript"],
    build_time: BUILD_TIME,
    timestamp: new Date().toISOString(),
    uptime_since: BUILD_TIME,
  })
}

