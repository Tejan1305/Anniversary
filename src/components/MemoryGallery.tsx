'use client'
import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

const SLIDES = [
  {
    src: '/images/family1.jpeg',
    caption: 'Making Memories at Every Corner 🐠',
    sub: 'Adventures together, always',
  },
  {
    src: '/images/family2.jpeg',
    caption: 'Together Wherever Life Takes Us 🌟',
    sub: 'Our family, our strength',
  },
  {
    src: '/images/family3.jpeg',
    caption: 'Every Journey, A Family Adventure ✈️',
    sub: 'Miles apart, hearts always together',
  },
  {
    src: '/images/family4.jpeg',
    caption: 'Blessings Shared, Always Together 🪔',
    sub: 'Faith and love, hand in hand',
  },
  {
    src: '/images/family5.jpeg',
    caption: 'Side by Side, Every Single Day ❤️',
    sub: '21 beautiful years and counting…',
  },
  {
    src: '/images/family6.jpeg',
    caption: 'A Love that Wanders the World Together 🏛️',
    sub: 'Every landmark is brighter with you',
  },
  {
    src: '/images/family7.jpeg',
    caption: 'Home is Wherever You Two Are 🏠',
    sub: 'The warmest place in the world',
  },
  {
    src: '/images/family8.jpeg',
    caption: 'Laughter Around Every Table 🍽️',
    sub: 'The best memories are made together',
  },
  {
    src: '/images/family9.jpeg',
    caption: 'Making Waves, Making Memories 🏊',
    sub: 'Fun times are family times',
  },
  {
    src: '/images/family10.jpeg',
    caption: 'Dressed in Joy, Celebrating Love ✨',
    sub: 'Every occasion is special with you',
  },
  {
    src: '/images/family11.jpeg',
    caption: 'A Window to Our Beautiful World 🚂',
    sub: 'Lifes journey, together as one',
  },
  {
    src: '/images/family12.jpeg',
    caption: 'Dad & His Boys, by the River 🌊',
    sub: 'A fathers love flows endlessly',
  },
]

interface Heart { id: number; x: number; y: number; dur: number; delay: number }

