import { useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

// Wraps a child so it leans toward the cursor while hovered.
export default function Magnetic({ children, strength = 0.35, className }) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 250, damping: 18, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 250, damping: 18, mass: 0.4 })

  const onMove = (e) => {
    const rect = ref.current.getBoundingClientRect()
    x.set((e.clientX - (rect.left + rect.width / 2)) * strength)
    y.set((e.clientY - (rect.top + rect.height / 2)) * strength)
  }
  const reset = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x: sx, y: sy, display: 'inline-flex' }}
      onMouseMove={onMove}
      onMouseLeave={reset}
    >
      {children}
    </motion.div>
  )
}
