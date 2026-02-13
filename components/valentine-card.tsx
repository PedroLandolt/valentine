"use client"

import { useState, useCallback } from "react"
import Image from "next/image"

interface FloatingHeart {
  id: number
  left: number
  emoji: string
}

export function ValentineCard() {
  const [noCount, setNoCount] = useState(0)
  const [yesScale, setYesScale] = useState(1)
  const [accepted, setAccepted] = useState(false)
  const [hearts, setHearts] = useState<FloatingHeart[]>([])

  const handleNo = useCallback(() => {
    const newCount = noCount + 1
    setNoCount(newCount)
    setYesScale((prev) => Math.min(prev + 0.15, 2.2))
  }, [noCount])

  const handleYes = useCallback(() => {
    setAccepted(true)

    // Spawn floating hearts
    const newHearts: FloatingHeart[] = Array.from({ length: 12 }, (_, i) => ({
      id: Date.now() + i,
      left: Math.random() * 100,
      emoji: ["🖤", "🧡", "🌙", "💕"][Math.floor(Math.random() * 4)],
    }))
    setHearts(newHearts)

    // Clean up hearts after animation
    setTimeout(() => setHearts([]), 2200)
  }, [])

  // Determine which message to show
  const getMessage = () => {
    if (noCount >= 6) {
      return "JÁ CHEGA DE BRINCADEIRAS ÉS A MINHA PÁ! E NÃO TEM COMO FUGIRES TRENGA"
    }
    if (noCount >= 3) {
      return "Deixa de ser um Molocotone!"
    }
    return null
  }

  const message = getMessage()
  const hideNo = noCount >= 6

  if (accepted) {
    return (
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-8">
        {/* Floating hearts */}
        {hearts.map((heart) => (
          <span
            key={heart.id}
            className="animate-float-heart pointer-events-none fixed text-2xl"
            style={{
              left: `${heart.left}%`,
              bottom: "20%",
            }}
          >
            {heart.emoji}
          </span>
        ))}

        <div className="animate-fade-in-up w-full max-w-[400px] rounded-2xl bg-card p-6 text-center shadow-lg sm:p-8">
          <div className="animate-pulse-soft mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full text-5xl sm:h-24 sm:w-24">
            {"🖤"}
          </div>

          <p
            className="mb-3 text-card-foreground"
            style={{ fontFamily: "var(--font-dancing)", fontSize: "1.75rem" }}
          >
            {"Sabia que ias dizer que xim 😌🖤🧡"}
          </p>

          <p
            className="text-card-foreground/80"
            style={{ fontFamily: "var(--font-dancing)", fontSize: "1.5rem" }}
          >
            {"Amo-te daqui ate a Lua 🌙🧡"}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-8">
      <div className="w-full max-w-[400px] rounded-2xl bg-card p-6 shadow-lg sm:p-8">
        {/* Cat + Moon image */}
        <div className="relative mx-auto mb-5 aspect-square w-44 overflow-hidden rounded-xl sm:w-52">
          <Image
            src="/images/cat-moon.jpg"
            alt="Gato preto fofo com lua"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Question */}
        <h1
          className="mb-6 text-center text-card-foreground"
          style={{ fontFamily: "var(--font-dancing)", fontSize: "1.8rem", lineHeight: 1.3 }}
        >
          {"Queres ser a minha Valentine?"}
        </h1>

        {/* Buttons */}
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={handleYes}
            className="rounded-xl bg-primary px-6 py-3 font-semibold text-primary-foreground shadow-md transition-all duration-300 ease-out hover:brightness-110 active:scale-95"
            style={{
              transform: `scale(${yesScale})`,
              fontSize: `${Math.min(1 + (yesScale - 1) * 0.25, 1.4)}rem`,
            }}
          >
            Xim
          </button>

          {!hideNo && (
            <button
              onClick={handleNo}
              className="rounded-xl border border-border bg-secondary px-6 py-3 font-semibold text-secondary-foreground shadow-sm transition-all duration-200 hover:bg-muted active:scale-95"
            >
              {"Nao"}
            </button>
          )}
        </div>

        {/* Funny messages */}
        {message && (
          <p
            className={`animate-fade-in-up mt-5 text-center font-bold text-card-foreground ${
              noCount >= 6 ? "text-base sm:text-lg" : "text-sm sm:text-base"
            }`}
            style={
              noCount < 6
                ? { fontFamily: "var(--font-dancing)", fontSize: "1.2rem" }
                : {}
            }
          >
            {message}
          </p>
        )}
      </div>
    </div>
  )
}
