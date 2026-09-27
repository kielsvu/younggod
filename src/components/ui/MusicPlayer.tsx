'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Track } from '@/types'

interface Props {
  playlist: Track[]
}

const EASE = [0.22, 1, 0.36, 1] as const

function PlayIcon({ playing }: { playing: boolean }) {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
      {playing ? (
        <>
          <rect x="1.5" y="1.5" width="3.5" height="10" rx="1" fill="currentColor" />
          <rect x="8" y="1.5" width="3.5" height="10" rx="1" fill="currentColor" />
        </>
      ) : (
        <path d="M2.5 2L11.5 6.5L2.5 11V2Z" fill="currentColor" />
      )}
    </svg>
  )
}

function SkipIcon({ direction }: { direction: 'prev' | 'next' }) {
  return (
    <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
      {direction === 'next' ? (
        <>
          <path d="M1 1.5L6.5 5.5L1 9.5V1.5Z" fill="currentColor" />
          <rect x="7.5" y="1.5" width="2" height="8" rx="0.75" fill="currentColor" />
        </>
      ) : (
        <>
          <path d="M10 1.5L4.5 5.5L10 9.5V1.5Z" fill="currentColor" />
          <rect x="1.5" y="1.5" width="2" height="8" rx="0.75" fill="currentColor" />
        </>
      )}
    </svg>
  )
}

function MusicBars() {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 2, height: 14, paddingBottom: 1 }}>
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          style={{
            width: 2,
            background: 'rgba(255,255,255,0.45)',
            borderRadius: 999,
            animation: `music-bar-${i} ${0.7 + i * 0.15}s ease-in-out infinite`,
          }}
        />
      ))}
      <style>{`
        @keyframes music-bar-1 { 0%,100%{height:3px} 50%{height:12px} }
        @keyframes music-bar-2 { 0%,100%{height:8px}  50%{height:4px}  }
        @keyframes music-bar-3 { 0%,100%{height:5px}  50%{height:10px} }
      `}</style>
    </div>
  )
}

export default function MusicPlayer({ playlist }: Props) {
  const [trackIndex, setTrackIndex] = useState(0)
  const [playing, setPlaying]       = useState(false)
  const [progress, setProgress]     = useState(0)
  const [visible, setVisible]       = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const hasTrack = playlist.length > 0
  const currentTrack = hasTrack ? playlist[trackIndex] : null

  // Always show the player after the intro settles
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 4000)
    return () => clearTimeout(t)
  }, [])

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
    if (!hasTrack) return
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
    if (!hasTrack) return
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

  const btnBase: React.CSSProperties = {
    background: 'none',
    border: 'none',
    cursor: hasTrack ? 'pointer' : 'default',
    color: hasTrack ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.15)',
    padding: 4,
    display: 'flex',
    alignItems: 'center',
    transition: 'color 0.2s',
    flexShrink: 0,
  }

  return (
    <>
      {hasTrack && (
        <audio
          ref={audioRef}
          loop={playlist.length === 1}
          onTimeUpdate={onTimeUpdate}
          onEnded={onEnded}
          preload="auto"
        />
      )}

      <AnimatePresence>
        {visible && (
          <motion.div
            key="player"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.8, ease: EASE }}
            style={{
              position: 'fixed',
              bottom: 20,
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 40,
              background: 'rgba(6,6,6,0.92)',
              backdropFilter: 'blur(18px)',
              WebkitBackdropFilter: 'blur(18px)',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: 999,
              padding: '9px 16px',
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              minWidth: 260,
              maxWidth: 'calc(100vw - 32px)',
              boxShadow: '0 8px 40px rgba(0,0,0,0.6)',
            }}
          >
            {/* Prev */}
            <button
              onClick={() => skip('prev')}
              aria-label="Previous"
              style={btnBase}
              onMouseEnter={(e) => { if (hasTrack) e.currentTarget.style.color = 'rgba(255,255,255,0.75)' }}
              onMouseLeave={(e) => { e.currentTarget.style.color = hasTrack ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.15)' }}
            >
              <SkipIcon direction="prev" />
            </button>

            {/* Play / Pause */}
            <button
              onClick={togglePlay}
              aria-label={playing ? 'Pause' : 'Play'}
              style={{
                background: hasTrack ? 'rgba(255,255,255,0.09)' : 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.09)',
                borderRadius: '50%',
                width: 32,
                height: 32,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: hasTrack ? 'pointer' : 'default',
                color: hasTrack ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.2)',
                transition: 'background 0.2s',
                flexShrink: 0,
              }}
              onMouseEnter={(e) => { if (hasTrack) e.currentTarget.style.background = 'rgba(255,255,255,0.15)' }}
              onMouseLeave={(e) => { e.currentTarget.style.background = hasTrack ? 'rgba(255,255,255,0.09)' : 'rgba(255,255,255,0.04)' }}
            >
              <PlayIcon playing={playing} />
            </button>

            {/* Track info */}
            <div style={{ flex: 1, minWidth: 0 }}>
              {hasTrack ? (
                <>
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 10,
                      letterSpacing: '0.08em',
                      color: 'rgba(255,255,255,0.75)',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      marginBottom: 3,
                    }}
                  >
                    {currentTrack!.title}
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 9,
                      letterSpacing: '0.06em',
                      color: 'rgba(255,255,255,0.3)',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      marginBottom: 5,
                    }}
                  >
                    {currentTrack!.artist}
                  </div>
                  {/* Progress bar */}
                  <div
                    onClick={seek}
                    style={{
                      height: 2,
                      background: 'rgba(255,255,255,0.08)',
                      borderRadius: 999,
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
                        background: 'rgba(255,255,255,0.5)',
                        borderRadius: 999,
                        transition: 'width 0.1s linear',
                      }}
                    />
                  </div>
                </>
              ) : (
                /* Idle state — no tracks loaded */
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 4,
                  }}
                >
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 9.5,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: 'rgba(255,255,255,0.22)',
                    }}
                  >
                    No tracks loaded
                  </div>
                  <div
                    style={{
                      height: 2,
                      background: 'rgba(255,255,255,0.05)',
                      borderRadius: 999,
                    }}
                  />
                </div>
              )}
            </div>

            {/* Next */}
            <button
              onClick={() => skip('next')}
              aria-label="Next"
              style={btnBase}
              onMouseEnter={(e) => { if (hasTrack) e.currentTarget.style.color = 'rgba(255,255,255,0.75)' }}
              onMouseLeave={(e) => { e.currentTarget.style.color = hasTrack ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.15)' }}
            >
              <SkipIcon direction="next" />
            </button>

            {/* Playing indicator */}
            {playing && <MusicBars />}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
