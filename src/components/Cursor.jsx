import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

// A soft glow that trails the cursor and grows over interactive elements.
// Hidden on touch / reduced-motion.
export default function Cursor() {
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.5 })
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.5 })
  const [hovering, setHovering] = useState(false)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || reduced) return
    setEnabled(true)

    const move = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
      const el = e.target
      setHovering(
        !!(el && el.closest && el.closest('a, button, .project-card, .skill-chips span')),
      )
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [x, y])

  if (!enabled) return null

  return (
    <motion.div
      className="cursor-glow"
      style={{ left: sx, top: sy }}
      animate={{ scale: hovering ? 2.4 : 1, opacity: hovering ? 0.9 : 0.55 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
    />
  )
}
