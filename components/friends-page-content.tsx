"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Heart, MessageCircle, Github as GitHubIcon, Twitter, Globe, Youtube, User, Mail } from "lucide-react"
import { GITHUB_REPO_URL } from "@/config/constants"

interface Friend {
  name: string
  isGF: boolean
  discord: string | null
  github: string | null
  twitter: string | null
  website: string | null
  youtube?: string | null
  email?: string | null
  avatar: string | null
  resolvedAvatar?: string | null
}

const socialLinks = [
  { key: "discord" as const, icon: MessageCircle, label: "Discord", getUrl: (v: string) => v.startsWith("http") ? v : `https://discord.com/users/${v}` },
  { key: "github" as const, icon: GitHubIcon, label: "GitHub", getUrl: (v: string) => v.startsWith("http") ? v : `https://github.com/${v}` },
  { key: "twitter" as const, icon: Twitter, label: "Twitter", getUrl: (v: string) => v.startsWith("http") ? v : `https://x.com/${v}` },
  { key: "website" as const, icon: Globe, label: "Website", getUrl: (v: string) => v.startsWith("http") ? v : `https://${v}` },
  { key: "youtube" as const, icon: Youtube, label: "YouTube", getUrl: (v: string) => v.startsWith("http") ? v : `https://youtube.com/@${v}` },
]

function getAvatar(friend: Friend): string | null {
  return friend.resolvedAvatar ?? friend.avatar ?? null
}