export default function MemoryGallery() {
  const [current, setCurrent] = useState(0)
  const [hearts, setHearts] = useState<Heart[]>([])
  const [kbKey, setKbKey] = useState(0)

  const next = useCallback(() => {
    setCurrent(c => (c + 1) % SLIDES.length)
    setKbKey(k => k + 1)
  }, [])

  const prev = useCallback(() => {
    setCurrent(c => (c - 1 + SLIDES.length) % SLIDES.length)
    setKbKey(k => k + 1)
  }, [])

  // Auto advance every 8s
  useEffect(() => {
    const t = setInterval(next, 8000)
    return () => clearInterval(t)
  }, [next])

  // Spawn floating hearts
  useEffect(() => {
    const spawn = () => {
      const h: Heart = {
        id: Date.now() + Math.random(),
        x: 5 + Math.random() * 90,
        y: 70 + Math.random() * 20,
        dur: 4 + Math.random() * 3,
        delay: Math.random() * 1.5,
      }
      setHearts(prev => [...prev.slice(-14), h])
    }
    const t = setInterval(spawn, 1400)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="gallery-wrap" style={{ zIndex: 20 }}>
      {/* Slides */}
      <AnimatePresence mode="sync">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.6, ease: 'easeInOut' }}
          style={{ position: 'absolute', inset: 0 }}
        >
          {/* Ken Burns image */}
          <div
            key={kbKey}
            className={kbKey % 2 === 0 ? 'kb-in' : 'kb-out'}
            style={{ position: 'absolute', inset: 0, willChange: 'transform' }}
          >
            <Image
              src={SLIDES[current].src}
              alt={SLIDES[current].caption}
              fill
              style={{ objectFit: 'contain', objectPosition: 'center center' }}
              priority
            />
          </div>

          {/* Golden cinematic overlay */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to bottom, rgba(20,8,2,0.45) 0%, transparent 30%, transparent 60%, rgba(10,4,20,0.75) 100%)',
          }} />
          <div style={{
            position: 'absolute', inset: 0,
            background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.55) 100%)',
          }} />
          {/* Warm golden color grade */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'rgba(180, 120, 20, 0.08)',
            mixBlendMode: 'overlay',
          }} />
        </motion.div>
      </AnimatePresence>

      {/* Floating hearts */}
      {hearts.map(h => (
        <div
          key={h.id}
          className="heart-particle"
          style={{
            left: `${h.x}%`,
            bottom: `${100 - h.y}%`,
            animationDuration: `${h.dur}s`,
            animationDelay: `${h.delay}s`,
          }}
        >
          ❤️
        </div>
      ))}

      {/* Caption */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`caption-${current}`}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 1, delay: 0.4 }}
          style={{
            position: 'absolute',
            bottom: '80px',
            left: '50%',
            transform: 'translateX(-50%)',
            textAlign: 'center',
            width: '90%',
            maxWidth: '600px',
            zIndex: 30,
          }}
        >
          <div className="glass-card" style={{ padding: '20px 32px' }}>
            <p style={{
              fontFamily: 'Cinzel, serif',
              fontSize: 'clamp(1rem, 2.8vw, 1.5rem)',
              fontWeight: 600,
              color: '#f5e09a',
              letterSpacing: '0.04em',
              textShadow: '0 0 20px #d4af3766',
              marginBottom: '8px',
            }}>
              {SLIDES[current].caption}
            </p>
            <p style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: 'clamp(0.85rem, 2vw, 1.1rem)',
              fontStyle: 'italic',
              color: '#c8b88a',
              letterSpacing: '0.06em',
            }}>
              {SLIDES[current].sub}
            </p>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Title top */}
      <div style={{
        position: 'absolute', top: '28px', left: 0, right: 0,
        textAlign: 'center', zIndex: 30,
      }}>
        <p style={{
          fontFamily: 'Cinzel, serif',
          fontSize: 'clamp(0.75rem, 1.8vw, 1rem)',
          color: '#d4af37',
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          textShadow: '0 0 20px #d4af3799',
        }}>
          Happy 21st Anniversary — Dad &amp; Mom ❤️
        </p>
      </div>

      {/* Dot indicators */}
      <div style={{
        position: 'absolute', bottom: '28px', left: 0, right: 0,
        display: 'flex', justifyContent: 'center', gap: '10px', zIndex: 30,
      }}>
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => { setCurrent(i); setKbKey(k => k + 1) }}
            style={{
              width: i === current ? '28px' : '8px',
              height: '8px',
              borderRadius: '4px',
              background: i === current ? '#d4af37' : 'rgba(212,175,55,0.35)',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.4s ease',
              boxShadow: i === current ? '0 0 10px #d4af37' : 'none',
            }}
          />
        ))}
      </div>

      {/* Prev / Next arrows */}
      {[{ dir: 'prev', label: '‹', fn: prev, side: '20px' },
        { dir: 'next', label: '›', fn: next, side: 'auto' }].map(({ dir, label, fn, side }) => (
        <button
          key={dir}
          onClick={fn}
          style={{
            position: 'absolute', top: '50%',
            left: dir === 'prev' ? side : 'auto',
            right: dir === 'next' ? '20px' : 'auto',
            transform: 'translateY(-50%)',
            background: 'rgba(212,175,55,0.15)',
            border: '1px solid rgba(212,175,55,0.3)',
            borderRadius: '50%',
            width: '48px', height: '48px',
            color: '#d4af37',
            fontSize: '1.8rem',
            cursor: 'pointer',
            backdropFilter: 'blur(8px)',
            zIndex: 30,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'all 0.3s',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.background = 'rgba(212,175,55,0.3)'
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.background = 'rgba(212,175,55,0.15)'
          }}
        >
          {label}
        </button>
      ))}
    </div>
  )
}
