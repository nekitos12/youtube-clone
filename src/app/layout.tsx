import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Sidebar } from '@/widgets/sidebar'
import { Providers } from './providers'
import './globals.css'

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
})

export const metadata: Metadata = {
  title: 'YouTube Clone',
  description: 'YouTube clone built with Next.js',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-neutral-950 text-white antialiased`}>
        <Providers>
          <div className="flex min-h-screen">
            <Sidebar />
            <div className="min-w-0 flex-1">{children}</div>
          </div>
        </Providers>
      </body>
    </html>
  )
}
