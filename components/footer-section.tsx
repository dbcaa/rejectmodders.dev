"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import { GitBranch } from "lucide-react"
import Link from "next/link"
import { FOOTER_NAV_LINKS, GITHUB_URL, SITE_NAME } from "@/config/constants"

function StatusBadge() {
	const [status, setStatus] = useState<"loading" | "ok" | "error">("loading")
	const [buildTime, setBuildTime] = useState<string | null>(null)

	useEffect(() => {
		fetch("/api/status")
			.then(r => r.json())
			.then(d => {
				setStatus(d.status === "ok" ? "ok" : "error")
				if (d.build_time) {
					const d_ = new Date(d.build_time)
					setBuildTime(d_.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }))
				}
			})
			.catch(() => setStatus("error"))
	}, [])

	const color = status === "ok" ? "bg-green-400" : status === "error" ? "bg-red-400" : "bg-yellow-400"
	const label = status === "ok" ? "operational" : status === "error" ? "degraded" : "checking..."

	return (
		<a
			href="/api/status"
			target="_blank"
			rel="noopener noreferrer"
			className="group flex items-center gap-1.5 font-mono text-[10px] text-muted-foreground/40 hover:text-primary/60"
			title={buildTime ? `Built ${buildTime}` : ""}
		>
			<span className="relative flex h-1.5 w-1.5">
				{status === "ok" && <span className={`absolute inline-flex h-full w-full animate-ping rounded-full ${color} opacity-75`} />}
				<span className={`relative inline-flex h-1.5 w-1.5 rounded-full ${color}`} />
			</span>
			{label}
			{buildTime && (
				<span className="hidden group-hover:inline text-muted-foreground/30">
					· built {buildTime}
				</span>
			)}
		</a>
	)
}

export function FooterSection() {
	const ref = useRef(null)
	const isInView = useInView(ref, { once: true, margin: "-50px" })

	return (
		<motion.footer 
			ref={ref}
			initial={false}
			animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
			transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
			className="border-t border-border py-8"
		>
			<div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-4 md:flex-row">
				{/* Logo */}
				<motion.div
					initial={false}
					animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
					transition={{ duration: 0.4, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
				>
					<Link href="/" className="font-mono text-sm font-bold text-foreground hover:text-primary">
						{"<"}<span className="text-primary">RM</span>{" />"}
					</Link>
				</motion.div>

				{/* Nav */}
				<motion.div 
					initial={false}
					animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
					transition={{ duration: 0.4, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
					className="flex flex-wrap items-center justify-center gap-6"
				>
					{FOOTER_NAV_LINKS.map((link, i) =>
						link.external ? (
							<motion.a
								key={link.label}
								initial={false}
								animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
								transition={{ duration: 0.3, delay: 0.2 + i * 0.03, ease: [0.25, 0.1, 0.25, 1] }}
								href={link.href}
								target="_blank"
								rel="noopener noreferrer"
								className="font-mono text-xs text-muted-foreground hover:text-primary"
							>
								{link.label}
							</motion.a>
						) : (
							<motion.span
								key={link.label}
								initial={false}
								animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
								transition={{ duration: 0.3, delay: 0.2 + i * 0.03, ease: [0.25, 0.1, 0.25, 1] }}
							>
								<Link
									href={link.href}
									className="font-mono text-xs text-muted-foreground hover:text-primary"
								>
									{link.label}
								</Link>
							</motion.span>
						)
					)}
					<motion.a
						initial={false}
						animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
						transition={{ duration: 0.3, delay: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
						href={GITHUB_URL}
						target="_blank"
						rel="noopener noreferrer"
						className="flex items-center gap-1 font-mono text-xs text-muted-foreground hover:text-primary"
					>
						<GitBranch className="h-3.5 w-3.5" />
						GitHub
					</motion.a>
				</motion.div>

				{/* Copyright + status */}
				<motion.div 
					initial={false}
					animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
					transition={{ duration: 0.4, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
					className="flex flex-col items-center gap-1.5 md:items-end"
				>
					<div className="font-mono text-xs text-muted-foreground/60">
						{`\u00A9 ${new Date().getFullYear()} ${SITE_NAME}`}
					</div>
					<StatusBadge />
				</motion.div>
			</div>
		</motion.footer>
	)
}
