'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import type { Character } from '@/types'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function CharacterContent({ character }: { character: Character }) {
  return (
    <motion.div
      className="mx-auto max-w-4xl space-y-8 py-10"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      <div className="grid grid-cols-1 gap-8 md:grid-cols-[220px,1fr]">
        <motion.div
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.35 }}
          className="relative h-56 w-56 overflow-hidden rounded-xl ring-2 ring-stone-200 dark:ring-stone-700 md:h-64 md:w-56"
        >
          <Image src={character.avatar} alt={character.name} fill className="object-cover" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.35, delay: 0.05 }}
          className="space-y-4"
        >
          <h1 className="text-3xl font-extrabold tracking-tight">{character.name}</h1>
          <p className="text-stone-500 dark:text-stone-400">{character.role}</p>
          <div className="flex flex-wrap gap-2">
            {character.tags.map((t) => (
              <Badge key={t} variant="secondary" className="capitalize">
                {t}
              </Badge>
            ))}
            <Badge variant="outline">Глава {character.firstAppearanceChapter}</Badge>
          </div>
          <p className="text-lg leading-relaxed">{character.bio}</p>

          <div className="pt-2">
            <Link href={`/chapters?focus=${character.firstAppearanceChapter}`}>
              <Button variant="outline">Перейти до появи персонажа</Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
