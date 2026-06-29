// Reusable framer-motion variants.

const EASE = [0.16, 1, 0.3, 1]

export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
}

export const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
}

// Word-by-word headline reveal (clip-path mask sliding up).
export const wordParent = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}

export const wordChild = {
  hidden: { y: '110%' },
  show: { y: 0, transition: { duration: 0.8, ease: EASE } },
}

// Default viewport config for whileInView reveals.
export const viewport = { once: true, margin: '0px 0px -12% 0px' }
