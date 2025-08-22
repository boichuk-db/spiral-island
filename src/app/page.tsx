'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function HomePage() {
  const [lastChapter, setLastChapter] = useState<string | null>(null)

  useEffect(() => {
    const saved = localStorage.getItem('lastChapter')
    if (saved) {
      setLastChapter(saved)
    }
  }, [])

  return (
    <div className="flex flex-col items-center gap-8 py-16">
      <h1 className="text-5xl font-bold">Spiral Island</h1>
      <p className="text-lg text-stone-600 dark:text-stone-300">An interactive reader experience</p>

      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Welcome</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <Link href="/chapters">
            <Button size="lg" className="w-full">
              Start Reading
            </Button>
          </Link>

          {lastChapter ? (
            <Link href={`/chapters/${lastChapter}`}>
              <Button size="lg" variant="secondary" className="w-full">
                Continue
              </Button>
            </Link>
          ) : (
            <Button size="lg" variant="secondary" className="w-full" disabled>
              Continue
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
