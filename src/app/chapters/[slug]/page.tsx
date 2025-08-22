import chapters from '@/content/chapters.json'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { getSeo } from '@/components/Seo'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const chapter = chapters.find((ch) => ch.slug === slug)

  if (!chapter) return { title: 'Spiral Island' }

  return getSeo({
    title: chapter.title,
    description: chapter.description,
    image: chapter.image,
    url: `https://spiral-island.example.com/chapters/${chapter.slug}`,
  })
}

export default async function ChapterPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  const chapterIndex = chapters.findIndex((ch) => ch.slug === slug)
  if (chapterIndex === -1) notFound()

  const chapter = chapters[chapterIndex]
  const prevChapter = chapters[chapterIndex - 1]
  const nextChapter = chapters[chapterIndex + 1]

  return (
    <div className="mx-auto max-w-6xl space-y-10 py-10">
      {/* Content grid */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* Text */}
        <div className="prose dark:prose-invert mx-auto max-w-none">
          <h1 className="mb-4 text-2xl font-extrabold tracking-tight lg:text-4xl">
            {chapter.title}
          </h1>
          <p className="mb-2 text-stone-500 dark:text-stone-400">{chapter.description}</p>
          <p className="text-sm text-stone-400 dark:text-stone-500">
            ⏱ {chapter.readingTime} хв читання
          </p>
          <div className="mt-6 text-lg">{chapter.content}</div>
        </div>

        {/* Sticky Image */}
        <div className="relative aspect-[4/5] w-full self-start overflow-hidden rounded-lg shadow md:sticky md:top-20">
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
