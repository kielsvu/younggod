'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { config } from '@/data'

const EASE = [0.22, 1, 0.36, 1] as const

export default function Hero({ showApp }: { showApp: boolean }) {
  const [started, setStarted] = useState(false)
  const particlesRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const played = sessionStorage.getItem('revgng_hero')
    if (played) {
      setStarted(true)
      return
    }
    const t = setTimeout(() => {
      setStarted(true)
      sessionStorage.setItem('revgng_hero', 'true')
    }, 3600)
    return () => clearTimeout(t)
  }, [])

  // Subtle drifting particle canvas
  useEffect(() => {
    const canvas = particlesRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    const particles: { x: number; y: number; vx: number; vy: number; opacity: number; size: number }[] = []

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    for (let i = 0; i < 55; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
        opacity: Math.random() * 0.25 + 0.03,
        size: Math.random() * 1.2 + 0.3,
      })
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,255,255,${p.opacity})`
        ctx.fill()
      }
      animId = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <section
      id="home"
      style={{
        position: 'relative',
        minHeight: '100dvh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Particle canvas */}
      <canvas
        ref={particlesRef}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Film grain */}
      <div
        className="film-grain"
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.025,
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />

      {/* Radial gradient vignette */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse 80% 70% at 50% 50%, transparent 0%, rgba(0,0,0,0.65) 100%)',
          zIndex: 2,
          pointerEvents: 'none',
        }}
      />

      {/* Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 3,
          textAlign: 'center',
          padding: '0 24px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1.5rem',
        }}
      >
        {/* Logo image placeholder — drop revgng2.png into /public/assets/ */}
        {showApp && (
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: -20 }}
            animate={started ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.94, y: -20 }}
            transition={{ duration: 1.4, ease: EASE }}
            style={{ marginBottom: '1rem' }}
          >
            {/* If you have revgng2.png in /public/assets/, uncomment this:
            <Image
              src="/assets/revgng2.png"
              alt="REVGNG"
              width={360}
              height={220}
              priority
              draggable={false}
              style={{ maxWidth: 'min(360px, 75vw)', height: 'auto', filter: 'drop-shadow(0 0 30px rgba(255,255,255,0.12))' }}
            />
            */}
            <div
              style={{
                fontFamily: 'var(--font-cormorant)',
                fontSize: 'clamp(3rem, 12vw, 8rem)',
                fontWeight: 300,
                letterSpacing: '0.22em',
                color: 'rgba(255,255,255,0.92)',
                lineHeight: 1,
                textTransform: 'uppercase',
                filter: 'drop-shadow(0 0 40px rgba(255,255,255,0.08))',
              }}
            >
              REV
            </div>
          </motion.div>
        )}

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={started ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 1.2, delay: 0.2, ease: EASE }}
          className="enter-title-hover"
          style={{
            fontFamily: 'var(--font-cormorant)',
            fontWeight: 300,
            fontStyle: 'italic',
            fontSize: 'clamp(1.4rem, 5vw, 3rem)',
            letterSpacing: '0.12em',
            background: 'linear-gradient(to right, #fff, #aaa, #777)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            lineHeight: 1.15,
            maxWidth: '760px',
          }}
        >
          {config.title}
        </motion.h1>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={started ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
          transition={{ duration: 1.1, delay: 0.5, ease: EASE }}
          style={{
            width: 48,
            height: 1,
            background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.35), transparent)',
            transformOrigin: 'center',
          }}
        />

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={started ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: 1, delay: 0.7, ease: EASE }}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'clamp(0.6rem, 1.8vw, 0.75rem)',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.3)',
            maxWidth: 480,
          }}
          className="subtitle-breathe"
        >
          {config.enterSubtitle}
        </motion.p>

        {/* Discord CTA */}
        <motion.a
          href={config.discordUrl}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 16 }}
          animate={started ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 1, delay: 1, ease: EASE }}
          style={{
            marginTop: '0.5rem',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            fontFamily: 'var(--font-mono)',
            fontSize: '0.65rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.45)',
            textDecoration: 'none',
            padding: '8px 20px',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '999px',
            transition: 'border-color 0.3s, color 0.3s, background 0.3s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)'
            e.currentTarget.style.color = 'rgba(255,255,255,0.8)'
            e.currentTarget.style.background = 'rgba(255,255,255,0.03)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'
            e.currentTarget.style.color = 'rgba(255,255,255,0.45)'
            e.currentTarget.style.background = 'transparent'
          }}
        >
          <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
            <path d="M10.2 0.857C9.456 0.5 8.64 0.239 7.788 0.1C7.776 0.1 7.764 0.107 7.758 0.119C7.65 0.317 7.53 0.578 7.446 0.783C6.534 0.653 5.628 0.653 4.734 0.783C4.65 0.572 4.524 0.317 4.416 0.119C4.41 0.107 4.398 0.1 4.386 0.1C3.534 0.239 2.724 0.5 1.974 0.857C1.968 0.86 1.962 0.866 1.956 0.872C0.426 3.162 0 5.391 0.21 7.594C0.21 7.607 0.216 7.62 0.228 7.628C1.254 8.38 2.244 8.832 3.216 9.138C3.228 9.141 3.24 9.138 3.248 9.129C3.494 8.793 3.714 8.44 3.9 8.072C3.912 8.049 3.9 8.021 3.876 8.012C3.528 7.879 3.198 7.718 2.88 7.531C2.853 7.515 2.85 7.476 2.874 7.456C2.94 7.408 3.006 7.357 3.072 7.307C3.084 7.297 3.1 7.294 3.114 7.301C5.076 8.196 7.2 8.196 9.138 7.301C9.152 7.294 9.168 7.297 9.18 7.307C9.246 7.357 9.312 7.408 9.378 7.456C9.402 7.476 9.4 7.515 9.372 7.531C9.054 7.721 8.724 7.879 8.376 8.012C8.352 8.021 8.34 8.049 8.352 8.072C8.538 8.44 8.758 8.793 9.004 9.129C9.012 9.138 9.024 9.141 9.036 9.138C10.008 8.832 11 8.38 12.024 7.628C12.036 7.62 12.042 7.607 12.042 7.594C12.3 5.018 11.622 2.808 10.242 0.872C10.236 0.866 10.23 0.86 10.2 0.857Z" fill="currentColor"/>
          </svg>
          Join the server
        </motion.a>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={started ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1, delay: 1.4, ease: EASE }}
          style={{
            position: 'absolute',
            bottom: 32,
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 6,
            pointerEvents: 'none',
          }}
        >
          <motion.div
            animate={{ y: [0, 5, 0], opacity: [1, 0.5, 1] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}
          >
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 9,
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.2)',
              }}
            >
              Scroll
            </span>
            <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
              <path d="M1 1L5 6L9 1" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
