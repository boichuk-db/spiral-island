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
              <div className="container mx-auto flex items-center justify-between py-4">
                <Link href="/" className="text-2xl font-bold transition hover:opacity-80">
                  Spiral Island
                </Link>
                <NavBar />
              </div>
            </header>
            {/* Main content */}
            <main className="container mx-auto flex-1 py-8">{children}</main>
            {/* Footer */}
            <footer className="border-t bg-stone-100 dark:bg-stone-800">
              <div className="container mx-auto py-4 text-center text-sm text-stone-500 dark:text-stone-400">
                © {new Date().getFullYear()} Spiral Island
              </div>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
