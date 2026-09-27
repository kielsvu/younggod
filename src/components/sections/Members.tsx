'use client'

import { useMemo } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { members } from '@/data'
import MemberCard from './MemberCard'

const EASE = [0.22, 1, 0.36, 1] as const

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        fontFamily: 'var(--font-mono)',
        fontSize: 9,
        letterSpacing: '0.3em',
        textTransform: 'uppercase',
        color: 'rgba(255,255,255,0.25)',
        marginBottom: 12,
      }}
    >
      {children}
    </div>
  )
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2
      style={{
        fontFamily: 'var(--font-cormorant)',
        fontWeight: 300,
        fontStyle: 'italic',
        fontSize: 'clamp(1.6rem, 4vw, 2.8rem)',
        letterSpacing: '0.08em',
        background: 'linear-gradient(to right, #fff, #aaa, #666)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        marginBottom: 48,
      }}
    >
      {children}
    </h2>
  )
}

function Divider() {
  return (
    <div
      style={{
        width: '100%',
        maxWidth: 600,
        height: 1,
        background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.06), transparent)',
        margin: '64px auto',
      }}
    />
  )
}

export default function Members() {
  const hof    = useMemo(() => members.filter((m) => m.tier === 'hof'), [])
  const elite  = useMemo(() => members.filter((m) => m.tier === 'elite'), [])
  const regular = useMemo(() => members.filter((m) => m.tier === 'member'), [])

  // Marquee list — all members doubled for seamless loop
  const marqueeItems = useMemo(() => [...members, ...members], [])

  return (
    <section
      id="members"
      style={{
        minHeight: '100dvh',
        padding: 'clamp(80px, 10vw, 120px) clamp(20px, 5vw, 80px) 80px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background grain */}
      <div
        className="film-grain"
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.02,
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 1100, margin: '0 auto' }}>

        {/* ─── Hall of Fame ────────────────────────────────────────────── */}
        {hof.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 1, ease: EASE }}
            style={{ textAlign: 'center', marginBottom: 8 }}
          >
            <SectionLabel>↑ hall of fame</SectionLabel>
            <SectionTitle>Legends</SectionTitle>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: `repeat(auto-fit, minmax(200px, 1fr))`,
                gap: 20,
                maxWidth: hof.length === 1 ? 280 : hof.length === 2 ? 560 : 860,
                margin: '0 auto',
                justifyItems: 'center',
              }}
            >
              {hof.map((m, i) => (
                <MemberCard key={m.id} member={m} index={i} />
              ))}
            </div>
          </motion.div>
        )}

        {hof.length > 0 && (elite.length > 0 || regular.length > 0) && <Divider />}

        {/* ─── Elite ───────────────────────────────────────────────────── */}
        {elite.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 1, ease: EASE }}
            style={{ textAlign: 'center', marginBottom: 8 }}
          >
            <SectionLabel>— elite members</SectionLabel>
            <SectionTitle>The Circle</SectionTitle>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: `repeat(auto-fit, minmax(196px, 1fr))`,
                gap: 18,
                maxWidth: 960,
                margin: '0 auto',
              }}
            >
              {elite.map((m, i) => (
                <MemberCard key={m.id} member={m} index={i} />
              ))}
            </div>
          </motion.div>
        )}

        {elite.length > 0 && regular.length > 0 && <Divider />}

        {/* ─── Regular members ─────────────────────────────────────────── */}
        {regular.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 1, ease: EASE }}
            style={{ textAlign: 'center', marginBottom: 8 }}
          >
            <SectionLabel>— members</SectionLabel>
            <SectionTitle>The Movement</SectionTitle>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: `repeat(auto-fill, minmax(180px, 1fr))`,
                gap: 16,
                maxWidth: 960,
                margin: '0 auto',
              }}
            >
              {regular.map((m, i) => (
                <MemberCard key={m.id} member={m} index={i} />
              ))}
            </div>
          </motion.div>
        )}

        {/* ─── Empty state ─────────────────────────────────────────────── */}
        {members.length === 0 && (
          <div
            style={{
              textAlign: 'center',
              color: 'rgba(255,255,255,0.2)',
              fontFamily: 'var(--font-cormorant)',
              fontStyle: 'italic',
              fontSize: 18,
              padding: '80px 0',
            }}
          >
            Members coming soon.
          </div>
        )}

        {/* ─── Marquee ─────────────────────────────────────────────────── */}
        {members.length > 0 && (
          <>
            <Divider />

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: EASE }}
              style={{ overflow: 'hidden', position: 'relative' }}
            >
              {/* Edge fades */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  bottom: 0,
                  left: 0,
                  width: 80,
                  background: 'linear-gradient(to right, #000, transparent)',
                  zIndex: 2,
                  pointerEvents: 'none',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  bottom: 0,
                  right: 0,
                  width: 80,
                  background: 'linear-gradient(to left, #000, transparent)',
                  zIndex: 2,
                  pointerEvents: 'none',
                }}
              />

              <div
                className="marquee-track"
                style={{ padding: '8px 0' }}
              >
                {marqueeItems.map((m, i) => (
                  <div
                    key={`${m.id}-${i}`}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                      padding: '6px 16px',
                      borderRadius: '999px',
                      border: '1px solid rgba(255,255,255,0.05)',
                      background: 'rgba(255,255,255,0.02)',
                      flexShrink: 0,
                    }}
                  >
                    <div
                      style={{
                        width: 24,
                        height: 24,
                        borderRadius: '50%',
                        overflow: 'hidden',
                        flexShrink: 0,
                        background: 'rgba(255,255,255,0.05)',
                        position: 'relative',
                      }}
                    >
                      <Image
                        src={m.avatar}
                        alt={m.displayName}
                        fill
                        sizes="24px"
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: 9,
                        letterSpacing: '0.1em',
                        color: 'rgba(255,255,255,0.4)',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {m.username}
                    </span>
                    {m.tier !== 'member' && (
                      <span style={{ fontSize: 8, color: m.tier === 'hof' ? '#d4af37' : '#c0c0c0' }}>
                        ✦
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </div>
    </section>
  )
}
