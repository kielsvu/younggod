'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Track } from '@/types'

interface Props {
  playlist: Track[]
}

const EASE = [0.22, 1, 0.36, 1] as const

function MusikIcon({ playing }: { playing: boolean }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      {playing ? (
        <>
          <rect x="2" y="2" width="3.5" height="10" rx="1" fill="currentColor" />
          <rect x="8.5" y="2" width="3.5" height="10" rx="1" fill="currentColor" />
        </>
      ) : (
        <path d="M3 2.5L12 7L3 11.5V2.5Z" fill="currentColor" />
      )}
    </svg>
  )
}

function SkipIcon({ direction }: { direction: 'prev' | 'next' }) {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      {direction === 'next' ? (
        <>
          <path d="M1 2L7 6L1 10V2Z" fill="currentColor" />
          <rect x="8.5" y="2" width="2" height="8" rx="0.75" fill="currentColor" />
        </>
      ) : (
        <>
          <path d="M11 2L5 6L11 10V2Z" fill="currentColor" />
          <rect x="1.5" y="2" width="2" height="8" rx="0.75" fill="currentColor" />
        </>
      )}
    </svg>
  )
}

export default function MusicPlayer({ playlist }: Props) {
  const [trackIndex, setTrackIndex] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [visible, setVisible] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const currentTrack = playlist[trackIndex]

  useEffect(() => {
    if (!playlist.length) return
    const t = setTimeout(() => setVisible(true), 4200)
    return () => clearTimeout(t)
  }, [playlist.length])

  useEffect(() => {
    if (!audioRef.current || !currentTrack) return
    audioRef.current.src = currentTrack.src
    audioRef.current.load()
    if (playing) audioRef.current.play().catch(() => setPlaying(false))
  }, [trackIndex, currentTrack, playing])

  const onTimeUpdate = useCallback(() => {
    const a = audioRef.current
    if (!a || !a.duration) return
    setProgress(a.currentTime / a.duration)
  }, [])

  const onEnded = useCallback(() => {
    setTrackIndex((i) => (i + 1) % playlist.length)
  }, [playlist.length])

  const togglePlay = () => {
    const a = audioRef.current
    if (!a) return
    if (playing) {
      a.pause()
      setPlaying(false)
    } else {
      a.play().then(() => setPlaying(true)).catch(() => setPlaying(false))
    }
  }

  const skip = (dir: 'prev' | 'next') => {
    setTrackIndex((i) => {
      if (dir === 'next') return (i + 1) % playlist.length
      return (i - 1 + playlist.length) % playlist.length
    })
  }

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    const a = audioRef.current
    if (!a || !a.duration) return
    const rect = e.currentTarget.getBoundingClientRect()
    const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
    a.currentTime = pct * a.duration
    setProgress(pct)
  }

  if (!playlist.length) return null

  return (
    <>
      <audio
        ref={audioRef}
        loop={playlist.length === 1}
        onTimeUpdate={onTimeUpdate}
        onEnded={onEnded}
        preload="auto"
      />

      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.8, ease: EASE }}
            style={{
              position: 'fixed',
              bottom: 24,
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 40,
              background: 'rgba(0,0,0,0.88)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: '999px',
              padding: '10px 18px',
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              minWidth: 280,
              maxWidth: 'calc(100vw - 32px)',
            }}
          >
            {/* Prev */}
            <button
              onClick={() => skip('prev')}
              aria-label="Previous track"
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'rgba(255,255,255,0.4)',
                padding: 4,
                display: 'flex',
                alignItems: 'center',
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.8)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.4)')}
            >
              <SkipIcon direction="prev" />
            </button>

            {/* Play/pause */}
            <button
              onClick={togglePlay}
              aria-label={playing ? 'Pause' : 'Play'}
              style={{
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '50%',
                width: 32,
                height: 32,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: 'rgba(255,255,255,0.85)',
                transition: 'background 0.2s',
                flexShrink: 0,
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.14)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.08)')}
            >
              <MusikIcon playing={playing} />
            </button>

            {/* Track info + progress */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 10,
                  letterSpacing: '0.08em',
                  color: 'rgba(255,255,255,0.75)',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  marginBottom: 4,
                }}
              >
                {currentTrack.title}
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 9,
                  letterSpacing: '0.06em',
                  color: 'rgba(255,255,255,0.35)',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  marginBottom: 6,
                }}
              >
                {currentTrack.artist}
              </div>
              {/* Progress bar */}
              <div
                onClick={seek}
                style={{
                  height: 2,
                  background: 'rgba(255,255,255,0.1)',
                  borderRadius: '999px',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    height: '100%',
                    width: `${progress * 100}%`,
                    background: 'rgba(255,255,255,0.55)',
                    borderRadius: '999px',
                    transition: 'width 0.1s linear',
                  }}
                />
              </div>
            </div>

            {/* Next */}
            <button
              onClick={() => skip('next')}
              aria-label="Next track"
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'rgba(255,255,255,0.4)',
                padding: 4,
                display: 'flex',
                alignItems: 'center',
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.8)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.4)')}
            >
              <SkipIcon direction="next" />
            </button>

            {/* Playing bars indicator */}
            {playing && (
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 2, height: 14 }}>
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    style={{
                      width: 2,
                      background: 'rgba(255,255,255,0.5)',
                      borderRadius: '999px',
                      animation: `music-bar-${i} ${0.7 + i * 0.15}s ease-in-out infinite`,
                    }}
                  />
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes music-bar-1 { 0%,100%{height:3px} 50%{height:12px} }
        @keyframes music-bar-2 { 0%,100%{height:8px} 50%{height:4px} }
        @keyframes music-bar-3 { 0%,100%{height:5px} 50%{height:10px} }
      `}</style>
    </>
  )
}
