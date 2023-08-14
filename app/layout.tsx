'use client'

import './style.css'

import { Inter } from 'next/font/google'
import { useEffect } from 'react'
import Header from '@/components/header'
import AOS from 'aos'
import 'aos/dist/aos.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap'
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  useEffect(() => {
    AOS.init({
      once: true,
      disable: 'phone',
      duration: 700,
      easing: 'ease-out-cubic',
    })
  })

  return (
    <html lang="en">
      <body className={`${inter.variable} font-inter antialiased bg-gray-500 text-gray-900 tracking-tight`}>
        <div className="flex flex-col min-h-screen overflow-hidden supports-[overflow:clip]:overflow-clip">
          <Header />
          {children}
        </div>
      </body>
    </html>
  )
}
