'use client'

import chapters from '@/content/chapters.json'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { CheckCircle } from 'lucide-react'

export default function ChaptersPage() {
  const [readChapters, setReadChapters] = useState<string[]>([])

  useEffect(() => {
    const stored = localStorage.getItem('readChapters')
    if (stored) {
      setReadChapters(JSON.parse(stored))
    }
  }, [])

  return (
    <div className="mx-auto max-w-3xl py-10">
      <h1 className="mb-6 text-3xl font-bold">Chapters</h1>
      <ul className="space-y-4">
        {chapters.map((ch) => {
          const isRead = readChapters.includes(ch.slug)
          return (
            <li key={ch.id}>
              <Link
                href={`/chapters/${ch.slug}`}
                className="flex items-center justify-between rounded-lg border p-4 hover:bg-muted"
              >
                <div className="flex items-center gap-2 font-semibold">
                  {isRead && <CheckCircle className="h-5 w-5 text-green-500" />}
                  {ch.title}
                </div>
                <div className="text-sm text-muted-foreground">{ch.description}</div>
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
