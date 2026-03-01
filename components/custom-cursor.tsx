"use client"

import { useEffect, useRef, useState } from "react"

export function CustomCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [visible,  setVisible]  = useState(false)
  const [hovering, setHovering] = useState(false)
  const [clicking, setClicking] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined" || window.matchMedia("(pointer: coarse)").matches) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width  = window.innerWidth
    canvas.height = window.innerHeight

    const onResize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
    }

    // Trail points
    const TRAIL_LEN = 18
    const trail: { x: number; y: number }[] = []

    let mouseX = 0, mouseY = 0
    let headX  = 0, headY  = 0
    let isHovering = false
    let isClicking = false
    let rafId: number
    let isVisible = false

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      if (!isVisible) { isVisible = true; setVisible(true) }
      const target = e.target as HTMLElement
      const nowHovering = (
        !!target.closest("a, button, [role='button'], input, textarea, select") ||
        !!target.closest(".card-hover")
      )
      if (nowHovering !== isHovering) { isHovering = nowHovering; setHovering(nowHovering) }
    }

    const onLeave = () => { isVisible = false; setVisible(false) }
    const onEnter = () => { isVisible = true;  setVisible(true)  }
    const onDown  = () => { isClicking = true;  setClicking(true)  }
    const onUp    = () => { isClicking = false; setClicking(false) }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      if (!isVisible) { rafId = requestAnimationFrame(draw); return }

      // Smooth head follow
      headX = lerp(headX, mouseX, 0.18)
      headY = lerp(headY, mouseY, 0.18)

      // Push to trail
      trail.unshift({ x: headX, y: headY })
      if (trail.length > TRAIL_LEN) trail.length = TRAIL_LEN

      const primary = "oklch(0.58 0.2 15)"
      const r = 220, g = 38, b = 38  // oklch(0.58 0.2 15) ≈ #dc2626

      // ── Comet tail ────────────────────────────────────────────────────
      for (let i = 1; i < trail.length; i++) {
        const t    = 1 - i / trail.length
        const size = lerp(1, isClicking ? 3 : 4, t)
        ctx.beginPath()
        ctx.arc(trail[i].x, trail[i].y, Math.max(0.5, size), 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${r},${g},${b},${t * 0.35})`
        ctx.fill()
      }

      // ── Outer ring — rotates on hover ─────────────────────────────────
      const ringR    = isHovering ? 22 : isClicking ? 14 : 18
      const ringTime = performance.now() / 1000
      const segments = 6  // broken ring — 6 arcs with gaps
      const gap      = (Math.PI * 2) / segments * 0.32

      ctx.save()
      ctx.translate(headX, headY)
      if (isHovering) ctx.rotate(ringTime * 1.8)

      for (let i = 0; i < segments; i++) {
        const start = (Math.PI * 2 / segments) * i + gap / 2
        const end   = (Math.PI * 2 / segments) * (i + 1) - gap / 2
        ctx.beginPath()
        ctx.arc(0, 0, ringR, start, end)
        ctx.strokeStyle = isHovering
          ? `rgba(${r},${g},${b},0.9)`
          : `rgba(${r},${g},${b},0.55)`
        ctx.lineWidth   = isHovering ? 1.5 : 1.2
        ctx.stroke()
      }
      ctx.restore()

      // ── Crosshair lines on hover ──────────────────────────────────────
      if (isHovering) {
        const len = 6
        ctx.strokeStyle = `rgba(${r},${g},${b},0.7)`
        ctx.lineWidth   = 1
        // top
        ctx.beginPath(); ctx.moveTo(headX, headY - ringR - 3); ctx.lineTo(headX, headY - ringR - 3 - len); ctx.stroke()
        // bottom
        ctx.beginPath(); ctx.moveTo(headX, headY + ringR + 3); ctx.lineTo(headX, headY + ringR + 3 + len); ctx.stroke()
        // left
        ctx.beginPath(); ctx.moveTo(headX - ringR - 3, headY); ctx.lineTo(headX - ringR - 3 - len, headY); ctx.stroke()
        // right
        ctx.beginPath(); ctx.moveTo(headX + ringR + 3, headY); ctx.lineTo(headX + ringR + 3 + len, headY); ctx.stroke()
      }

      // ── Center dot ────────────────────────────────────────────────────
      const dotR = isClicking ? 2 : 3
      ctx.beginPath()
      ctx.arc(headX, headY, dotR, 0, Math.PI * 2)
      ctx.fillStyle = primary
      ctx.fill()

      // Glow
      const glow = ctx.createRadialGradient(headX, headY, 0, headX, headY, dotR * 4)
      glow.addColorStop(0, `rgba(${r},${g},${b},0.25)`)
      glow.addColorStop(1, `rgba(${r},${g},${b},0)`)
      ctx.beginPath()
      ctx.arc(headX, headY, dotR * 4, 0, Math.PI * 2)
      ctx.fillStyle = glow
      ctx.fill()

      rafId = requestAnimationFrame(draw)
    }

    rafId = requestAnimationFrame(draw)

    window.addEventListener("resize",     onResize)
    document.addEventListener("mousemove",  onMove)
    document.addEventListener("mouseleave", onLeave)
    document.addEventListener("mouseenter", onEnter)
    document.addEventListener("mousedown",  onDown)
    document.addEventListener("mouseup",    onUp)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener("resize",     onResize)
      document.removeEventListener("mousemove",  onMove)
      document.removeEventListener("mouseleave", onLeave)
      document.removeEventListener("mouseenter", onEnter)
      document.removeEventListener("mousedown",  onDown)
      document.removeEventListener("mouseup",    onUp)
    }
  }, [])

  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) return null

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[9999]"
      style={{ opacity: visible ? 1 : 0, transition: "opacity 0.2s ease" }}
    />
  )
}
