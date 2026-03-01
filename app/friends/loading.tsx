export default function FriendsLoading() {
  return (
    <div className="relative pt-24 pb-16 md:pt-32 md:pb-24">
      <div className="mx-auto max-w-5xl px-4">
        <div className="mb-12 space-y-3">
          <div className="h-3 w-16 animate-pulse rounded-full bg-primary/20" />
          <div className="h-12 w-48 animate-pulse rounded-lg bg-muted" />
          <div className="h-4 w-72 animate-pulse rounded bg-muted" />
        </div>
        {/* GF card skeleton */}
        <div className="mb-12 h-40 animate-pulse rounded-2xl border border-border bg-card" />
        {/* Friends grid skeleton */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-40 animate-pulse rounded-xl border border-border bg-card" />
          ))}
        </div>
      </div>
    </div>
  )
}

