import { notFound } from 'next/navigation'
import { members } from '@/data'
import MemberProfile from '@/components/MemberProfile'

interface Props {
  params: Promise<{ username: string }>
}

// Pre-generate routes for all Young Gods at build time
export async function generateStaticParams() {
  return members
    .filter((m) => m.tier === 'youngGod')
    .map((m) => ({ username: m.username }))
}

export async function generateMetadata({ params }: Props) {
  const { username } = await params
  const member = members.find(
    (m) => m.username === username && m.tier === 'youngGod',
  )
  if (!member) return { title: 'Not found' }
  return {
    title: `${member.displayName} — REVGNG`,
    description: member.bio,
  }
}

export default async function MemberPage({ params }: Props) {
  const { username } = await params
  const member = members.find(
    (m) => m.username === username && m.tier === 'youngGod',
  )
  if (!member) notFound()
  return <MemberProfile member={member} />
}
