'use client'
import { useState } from 'react'
import ParticleCanvas from '@/components/ParticleCanvas'
import CreditScroll from '@/components/CreditScroll'
import FloatingButton from '@/components/FloatingButton'
import MemoryGallery from '@/components/MemoryGallery'
import AudioPlayer from '@/components/AudioPlayer'

type Phase = 'credits' | 'button' | 'gallery'

export default function Home() {
  const [phase, setPhase] = useState<Phase>('credits')

  return (
    <main style={{ width: '100vw', height: '100vh', overflow: 'hidden', position: 'relative', background: 'radial-gradient(ellipse at 60% 40%, #1e0a0a 0%, #12060e 40%, #09020d 100%)' }}>
      {/* Always-on particle background */}
      <ParticleCanvas />

      {/* Vignette */}
      <div className="vignette" />

      {/* Background music */}
      <AudioPlayer />

      {/* Phase 1 — Cinematic Credits */}
      {phase === 'credits' && (
        <CreditScroll onComplete={() => setPhase('button')} />
      )}

      {/* Phase 2 — Floating Button */}
      {phase === 'button' && (
        <FloatingButton onClick={() => setPhase('gallery')} />
      )}

      {/* Phase 3 — Memory Gallery */}
      {phase === 'gallery' && (
        <MemoryGallery />
      )}
    </main>
  )
}
