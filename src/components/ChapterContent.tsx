'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Chapter } from '@/types'

type ChapterContentProps = {
  chapter: Chapter
  prevChapter?: Chapter
  nextChapter?: Chapter
}
export default function ChapterContent({ chapter, prevChapter, nextChapter }: ChapterContentProps) {
  useEffect(() => {
    localStorage.setItem('lastChapter', chapter.slug)

    const stored = localStorage.getItem('readChapters')
    const parsed = stored ? JSON.parse(stored) : []
    if (!parsed.includes(chapter.slug)) {
      localStorage.setItem('readChapters', JSON.stringify([...parsed, chapter.slug]))
    }
  }, [chapter.slug])

  return (
    <motion.div
      className="mx-auto max-w-6xl space-y-10 py-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Content grid */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* Text */}
        <motion.div
          className="prose dark:prose-invert mx-auto max-w-none"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="mb-4 text-2xl font-extrabold tracking-tight lg:text-4xl">
            {chapter.title}
          </h1>
          <p className="mb-2 text-stone-500 dark:text-stone-400">{chapter.description}</p>
          <p className="text-sm text-stone-400 dark:text-stone-500">
            ⏱ {chapter.readingTime} хв читання
          </p>
          <div className="mt-6 text-lg">{chapter.content}</div>
        </motion.div>

        {/* Sticky Image */}
        <motion.div
          className="relative aspect-[4/5] w-full self-start overflow-hidden rounded-lg shadow md:sticky md:top-20"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Image
            src={chapter.image}
            alt={chapter.title}
            fill
            sizes="(max-width: 768px) 100vw, 
            (max-width: 1200px) 50vw, 
            33vw"
            className="object-cover"
            priority
          />
        </motion.div>
      </div>

      {/* Prev / Next navigation */}
      <motion.div
        className="flex justify-between border-t pt-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
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
      </motion.div>
    </motion.div>
  )
}