export function FriendsPageContent({ friends }: { friends: Friend[] }) {
  const gf = friends.find((f) => f.isGF)
  const friendsList = friends.filter((f) => !f.isGF).sort((a, b) => a.name.localeCompare(b.name))
  
  const headerRef = useRef(null)
  const prRef = useRef(null)
  const gfRef = useRef(null)
  const gridRef = useRef(null)
  
  const headerInView = useInView(headerRef, { once: true, margin: "-100px" })
  const prInView = useInView(prRef, { once: true, margin: "-100px" })
  const gfInView = useInView(gfRef, { once: true, margin: "-100px" })
  const gridInView = useInView(gridRef, { once: true, margin: "-100px" })

  return (
    <div className="relative pt-24 pb-16 md:pt-32 md:pb-24" style={{ overflow: "clip" }}>
      <div className="mx-auto max-w-5xl px-4">
        {/* Header */}
        <motion.div 
          ref={headerRef}
          initial={false}
          animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-12"
        >
          <span className="font-mono text-sm text-primary inline-block">{'// friends'}</span>
          <h1 className="mt-2 text-4xl font-bold text-foreground md:text-5xl lg:text-6xl">
            My <span className="text-gradient">People</span>
          </h1>
          <motion.p 
            initial={false}
            animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.4, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            className="mt-4 max-w-lg text-lg leading-relaxed text-muted-foreground"
          >
            These are the people who actually matter to me. Wouldn't trade any of them.
          </motion.p>
        </motion.div>

        {/* PR callout */}
        <motion.div 
          ref={prRef}
          initial={false}
          animate={prInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 30, scale: 0.98 }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-12"
        >
          <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-6 md:p-8">
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.035]"
              style={{ background: "radial-gradient(ellipse at 70% 50%, color-mix(in oklch, var(--primary) 100%, transparent), transparent 65%)" }}
            />
            <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-col gap-1.5">
                <motion.span 
                  initial={false}
                  animate={prInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                  transition={{ duration: 0.3, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
                  className="font-mono text-xs text-primary"
                >
                  {'// wanna be here?'}
                </motion.span>
                <h2 className="text-xl font-bold text-foreground md:text-2xl">Think you belong on this list?</h2>
                <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
                  If we know each other, open a pull request on the repo and add yourself to{" "}
                  <code className="rounded bg-secondary px-1 py-0.5 font-mono text-xs text-primary">data/friends.json</code>.
                </p>
              </div>
              <motion.a
                initial={false}
                animate={prInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
                href={GITHUB_REPO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex shrink-0 items-center gap-2 rounded-lg border border-primary/40 bg-primary/10 px-5 py-2.5 font-mono text-sm text-primary hover:bg-primary/20 hover:border-primary/60"
              >
                <GitHubIcon className="h-4 w-4" />
                Open a PR
              </motion.a>
            </div>
          </div>
        </motion.div>

        {/* GF Section */}
        {gf && (
          <motion.div 
            ref={gfRef}
            initial={false}
            animate={gfInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 30, scale: 0.98 }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            className="mb-12"
          >
            <div className="card-hover relative overflow-hidden rounded-2xl border border-primary/30 bg-card p-6 md:p-8">
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.04]"
                style={{ background: "radial-gradient(ellipse at 30% 50%, color-mix(in oklch, var(--primary) 100%, transparent), transparent 60%)" }}
              />

              <div className="relative flex flex-col items-center gap-5 sm:flex-row sm:items-start">
                <motion.div 
                  initial={false}
                  animate={gfInView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
                  transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
                  className="relative hover:scale-105"
                >
                  {getAvatar(gf) ? (
                    <img
                      src={getAvatar(gf)!}
                      alt={`${gf.name}`}
                      className="h-24 w-24 rounded-2xl border-2 border-primary/30 object-cover"
                    />
                  ) : (
                    <div className="flex h-24 w-24 items-center justify-center rounded-2xl border-2 border-primary/30 bg-primary/10">
                      <Heart className="h-10 w-10 text-primary" />
                    </div>
                  )}
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full border border-primary/40 bg-background"
                  >
                    <Heart className="h-3.5 w-3.5 fill-primary text-primary" />
                  </motion.div>
                </motion.div>

                <div className="flex-1 text-center sm:text-left">
                  <motion.div 
                    initial={false}
                    animate={gfInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                    transition={{ duration: 0.4, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
                    className="mb-1 flex items-center justify-center gap-2 sm:justify-start"
                  >
                    <span className="rounded-full border border-primary/30 bg-primary/10 px-3 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-primary">
                      Taken
                    </span>
                  </motion.div>
                  <motion.h2 
                    initial={false}
                    animate={gfInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                    transition={{ duration: 0.4, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
                    className="text-2xl font-bold text-foreground"
                  >
                    {gf.name}
                  </motion.h2>
                  <motion.p 
                    initial={false}
                    animate={gfInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                    transition={{ duration: 0.4, delay: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
                    className="mt-1 text-sm text-muted-foreground"
                  >
                    The most important person in my life.
                  </motion.p>

                  <motion.div 
                    initial={false}
                    animate={gfInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                    transition={{ duration: 0.4, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                    className="mt-4 flex flex-wrap justify-center gap-2 sm:justify-start"
                  >
                    {socialLinks.map((social) => {
                      const value = gf[social.key]
                      if (!value) return null
                      return (
                        <a
                          key={social.key}
                          href={social.getUrl(value)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 rounded-lg border border-border bg-secondary px-3 py-1.5 font-mono text-xs text-muted-foreground hover:border-primary/30 hover:text-primary"
                        >
                          <social.icon className="h-3.5 w-3.5" />
                          {social.label}
                        </a>
                      )
                    })}
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Friends Grid */}
        {friendsList.length > 0 && (
          <div ref={gridRef}>
            <motion.div 
              initial={false}
              animate={gridInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              className="mb-6 flex items-center gap-3"
            >
              <span className="font-mono text-sm text-primary">{'// the crew'}</span>
              <motion.div 
                initial={false}
                animate={gridInView ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
                className="h-px flex-1 bg-border origin-left" 
              />
            </motion.div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {friendsList.map((friend, i) => (
                <motion.div
                  key={friend.name}
                  initial={false}
                  animate={gridInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 20, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: 0.1 + i * 0.05, ease: [0.25, 0.1, 0.25, 1] }}
                  className="card-hover group rounded-xl border border-border bg-card p-5"
                >
                  <div className="mb-4 flex items-center gap-3">
                    {getAvatar(friend) ? (
                      <img
                        src={getAvatar(friend)!}
                        alt={`${friend.name}`}
                        className="h-12 w-12 rounded-xl border border-border object-cover group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-secondary group-hover:border-primary/30">
                        <User className="h-5 w-5 text-muted-foreground" />
                      </div>
                    )}
                    <div className="min-w-0 flex-1">
                      <h3 className="truncate text-base font-semibold text-foreground group-hover:text-primary">
                        {friend.name}
                      </h3>
                      <span className="font-mono text-[10px] text-muted-foreground/60">Friend</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {socialLinks.map((social) => {
                      const value = friend[social.key]
                      if (!value) return null
                      return (
                        <a
                          key={social.key}
                          href={social.getUrl(value)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 rounded-md border border-border bg-secondary px-2 py-1 font-mono text-[10px] text-muted-foreground hover:border-primary/30 hover:text-primary"
                          title={social.label}
                        >
                          <social.icon className="h-3 w-3" />
                          {social.label}
                        </a>
                      )
                    })}
                    {friend.email && (
                      <button
                        onClick={() => {
                          const addr = friend.email!.startsWith("mailto:") ? friend.email!.slice(7) : friend.email!
                          window.location.href = `mailto:${addr}`
                        }}
                        className="flex items-center gap-1 rounded-md border border-border bg-secondary px-2 py-1 font-mono text-[10px] text-muted-foreground hover:border-primary/30 hover:text-primary"
                        title="Email"
                      >
                        <Mail className="h-3 w-3" />
                        Email
                      </button>
                    )}
                    {!friend.discord && !friend.github && !friend.twitter && !friend.website && !friend.youtube && !friend.email && (
                      <span className="font-mono text-[10px] text-muted-foreground/40">No links</span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Empty state */}
        {friendsList.length === 0 && !gf && (
          <motion.div 
            initial={false}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="py-16 text-center"
          >
            <Heart className="mx-auto mb-4 h-12 w-12 text-muted-foreground/20" />
            <p className="font-mono text-sm text-muted-foreground">Friends list is being updated...</p>
          </motion.div>
        )}

      </div>
    </div>
  )
}
