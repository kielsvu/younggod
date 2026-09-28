import type { Member, SiteConfig } from '@/types'

export const config: SiteConfig = {
  title:         'REVGNG Worldwide',
  description:   'luv, revgng & dreamz',
  enterTitle:    'LUV, REVGNG & DREAMS',
  enterSubtitle: 'ALAM MO NA GAGAWIN MO',
  discordUrl:    'https://discord.gg/revgng',
}

// ─── Members ────────────────────────────────────────────────────────────────
// To add or edit a member just update this array.
// avatar: drop the image into /public/assets/members/ and use '/assets/members/name.jpg'
//         or paste a Discord CDN URL.
// username: must match the URL slug — e.g. 'kiel' → /kiel
// ────────────────────────────────────────────────────────────────────────────
export const members: Member[] = [

  // ── MVP (top 3, highest prestige) ─────────────────────────────────────
  {
    id: 'mvp-1',
    username: 'mvp_one',
    displayName: 'MVP One',
    avatar: 'https://cdn.discordapp.com/embed/avatars/0.png',
    tier: 'mvp',
    role: 'Most Valuable',
    bio: 'The one who started it all.',
    joinedAt: '2023-01-01',
    socials: { discord: 'mvp1' },
  },
  {
    id: 'mvp-2',
    username: 'mvp_two',
    displayName: 'MVP Two',
    avatar: 'https://cdn.discordapp.com/embed/avatars/1.png',
    tier: 'mvp',
    role: 'Most Valuable',
    bio: 'Never stopped grinding.',
    joinedAt: '2023-01-15',
    socials: { discord: 'mvp2' },
  },
  {
    id: 'mvp-3',
    username: 'mvp_three',
    displayName: 'MVP Three',
    avatar: 'https://cdn.discordapp.com/embed/avatars/2.png',
    tier: 'mvp',
    role: 'Most Valuable',
    bio: 'Built different.',
    joinedAt: '2023-02-01',
    socials: { discord: 'mvp3' },
  },

  // ── Hall of Fame ───────────────────────────────────────────────────────
  {
    id: 'hof-1',
    username: 'placeholder_hof',
    displayName: 'Placeholder HOF',
    avatar: 'https://cdn.discordapp.com/embed/avatars/3.png',
    tier: 'hof',
    role: 'Founder',
    bio: 'One of the originals.',
    joinedAt: '2023-01-01',
    socials: { discord: 'placeholder' },
  },

  // ── Young Gods (4 members — each gets /[username] profile page) ────────
  {
    id: 'yg-1',
    username: 'kiel',
    displayName: 'Kiel',
    avatar: 'https://cdn.discordapp.com/embed/avatars/0.png',
    tier: 'youngGod',
    role: 'Young God',
    bio: 'Replace this with a real bio. Drop the avatar into /public/assets/members/kiel.jpg',
    joinedAt: '2023-03-01',
    socials: { discord: 'kiel' },
  },
  {
    id: 'yg-2',
    username: 'young_god_2',
    displayName: 'Young God 2',
    avatar: 'https://cdn.discordapp.com/embed/avatars/1.png',
    tier: 'youngGod',
    role: 'Young God',
    bio: 'Replace this with a real bio.',
    joinedAt: '2023-03-15',
    socials: { discord: 'younggod2' },
  },
  {
    id: 'yg-3',
    username: 'young_god_3',
    displayName: 'Young God 3',
    avatar: 'https://cdn.discordapp.com/embed/avatars/2.png',
    tier: 'youngGod',
    role: 'Young God',
    bio: 'Replace this with a real bio.',
    joinedAt: '2023-04-01',
    socials: { discord: 'younggod3' },
  },
  {
    id: 'yg-4',
    username: 'young_god_4',
    displayName: 'Young God 4',
    avatar: 'https://cdn.discordapp.com/embed/avatars/3.png',
    tier: 'youngGod',
    role: 'Young God',
    bio: 'Replace this with a real bio.',
    joinedAt: '2023-04-15',
    socials: { discord: 'younggod4' },
  },
]
