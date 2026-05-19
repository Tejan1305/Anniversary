'use client'
import { useEffect } from 'react'

export default function AudioPlayer() {
  useEffect(() => {
    const audio = new Audio('/audio/music.mp3')
    audio.loop = true
    audio.volume = 0.3

    const tryPlay = () => {
      audio.play().catch(() => {})
    }

    // Try immediately
    tryPlay()

    // Fallback: play on first user gesture
    const onGesture = () => {
      tryPlay()
      document.removeEventListener('click', onGesture)
      document.removeEventListener('touchstart', onGesture)
      document.removeEventListener('keydown', onGesture)
    }
    document.addEventListener('click', onGesture)
    document.addEventListener('touchstart', onGesture)
    document.addEventListener('keydown', onGesture)

    return () => {
      audio.pause()
      audio.src = ''
      document.removeEventListener('click', onGesture)
      document.removeEventListener('touchstart', onGesture)
      document.removeEventListener('keydown', onGesture)
    }
  }, [])

  return null
}
