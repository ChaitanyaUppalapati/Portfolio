import { useEffect, useRef } from 'react'

// Interactive constellation: drifting nodes that link up when near each other
// and reach toward the cursor. A nod to multi-agent systems.
export default function ParticleField() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    let width = 0
    let height = 0
    let dpr = Math.min(window.devicePixelRatio || 1, 2)
    let nodes = []
    let raf = 0
    const mouse = { x: -9999, y: -9999, active: false }

    const accent = [255, 86, 48] // --accent
    const ink = [240, 239, 233] // --ink

    function resize() {
      const rect = canvas.getBoundingClientRect()
      width = rect.width
      height = rect.height
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      // Scale node count to area, but keep it sane
      const target = Math.min(90, Math.max(34, Math.round((width * height) / 16000)))
      nodes = Array.from({ length: target }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.6 + 0.8,
        hot: Math.random() < 0.12, // a few accent-colored "agents"
      }))
    }

    const LINK_DIST = 130
    const MOUSE_DIST = 200

    function draw() {
      ctx.clearRect(0, 0, width, height)

      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i]
        n.x += n.vx
        n.y += n.vy
        if (n.x < 0 || n.x > width) n.vx *= -1
        if (n.y < 0 || n.y > height) n.vy *= -1

        // Gentle attraction toward cursor
        if (mouse.active) {
          const dx = mouse.x - n.x
          const dy = mouse.y - n.y
          const d = Math.hypot(dx, dy)
          if (d < MOUSE_DIST && d > 0.1) {
            const pull = (1 - d / MOUSE_DIST) * 0.12
            n.x += (dx / d) * pull
            n.y += (dy / d) * pull
          }
        }

        // Links between nearby nodes
        for (let j = i + 1; j < nodes.length; j++) {
          const m = nodes[j]
          const dx = n.x - m.x
          const dy = n.y - m.y
          const d = Math.hypot(dx, dy)
          if (d < LINK_DIST) {
            const a = (1 - d / LINK_DIST) * 0.5
            const c = n.hot || m.hot ? accent : ink
            ctx.strokeStyle = `rgba(${c[0]},${c[1]},${c[2]},${a})`
            ctx.lineWidth = 0.6
            ctx.beginPath()
            ctx.moveTo(n.x, n.y)
            ctx.lineTo(m.x, m.y)
            ctx.stroke()
          }
        }

        // Link to cursor
        if (mouse.active) {
          const dx = mouse.x - n.x
          const dy = mouse.y - n.y
          const d = Math.hypot(dx, dy)
          if (d < MOUSE_DIST) {
            const a = (1 - d / MOUSE_DIST) * 0.6
            ctx.strokeStyle = `rgba(${accent[0]},${accent[1]},${accent[2]},${a})`
            ctx.lineWidth = 0.7
            ctx.beginPath()
            ctx.moveTo(n.x, n.y)
            ctx.lineTo(mouse.x, mouse.y)
            ctx.stroke()
          }
        }

        // Node dot
        const c = n.hot ? accent : ink
        ctx.fillStyle = `rgba(${c[0]},${c[1]},${c[2]},${n.hot ? 0.95 : 0.6})`
        ctx.beginPath()
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2)
        ctx.fill()
      }

      raf = requestAnimationFrame(draw)
    }

    function onMove(e) {
      const rect = canvas.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
      mouse.active = true
    }
    function onLeave() {
      mouse.active = false
      mouse.x = -9999
      mouse.y = -9999
    }

    resize()
    if (prefersReduced) {
      // Draw a single static frame, no animation loop
      const saved = nodes.map((n) => ({ ...n, vx: 0, vy: 0 }))
      nodes = saved
      draw()
      cancelAnimationFrame(raf)
    } else {
      draw()
      window.addEventListener('mousemove', onMove)
      window.addEventListener('mouseleave', onLeave)
    }
    window.addEventListener('resize', resize)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return <canvas ref={canvasRef} className="particle-field" aria-hidden="true" />
}
