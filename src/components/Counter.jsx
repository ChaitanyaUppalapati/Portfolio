import { useEffect, useRef, useState } from 'react'
import { animate, useInView } from 'framer-motion'

// Counts from 0 up to `value` the first time it scrolls into view.
export default function Counter({ value, suffix = '', duration = 1.4 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      setDisplay(value)
      return
    }
    const controls = animate(0, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    })
    return () => controls.stop()
  }, [inView, value, duration])

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  )
}
