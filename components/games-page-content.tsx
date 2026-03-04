"use client"

import { useState, useEffect, useRef, ComponentType, useCallback } from "react"
import dynamic from "next/dynamic"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import { Trophy, Play, ChevronDown, Gamepad2 } from "lucide-react"
import { loadHS } from "./games/helpers"

// Previews – loaded dynamically so they never block the main thread
const SnakePreview         = dynamic(() => import("./games/snake/preview").then(m => ({ default: m.SnakePreview })),         { ssr: false })
const TetrisPreview        = dynamic(() => import("./games/tetris/preview").then(m => ({ default: m.TetrisPreview })),        { ssr: false })
const PongPreview          = dynamic(() => import("./games/pong/preview").then(m => ({ default: m.PongPreview })),            { ssr: false })
const Game2048Preview      = dynamic(() => import("./games/2048/preview").then(m => ({ default: m.Game2048Preview })),        { ssr: false })
const BreakoutPreview      = dynamic(() => import("./games/breakout/preview").then(m => ({ default: m.BreakoutPreview })),    { ssr: false })
const MinesweeperPreview   = dynamic(() => import("./games/minesweeper/preview").then(m => ({ default: m.MinesweeperPreview })), { ssr: false })
const WordlePreview        = dynamic(() => import("./games/wordle/preview").then(m => ({ default: m.WordlePreview })),        { ssr: false })
const SudokuPreview        = dynamic(() => import("./games/sudoku/preview").then(m => ({ default: m.SudokuPreview })),        { ssr: false })
const LightsOutPreview     = dynamic(() => import("./games/lights-out/preview").then(m => ({ default: m.LightsOutPreview })), { ssr: false })
const NonogramPreview      = dynamic(() => import("./games/nonogram/preview").then(m => ({ default: m.NonogramPreview })),    { ssr: false })
const SimonPreview         = dynamic(() => import("./games/simon/preview").then(m => ({ default: m.SimonPreview })),          { ssr: false })
const AsteroidsPreview     = dynamic(() => import("./games/asteroids/preview").then(m => ({ default: m.AsteroidsPreview })),  { ssr: false })
const SpaceInvadersPreview = dynamic(() => import("./games/space-invaders/preview").then(m => ({ default: m.SpaceInvadersPreview })), { ssr: false })
const PacmanPreview        = dynamic(() => import("./games/pacman/preview").then(m => ({ default: m.PacmanPreview })),        { ssr: false })
const DinoPreview          = dynamic(() => import("./games/dino/preview").then(m => ({ default: m.DinoPreview })),            { ssr: false })
const SolitairePreview     = dynamic(() => import("./games/solitaire/preview").then(m => ({ default: m.SolitairePreview })),  { ssr: false })
const BlackjackPreview     = dynamic(() => import("./games/blackjack/preview").then(m => ({ default: m.BlackjackPreview })),  { ssr: false })
const YahtzeePreview       = dynamic(() => import("./games/yahtzee/preview").then(m => ({ default: m.YahtzeePreview })),      { ssr: false })
const TypingPreview        = dynamic(() => import("./games/typing/preview").then(m => ({ default: m.TypingPreview })),        { ssr: false })
const HangmanPreview       = dynamic(() => import("./games/hangman/preview").then(m => ({ default: m.HangmanPreview })),      { ssr: false })
const ChessPreview         = dynamic(() => import("./games/chess/preview").then(m => ({ default: m.ChessPreview })),          { ssr: false })
const CheckersPreview      = dynamic(() => import("./games/checkers/preview").then(m => ({ default: m.CheckersPreview })),    { ssr: false })
const BattleshipPreview    = dynamic(() => import("./games/battleship/preview").then(m => ({ default: m.BattleshipPreview })), { ssr: false })
const ConnectFourPreview   = dynamic(() => import("./games/connect-four/preview").then(m => ({ default: m.ConnectFourPreview })), { ssr: false })
const TicTacToePreview     = dynamic(() => import("./games/tic-tac-toe/preview").then(m => ({ default: m.TicTacToePreview })), { ssr: false })
const MemoryMatchPreview   = dynamic(() => import("./games/memory-match/preview").then(m => ({ default: m.MemoryMatchPreview })), { ssr: false })
const CrosswordMiniPreview = dynamic(() => import("./games/crossword-mini/preview").then(m => ({ default: m.CrosswordMiniPreview })), { ssr: false })
const ColorFloodPreview    = dynamic(() => import("./games/color-flood/preview").then(m => ({ default: m.ColorFloodPreview })), { ssr: false })
const WordSearchPreview    = dynamic(() => import("./games/word-search/preview").then(m => ({ default: m.WordSearchPreview })), { ssr: false })
const PianoTilesPreview    = dynamic(() => import("./games/piano-tiles/preview").then(m => ({ default: m.PianoTilesPreview })), { ssr: false })
const BrickBuilderPreview  = dynamic(() => import("./games/brick-builder/preview").then(m => ({ default: m.BrickBuilderPreview })), { ssr: false })

