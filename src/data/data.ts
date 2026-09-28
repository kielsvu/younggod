import type { Member, Track, SiteConfig } from '@/types'

export const config: SiteConfig = {
  title: 'REVGNG Worldwide',
  description: 'luv, revgng & dreamz',
  enterTitle: 'LUV, REVGNG & DREAMS',
  enterSubtitle: 'ALAM MO NA GAGAWIN MO',
  discordUrl: 'https://discord.gg/revgng',
}

// ─── Members ───────────────────────────────────────────────────────────────
// tier: "mvp"    = MVP — top 3, highest prestige (crimson/white diamond)
//       "hof"    = Hall of Fame (gold treatment)
//       "elite"  = Elite member (silver treatment)
//       "member" = Standard member
// avatar: use a Discord CDN URL or a local path under /public/assets/
// ──────────────────────────────────────────────────────────────────────────
export const members: Member[] = [
  // ── MVPs (max 3) ──────────────────────────────────────────────────────
  {
    id: 'mvp-1',
    username: 'mvp_one',
    displayName: 'MVP One',
    avatar: 'https://cdn.discordapp.com/embed/avatars/0.png',
    tier: 'mvp',
    role: 'Most Valuable',
    bio: 'The one who started it all.',
    joinedAt: '2023-01-01',
    socials: { discord: 'mvp1#0000' },
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
    socials: { discord: 'mvp2#0001' },
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
    socials: { discord: 'mvp3#0002' },
  },
  // ── Hall of Fame ──────────────────────────────────────────────────────
  {
    id: 'hof-1',
    username: 'placeholder_hof',
    displayName: 'Placeholder HOF',
    avatar: 'https://cdn.discordapp.com/embed/avatars/3.png',
    tier: 'hof',
    role: 'Founder',
    bio: 'One of the originals.',
    joinedAt: '2023-01-01',
    socials: { discord: 'placeholder#0000' },
  },
  // ── Elite ─────────────────────────────────────────────────────────────
  {
    id: 'elite-1',
    username: 'placeholder_elite',
    displayName: 'Placeholder Elite',
    avatar: 'https://cdn.discordapp.com/embed/avatars/4.png',
    tier: 'elite',
    role: 'Co-Founder',
    bio: 'Building something real.',
    joinedAt: '2023-03-15',
    socials: { discord: 'placeholder#0001' },
  },
  // ── Members ───────────────────────────────────────────────────────────
  {
    id: 'member-1',
    username: 'placeholder_member',
    displayName: 'Placeholder',
    avatar: 'https://cdn.discordapp.com/embed/avatars/5.png',
    tier: 'member',
    role: 'Member',
    bio: 'Part of the movement.',
    joinedAt: '2023-06-20',
  },
]

// ─── Playlist ──────────────────────────────────────────────────────────────
// Drop your .mp3 files into /public/assets/audio/ and fill in the entries.
// The player UI is always visible — it shows an idle state when empty.
// ──────────────────────────────────────────────────────────────────────────
export const playlist: Track[] = [
  // {
  //   title: 'Track Name',
  //   artist: 'Artist Name',
  //   src: '/assets/audio/track.mp3',
  //   cover: '/assets/audio/cover.jpg',
  // },
]
