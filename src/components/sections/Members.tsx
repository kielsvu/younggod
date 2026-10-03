'use client'

import { motion } from 'framer-motion'
import { members, revshitThanks } from '@/data'
import type { MemberRole } from '@/types'
import MemberCard from './MemberCard'

const EASE = [0.22, 1, 0.36, 1] as const

type Group = {
  title: string
  label: string
  roles: MemberRole[]
  className: string
}

const groups: Group[] = [
  { title: 'Leadership', label: 'the ones who built it', roles: ['founder', 'cofounder'], className: 'org-section-leadership' },
  { title: 'Insiders', label: 'trusted members of young god', roles: ['insider'], className: 'org-section-insider' },
  { title: 'Young Gods', label: 'young god worldwide', roles: ['younggod'], className: 'org-section-younggod' },
]

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
      marginBottom: 18,
    }}>
      {children}
    </h2>
  )
}

function MemberGrid({ children }: { children: React.ReactNode }) {
  return <div className="member-grid">{children}</div>
}

export default function Members() {
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

          <div className="organization-sections">
            {groups.map((group, groupIndex) => {
              const groupMembers = members.filter(member => group.roles.includes(member.roleKey))
              return (
                <section key={group.title} className={`organization-section ${group.className}`}>
                  <div className="organization-section-heading">
                    <span>{group.label}</span>
                    <h3>{group.title}</h3>
                  </div>
                  <MemberGrid>
                    {groupMembers.map((member, index) => (
                      <MemberCard key={member.id} member={member} index={index + groupIndex * 2} />
                    ))}
                  </MemberGrid>
                </section>
              )
            })}
          </div>

          <div className="revshit-thanks" aria-label={`${revshitThanks.label}: ${revshitThanks.name}`}>
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
          </div>
        </motion.div>
      </div>
    </section>
  )
}
