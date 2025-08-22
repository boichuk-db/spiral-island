'use client'

import Image from 'next/image'
import { useState } from 'react'
import { motion } from 'framer-motion'

const hotspots = [
  {
    id: 'caldera',
    label: 'Caldera',
    top: '50%',
    left: '50%',
    description: 'A massive volcanic crater in the center of the island.',
  },
  {
    id: 'bone-fields',
    label: 'Bone Fields',
    top: '80%',
    left: '55%',
    description: 'A field covered with animal (and maybe human) bones.',
  },
  {
    id: 'luminescent-bay',
    label: 'Luminescent Bay',
    top: '70%',
    left: '80%',
    description: 'A bay where water glows at night.',
  },
]

export default function IslandMap() {
  const [active, setActive] = useState<string | null>(null)

  return (
    <div className="relative mx-auto w-full max-w-3xl">
      {/* Map image */}
      <Image
        src="/images/map/island-map.png"
        alt="Island Map"
        width={800}
        height={800}
        className="h-auto w-full rounded shadow"
      />

      {/* Hotspot points */}
      {hotspots.map((spot) => (
        <button
          key={spot.id}
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ top: spot.top, left: spot.left }}
          onClick={() => setActive(spot.id)}
        >
          {/* Pulsing dot */}
          <motion.div
            className="h-4 w-4 rounded-full bg-sky-500 shadow-lg ring-2 ring-white dark:ring-stone-900"
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
          />
        </button>
      ))}

      {/* Info panel */}
      {active && (
        <div className="absolute bottom-4 left-1/2 w-3/4 max-w-md -translate-x-1/2 rounded bg-white/90 p-4 text-sm shadow-lg backdrop-blur dark:bg-stone-800/90">
          <h3 className="font-semibold text-sky-600 dark:text-sky-400">
            {hotspots.find((h) => h.id === active)?.label}
          </h3>
          <p className="text-stone-700 dark:text-stone-300">
            {hotspots.find((h) => h.id === active)?.description}
          </p>
          <button
            className="mt-2 text-xs text-sky-500 hover:underline"
            onClick={() => setActive(null)}
          >
            Close
          </button>
        </div>
      )}
    </div>
  )
}
