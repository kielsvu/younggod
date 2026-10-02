'use client'

import { motion } from 'framer-motion'
import { members, revshitThanks } from '@/data'
import MemberCard from './MemberCard'

const EASE = [0.22, 1, 0.36, 1] as const

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      fontFamily: 'var(--font-mono)',
      fontSize: 9,
      letterSpacing: '0.3em',
      textTransform: 'uppercase',
      color: 'rgba(255,255,255,0.25)',
      marginBottom: 12,
    }}>
      {children}
    </div>
  )
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 style={{
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
    }}>
      {children}
    </h2>
  )
}

function MemberGrid({ children }: { children: React.ReactNode }) {
  return <div className="member-grid">{children}</div>
}

export default function Members() {
  const orderedMembers = [...members].sort((a, b) => {
    const order = { founder: 0, cofounder: 1, core: 2, insider: 3, younggod: 4 }
    return order[a.roleKey] - order[b.roleKey]
  })

  return (
    <section
      id="members"
      style={{
        minHeight: '100dvh',
        padding: 'clamp(80px, 10vw, 120px) clamp(16px, 5vw, 80px) 80px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div className="film-grain" style={{ position: 'absolute', inset: 0, opacity: 0.02, zIndex: 0, pointerEvents: 'none' }} />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 1100, margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 1, ease: EASE }}
          style={{ textAlign: 'center' }}
        >
          <SectionLabel>✦ organization</SectionLabel>
          <SectionTitle>Young God Worldwide</SectionTitle>
          <MemberGrid>
            {orderedMembers.map((member, index) => (
              <MemberCard key={member.id} member={member} index={index} />
            ))}
          </MemberGrid>

          <a
            href={revshitThanks.href}
            target="_blank"
            rel="noreferrer"
            className="revshit-thanks"
          >
            <div className="revshit-logo-wrap">
              <img
                src={revshitThanks.imageSrc}
                alt="RevShit logo"
                className="revshit-logo"
                draggable={false}
              />
            </div>
            <div className="revshit-copy">
              <span className="revshit-label">{revshitThanks.label}</span>
              <strong>{revshitThanks.name}</strong>
              <span>{revshitThanks.description}</span>
            </div>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
