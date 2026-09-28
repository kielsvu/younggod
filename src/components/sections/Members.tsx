'use client'

import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { members } from '@/data'
import MemberCard from './MemberCard'
import type { Member } from '@/types'

const EASE = [0.22, 1, 0.36, 1] as const

// ── Shared layout helpers ──────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      fontFamily:    'var(--font-mono)',
      fontSize:       9,
      letterSpacing: '0.3em',
      textTransform: 'uppercase',
      color:         'rgba(255,255,255,0.25)',
      marginBottom:   12,
    }}>
      {children}
    </div>
  )
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 style={{
      fontFamily:           'var(--font-cormorant)',
      fontWeight:            300,
      fontStyle:            'italic',
      fontSize:             'clamp(1.6rem, 4vw, 2.8rem)',
      letterSpacing:        '0.08em',
      background:           'linear-gradient(to right, #fff, #aaa, #666)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor:  'transparent',
      backgroundClip:       'text',
      marginBottom:          48,
    }}>
      {children}
    </h2>
  )
}

function Divider() {
  return (
    <div style={{
      width:      '100%',
      maxWidth:    600,
      height:      1,
      background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.06), transparent)',
      margin:     '64px auto',
    }} />
  )
}

// ── Young God portrait card ────────────────────────────────────────────────

function YoungGodCard({ member, index }: { member: Member; index: number }) {
  const [imgErr, setImgErr] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 28, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.9, delay: index * 0.1, ease: EASE }}
    >
      <Link
        href={`/${member.username}`}
        style={{ display: 'block', textDecoration: 'none' }}
        aria-label={`View ${member.displayName}'s profile`}
      >
        <div
          className="yg-card"
          style={{
            position:     'relative',
            aspectRatio:  '3 / 4',
            borderRadius:  18,
            overflow:     'hidden',
            background:   'rgba(8,8,8,0.95)',
            border:       '1px solid rgba(255,255,255,0.08)',
            cursor:       'pointer',
          }}
        >
          {/* Full-card avatar */}
          {!imgErr && member.avatar ? (
            <Image
              src={member.avatar}
              alt={member.displayName}
              fill
              sizes="(max-width: 640px) 50vw, 25vw"
              style={{ objectFit: 'cover', opacity: 0.78, transition: 'opacity 0.4s ease' }}
              onError={() => setImgErr(true)}
              draggable={false}
              className="yg-card-img"
            />
          ) : (
            <div style={{
              position:       'absolute',
              inset:           0,
              display:        'flex',
              alignItems:     'center',
              justifyContent: 'center',
              fontFamily:     'var(--font-cormorant)',
              fontSize:        80,
              fontWeight:      300,
              color:          'rgba(255,255,255,0.1)',
            }}>
              {member.displayName[0]?.toUpperCase()}
            </div>
          )}

          {/* Gradient overlay — name lives here */}
          <div style={{
            position:   'absolute',
            bottom:      0,
            left:        0,
            right:       0,
            height:     '58%',
            background: 'linear-gradient(to top, rgba(0,0,0,0.94) 0%, rgba(0,0,0,0.55) 55%, transparent 100%)',
            pointerEvents: 'none',
          }} />

          {/* Top right arrow */}
          <div
            className="yg-card-arrow"
            style={{
              position:       'absolute',
              top:             14,
              right:           14,
              width:           28,
              height:          28,
              borderRadius:   '50%',
              background:     'rgba(255,255,255,0.06)',
              border:         '1px solid rgba(255,255,255,0.1)',
              display:        'flex',
              alignItems:     'center',
              justifyContent: 'center',
              transition:     'background 0.3s ease, border-color 0.3s ease',
            }}
          >
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path
                d="M2 8L8 2M8 2H4M8 2V6"
                stroke="rgba(255,255,255,0.5)"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* Name + role */}
          <div style={{
            position:  'absolute',
            bottom:     0,
            left:       0,
            right:      0,
            padding:   '20px 18px',
          }}>
            <p style={{
              fontFamily:    'var(--font-cormorant)',
              fontWeight:     500,
              fontSize:      'clamp(1rem, 2.5vw, 1.3rem)',
              color:         'rgba(255,255,255,0.92)',
              marginBottom:   4,
              lineHeight:     1.2,
            }}>
              {member.displayName}
            </p>
            <p style={{
              fontFamily:    'var(--font-mono)',
              fontSize:       9,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color:         'rgba(255,255,255,0.38)',
            }}>
              Young God
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

