'use client'

import { useMemo, useState } from 'react'
import glossaryData from '@/content/glossary.json'
import { Input } from '@/components/ui/input'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { motion, AnimatePresence } from 'framer-motion'

// Variants for staggered list items
const listVariants = {
  hidden: { opacity: 0, y: 8 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.25, delay: i * 0.04 },
  }),
}

// Simple highlighter for matched text
function highlight(text: string, query: string) {
  if (!query) return text
  const parts = text.split(new RegExp(`(${query})`, 'ig'))
  return parts.map((part, i) =>
    part.toLowerCase() === query.toLowerCase() ? (
      <mark key={i} className="rounded bg-yellow-200/60 px-0.5 dark:bg-yellow-300/20">
        {part}
      </mark>
    ) : (
      <span key={i}>{part}</span>
    )
  )
}

export default function Glossary() {
  const [search, setSearch] = useState('')

  // Filtered data memoized to avoid unnecessary recalculations
  const filteredData = useMemo(() => {
    const q = search.trim().toLowerCase()
    if (!q) return glossaryData
    return glossaryData
      .map((cat) => ({
        ...cat,
        terms: cat.terms.filter(
          (t: { term: string; definition: string }) =>
            t.term.toLowerCase().includes(q) || t.definition.toLowerCase().includes(q)
        ),
      }))
      .filter((cat) => cat.terms.length > 0)
  }, [search])

  return (
    <motion.div
      className="mx-auto max-w-2xl space-y-6"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      {/* Search bar with subtle focus animation */}
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, delay: 0.05 }}
      >
        <Input
          placeholder="Search glossary..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-11"
        />
      </motion.div>

      {/* Accordion categories */}
      <Accordion type="single" collapsible className="w-full">
        <AnimatePresence initial={false} mode="popLayout">
          {filteredData.map(
            (cat: { category: string; terms: { term: string; definition: string }[] }) => (
              <motion.div
                key={cat.category}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                transition={{ duration: 0.2 }}
              >
                <AccordionItem value={cat.category}>
                  <AccordionTrigger>{cat.category}</AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-2 pl-4">
                      <AnimatePresence initial={false}>
                        {cat.terms.map((t, idx) => (
                          <motion.li
                            key={`${cat.category}-${t.term}`}
                            custom={idx}
                            variants={listVariants}
                            initial="hidden"
                            animate="show"
                            exit={{ opacity: 0, y: 8, transition: { duration: 0.15 } }}
                            className="leading-relaxed"
                          >
                            <span className="font-semibold text-sky-600">
                              {highlight(t.term, search)}
                            </span>{' '}
                            —{' '}
                            <span className="text-stone-700 dark:text-stone-300">
                              {highlight(t.definition, search)}
                            </span>
                          </motion.li>
                        ))}
                      </AnimatePresence>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            )
          )}
        </AnimatePresence>
      </Accordion>
    </motion.div>
  )
}
