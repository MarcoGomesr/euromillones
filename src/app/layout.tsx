import { Analytics } from '@vercel/analytics/react'
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Euromillones random numeros ganadores',
  description: 'Generador de numeros random ganadores '
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="min-h-screen container mx-auto">{children}</main>
        <Analytics />
      </body>
    </html>
  )
}
