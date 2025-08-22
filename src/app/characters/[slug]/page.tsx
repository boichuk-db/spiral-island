import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import characters from '@/content/characters.json'
import type { Character } from '@/types'
import { getSeo } from '@/components/Seo'
import CharacterContent from '@/components/CharacterContent'

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const character = (characters as Character[]).find((c) => c.slug === params.slug)
  if (!character) return { title: 'Character — Spiral Island' }
  return getSeo({
    title: `${character.name} — ${character.role}`,
    description: character.bio,
    image: character.avatar,
    url: `https://spiral-island.example.com/characters/${character.slug}`,
  })
}

export default function CharacterPage({ params }: { params: { slug: string } }) {
  const character = (characters as Character[]).find((c) => c.slug === params.slug)
  if (!character) notFound()
  return <CharacterContent character={character} />
}
