'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import chapters from '@/content/chapters.json'

export default function HomePage() {
  const [lastChapter, setLastChapter] = useState<string | null>(null)

  useEffect(() => {
    const saved = localStorage.getItem('lastChapter')
    if (saved) {
      setLastChapter(saved)
    }
  }, [])

  const lastCh = chapters.find((ch) => ch.slug === lastChapter)

  return (
    <div className="relative flex min-h-screen flex-col items-center gap-8 py-16">
      {/* Fullscreen background gradient */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-b from-sky-100 via-white to-stone-100 dark:from-stone-900 dark:via-stone-950 dark:to-black" />
      {/* Animated heading */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-5xl font-bold"
      >
        Spiral Island
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="text-lg text-stone-600 dark:text-stone-300"
      >
        An interactive reader experience
      </motion.p>

      {/* Animated card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        <Card className="w-full min-w-72 max-w-md shadow-lg">
          <CardHeader>
            <CardTitle>Welcome</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <Link href="/chapters">
              <Button size="lg" className="w-full">
                Start Reading
              </Button>
            </Link>

            {lastCh ? (
              <Link href={`/chapters/${lastCh.slug}`}>
                <Button size="lg" variant="secondary" className="w-full">
                  Continue:{' '}
                  {lastCh.title.length > 40 ? lastCh.title.slice(0, 40) + '…' : lastCh.title}
                </Button>
              </Link>
            ) : (
              <Button size="lg" variant="secondary" className="w-full" disabled>
                Continue
              </Button>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
