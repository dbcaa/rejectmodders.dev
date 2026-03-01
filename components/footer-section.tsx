"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { GitBranch } from "lucide-react"
import Link from "next/link"

const navLinks = [
	{ href: "/", label: "Home", external: false },
	{ href: "/about", label: "About", external: false },
	{ href: "/projects", label: "Projects", external: false },
	{ href: "/friends", label: "Friends", external: false },
	{ href: "https://vulnradar.dev", label: "VulnRadar", external: true },
]

export function FooterSection() {
	const ref = useRef<HTMLElement>(null)
	// Large margin so footer triggers well before it's fully in view
	const isInView = useInView(ref, { once: true, margin: "0px 0px -20px 0px" })

	return (
		<motion.footer
			ref={ref}
			initial={{ opacity: 0, y: 16 }}
			animate={isInView ? { opacity: 1, y: 0 } : {}}
			transition={{ duration: 0.4, ease: "easeOut" }}
			style={{ willChange: "transform, opacity" }}
			className="border-t border-border py-8"
		>
			<div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-4 md:flex-row">
				{/* Logo */}
				<Link
					href="/"
					className="font-mono text-sm font-bold text-foreground transition-colors hover:text-primary"
				>
					{"<"}
					<span className="text-primary">RM</span>
					{" />"}
				</Link>

				{/* Nav — plain links, hover handled by CSS transition */}
				<div className="flex flex-wrap items-center justify-center gap-6">
					{navLinks.map((link) =>
						link.external ? (
							<a
								key={link.label}
								href={link.href}
								target="_blank"
								rel="noopener noreferrer"
								className="font-mono text-xs text-muted-foreground transition-colors hover:text-primary"
							>
								{link.label}
							</a>
						) : (
							<Link
								key={link.label}
								href={link.href}
								className="font-mono text-xs text-muted-foreground transition-colors hover:text-primary"
							>
								{link.label}
							</Link>
						)
					)}
					<a
						href="https://github.com/RejectModders"
						target="_blank"
						rel="noopener noreferrer"
						className="flex items-center gap-1 font-mono text-xs text-muted-foreground transition-colors hover:text-primary"
					>
						<GitBranch className="h-3.5 w-3.5" />
						GitHub
					</a>
				</div>

				{/* Copyright + status */}
				<div className="flex flex-col items-center gap-1.5 md:items-end">
					<div className="font-mono text-xs text-muted-foreground/60">
						{`\u00A9 ${new Date().getFullYear()} RejectModders`}
					</div>
					<a
						href="/api/status"
						target="_blank"
						rel="noopener noreferrer"
						className="flex items-center gap-1.5 font-mono text-[10px] text-muted-foreground/40 transition-colors hover:text-primary/60"
					>
						<span className="relative flex h-1.5 w-1.5">
							<span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
							<span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-green-400" />
						</span>
						api/status
					</a>
				</div>
			</div>
		</motion.footer>
	)
}
