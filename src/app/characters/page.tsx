'use client'

import { useState } from 'react'
import NextLink from 'next/link'
import { motion } from 'framer-motion'
import characters from '@/content/characters.json'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'

export default function CharactersGrid() {
  const [search, setSearch] = useState('')

  const filtered = characters.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.role.toLowerCase().includes(search.toLowerCase()) ||
      c.tags.some((t: string) => t.toLowerCase().includes(search.toLowerCase()))
  )

  return (
    <motion.div
      className="mx-auto max-w-5xl space-y-6 py-10"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      <h1 className="text-4xl font-bold">Персонажі</h1>

      <Input
        placeholder="Пошук за ім'ям, роллю або тегом..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((char, i) => (
          <motion.div
            key={char.slug}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: i * 0.05 }}
          >
            <NextLink
              href={`/characters/${char.slug}`}
              aria-label={`Відкрити сторінку персонажа ${char.name}`}
              className="block"
            >
              <Card className="space-y-3 rounded-2xl p-6 shadow-md transition hover:shadow-lg">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-14 w-14">
                    <AvatarImage src={char.avatar} alt={char.name} />
                    <AvatarFallback>{char.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-lg font-bold">{char.name}</h3>
                    <p className="text-md text-stone-500">{char.role}</p>
                  </div>
                </div>

                <p className="text-base text-stone-700 dark:text-stone-300">{char.bio}</p>

                <div className="flex flex-wrap gap-2">
                  {char.tags.map((tag: string) => (
                    <Badge key={tag} variant="secondary" className="capitalize">
                      {tag}
                    </Badge>
                  ))}
                  <Badge variant="outline">Глава {char.firstAppearanceChapter}</Badge>
                </div>
              </Card>
            </NextLink>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
