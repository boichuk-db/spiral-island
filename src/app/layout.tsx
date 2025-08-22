import type { Metadata } from 'next'
import './globals.css'
import { Inter } from 'next/font/google'
import { cn } from '@/lib/utils'
import { NavBar } from '@/components/NavBar'
import { ThemeProvider } from '@/components/ThemeProvider'
import Link from 'next/link'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Spiral Island',
  description: 'Interactive Reader',
  icons: {
    icon: '/spiral-logo.svg',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'bg-stone-50 text-stone-900 dark:bg-stone-900 dark:text-stone-100',
          inter.className
        )}
      >
        <ThemeProvider>
          <div className="flex min-h-screen flex-col">
            {/* Header */}
            <header className="sticky top-0 z-50 border-b bg-stone-100/90 backdrop-blur dark:bg-stone-800/90">
              <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4">
                <Link href="/" className="text-2xl font-bold transition hover:opacity-80">
                  Spiral Island
                </Link>
                <NavBar />
              </div>
            </header>

            <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8">{children}</main>

            <footer className="border-t bg-stone-100 dark:bg-stone-800">
              <div className="mx-auto w-full max-w-6xl px-4 py-4 text-center text-sm text-stone-500 dark:text-stone-400">
                © {new Date().getFullYear()} Spiral Island
              </div>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
