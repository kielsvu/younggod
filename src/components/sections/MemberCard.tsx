'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import type { Member, MemberRole } from '@/types'

interface Props {
  member: Member
  index: number
}

const ROLE_STYLE: Record<MemberRole, { label: string; color: string; className: string; cardClass: string }> = {
  founder: { label: 'Founder', color: '#FFD86A', className: 'name-wave-founder', cardClass: 'card-founder' },
  cofounder: { label: 'Co-Founder', color: '#FFD86A', className: 'name-wave-cofounder', cardClass: 'card-cofounder' },
  insider: { label: 'Insider', color: '#E6E8EB', className: 'name-wave-insider', cardClass: 'card-insider' },
  younggod: { label: 'Young God', color: '#D88A45', className: 'name-wave-younggod', cardClass: 'card-younggod' },
}

export default function MemberCard({ member, index }: Props) {
  const [imgError, setImgError] = useState(false)
  const style = ROLE_STYLE[member.roleKey]
  const cardClass = member.username === 'keso' && member.roleKey === 'insider' ? 'card-insider-keso' : style.cardClass
  const nameClass = member.username === 'keso' && member.roleKey === 'insider' ? 'name-wave-insider-keso' : style.className

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.72 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ type: 'spring', stiffness: 180, damping: 16, mass: 0.8, delay: index * 0.12 }}
      style={{ position: 'relative', width: '100%', minWidth: 0, height: '100%' }}
    >
      <div
        className={`member-card ${cardClass}`}
        style={{
          position: 'relative',
          background: 'rgba(4,4,4,0.96)',
          borderRadius: 20,
          padding: '32px 24px 24px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 10,
          overflow: 'hidden',
          width: '100%',
          height: '100%',
          minWidth: 0,
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 12,
            right: 14,
            fontFamily: 'var(--font-mono)',
            fontSize: 8,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: style.color,
            opacity: 1,
          }}
        >
          {style.label}
        </div>

        <div className="member-avatar" style={{ position: 'relative', borderRadius: '50%', overflow: 'hidden', flexShrink: 0 }}>
          {member.avatar && !imgError ? (
            <Image
              src={member.avatar}
              alt={member.displayName}
              fill
              sizes="90px"
              style={{ objectFit: 'cover' }}
              onError={() => setImgError(true)}
              draggable={false}
              onContextMenu={(e) => e.preventDefault()}
            />
          ) : (
            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-cormorant)', fontSize: 28, fontWeight: 300, color: 'rgba(255,255,255,0.4)' }}>
              {member.displayName[0]?.toUpperCase()}
            </div>
          )}
        </div>

        <div style={{ textAlign: 'center' }}>
          <div className={nameClass} style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 500, fontSize: 17, marginBottom: 3 }}>
            {member.displayName}
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.15em', textTransform: 'uppercase', color: style.color, marginBottom: 2 }}>
            {member.role}
          </div>
        </div>

        {member.bio && (
          <p style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic', fontSize: 12.5, color: 'rgba(255,255,255,0.58)', lineHeight: 1.6, textAlign: 'center', maxWidth: 180 }}>
            {member.bio}
          </p>
        )}

        <div style={{ marginTop: 'auto', padding: '3px 10px', borderRadius: '999px', border: `1px solid ${style.color}`, fontFamily: 'var(--font-mono)', fontSize: 8, letterSpacing: '0.12em', textTransform: 'uppercase', color: style.color, background: 'rgba(0,0,0,0.4)' }}>
          {style.label}
        </div>

        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 8, letterSpacing: '0.1em', color: 'rgba(255,255,255,0.38)' }}>
          {new Date(member.joinedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
        </div>
      </div>
    </motion.div>
  )
}
