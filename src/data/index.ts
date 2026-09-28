import type { Member, SiteConfig, Track } from '@/types'

export const config: SiteConfig = {
  title: 'Young God Worldwide',
  description: 'Young God Worldwide',
  enterTitle: 'YOUNG GOD WORLDWIDE',
  enterSubtitle: 'ALAM MO NA GAGAWIN MO',
  discordUrl: 'https://discord.gg/revgng',
}

export const members: Member[] = [
  {
    id: 'hof-kiel',
    username: 'kiel',
    displayName: 'Kiel',
    avatar: 'https://cdn.discordapp.com/embed/avatars/0.png',
    tier: 'hof',
    role: 'Hall of Fame',
    bio: '',
    joinedAt: '2026-09-28',
    socials: { discord: 'kiel' },
  },
  {
    id: 'mvp-sam',
    username: 'sam',
    displayName: 'Sam',
    avatar: 'https://cdn.discordapp.com/embed/avatars/1.png',
    tier: 'mvp',
    role: 'Most Valuable Player',
    bio: '',
    joinedAt: '2026-09-28',
    socials: { discord: 'sam' },
  },
  {
    id: 'member-cass',
    username: 'cass',
    displayName: 'Cass',
    avatar: 'https://cdn.discordapp.com/embed/avatars/2.png',
    tier: 'member',
    role: 'Member',
    bio: '',
    joinedAt: '2026-09-28',
    socials: { discord: 'cass' },
  },
  {
    id: 'member-jake',
    username: 'jake',
    displayName: 'Jake',
    avatar: 'https://cdn.discordapp.com/embed/avatars/3.png',
    tier: 'member',
    role: 'Member',
    bio: '',
    joinedAt: '2026-09-28',
    socials: { discord: 'jake' },
  },
]

export const playlist: Track[] = []
