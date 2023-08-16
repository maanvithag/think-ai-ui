'use client'

import './style.css'

import { useEffect } from 'react'
import Header from '@/components/header'
import Banner from '@/components/banner'
import Footer from '@/components/footer'
import AOS from 'aos'
import 'aos/dist/aos.css'

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
      <body className="antialiased bg-navy-100 tracking-tight">
        <div className="flex flex-col min-h-screen overflow-hidden supports-[overflow:clip]:overflow-clip">
          <Header />
          {children}
          <Footer />
          <Banner />
        </div>
      </body>
    </html>
  )
}