type Category = "all" | "arcade" | "puzzle" | "card" | "word" | "strategy"

const CATEGORIES: { id: Category; label: string; icon: string }[] = [
  { id: "all",      label: "All",           icon: "◈" },
  { id: "arcade",   label: "Arcade",        icon: "▶" },
  { id: "puzzle",   label: "Puzzle",        icon: "◧" },
  { id: "card",     label: "Card & Dice",   icon: "◆" },
  { id: "word",     label: "Word & Brain",  icon: "A" },
  { id: "strategy", label: "Strategy",      icon: "♟" },
]

const GAMES = [
  // ── Arcade ──
  { id: "snake",         label: "Snake",          desc: "Eat food. Walls and yourself kill you.",       controls: "arrows / WASD / swipe",       cat: "arcade"   as Category, Preview: SnakePreview },
  { id: "tetris",        label: "Tetris",          desc: "Stack blocks, clear lines, survive.",          controls: "← → move · ↑ rotate · space",  cat: "arcade"   as Category, Preview: TetrisPreview },
  { id: "breakout",      label: "Breakout",        desc: "Break all bricks without losing the ball.",    controls: "← → or drag",                 cat: "arcade"   as Category, Preview: BreakoutPreview },
  { id: "pong",          label: "Pong",            desc: "Beat the AI paddle on the right.",             controls: "W / S or ↑ / ↓",              cat: "arcade"   as Category, Preview: PongPreview },
  { id: "asteroids",     label: "Asteroids",       desc: "Shoot rocks, don't get hit.",                  controls: "↑ thrust · ← → rotate · space",cat: "arcade"   as Category, Preview: AsteroidsPreview },
  { id: "space-invaders",label: "Space Invaders",  desc: "Shoot the alien grid before they reach you.",  controls: "← → move · space shoot",       cat: "arcade"   as Category, Preview: SpaceInvadersPreview },
  { id: "pacman",        label: "Pac-Man",         desc: "Eat all dots, avoid the ghosts.",              controls: "arrows / WASD",                cat: "arcade"   as Category, Preview: PacmanPreview },
  { id: "dino",          label: "Dino Run",        desc: "Jump over cacti in an endless desert run.",    controls: "space / tap",                  cat: "arcade"   as Category, Preview: DinoPreview },
  { id: "piano-tiles",   label: "Piano Tiles",     desc: "Tap black tiles as they scroll down.",         controls: "click / tap",                  cat: "arcade"   as Category, Preview: PianoTilesPreview },
  // ── Puzzle ──
  { id: "2048",          label: "2048",            desc: "Merge tiles to reach 2048.",                   controls: "arrows / swipe",               cat: "puzzle"   as Category, Preview: Game2048Preview },
  { id: "minesweeper",   label: "Minesweeper",     desc: "Reveal all safe cells, flag the mines.",       controls: "click / right-click",          cat: "puzzle"   as Category, Preview: MinesweeperPreview },
  { id: "sudoku",        label: "Sudoku",          desc: "Fill the 9×9 grid with 1–9.",                  controls: "click + type / arrows",        cat: "puzzle"   as Category, Preview: SudokuPreview },
  { id: "lights-out",    label: "Lights Out",      desc: "Toggle cells to turn every light off.",        controls: "click / tap",                  cat: "puzzle"   as Category, Preview: LightsOutPreview },
  { id: "nonogram",      label: "Nonogram",        desc: "Fill cells using row and column clues.",       controls: "left fill · right X",          cat: "puzzle"   as Category, Preview: NonogramPreview },
  { id: "color-flood",   label: "Color Flood",     desc: "Flood the board with one color in 22 moves.", controls: "click colors",                 cat: "puzzle"   as Category, Preview: ColorFloodPreview },
  { id: "brick-builder", label: "Brick Builder",   desc: "Push boxes onto targets. Sokoban-style.",     controls: "arrows / WASD",                cat: "puzzle"   as Category, Preview: BrickBuilderPreview },
  { id: "memory-match",  label: "Memory Match",    desc: "Flip cards and match all pairs.",             controls: "click / tap",                  cat: "puzzle"   as Category, Preview: MemoryMatchPreview },
  // ── Card & Dice ──
  { id: "solitaire",     label: "Solitaire",       desc: "Classic Klondike — move all cards to foundation.", controls: "click to move",          cat: "card"     as Category, Preview: SolitairePreview },
  { id: "blackjack",     label: "Blackjack",       desc: "Beat the dealer to 21 without busting.",      controls: "click buttons",               cat: "card"     as Category, Preview: BlackjackPreview },
  { id: "yahtzee",       label: "Yahtzee",         desc: "Roll 5 dice, fill your score card.",           controls: "click dice to hold",          cat: "card"     as Category, Preview: YahtzeePreview },
  // ── Word & Brain ──
  { id: "wordle",        label: "Wordle",          desc: "Guess the 5-letter word in 6 tries.",          controls: "keyboard / tap",              cat: "word"     as Category, Preview: WordlePreview },
  { id: "typing",        label: "Typing Speed",    desc: "How many words per minute can you type?",      controls: "keyboard",                    cat: "word"     as Category, Preview: TypingPreview },
  { id: "hangman",       label: "Hangman",         desc: "Guess the word before the figure is drawn.",   controls: "keyboard / tap",              cat: "word"     as Category, Preview: HangmanPreview },
  { id: "simon",         label: "Simon Says",      desc: "Repeat the growing colour sequence.",          controls: "click / tap",                 cat: "word"     as Category, Preview: SimonPreview },
  { id: "crossword-mini",label: "Crossword Mini",  desc: "Solve a small crossword with coding clues.",  controls: "type letters · space toggle", cat: "word"     as Category, Preview: CrosswordMiniPreview },
  { id: "word-search",   label: "Word Search",     desc: "Find all hidden words in the letter grid.",   controls: "click letters in order",      cat: "word"     as Category, Preview: WordSearchPreview },
  // ── Strategy ──
  { id: "chess",         label: "Chess",           desc: "Play against a simple AI opponent.",           controls: "click piece + click dest",    cat: "strategy" as Category, Preview: ChessPreview },
  { id: "checkers",      label: "Checkers",        desc: "Capture all enemy pieces to win.",             controls: "click piece + click dest",    cat: "strategy" as Category, Preview: CheckersPreview },
  { id: "battleship",    label: "Battleship",      desc: "Sink all enemy ships before yours sink.",      controls: "click to shoot",              cat: "strategy" as Category, Preview: BattleshipPreview },
  { id: "connect-four",  label: "Connect Four",    desc: "Drop discs to connect four in a row.",        controls: "click column to drop",        cat: "strategy" as Category, Preview: ConnectFourPreview },
  { id: "tic-tac-toe",   label: "Tic-Tac-Toe",    desc: "Classic X vs O — beat the unbeatable AI.",     controls: "click cell",                  cat: "strategy" as Category, Preview: TicTacToePreview },
]

