"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { ArrowRight } from "lucide-react"

const orgs = [
	{
		name: "Disutils Team",
		description: "Discord developer tools, bot frameworks, and community utilities. I ran this for about a year before winding it down to focus on VulnRadar.",
		url: "https://github.com/disutils",
		avatar: `/api/avatar?url=${encodeURIComponent("https://avatars.githubusercontent.com/u/184031343?v=4")}`,
		highlights: ["Disckit", "DisMusic", "Inactive"],
		color: "oklch(0.58 0.15 250)",
	},
	{
		name: "VulnRadar",
		description: "Security scanning platform. 175+ vulnerability checks with instant reports.",
		url: "https://vulnradar.dev",
		avatar: `/api/avatar?url=${encodeURIComponent("https://avatars.githubusercontent.com/u/261703628?v=4")}`,
		highlights: ["175+ Checks", "Instant Reports", "Fix Guidance"],
		color: "var(--primary)",
	},
]

export function OrgsSection() {
	const ref = useRef(null)
	const isInView = useInView(ref, { once: true, margin: "-100px" })

	return (
		<section ref={ref} id="orgs" className="relative py-24 md:py-32" style={{ overflow: "clip" }}>
			<div className="mx-auto max-w-6xl px-4">
				{/* Header */}
				<motion.div 
					initial={false}
					animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
					transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
					className="mb-12"
				>
					<span className="font-mono text-sm text-primary">{"// organizations"}</span>
					<h2 className="mt-2 text-3xl font-bold text-foreground md:text-4xl">Where I Build</h2>
					<motion.div 
						initial={false}
						animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
						transition={{ duration: 0.5, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
						className="mt-2 h-1 w-16 rounded-full bg-primary origin-left" 
					/>
					<motion.p 
						initial={false}
						animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
						transition={{ duration: 0.4, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
						className="mt-4 max-w-lg text-muted-foreground"
					>
						Organizations I{"'"}ve founded and contributed to. Disutils Team is now inactive as I focus on VulnRadar.
					</motion.p>
				</motion.div>

				<div className="grid gap-6 md:grid-cols-2">
					{orgs.map((org, i) => (
						<motion.a
							key={org.name}
							initial={false}
							animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 30, scale: 0.98 }}
							transition={{ duration: 0.5, delay: 0.2 + i * 0.15, ease: [0.25, 0.1, 0.25, 1] }}
							href={org.url}
							target="_blank"
							rel="noopener noreferrer"
							className="card-hover group relative overflow-hidden rounded-xl border border-border bg-card p-6 md:p-8"
						>
							{/* Color gradient bg */}
							<div
								className="pointer-events-none absolute inset-0 opacity-[0.03] group-hover:opacity-[0.07]"
								style={{ background: `radial-gradient(circle at 70% 30%, ${org.color}, transparent 60%)` }}
							/>

							{/* Shimmer line on hover */}
							<div
								className="pointer-events-none absolute inset-x-0 top-0 h-px scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-100"
								style={{ background: `linear-gradient(90deg, transparent, ${org.color}, transparent)` }}
							/>

							<div className="relative">
								<div className="mb-4 flex items-center gap-4">
									<img
										src={org.avatar}
										alt={`${org.name} avatar`}
										className="h-12 w-12 rounded-xl border border-border object-cover group-hover:scale-105"
									/>
									<div>
										<h3 className="text-lg font-bold text-foreground group-hover:text-primary">{org.name}</h3>
									</div>
									<div className="ml-auto opacity-0 group-hover:opacity-100">
										<ArrowRight className="h-5 w-5 text-primary" />
									</div>
								</div>

								<p className="mb-5 text-sm leading-relaxed text-muted-foreground">{org.description}</p>

								<div className="flex flex-wrap gap-2">
									{org.highlights.map((h, hi) => (
										<motion.span
											key={h}
											initial={false}
											animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
											transition={{ duration: 0.3, delay: 0.4 + i * 0.15 + hi * 0.05, ease: [0.25, 0.1, 0.25, 1] }}
											className="rounded-md border border-border bg-secondary px-2.5 py-1 font-mono text-[11px] text-muted-foreground group-hover:border-primary/20 group-hover:text-foreground"
										>
											{h}
										</motion.span>
									))}
								</div>
							</div>
						</motion.a>
					))}
				</div>
			</div>
		</section>
	)
}
