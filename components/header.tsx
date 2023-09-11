'use client'

import { useState } from 'react'

import Link from 'next/link'
import Logo from './logo'

export default function Header() {

  const [top, setTop] = useState<boolean>(true)

  return (
    <header className={`fixed w-full z-30 md:bg-opacity-90 transition duration-300 ease-in-out ${!top ? 'bg-white backdrop-blur-sm shadow-lg' : ''}`}>
      <div className="max-w-6xl mx-auto px-5 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Site branding */}
          <div className="shrink-0 mr-4">
            <Logo />
          </div>
          {/* navigation */}
          <nav className="md:flex md:grow">
            {/* Github links */}
            <ul className="flex grow justify-end flex-wrap items-center">
              <li>
                <Link href="https://github.com/maanvithag/thinkai" className="btn-sm font-mono text-white ml-3">
                  <span>Github Code</span>
                  <svg className="w-3 h-3 fill-current text-white shrink-0 ml-2 -mr-1" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.707 5.293L7 .586 5.586 2l3 3H0v2h8.586l-3 3L7 11.414l4.707-4.707a1 1 0 000-1.414z" fillRule="nonzero" />
                  </svg>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  )
}
