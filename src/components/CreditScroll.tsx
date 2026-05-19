'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

interface Props { onComplete: () => void }

const SPEECH = `Dear Dad and Mom,

Your love is the very foundation of our happiness
and the beating heart of our family.

Through every challenge and every beautiful moment,
you both stood together
with endless love, grace, and strength.

The sacrifices you made,
the care you always showed,
and the values you taught us
can never be replaced.

Watching your journey together
has been our greatest gift in life.

You taught us what true love looks like —
patient, selfless, and unconditional.

Thank you for filling our lives
with warmth, happiness,
and the most beautiful memories.

You are truly the best parents
anyone could ever wish for.

Wishing you endless joy,
beautiful health, laughter,
and many more wonderful years together.

Happy 21st Anniversary
to the most wonderful couple ever.

We love you, always. ❤️`

export default function CreditScroll({ onComplete }: Props) {
  const textRef = useRef<HTMLDivElement>(null)
  const wrapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const text = textRef.current
    const wrap = wrapRef.current
    if (!text || !wrap) return

    const vh = window.innerHeight
    const totalH = text.scrollHeight

    const tl = gsap.timeline({ onComplete })
    // Stage 1: hold the title for 2s
    tl.set(text, { y: vh * 0.25 })
    
    // We subtract vh * 0.3 (the bottom padding) so we don't waste time scrolling empty space.
    const distanceToScroll = totalH - (vh * 0.3);

    // Decrease speed (divide by 35 instead of 55) so the text is easily readable.
    const calculatedDuration = distanceToScroll / 30;

    tl.to(text, {
      y: -distanceToScroll,
      duration: calculatedDuration,
      ease: 'none',
    }, '+=1.5')

    return () => { tl.kill() }
  }, [onComplete])

  return (
    <div
      ref={wrapRef}
      className="credit-mask"
      style={{
        position: 'fixed', inset: 0, zIndex: 20,
        display: 'flex', justifyContent: 'center',
        overflow: 'hidden', pointerEvents: 'none',
      }}
    >
      <div
        ref={textRef}
        style={{ textAlign: 'center', padding: '0 24px', maxWidth: '680px', width: '100%' }}
      >
        {/* Main Title */}
        <p style={{
          fontFamily: 'Cinzel, serif',
          fontSize: 'clamp(1.8rem, 5vw, 3.2rem)',
          fontWeight: 700,
          color: '#d4af37',
          letterSpacing: '0.08em',
          textShadow: '0 0 30px #d4af3799, 0 0 60px #d4af3744',
          lineHeight: 1.3,
        }}>
          Happy Anniversary
        </p>
        <p style={{
          fontFamily: 'Cinzel, serif',
          fontSize: 'clamp(2.4rem, 6.5vw, 4.4rem)',
          fontWeight: 700,
          color: '#f5e09a',
          letterSpacing: '0.06em',
          textShadow: '0 0 40px #d4af37aa, 0 0 80px #d4af3755',
          lineHeight: 1.2,
          marginTop: '8px',
        }}>
          Dad &amp; Mom ❤️
        </p>

        {/* Anniversary Badge */}
        <div style={{ margin: '28px auto 32px', display: 'inline-block' }}>
          <div style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: 'clamp(1.1rem, 2.6vw, 1.5rem)',
            color: '#d4af37',
            letterSpacing: '0.35em',
            textTransform: 'uppercase',
            border: '1px solid #d4af3766',
            padding: '10px 32px',
            borderRadius: '40px',
          }}>
            21st Anniversary
          </div>
        </div>

        {/* Gold divider */}
        <div className="gold-line" style={{ marginBottom: '48px' }} />

        {/* Speech */}
        {SPEECH.split('\n').map((line, i) => (
          line.trim() === '' ? (
            <div key={i} style={{ height: '28px' }} />
          ) : (
            <p key={i} style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: 'clamp(1.25rem, 2.8vw, 1.7rem)',
              fontWeight: line.startsWith('Happy') || line.startsWith('We love') ? 600 : 300,
              fontStyle: 'italic',
              color: line.startsWith('Happy') || line.startsWith('We love') ? '#f5e09a' : '#e8dcc8',
              lineHeight: 1.9,
              letterSpacing: '0.02em',
              textShadow: '0 2px 8px rgba(0,0,0,0.5)',
            }}>
              {line}
            </p>
          )
        ))}

        {/* Closing hearts */}
        <div style={{ marginTop: '56px', fontSize: '2.2rem', letterSpacing: '0.3em' }}>❤️ ❤️ ❤️</div>

        {/* Teaser — not over yet */}
        <div style={{ marginTop: '72px', marginBottom: '16px' }}>
          <div className="gold-line" />
        </div>
        <p style={{
          fontFamily: 'Cormorant Garamond, serif',
          fontSize: 'clamp(0.8rem, 1.8vw, 1rem)',
          letterSpacing: '0.4em',
          textTransform: 'uppercase',
          color: '#d4af3799',
          marginBottom: '20px',
        }}>
          · · ·
        </p>
        <p style={{
          fontFamily: 'Cinzel, serif',
          fontSize: 'clamp(1.3rem, 3vw, 1.9rem)',
          fontWeight: 600,
          color: '#d4af37',
          letterSpacing: '0.06em',
          textShadow: '0 0 24px #d4af3788, 0 0 48px #d4af3744',
          marginBottom: '14px',
        }}>
          But wait… the surprise isn&apos;t over yet ✨
        </p>
        <p style={{
          fontFamily: 'Cormorant Garamond, serif',
          fontStyle: 'italic',
          fontSize: 'clamp(1.1rem, 2.4vw, 1.45rem)',
          color: '#c8b88a99',
          letterSpacing: '0.04em',
        }}>
          Something beautiful is waiting for you…
        </p>
        <div style={{ height: '30vh' }} />
      </div>
    </div>
  )
}
