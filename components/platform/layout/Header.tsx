'use client'

import { useState, useEffect } from 'react'
import { ConnectKitButton } from 'connectkit'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navLinks = [
  { href: '/launchpad', label: 'Explore' },
  { href: '/launchpad/feed', label: 'Feed' },
  { href: '/launchpad/dashboard', label: 'Portfolio' },
  { href: '/launchpad/company', label: 'Company' },
]

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 16)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'panel-elevated shadow-lg shadow-black/20'
          : 'border-b border-border bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 sm:px-8 lg:px-10">
        {/* Logo */}
        <Link href="/" className="group flex items-center gap-3" aria-label="IP Foundation">
          <Image
            src="/images/whitetextnobg.png"
            alt="IP Foundation"
            width={150}
            height={48}
            priority
            className="h-8 w-auto object-contain transition-opacity duration-200 group-hover:opacity-80"
          />
          <span
            className="hidden border-l border-white/15 pl-3 text-[0.6875rem] font-semibold uppercase text-text-secondary sm:block"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Launchpad
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-0.5 md:flex">
          {navLinks.map((link) => {
            const isActive =
              link.href === '/launchpad'
                ? pathname === '/launchpad'
                : pathname === link.href || pathname.startsWith(`${link.href}/`)
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-lg px-3.5 py-1.5 text-sm font-medium transition-all duration-150 ${
                  isActive
                    ? 'bg-white/[0.06] text-text-primary'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>

        {/* Right section */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:block [&_button]:!rounded-lg [&_button]:!text-sm [&_button]:!font-medium">
            <ConnectKitButton />
          </div>

          {/* Mobile hamburger */}
          <button
            className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.04] transition-colors hover:bg-white/[0.08] md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <div className="flex flex-col gap-[3px]">
              <span
                className={`h-[1.5px] w-3.5 rounded-full bg-text-primary transition-all duration-200 ${
                  menuOpen ? 'translate-y-[5px] rotate-45' : ''
                }`}
              />
              <span
                className={`h-[1.5px] w-3.5 rounded-full bg-text-primary transition-all duration-200 ${
                  menuOpen ? 'opacity-0' : ''
                }`}
              />
              <span
                className={`h-[1.5px] w-3.5 rounded-full bg-text-primary transition-all duration-200 ${
                  menuOpen ? '-translate-y-[5px] -rotate-45' : ''
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`overflow-hidden border-t border-border transition-all duration-200 md:hidden ${
          menuOpen ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav className="flex flex-col gap-0.5 px-5 py-3">
          {navLinks.map((link) => {
            const isActive =
              link.href === '/launchpad'
                ? pathname === '/launchpad'
                : pathname === link.href || pathname.startsWith(`${link.href}/`)
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-white/[0.06] text-text-primary'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                {link.label}
              </Link>
            )
          })}
          <div className="pt-2">
            <ConnectKitButton />
          </div>
        </nav>
      </div>
    </header>
  )
}
