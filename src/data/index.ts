import type { Member, Track, SiteConfig } from '@/types'

export const config: SiteConfig = {
  title: 'REVGNG Worldwide',
  description: 'luv, revgng & dreamz',
  enterTitle: 'LUV, REVGNG & DREAMS',
  enterSubtitle: 'ALAM MO NA GAGAWIN MO',
  discordUrl: 'https://discord.gg/revgng',
}

// ─── Members ───────────────────────────────────────────────────────────────
// tier: "hof" = Hall of Fame (gold treatment)
//       "elite" = Elite member (silver treatment)
//       "member" = Standard member
// avatar: use a Discord CDN URL or a local path under /public/assets/
// ──────────────────────────────────────────────────────────────────────────
export const members: Member[] = [
  {
    id: '1',
    username: 'placeholder_hof',
    displayName: 'Placeholder HOF',
    avatar: 'https://cdn.discordapp.com/embed/avatars/0.png',
    tier: 'hof',
    role: 'Founder',
    bio: 'One of the originals.',
    joinedAt: '2023-01-01',
    socials: {
      discord: 'placeholder#0000',
    },
  },
  {
    id: '2',
    username: 'placeholder_elite',
    displayName: 'Placeholder Elite',
    avatar: 'https://cdn.discordapp.com/embed/avatars/1.png',
    tier: 'elite',
    role: 'Co-Founder',
    bio: 'Building something real.',
    joinedAt: '2023-03-15',
    socials: {
      discord: 'placeholder#0001',
    },
  },
  {
    id: '3',
    username: 'placeholder_member',
    displayName: 'Placeholder',
    avatar: 'https://cdn.discordapp.com/embed/avatars/2.png',
    tier: 'member',
    role: 'Member',
    bio: 'Part of the movement.',
    joinedAt: '2023-06-20',
  },
]

// ─── Playlist ──────────────────────────────────────────────────────────────
// src: path to audio file under /public/ or a full URL
// cover: optional album art path
// ──────────────────────────────────────────────────────────────────────────
export const playlist: Track[] = [
  // {
  //   title: 'Track Name',
  //   artist: 'Artist Name',
  //   src: '/assets/audio/track.mp3',
  //   cover: '/assets/audio/cover.jpg',
  // },
]
