# Young God Worldwide

Next.js 15 · TypeScript · Tailwind · Framer Motion · Vercel

---

## Getting started

```bash
npm install
npm run dev   # http://localhost:3000
```

## Managing content via GitHub

All site content lives in **`src/data/index.ts`**. Commit a change there and Vercel redeploys automatically.

### Site config

```ts
export const config: SiteConfig = {
  title: 'Young God Worldwide',
  enterTitle: 'LUV, YOUNG GOD & DREAMS',
  enterSubtitle: 'ALAM MO NA GAGAWIN MO',
  discordUrl: 'https://discord.gg/revgng',
}
```

### Adding a member

```ts
{
  id: 'unique-string',          // any unique value
  username: 'discordTag',
  displayName: 'Display Name',
  avatar: 'https://cdn.discordapp.com/avatars/USER_ID/AVATAR_HASH.png',
  tier: 'hof',                  // 'hof' | 'elite' | 'member'
  role: 'Founder',
  bio: 'Short bio here.',
  joinedAt: '2024-01-01',       // ISO date string
  socials: {
    discord: 'user#0000',
  },
},
```

**Tiers:**
- `hof` — Hall of Fame: gold wave name, sparkles, glow border
- `elite` — Silver wave name, onyx pulse border, shimmer
- `member` — Standard greyscale wave

### Avatar URL from Discord

Go to your Discord profile → right-click avatar → Copy Link. Paste as `avatar`.

### Adding music

```ts
export const playlist: Track[] = [
  {
    title: 'Track Title',
    artist: 'Artist',
    src: '/assets/audio/track.mp3',  // put file in /public/assets/audio/
    cover: '/assets/audio/cover.jpg',
  },
]
```

### Adding the banner/background image

Drop your banner image at `/public/assets/splash-bg.png`.
Then in `src/components/sections/Hero.tsx`, find the commented-out `<Image>` block and replace the text logo with it.

---

## Deployment (Vercel)

1. Push this repo to GitHub.
2. Import it in [vercel.com](https://vercel.com).
3. Framework: **Next.js** — no environment variables needed.
4. Every `git push` to `main` triggers a redeploy.

---

## Project structure

```
src/
├── app/
│   ├── globals.css     ← Design system, animations, custom classes
│   ├── layout.tsx
│   └── page.tsx        ← Entry point
├── components/
│   ├── ui/
│   │   ├── Navbar.tsx
│   │   └── MusicPlayer.tsx
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── Members.tsx
│   │   └── MemberCard.tsx
│   └── WelcomeScreen.tsx
├── data/
│   └── index.ts        ← ✏️  Edit this to manage members, music, config
├── lib/
│   └── introState.ts
└── types/
    └── index.ts
```
