"use client"

import { useEffect, useRef } from "react"
import { usePrimary } from "../helpers"

// ── Preview Constants ────────────────────────────────────────────────────────
const CELL = 10
const SPEED = 80

export function SnakePreview() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const primary = usePrimary()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")!
    const W = canvas.width
    const H = canvas.height
    const COLS = Math.floor(W / CELL)
    const ROWS = Math.floor(H / CELL)

    // Demo snake state
    let snake = [
      { x: 8, y: 8 },
      { x: 7, y: 8 },
      { x: 6, y: 8 },
      { x: 5, y: 8 },
      { x: 4, y: 8 },
    ]
    let direction = { x: 1, y: 0 }
    let food = { x: 14, y: 8 }
    let lastMove = 0
    let raf = 0

    // AI: simple chase food logic with collision avoidance
    const getNextDirection = () => {
      const head = snake[0]
      const dx = food.x - head.x
      const dy = food.y - head.y

      const candidates = [
        { x: 1, y: 0 },
        { x: -1, y: 0 },
        { x: 0, y: 1 },
        { x: 0, y: -1 },
      ]

      // Filter out reverse direction and collisions
      const valid = candidates.filter((d) => {
        // Can't reverse
        if (d.x === -direction.x && d.y === -direction.y) return false
        const next = { x: head.x + d.x, y: head.y + d.y }
        // Wall check
        if (next.x < 0 || next.x >= COLS || next.y < 0 || next.y >= ROWS) return false
        // Self check
        if (snake.some((s) => s.x === next.x && s.y === next.y)) return false
        return true
      })

      if (valid.length === 0) return direction

      // Prefer direction toward food
      valid.sort((a, b) => {
        const aDist = Math.abs(head.x + a.x - food.x) + Math.abs(head.y + a.y - food.y)
        const bDist = Math.abs(head.x + b.x - food.x) + Math.abs(head.y + b.y - food.y)
        return aDist - bDist
      })

      return valid[0]
    }

    const randomFood = () => {
      let f
      do {
        f = {
          x: Math.floor(Math.random() * (COLS - 2)) + 1,
          y: Math.floor(Math.random() * (ROWS - 2)) + 1,
        }
      } while (snake.some((s) => s.x === f.x && s.y === f.y))
      return f
    }

    const draw = (time: number) => {
      // Move snake
      if (time - lastMove >= SPEED) {
        lastMove = time
        direction = getNextDirection()

        const head = {
          x: snake[0].x + direction.x,
          y: snake[0].y + direction.y,
        }

        // Collision = reset
        if (
          head.x < 0 ||
          head.x >= COLS ||
          head.y < 0 ||
          head.y >= ROWS ||
          snake.some((s) => s.x === head.x && s.y === head.y)
        ) {
          snake = [
            { x: 8, y: 8 },
            { x: 7, y: 8 },
            { x: 6, y: 8 },
            { x: 5, y: 8 },
            { x: 4, y: 8 },
          ]
          direction = { x: 1, y: 0 }
          food = randomFood()
        } else {
          snake = [head, ...snake]
          if (head.x === food.x && head.y === food.y) {
            food = randomFood()
          } else {
            snake.pop()
          }
        }
      }

      // Clear
      ctx.fillStyle = "#0a0a0a"
      ctx.fillRect(0, 0, W, H)

      // Grid dots
      ctx.fillStyle = "#ffffff08"
      for (let x = 0; x < COLS; x++) {
        for (let y = 0; y < ROWS; y++) {
          ctx.fillRect(x * CELL + CELL / 2 - 0.5, y * CELL + CELL / 2 - 0.5, 1, 1)
        }
      }

      // Food
      const pulse = 0.85 + 0.15 * Math.sin(time / 180)
      const fx = food.x * CELL + CELL / 2
      const fy = food.y * CELL + CELL / 2
      const fr = (CELL / 2 - 1) * pulse

      ctx.fillStyle = "#fbbf2444"
      ctx.beginPath()
      ctx.arc(fx, fy, fr * 1.8, 0, Math.PI * 2)
      ctx.fill()

      ctx.fillStyle = "#fbbf24"
      ctx.beginPath()
      ctx.arc(fx, fy, fr, 0, Math.PI * 2)
      ctx.fill()

      // Snake
      snake.forEach((seg, i) => {
        const isHead = i === 0
        const alpha = Math.max(0.2, 1 - (i / snake.length) * 0.8)
        ctx.globalAlpha = alpha

        ctx.fillStyle = primary
        const pad = isHead ? 0.5 : 1
        const radius = isHead ? 3 : 2

        ctx.beginPath()
        ctx.roundRect(seg.x * CELL + pad, seg.y * CELL + pad, CELL - pad * 2, CELL - pad * 2, radius)
        ctx.fill()

        if (isHead) {
          ctx.fillStyle = "rgba(255,255,255,0.2)"
          ctx.beginPath()
          ctx.roundRect(
            seg.x * CELL + pad + 1,
            seg.y * CELL + pad + 1,
            CELL - pad * 2 - 2,
            (CELL - pad * 2) / 2 - 1,
            2
          )
          ctx.fill()
        }
      })
      ctx.globalAlpha = 1

      raf = requestAnimationFrame(draw)
    }

    raf = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(raf)
  }, [primary])

  return <canvas ref={canvasRef} width={280} height={160} className="w-full h-full" />
}
