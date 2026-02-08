"use client"

import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react"
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useTransform,
} from "framer-motion"

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect

function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)

  useIsomorphicLayoutEffect(() => {
    const mq = window.matchMedia(query)
    setMatches(mq.matches)
    const handler = () => setMatches(mq.matches)
    mq.addEventListener("change", handler)
    return () => mq.removeEventListener("change", handler)
  }, [query])

  return matches
}

function ThreeDPhotoCarousel({ images }: { images?: string[] }) {
  const [activeImg, setActiveImg] = useState<string | null>(null)
  const isSmall = useMediaQuery("(max-width: 640px)")
  const cards = useMemo(() => images ?? [], [images])

  const cylinderWidth = isSmall ? 1100 : 1800
  const faceCount = cards.length
  const faceWidth = cylinderWidth / faceCount
  const radius = cylinderWidth / (2 * Math.PI)

  const rotation = useMotionValue(0)
  const transform = useTransform(
    rotation,
    (value) => `rotate3d(0, 1, 0, ${value}deg)`
  )

  const isDragging = useRef(false)
  const animFrame = useRef(0)

  // Clean up animation on unmount
  useEffect(() => () => cancelAnimationFrame(animFrame.current), [])

  const startDrag = useCallback(
    (startX: number) => {
      if (activeImg) return null

      const startRot = rotation.get()
      let lastX = startX
      let lastTime = Date.now()
      let vel = 0
      isDragging.current = false
      cancelAnimationFrame(animFrame.current)

      return {
        move(clientX: number) {
          const dx = clientX - startX
          if (Math.abs(dx) > 5) isDragging.current = true

          const now = Date.now()
          const dt = now - lastTime
          if (dt > 0) vel = (clientX - lastX) / dt
          lastX = clientX
          lastTime = now

          rotation.set(startRot + dx * 0.15)
        },
        end() {
          // Inertia
          let cv = vel * 50
          if (Math.abs(cv) > 1) {
            const decel = () => {
              cv *= 0.95
              rotation.set(rotation.get() + cv * 0.016)
              if (Math.abs(cv) > 0.5) {
                animFrame.current = requestAnimationFrame(decel)
              }
            }
            animFrame.current = requestAnimationFrame(decel)
          }
        },
      }
    },
    [activeImg, rotation]
  )

  const onMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault()
      const drag = startDrag(e.clientX)
      if (!drag) return

      const onMove = (ev: MouseEvent) => drag.move(ev.clientX)
      const onUp = () => {
        window.removeEventListener("mousemove", onMove)
        window.removeEventListener("mouseup", onUp)
        drag.end()
      }
      window.addEventListener("mousemove", onMove)
      window.addEventListener("mouseup", onUp)
    },
    [startDrag]
  )

  const onTouchStart = useCallback(
    (e: React.TouchEvent) => {
      const drag = startDrag(e.touches[0].clientX)
      if (!drag) return

      const onMove = (ev: TouchEvent) => {
        ev.preventDefault()
        drag.move(ev.touches[0].clientX)
      }
      const onEnd = () => {
        window.removeEventListener("touchmove", onMove)
        window.removeEventListener("touchend", onEnd)
        drag.end()
      }
      window.addEventListener("touchmove", onMove, { passive: false })
      window.addEventListener("touchend", onEnd)
    },
    [startDrag]
  )

  const onCardClick = useCallback(
    (imgUrl: string) => {
      if (isDragging.current) return
      setActiveImg(imgUrl)
    },
    []
  )

  return (
    <div className="relative">
      {/* Lightbox */}
      <AnimatePresence>
        {activeImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setActiveImg(null)}
            className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-5 md:p-16 lg:px-32 cursor-pointer"
          >
            <motion.img
              src={activeImg}
              className="max-w-full max-h-full rounded-2xl shadow-2xl"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Carousel wrapper — mouse/touch events here (no 3D transforms) */}
      <div
        className="relative h-[500px] w-full overflow-hidden cursor-grab active:cursor-grabbing select-none"
        onMouseDown={onMouseDown}
        onTouchStart={onTouchStart}
      >
        <div
          className="flex h-full items-center justify-center"
          style={{
            perspective: "1000px",
            transformStyle: "preserve-3d",
          }}
        >
          <motion.div
            className="relative flex h-full origin-center justify-center"
            style={{
              transform,
              width: cylinderWidth,
              transformStyle: "preserve-3d",
            }}
          >
            {cards.map((imgUrl, i) => (
              <div
                key={`${imgUrl}-${i}`}
                className="absolute flex h-full origin-center items-center justify-center rounded-xl p-2"
                style={{
                  width: `${faceWidth}px`,
                  transform: `rotateY(${i * (360 / faceCount)}deg) translateZ(${radius}px)`,
                }}
                onClick={() => onCardClick(imgUrl)}
              >
                <img
                  src={imgUrl}
                  alt={`project ${i + 1}`}
                  className="pointer-events-none w-full rounded-xl object-cover aspect-square select-none"
                  draggable={false}
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export { ThreeDPhotoCarousel }
