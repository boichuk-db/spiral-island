'use client'

import chapters from '@/content/chapters.json'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { CheckCircle } from 'lucide-react'
import { motion } from 'framer-motion'

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
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-6 text-3xl font-bold"
      >
        Chapters
      </motion.h1>

      <ul className="space-y-4">
        {chapters.map((ch, i) => {
          const isRead = readChapters.includes(ch.slug)
          return (
            <motion.li
              key={ch.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Link
                href={`/chapters/${ch.slug}`}
                className="flex flex-col items-start justify-between rounded-lg border p-4 hover:bg-muted md:flex-row md:items-center"
              >
                <div className="flex items-center gap-2 font-semibold">
                  {isRead && <CheckCircle className="h-5 w-5 text-green-500" />}
                  {ch.title}
                </div>
                <div className="text-sm text-muted-foreground">{ch.description}</div>
              </Link>
            </motion.li>
          )
        })}
      </ul>
    </div>
  )
}