/** Renders children only once the element scrolls into view */
function LazyPreview({ Preview, id }: { Preview: ComponentType; id: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current; if (!el) return
    // If already in viewport on mount, show immediately
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setVisible(true); obs.disconnect() }
      },
      { rootMargin: "300px" }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <div ref={ref} className="w-full h-full">
      {visible ? (
        <Preview />
      ) : (
        <div className="w-full h-full bg-zinc-950 flex items-center justify-center">
          <div className="w-5 h-5 rounded-full border-2 border-primary/30 border-t-primary animate-spin" />
        </div>
      )}
    </div>
  )
}

const CAT_MAP = Object.fromEntries(CATEGORIES.map(c => [c.id, c]))

export function GamesPageContent() {
  const router = useRouter()
  const [scores, setScores] = useState<Record<string, number>>({})
  const [activeCategory, setActiveCategory] = useState<Category>("all")
  const [visibleCount, setVisibleCount] = useState(12)
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  useEffect(() => { setScores(loadHS()) }, [])

  const filtered = activeCategory === "all" ? GAMES : GAMES.filter(g => g.cat === activeCategory)
  const visibleGames = filtered.slice(0, visibleCount)
  const hasMore = visibleCount < filtered.length

  const handleCategoryChange = useCallback((cat: Category) => {
    setActiveCategory(cat)
    setVisibleCount(12)
  }, [])

  const categoryCount = (cat: Category) =>
    cat === "all" ? GAMES.length : GAMES.filter(g => g.cat === cat).length

  return (
    <main className="min-h-screen pt-24 pb-20 px-4">
      <div className="mx-auto max-w-6xl">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.215, 0.61, 0.355, 1] }}
          className="mb-10 text-center"
        >
          <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full border border-primary/20 bg-primary/5">
            <Gamepad2 className="h-3.5 w-3.5 text-primary" />
            <span className="font-mono text-xs text-primary">arcade</span>
          </div>
          <h1 className="font-mono text-5xl font-bold tracking-tight text-foreground mb-3">
            <span className="text-primary">Games</span>
          </h1>
          <p className="text-muted-foreground font-mono text-sm">
            {GAMES.length} games · all built in the browser · no installs
          </p>
        </motion.div>

        {/* ── Category filter bar ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.08, ease: [0.215, 0.61, 0.355, 1] }}
          className="mb-10 flex flex-wrap gap-2 justify-center"
        >
          {CATEGORIES.map(cat => {
            const isActive = activeCategory === cat.id
            return (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-full font-mono text-xs font-semibold
                  border transition-all duration-200 select-none
                  ${isActive
                    ? "bg-primary text-primary-foreground border-primary shadow-[0_0_16px_color-mix(in_oklch,var(--primary)_30%,transparent)]"
                    : "bg-transparent text-muted-foreground border-border hover:border-primary/40 hover:text-foreground"
                  }
                `}
              >
                <span className="font-mono">{cat.icon}</span>
                <span>{cat.label}</span>
                <span className="opacity-50 text-[10px]">({categoryCount(cat.id)})</span>
              </button>
            )
          })}
        </motion.div>

        {/* ── Game grid ── */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 font-mono text-muted-foreground">
            no games in this category yet
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              <AnimatePresence initial={false}>
                {visibleGames.map(({ id, label, desc, controls, Preview, cat }, i) => {
                  const hs = scores[id]
                  const catInfo = CAT_MAP[cat]
                  return (
                    <motion.div
                      key={id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.2, delay: Math.min(i * 0.03, 0.3) }}
                      onMouseEnter={() => setHoveredId(id)}
                      onMouseLeave={() => setHoveredId(null)}
                      onClick={() => router.push(`/games/${id}`)}
                      className="group relative cursor-pointer rounded-2xl border border-border bg-card overflow-hidden transition-all duration-250 hover:border-primary/40 hover:shadow-[0_4px_24px_color-mix(in_oklch,var(--primary)_12%,transparent)] hover:-translate-y-0.5"
                    >
                      {/* Preview area */}
                      <div className="relative w-full overflow-hidden bg-zinc-950" style={{ aspectRatio: "16/9" }}>
                        <LazyPreview Preview={Preview} id={id} />

                        {/* Hover play overlay */}
                        <motion.div
                          initial={false}
                          animate={{ opacity: hoveredId === id ? 1 : 0 }}
                          transition={{ duration: 0.15 }}
                          className="absolute inset-0 flex items-center justify-center bg-black/60 pointer-events-none"
                        >
                          <div className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-mono text-sm font-bold shadow-lg">
                            <Play className="h-4 w-4 fill-current" />
                            play
                          </div>
                        </motion.div>

                        {/* Category pill */}
                        <div className="absolute top-2 right-2 pointer-events-none">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-black/70 text-primary/90 border border-primary/20 backdrop-blur-sm">
                            {catInfo?.icon} {catInfo?.label}
                          </span>
                        </div>

                        {/* High score badge */}
                        {hs !== undefined && (
                          <div className="absolute top-2 left-2 pointer-events-none">
                            <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono bg-black/70 text-yellow-400/90 border border-yellow-400/20 backdrop-blur-sm">
                              <Trophy className="h-2.5 w-2.5" />{hs}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Card info */}
                      <div className="p-4">
                        <h2 className="font-mono font-bold text-sm text-foreground group-hover:text-primary transition-colors mb-1">
                          {label}
                        </h2>
                        <p className="font-mono text-xs text-muted-foreground leading-relaxed mb-2">{desc}</p>
                        <p className="font-mono text-[10px] text-muted-foreground/40 truncate">{controls}</p>
                      </div>
                    </motion.div>
                  )
                })}
              </AnimatePresence>
            </div>

            {/* Load More */}
            {hasMore && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="flex justify-center mt-10"
              >
                <button
                  onClick={() => setVisibleCount(v => v + 12)}
                  className="flex items-center gap-2 px-8 py-3 rounded-xl font-mono text-sm font-semibold
                    border border-primary/30 text-primary hover:bg-primary/10 hover:border-primary/50
                    transition-all duration-200 hover:shadow-[0_0_20px_color-mix(in_oklch,var(--primary)_15%,transparent)]"
                >
                  <ChevronDown className="h-4 w-4" />
                  load {Math.min(12, filtered.length - visibleCount)} more
                  <span className="opacity-50 text-xs">({filtered.length - visibleCount} remaining)</span>
                </button>
              </motion.div>
            )}
          </>
        )}
      </div>
    </main>
  )
}
