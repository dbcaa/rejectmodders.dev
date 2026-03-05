"use client"
import { useEffect, useRef, useCallback, useState } from "react"
import { ChevronLeft, RotateCcw } from "lucide-react"
import { saveHS, loadHS } from "../helpers"

// Game constants
const CELL = 20
const COLS = 19
const ROWS = 21
const W = COLS * CELL
const H = ROWS * CELL

// 0 = empty, 1 = wall, 2 = dot, 3 = power pellet
const MAP_TEMPLATE = [
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,2,2,2,2,2,2,2,2,1,2,2,2,2,2,2,2,2,1],
  [1,3,1,1,2,1,1,1,2,1,2,1,1,1,2,1,1,3,1],
  [1,2,1,1,2,1,1,1,2,1,2,1,1,1,2,1,1,2,1],
  [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
  [1,2,1,1,2,1,2,1,1,1,1,1,2,1,2,1,1,2,1],
  [1,2,2,2,2,1,2,2,2,1,2,2,2,1,2,2,2,2,1],
  [1,1,1,1,2,1,1,1,0,1,0,1,1,1,2,1,1,1,1],
  [0,0,0,1,2,1,0,0,0,0,0,0,0,1,2,1,0,0,0],
  [1,1,1,1,2,1,0,1,1,0,1,1,0,1,2,1,1,1,1],
  [0,0,0,0,2,0,0,1,0,0,0,1,0,0,2,0,0,0,0],
  [1,1,1,1,2,1,0,1,1,1,1,1,0,1,2,1,1,1,1],
  [0,0,0,1,2,1,0,0,0,0,0,0,0,1,2,1,0,0,0],
  [1,1,1,1,2,1,0,1,1,1,1,1,0,1,2,1,1,1,1],
  [1,2,2,2,2,2,2,2,2,1,2,2,2,2,2,2,2,2,1],
  [1,2,1,1,2,1,1,1,2,1,2,1,1,1,2,1,1,2,1],
  [1,3,2,1,2,2,2,2,2,0,2,2,2,2,2,1,2,3,1],
  [1,1,2,1,2,1,2,1,1,1,1,1,2,1,2,1,2,1,1],
  [1,2,2,2,2,1,2,2,2,1,2,2,2,1,2,2,2,2,1],
  [1,2,1,1,1,1,1,1,2,1,2,1,1,1,1,1,1,2,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
]

const GHOST_COLORS = ["#ef4444", "#f9a8d4", "#22d3ee", "#fb923c"]

interface Ghost {
  x: number
  y: number
  dir: { x: number; y: number }
  scared: number
  color: string
  inHouse: boolean
  releaseTimer: number
}

interface GameState {
  map: number[][]
  pac: { x: number; y: number; dir: { x: number; y: number }; nextDir: { x: number; y: number }; mouth: number; mouthOpen: boolean }
  ghosts: Ghost[]
  score: number
  lives: number
  hs: number
  state: "idle" | "playing" | "dead" | "win"
  raf: number
  lastTime: number
}

export function PacmanGame({ primary, onBack }: { primary: string; onBack: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const stateRef = useRef<GameState>({
    map: [],
    pac: { x: 0, y: 0, dir: { x: 0, y: 0 }, nextDir: { x: 0, y: 0 }, mouth: 0, mouthOpen: true },
    ghosts: [],
    score: 0,
    lives: 3,
    hs: 0,
    state: "idle",
    raf: 0,
    lastTime: 0,
  })
  const [display, setDisplay] = useState({ score: 0, lives: 3, hs: 0, state: "idle" as GameState["state"] })

  const canMove = useCallback((x: number, y: number, dx: number, dy: number, speed = 1.5) => {
    const hw = CELL * 0.38
    const nx = x + dx * speed
    const ny = y + dy * speed
    const points = [
      [ny - hw, nx - hw],
      [ny - hw, nx + hw],
      [ny + hw, nx - hw],
      [ny + hw, nx + hw],
    ]
    return points.every(([cy, cx]) => {
      const row = Math.floor(cy / CELL)
      const col = Math.floor(cx / CELL)
      if (row < 0 || row >= ROWS || col < 0 || col >= COLS) return true // Allow tunnel
      return stateRef.current.map[row]?.[col] !== 1
    })
  }, [])

  const reset = useCallback(() => {
    const s = stateRef.current
    s.map = MAP_TEMPLATE.map(r => [...r])
    s.pac = {
      x: 9 * CELL + CELL / 2,
      y: 16 * CELL + CELL / 2,
      dir: { x: 0, y: 0 },
      nextDir: { x: 0, y: 0 },
      mouth: 0,
      mouthOpen: true,
    }
    s.ghosts = GHOST_COLORS.map((color, i) => ({
      x: (8 + i) * CELL + CELL / 2,
      y: 10 * CELL + CELL / 2,
      dir: { x: i % 2 === 0 ? 1 : -1, y: 0 },
      scared: 0,
      color,
      inHouse: i > 0,
      releaseTimer: i * 60,
    }))
    s.score = 0
    s.lives = 3
    s.hs = loadHS()["pacman"] ?? 0
    s.state = "idle"
    s.lastTime = 0
    setDisplay({ score: 0, lives: 3, hs: s.hs, state: "idle" })
  }, [])

  useEffect(() => {
    reset()
    const canvas = canvasRef.current!
    const ctx = canvas.getContext("2d")!

    let frame = 0
    const loop = (ts: number) => {
      const s = stateRef.current
      const dt = s.lastTime === 0 ? 1 : Math.min((ts - s.lastTime) / 16.67, 3)
      s.lastTime = ts
      frame++

      if (s.state === "playing") {
        const PAC_SPEED = 1.5 * dt
        const GHOST_SPEED = 1.0 * dt
        const SCARED_SPEED = 0.6 * dt

        // Pac-Man movement
        const p = s.pac
        if (canMove(p.x, p.y, p.nextDir.x, p.nextDir.y, PAC_SPEED)) {
          p.dir = { ...p.nextDir }
        }
        if (canMove(p.x, p.y, p.dir.x, p.dir.y, PAC_SPEED)) {
          p.x += p.dir.x * PAC_SPEED
          p.y += p.dir.y * PAC_SPEED
        }
        
        // Tunnel wrap
        if (p.x < -CELL / 2) p.x = W + CELL / 2
        if (p.x > W + CELL / 2) p.x = -CELL / 2

        // Mouth animation
        p.mouth += p.mouthOpen ? 3 * dt : -3 * dt
        if (p.mouth >= 35 || p.mouth <= 0) p.mouthOpen = !p.mouthOpen

        // Eat dots
        const pRow = Math.floor(p.y / CELL)
        const pCol = Math.floor(p.x / CELL)
        if (pRow >= 0 && pRow < ROWS && pCol >= 0 && pCol < COLS) {
          const cell = s.map[pRow]?.[pCol]
          if (cell === 2) {
            s.map[pRow][pCol] = 0
            s.score += 10
            setDisplay(d => ({ ...d, score: s.score }))
          } else if (cell === 3) {
            s.map[pRow][pCol] = 0
            s.score += 50
            s.ghosts.forEach(g => { g.scared = 300 })
            setDisplay(d => ({ ...d, score: s.score }))
          }
        }

        // Check win
        const hasDotsLeft = s.map.flat().some(v => v === 2 || v === 3)
        if (!hasDotsLeft) {
          saveHS("pacman", s.score)
          s.hs = Math.max(s.hs, s.score)
          s.state = "win"
          setDisplay(d => ({ ...d, state: "win", score: s.score, hs: s.hs }))
        }

        // Ghost AI
        for (const g of s.ghosts) {
          // Release timer
          if (g.inHouse) {
            g.releaseTimer -= dt
            if (g.releaseTimer <= 0) g.inHouse = false
          }

          // Scared timer
          if (g.scared > 0) g.scared -= dt

          const speed = g.scared > 0 ? SCARED_SPEED : GHOST_SPEED

          if (g.inHouse) {
            // Bounce in house
            g.y += g.dir.y * speed * 0.5
            if (g.y < 9.5 * CELL) g.dir.y = 1
            if (g.y > 10.5 * CELL) g.dir.y = -1
          } else if (g.y > 8 * CELL) {
            // Exit house - move up
            const centerX = 9 * CELL + CELL / 2
            if (Math.abs(g.x - centerX) > 2) {
              g.x += (g.x < centerX ? 1 : -1) * speed
            } else {
              g.y -= speed
            }
          } else {
            // Normal ghost movement
            const gRow = Math.floor(g.y / CELL)
            const gCol = Math.floor(g.x / CELL)
            const atCenter = Math.abs(g.x - (gCol * CELL + CELL / 2)) < 2 && Math.abs(g.y - (gRow * CELL + CELL / 2)) < 2

            if (atCenter || !canMove(g.x, g.y, g.dir.x, g.dir.y, speed)) {
              // Choose new direction
              const dirs = [
                { x: 1, y: 0 },
                { x: -1, y: 0 },
                { x: 0, y: 1 },
                { x: 0, y: -1 },
              ]
              const validDirs = dirs.filter(d => 
                !(d.x === -g.dir.x && d.y === -g.dir.y) && 
                canMove(g.x, g.y, d.x, d.y, speed)
              )
              
              if (validDirs.length > 0) {
                // Chase or scatter
                if (g.scared > 0 || Math.random() < 0.3) {
                  g.dir = validDirs[Math.floor(Math.random() * validDirs.length)]
                } else {
                  // Move toward Pac-Man
                  validDirs.sort((a, b) => {
                    const distA = Math.hypot(g.x + a.x * CELL - p.x, g.y + a.y * CELL - p.y)
                    const distB = Math.hypot(g.x + b.x * CELL - p.x, g.y + b.y * CELL - p.y)
                    return distA - distB
                  })
                  g.dir = validDirs[0]
                }
              }
            }

            if (canMove(g.x, g.y, g.dir.x, g.dir.y, speed)) {
              g.x += g.dir.x * speed
              g.y += g.dir.y * speed
            }

            // Tunnel wrap
            if (g.x < -CELL / 2) g.x = W + CELL / 2
            if (g.x > W + CELL / 2) g.x = -CELL / 2
          }

          // Collision with Pac-Man
          const dist = Math.hypot(g.x - p.x, g.y - p.y)
          if (dist < CELL * 0.7) {
            if (g.scared > 0) {
              // Eat ghost
              g.scared = 0
              g.x = 9 * CELL + CELL / 2
              g.y = 10 * CELL + CELL / 2
              g.inHouse = true
              g.releaseTimer = 60
              s.score += 200
              setDisplay(d => ({ ...d, score: s.score }))
            } else {
              // Pac-Man dies
              s.lives--
              if (s.lives <= 0) {
                saveHS("pacman", s.score)
                s.hs = Math.max(s.hs, s.score)
                s.state = "dead"
                setDisplay(d => ({ ...d, lives: 0, state: "dead", score: s.score, hs: s.hs }))
              } else {
                // Reset positions
                p.x = 9 * CELL + CELL / 2
                p.y = 16 * CELL + CELL / 2
                p.dir = { x: 0, y: 0 }
                p.nextDir = { x: 0, y: 0 }
                s.ghosts.forEach((ghost, i) => {
                  ghost.x = (8 + i) * CELL + CELL / 2
                  ghost.y = 10 * CELL + CELL / 2
                  ghost.inHouse = i > 0
                  ghost.releaseTimer = i * 60
                  ghost.scared = 0
                })
                setDisplay(d => ({ ...d, lives: s.lives }))
              }
            }
          }
        }
      }

      // Draw
      ctx.fillStyle = "#000"
      ctx.fillRect(0, 0, W, H)

      // Draw map
      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          const x = c * CELL
          const y = r * CELL
          const v = s.map[r][c]

          if (v === 1) {
            ctx.fillStyle = "#1a3a8f"
            ctx.fillRect(x, y, CELL, CELL)
            ctx.strokeStyle = "#2a4fcf"
            ctx.lineWidth = 0.5
            ctx.strokeRect(x + 0.5, y + 0.5, CELL - 1, CELL - 1)
          } else if (v === 2) {
            ctx.fillStyle = "#fff"
            ctx.beginPath()
            ctx.arc(x + CELL / 2, y + CELL / 2, 2, 0, Math.PI * 2)
            ctx.fill()
          } else if (v === 3) {
            const pulse = 0.85 + 0.15 * Math.sin(ts / 300)
            ctx.fillStyle = "#fbbf24"
            ctx.beginPath()
            ctx.arc(x + CELL / 2, y + CELL / 2, 5 * pulse, 0, Math.PI * 2)
            ctx.fill()
          }
        }
      }

      // Draw Pac-Man
      const p = s.pac
      const ang = (p.mouth / 35) * 0.4
      const dir = Math.atan2(p.dir.y, p.dir.x) || 0
      ctx.fillStyle = primary
      ctx.beginPath()
      ctx.moveTo(p.x, p.y)
      ctx.arc(p.x, p.y, CELL * 0.42, dir + ang, dir + Math.PI * 2 - ang)
      ctx.closePath()
      ctx.fill()

      // Eye
      const eyeX = p.x + Math.cos(dir - Math.PI / 4) * CELL * 0.25
      const eyeY = p.y + Math.sin(dir - Math.PI / 4) * CELL * 0.25
      ctx.fillStyle = "#000"
      ctx.beginPath()
      ctx.arc(eyeX, eyeY, 2, 0, Math.PI * 2)
      ctx.fill()

      // Draw ghosts
      for (const g of s.ghosts) {
        const isScared = g.scared > 0
        const isFlashing = g.scared > 0 && g.scared < 60
        const bodyColor = isScared 
          ? (isFlashing && Math.floor(frame / 10) % 2 === 0 ? "#fff" : "#3b82f6")
          : g.color

        // Ghost body
        ctx.fillStyle = bodyColor
        ctx.beginPath()
        ctx.arc(g.x, g.y - 2, CELL * 0.4, Math.PI, 0)
        ctx.lineTo(g.x + CELL * 0.4, g.y + CELL * 0.35)
        
        // Wavy bottom
        const waveWidth = (CELL * 0.8) / 3
        for (let i = 0; i < 3; i++) {
          const peakY = i % 2 === 0 ? g.y + CELL * 0.35 : g.y + CELL * 0.2
          ctx.lineTo(g.x - CELL * 0.4 + waveWidth * (i + 1), peakY)
        }
        ctx.lineTo(g.x - CELL * 0.4, g.y + CELL * 0.35)
        ctx.closePath()
        ctx.fill()

        // Eyes
        if (!isScared) {
          ctx.fillStyle = "#fff"
          ctx.beginPath()
          ctx.arc(g.x - 4, g.y - 3, 3, 0, Math.PI * 2)
          ctx.fill()
          ctx.beginPath()
          ctx.arc(g.x + 4, g.y - 3, 3, 0, Math.PI * 2)
          ctx.fill()

          ctx.fillStyle = "#1e40af"
          ctx.beginPath()
          ctx.arc(g.x - 4 + g.dir.x * 1.5, g.y - 3 + g.dir.y * 1.5, 1.5, 0, Math.PI * 2)
          ctx.fill()
          ctx.beginPath()
          ctx.arc(g.x + 4 + g.dir.x * 1.5, g.y - 3 + g.dir.y * 1.5, 1.5, 0, Math.PI * 2)
          ctx.fill()
        } else {
          // Scared eyes
          ctx.fillStyle = "#fff5"
          ctx.beginPath()
          ctx.arc(g.x - 4, g.y - 3, 2, 0, Math.PI * 2)
          ctx.fill()
          ctx.beginPath()
          ctx.arc(g.x + 4, g.y - 3, 2, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      // HUD
      ctx.fillStyle = primary
      ctx.font = "bold 14px monospace"
      ctx.textAlign = "left"
      ctx.fillText(String(s.score), 8, H - 6)
      ctx.textAlign = "right"
      ctx.fillText("♥".repeat(Math.max(0, s.lives)), W - 8, H - 6)

      // Overlays
      if (s.state === "idle") {
        ctx.fillStyle = "rgba(0,0,0,0.65)"
        ctx.fillRect(0, 0, W, H)
        ctx.textBaseline = "middle"
        ctx.fillStyle = primary
        ctx.font = "bold 24px monospace"
        ctx.textAlign = "center"
        ctx.fillText("PAC-MAN", W / 2, H / 2 - 20)
        ctx.fillStyle = "#aaa"
        ctx.font = "13px monospace"
        ctx.fillText("arrow keys / WASD to start", W / 2, H / 2 + 10)
        if (s.hs > 0) {
          ctx.fillStyle = "#fbbf24"
          ctx.font = "bold 11px monospace"
          ctx.fillText(`best: ${s.hs}`, W / 2, H / 2 + 35)
        }
      }

      if (s.state === "dead") {
        ctx.fillStyle = "rgba(0,0,0,0.75)"
        ctx.fillRect(0, 0, W, H)
        ctx.textBaseline = "middle"
        ctx.fillStyle = "#ef4444"
        ctx.font = "bold 28px monospace"
        ctx.textAlign = "center"
        ctx.fillText("GAME OVER", W / 2, H / 2 - 25)
        ctx.fillStyle = "#fff"
        ctx.font = "bold 18px monospace"
        ctx.fillText(`score: ${s.score}`, W / 2, H / 2 + 5)
        if (s.hs > 0) {
          ctx.fillStyle = "#fbbf24"
          ctx.font = "12px monospace"
          ctx.fillText(`best: ${s.hs}`, W / 2, H / 2 + 28)
        }
        ctx.fillStyle = "#666"
        ctx.font = "12px monospace"
        ctx.fillText("press R to restart", W / 2, H / 2 + 52)
      }

      if (s.state === "win") {
        ctx.fillStyle = "rgba(0,0,0,0.75)"
        ctx.fillRect(0, 0, W, H)
        ctx.textBaseline = "middle"
        ctx.fillStyle = "#fbbf24"
        ctx.font = "bold 28px monospace"
        ctx.textAlign = "center"
        ctx.fillText("YOU WIN!", W / 2, H / 2 - 25)
        ctx.fillStyle = "#fff"
        ctx.font = "bold 18px monospace"
        ctx.fillText(`score: ${s.score}`, W / 2, H / 2 + 5)
        if (s.hs > 0) {
          ctx.fillStyle = "#fbbf24"
          ctx.font = "12px monospace"
          ctx.fillText(`best: ${s.hs}`, W / 2, H / 2 + 28)
        }
        ctx.fillStyle = "#666"
        ctx.font = "12px monospace"
        ctx.fillText("press R to play again", W / 2, H / 2 + 52)
      }

      s.raf = requestAnimationFrame(loop)
    }

    stateRef.current.raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(stateRef.current.raf)
  }, [primary, reset, canMove])

  // Keyboard controls
  useEffect(() => {
    const dirs: Record<string, { x: number; y: number }> = {
      ArrowLeft: { x: -1, y: 0 }, a: { x: -1, y: 0 }, A: { x: -1, y: 0 },
      ArrowRight: { x: 1, y: 0 }, d: { x: 1, y: 0 }, D: { x: 1, y: 0 },
      ArrowUp: { x: 0, y: -1 }, w: { x: 0, y: -1 }, W: { x: 0, y: -1 },
      ArrowDown: { x: 0, y: 1 }, s: { x: 0, y: 1 }, S: { x: 0, y: 1 },
    }

    const onKey = (e: KeyboardEvent) => {
      const s = stateRef.current
      if (e.key === "r" || e.key === "R") {
        reset()
        return
      }
      if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(e.key)) {
        e.preventDefault()
      }
      if (dirs[e.key]) {
        s.pac.nextDir = dirs[e.key]
        if (s.state === "idle") {
          s.state = "playing"
          setDisplay(d => ({ ...d, state: "playing" }))
        }
      }
    }

    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [reset])

  const setDir = (dir: { x: number; y: number }) => {
    const s = stateRef.current
    s.pac.nextDir = dir
    if (s.state === "idle") {
      s.state = "playing"
      setDisplay(d => ({ ...d, state: "playing" }))
    }
  }

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      <div className="flex w-full items-center justify-between" style={{ maxWidth: W }}>
        <button onClick={onBack} className="flex items-center gap-1.5 font-mono text-xs text-muted-foreground hover:text-primary transition-colors">
          <ChevronLeft className="h-3.5 w-3.5" /> back
        </button>
        <div className="flex items-center gap-3 font-mono text-xs">
          <span className="text-primary">{"♥".repeat(Math.max(0, display.lives))}</span>
          <span className="text-muted-foreground">{display.score}</span>
          {display.hs > 0 && <span className="text-muted-foreground">best: {display.hs}</span>}
          <button onClick={reset} className="text-muted-foreground hover:text-primary">
            <RotateCcw className="h-3 w-3" />
          </button>
        </div>
      </div>
      <canvas
        ref={canvasRef}
        width={W}
        height={H}
        className="rounded-xl border border-primary/20"
        style={{ maxWidth: "100%", height: "auto" }}
      />
      <div className="grid grid-cols-3 gap-2 md:hidden w-40">
        <div />
        <button
          onTouchStart={e => { e.preventDefault(); setDir({ x: 0, y: -1 }) }}
          onClick={() => setDir({ x: 0, y: -1 })}
          className="h-12 w-12 rounded-xl border border-primary/30 bg-primary/10 text-primary font-bold touch-none"
        >
          ↑
        </button>
        <div />
        <button
          onTouchStart={e => { e.preventDefault(); setDir({ x: -1, y: 0 }) }}
          onClick={() => setDir({ x: -1, y: 0 })}
          className="h-12 w-12 rounded-xl border border-primary/30 bg-primary/10 text-primary font-bold touch-none"
        >
          ←
        </button>
        <button
          onTouchStart={e => { e.preventDefault(); setDir({ x: 0, y: 1 }) }}
          onClick={() => setDir({ x: 0, y: 1 })}
          className="h-12 w-12 rounded-xl border border-primary/30 bg-primary/10 text-primary font-bold touch-none"
        >
          ↓
        </button>
        <button
          onTouchStart={e => { e.preventDefault(); setDir({ x: 1, y: 0 }) }}
          onClick={() => setDir({ x: 1, y: 0 })}
          className="h-12 w-12 rounded-xl border border-primary/30 bg-primary/10 text-primary font-bold touch-none"
        >
          →
        </button>
      </div>
      <p className="font-mono text-xs text-muted-foreground hidden md:block">
        arrow keys / WASD · eat all dots · R restart
      </p>
    </div>
  )
}
