'use client'

import chapters from '@/content/chapters.json'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import React, { useEffect } from 'react'

export default function ChapterPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = React.use(params)

  const chapterIndex = chapters.findIndex((ch) => ch.slug === slug)
  if (chapterIndex === -1) {
    notFound()
  }

  const chapter = chapters[chapterIndex]
  const prevChapter = chapters[chapterIndex - 1]
  const nextChapter = chapters[chapterIndex + 1]

  // ✅ save progress to localStorage
  useEffect(() => {
    if (!slug) return
    const stored = localStorage.getItem('readChapters')
    const parsed: string[] = stored ? JSON.parse(stored) : []
    if (!parsed.includes(slug)) {
      localStorage.setItem('readChapters', JSON.stringify([...parsed, slug]))
    }
  }, [slug])

  return (
    <div className="mx-auto max-w-6xl space-y-10 py-10">
      {/* Content grid */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* Text */}
        <div className="prose dark:prose-invert mx-auto max-w-none">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight">{chapter.title}</h1>
          <p className="mb-2 text-stone-500 dark:text-stone-400">{chapter.description}</p>
          <p className="text-sm text-stone-400 dark:text-stone-500">
            ⏱ {chapter.readingTime} хв читання
          </p>
          <div className="mt-6 text-lg leading-relaxed">{chapter.content}</div>
        </div>

        {/* Image */}
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-lg shadow">
          <Image src={chapter.image} alt={chapter.title} fill className="object-cover" priority />
        </div>
      </div>

      {/* Prev / Next navigation */}
      <div className="flex justify-between border-t pt-6">
        {prevChapter ? (
          <Link href={`/chapters/${prevChapter.slug}`}>
            <Button variant="outline">← Глава {prevChapter.chapterNumber}</Button>
          </Link>
        ) : (
          <div />
        )}
        {nextChapter ? (
          <Link href={`/chapters/${nextChapter.slug}`}>
            <Button>Глава {nextChapter.chapterNumber} →</Button>
          </Link>
        ) : (
          <div />
        )}
      </div>
    </div>
  )
}
