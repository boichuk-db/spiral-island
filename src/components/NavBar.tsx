'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { ThemeSwitcher } from './ThemeSwitcher'

const links = [
  { href: '/', label: 'Home' },
  { href: '/chapters', label: 'Chapters' },
  { href: '/map', label: 'Map' },
  { href: '/glossary', label: 'Glossary' },
]

export function NavBar() {
  const pathname = usePathname()

  return (
    <nav className="flex items-center gap-6">
      {links.map(({ href, label }) => (
        <Link
          key={href}
          href={href}
          className={cn(
            'transition-colors hover:underline',
            pathname === href
              ? 'font-semibold text-sky-600 dark:text-sky-400'
              : 'text-stone-700 dark:text-stone-300'
          )}
        >
          {label}
        </Link>
      ))}
      <ThemeSwitcher />
    </nav>
  )
}
