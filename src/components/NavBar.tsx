'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { ThemeSwitcher } from './ThemeSwitcher'
import { Menu } from 'lucide-react'
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet'

const links = [
  { href: '/', label: 'Home' },
  { href: '/chapters', label: 'Chapters' },
  { href: '/map', label: 'Map' },
  { href: '/glossary', label: 'Glossary' },
]

export function NavBar() {
  const pathname = usePathname()

  return (
    <nav className="relative flex items-center justify-between py-4">
      {/* Desktop links */}
      <div className="hidden items-center gap-6 md:flex">
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
      </div>

      {/* Theme switcher */}
      <ThemeSwitcher />

      {/* Mobile menu */}
      <Sheet>
        <SheetTrigger>
          <Menu size={22} />
        </SheetTrigger>
        <SheetContent side="right">
          <SheetTitle>Spiral Island</SheetTitle>
          <div className="mt-4 flex flex-col gap-4">
            {links.map(({ href, label }) => (
              <Link key={href} href={href}>
                {label}
              </Link>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </nav>
  )
}