// ── Main section ───────────────────────────────────────────────────────────

export default function Members() {
  const mvp      = useMemo(() => members.filter((m) => m.tier === 'mvp').slice(0, 3), [])
  const hof      = useMemo(() => members.filter((m) => m.tier === 'hof'),             [])
  const youngGods = useMemo(() => members.filter((m) => m.tier === 'youngGod').slice(0, 4), [])

  return (
    <>
      {/* Young Gods hover card styles */}
      <style>{`
        @media (hover: hover) {
          .yg-card:hover { border-color: rgba(255,255,255,0.15) !important; }
          .yg-card:hover .yg-card-img { opacity: 0.92 !important; }
          .yg-card:hover .yg-card-arrow {
            background: rgba(255,255,255,0.12) !important;
            border-color: rgba(255,255,255,0.22) !important;
          }
        }
      `}</style>

      <section
        id="members"
        style={{
          minHeight:  '100dvh',
          padding:    'clamp(80px, 10vw, 120px) clamp(20px, 5vw, 80px) 80px',
          position:   'relative',
          overflow:   'hidden',
        }}
      >
        {/* Grain */}
        <div
          className="film-grain"
          style={{ position: 'absolute', inset: 0, opacity: 0.02, zIndex: 0, pointerEvents: 'none' }}
        />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: 1100, margin: '0 auto' }}>

          {/* ── MVP ───────────────────────────────────────────────────── */}
          {mvp.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 1, ease: EASE }}
              style={{ textAlign: 'center', marginBottom: 8 }}
            >
              <SectionLabel>✦ most valuable players</SectionLabel>
              <SectionTitle>The Top Three</SectionTitle>

              <div style={{
                display:               'grid',
                gridTemplateColumns:  `repeat(${Math.min(mvp.length, 3)}, minmax(0, 1fr))`,
                gap:                   24,
                maxWidth:              mvp.length === 1 ? 300 : mvp.length === 2 ? 600 : 860,
                margin:               '0 auto',
                justifyItems:         'center',
              }}>
                {mvp.map((m, i) => (
                  <MemberCard key={m.id} member={m} index={i} />
                ))}
              </div>
            </motion.div>
          )}

          {mvp.length > 0 && (hof.length > 0 || youngGods.length > 0) && <Divider />}

          {/* ── Hall of Fame ───────────────────────────────────────────── */}
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

              <div style={{
                display:              'grid',
                gridTemplateColumns: `repeat(auto-fit, minmax(200px, 1fr))`,
                gap:                  20,
                maxWidth:             hof.length === 1 ? 280 : hof.length === 2 ? 560 : 860,
                margin:              '0 auto',
                justifyItems:        'center',
              }}>
                {hof.map((m, i) => (
                  <MemberCard key={m.id} member={m} index={i} />
                ))}
              </div>
            </motion.div>
          )}

          {hof.length > 0 && youngGods.length > 0 && <Divider />}

          {/* ── Young Gods ────────────────────────────────────────────── */}
          {youngGods.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 1, ease: EASE }}
              style={{ textAlign: 'center' }}
            >
              <SectionLabel>✦ the chosen four</SectionLabel>
              <SectionTitle>Young Gods</SectionTitle>

              <div style={{
                display:             'grid',
                gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
                gap:                  20,
                maxWidth:             900,
                margin:              '0 auto',
              }}>
                {youngGods.map((m, i) => (
                  <YoungGodCard key={m.id} member={m} index={i} />
                ))}
              </div>

              {/* Responsive: 2 cols on small screens */}
              <style>{`
                @media (max-width: 640px) {
                  #young-gods-grid {
                    grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
                  }
                }
              `}</style>
            </motion.div>
          )}

          {/* Empty state */}
          {members.length === 0 && (
            <div style={{
              textAlign:  'center',
              color:      'rgba(255,255,255,0.2)',
              fontFamily: 'var(--font-cormorant)',
              fontStyle:  'italic',
              fontSize:    18,
              padding:    '80px 0',
            }}>
              Members coming soon.
            </div>
          )}
        </div>
      </section>
    </>
  )
}
