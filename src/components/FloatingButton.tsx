'use client'
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Props { onClick: () => void }

export default function FloatingButton({ onClick }: Props) {
  const [pos, setPos] = useState({ x: 50, y: 50 })
  const [visible, setVisible] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    // Appear instantly
    setVisible(true)

    // Start roaming immediately
    intervalRef.current = setInterval(() => {
      setPos({
        x: 15 + Math.random() * 70,
        y: 15 + Math.random() * 70,
      })
    }, 3200)

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.4, ease: 'backOut' }}
          className="float-btn"
          style={{
            left: `${pos.x}%`,
            top: `${pos.y}%`,
            background: 'linear-gradient(135deg, #c8860a, #d4af37, #f5e09a, #d4af37)',
            backgroundSize: '200% 200%',
            border: '1.5px solid rgba(255,230,100,0.5)',
            borderRadius: '50px',
            padding: '16px 36px',
            fontFamily: 'Cinzel, serif',
            fontSize: 'clamp(0.9rem, 2vw, 1.2rem)',
            fontWeight: 700,
            color: '#1a0800',
            letterSpacing: '0.06em',
            userSelect: 'none',
          }}
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.95 }}
          onClick={onClick}
        >
          Click Me ❤️
        </motion.button>
      )}
    </AnimatePresence>
  )
}
