"use client"

import { useEffect, useRef } from "react"
import { usePrimary } from "../helpers"

// Tetromino definitions matching the game
const PIECES = [
  { shape: [[0,0,0,0], [1,1,1,1], [0,0,0,0], [0,0,0,0]], color: "#06b6d4" }, // I
  { shape: [[1,1], [1,1]], color: "#fbbf24" },                                 // O
  { shape: [[0,1,0], [1,1,1], [0,0,0]], color: "#a855f7" },                   // T
  { shape: [[0,1,1], [1,1,0], [0,0,0]], color: "#22c55e" },                   // S
  { shape: [[1,1,0], [0,1,1], [0,0,0]], color: "#ef4444" },                   // Z
  { shape: [[1,0,0], [1,1,1], [0,0,0]], color: "#3b82f6" },                   // J
  { shape: [[0,0,1], [1,1,1], [0,0,0]], color: "#f97316" },                   // L
]

type Cell = string | 0
type Board = Cell[][]

export function TetrisPreview() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const primary = usePrimary()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")!
    
    const W = canvas.width
    const H = canvas.height
    const CELL = 12
    const COLS = Math.floor(W / CELL)
    const ROWS = Math.floor(H / CELL)
    const STEP_MS = 80

    // Create empty board
    const createBoard = (): Board => 
      Array.from({ length: ROWS }, () => Array<Cell>(COLS).fill(0))

    // Check if piece fits
    const fits = (board: Board, shape: number[][], x: number, y: number): boolean => {
      for (let r = 0; r < shape.length; r++) {
        for (let c = 0; c < shape[r].length; c++) {
          if (shape[r][c]) {
            const nx = x + c
            const ny = y + r
            if (nx < 0 || nx >= COLS || ny >= ROWS) return false
            if (ny >= 0 && board[ny][nx]) return false
          }
        }
      }
      return true
    }

    // AI: find best X position for piece
    const findBestX = (board: Board, shape: number[][]): number => {
      let bestX = 0
      let bestScore = -Infinity

      for (let testX = 0; testX <= COLS - shape[0].length; testX++) {
        if (!fits(board, shape, testX, 0)) continue

        // Find landing Y
        let testY = 0
        while (fits(board, shape, testX, testY + 1)) testY++

        // Score: prefer filling gaps, lower positions
        let score = 0
        
        // Count filled neighbors (good for filling gaps)
        shape.forEach((row, dr) => {
          row.forEach((cell, dc) => {
            if (!cell) return
            const bx = testX + dc
            const by = testY + dr
            
            // Check neighbors
            if (bx > 0 && board[by]?.[bx - 1]) score += 2
            if (bx < COLS - 1 && board[by]?.[bx + 1]) score += 2
            if (by < ROWS - 1 && board[by + 1]?.[bx]) score += 3
          })
        })

        // Slight preference for center and lower placement
        score += (ROWS - testY) * 0.1
        score -= Math.abs(testX - COLS / 2) * 0.05

        if (score > bestScore) {
          bestScore = score
          bestX = testX
        }
      }

      return bestX
    }

    // Spawn a new piece
    let pieceIndex = 0
    const spawnPiece = () => {
      const p = PIECES[pieceIndex++ % PIECES.length]
      return {
        shape: p.shape.map(row => [...row]),
        color: p.color,
        x: Math.floor(COLS / 2) - Math.floor(p.shape[0].length / 2),
        y: -1,
      }
    }

    // Initialize board with some random blocks at bottom
    let board = createBoard()
    for (let r = ROWS - 4; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        if (Math.random() > 0.45) {
          board[r][c] = PIECES[Math.floor(Math.random() * PIECES.length)].color
        }
      }
    }

    let piece = spawnPiece()
    let targetX = findBestX(board, piece.shape)

    // Place piece on board and clear lines
    const placePiece = () => {
      // Lock piece
      piece.shape.forEach((row, r) => {
        row.forEach((cell, c) => {
          if (cell && piece.y + r >= 0) {
            board[piece.y + r][piece.x + c] = piece.color
          }
        })
      })

      // Clear completed lines
      for (let r = ROWS - 1; r >= 0; r--) {
        if (board[r].every(cell => cell !== 0)) {
          board.splice(r, 1)
          board.unshift(Array<Cell>(COLS).fill(0))
          r++ // Check same row again
        }
      }

      // Spawn new piece
      piece = spawnPiece()
      targetX = findBestX(board, piece.shape)

      // Reset if topped out
      if (!fits(board, piece.shape, piece.x, piece.y)) {
        board = createBoard()
        for (let r = ROWS - 4; r < ROWS; r++) {
          for (let c = 0; c < COLS; c++) {
            if (Math.random() > 0.45) {
              board[r][c] = PIECES[Math.floor(Math.random() * PIECES.length)].color
            }
          }
        }
        piece = spawnPiece()
        targetX = findBestX(board, piece.shape)
      }
    }

    let lastStep = 0
    let raf = 0

    const draw = (now: number) => {
      // Step logic
      if (now - lastStep >= STEP_MS) {
        lastStep = now

        // Move horizontally toward target
        if (piece.x < targetX && fits(board, piece.shape, piece.x + 1, piece.y)) {
          piece.x++
        } else if (piece.x > targetX && fits(board, piece.shape, piece.x - 1, piece.y)) {
          piece.x--
        } else {
          // Move down or place
          if (fits(board, piece.shape, piece.x, piece.y + 1)) {
            piece.y++
          } else {
            placePiece()
          }
        }
      }

      // Clear canvas
      ctx.fillStyle = "#0a0a0a"
      ctx.fillRect(0, 0, W, H)

      // Draw grid
      ctx.strokeStyle = "#ffffff06"
      ctx.lineWidth = 0.5
      for (let x = 0; x <= COLS; x++) {
        ctx.beginPath()
        ctx.moveTo(x * CELL, 0)
        ctx.lineTo(x * CELL, H)
        ctx.stroke()
      }
      for (let y = 0; y <= ROWS; y++) {
        ctx.beginPath()
        ctx.moveTo(0, y * CELL)
        ctx.lineTo(W, y * CELL)
        ctx.stroke()
      }

      // Draw board blocks
      board.forEach((row, r) => {
        row.forEach((cell, c) => {
          if (!cell) return
          ctx.fillStyle = cell as string
          ctx.fillRect(c * CELL + 1, r * CELL + 1, CELL - 2, CELL - 2)
          // Highlight
          ctx.fillStyle = "rgba(255,255,255,0.15)"
          ctx.fillRect(c * CELL + 1, r * CELL + 1, CELL - 2, 3)
        })
      })

      // Draw ghost piece
      let ghostY = piece.y
      while (fits(board, piece.shape, piece.x, ghostY + 1)) {
        ghostY++
      }
      piece.shape.forEach((row, r) => {
        row.forEach((cell, c) => {
          if (!cell) return
          ctx.fillStyle = piece.color + "25"
          ctx.fillRect(
            (piece.x + c) * CELL + 1,
            (ghostY + r) * CELL + 1,
            CELL - 2,
            CELL - 2
          )
        })
      })

      // Draw active piece
      piece.shape.forEach((row, r) => {
        row.forEach((cell, c) => {
          if (!cell || piece.y + r < 0) return
          ctx.fillStyle = piece.color
          ctx.fillRect(
            (piece.x + c) * CELL + 1,
            (piece.y + r) * CELL + 1,
            CELL - 2,
            CELL - 2
          )
          // Highlight
          ctx.fillStyle = "rgba(255,255,255,0.2)"
          ctx.fillRect(
            (piece.x + c) * CELL + 1,
            (piece.y + r) * CELL + 1,
            CELL - 2,
            3
          )
        })
      })

      raf = requestAnimationFrame(draw)
    }

    raf = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(raf)
  }, [primary])

  return (
    <canvas 
      ref={canvasRef} 
      width={280} 
      height={160} 
      className="w-full h-full" 
    />
  )
}
