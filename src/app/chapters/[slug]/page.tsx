import chapters from '@/content/chapters.json'
import { notFound } from 'next/navigation'

import { getSeo } from '@/components/Seo'
import ChapterContent from '@/components/ChapterContent'

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const { slug } = params
  const chapter = chapters.find((ch) => ch.slug === slug)

  if (!chapter) return { title: 'Spiral Island' }

  return getSeo({
    title: chapter.title,
    description: chapter.description,
    image: chapter.image,
    url: `https://spiral-island.example.com/chapters/${chapter.slug}`,
  })
}

export default function ChapterPage({ params }: { params: { slug: string } }) {
  const { slug } = params

  const chapterIndex = chapters.findIndex((ch) => ch.slug === slug)
  if (chapterIndex === -1) notFound()

  const chapter = chapters[chapterIndex]
  const prevChapter = chapters[chapterIndex - 1]
  const nextChapter = chapters[chapterIndex + 1]

  return <ChapterContent chapter={chapter} prevChapter={prevChapter} nextChapter={nextChapter} />
}
