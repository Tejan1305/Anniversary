'use client'
import { useEffect, useRef } from 'react'

interface Particle {
  x: number; y: number; vx: number; vy: number
  size: number; opacity: number; opacityDir: number
  color: string; type: 'bokeh' | 'star' | 'dust'
}

const COLORS = ['#d4af37', '#f5e642', '#c8956c', '#fff8e7', '#e8c97e', '#ffd700']

export default function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!
    let animId: number

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // Create particles
    const particles: Particle[] = Array.from({ length: 90 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.3,
      vy: -Math.random() * 0.4 - 0.05,
      size: Math.random() * 3.5 + 0.8,
      opacity: Math.random() * 0.7 + 0.1,
      opacityDir: (Math.random() - 0.5) * 0.008,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      type: (['bokeh', 'star', 'dust'] as const)[Math.floor(Math.random() * 3)],
    }))

    const drawBokeh = (p: Particle) => {
      const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 4)
      grad.addColorStop(0, p.color + Math.floor(p.opacity * 255).toString(16).padStart(2, '0'))
      grad.addColorStop(1, 'transparent')
      ctx.fillStyle = grad
      ctx.beginPath()
      ctx.arc(p.x, p.y, p.size * 4, 0, Math.PI * 2)
      ctx.fill()
    }

    const drawStar = (p: Particle) => {
      ctx.fillStyle = p.color + Math.floor(p.opacity * 255).toString(16).padStart(2, '0')
      ctx.beginPath()
      ctx.arc(p.x, p.y, p.size * 0.8, 0, Math.PI * 2)
      ctx.fill()
    }

    const drawDust = (p: Particle) => {
      ctx.fillStyle = p.color + Math.floor(p.opacity * 0.5 * 255).toString(16).padStart(2, '0')
      ctx.beginPath()
      ctx.ellipse(p.x, p.y, p.size * 1.5, p.size * 0.5, 0.5, 0, Math.PI * 2)
      ctx.fill()
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      for (const p of particles) {
        p.x += p.vx; p.y += p.vy
        p.opacity += p.opacityDir
        if (p.opacity > 0.85 || p.opacity < 0.05) p.opacityDir *= -1
        if (p.y < -20) p.y = canvas.height + 20
        if (p.x < -20) p.x = canvas.width + 20
        if (p.x > canvas.width + 20) p.x = -20
        if (p.type === 'bokeh') drawBokeh(p)
        else if (p.type === 'star') drawStar(p)
        else drawDust(p)
      }
      animId = requestAnimationFrame(draw)
    }
    draw()

    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize) }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'fixed', inset: 0, zIndex: 1, pointerEvents: 'none' }}
    />
  )
}
