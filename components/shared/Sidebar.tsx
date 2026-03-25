"use client"

import { navLinks } from '@/constants'
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '../ui/button'

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="sidebar">
      <div className="flex size-full flex-col gap-0 p-0">

        {/* Logo area */}
        <div className="pr-5 py-5 border-b" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
          <Link href="/" className="flex items-center gap-2.5">
            {/* Wordmark icon 
            <div
              className="flex items-center justify-center w-7 h-7 rounded-md flex-shrink-0"
              style={{ background: '#e2e8f0' }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill="#09090f" strokeLinejoin="round"/>
              </svg>
            </div>
            */}
            <Image
              src="/divine image app-logo-transparent.png"
              alt="logo"
              width={90}
              height={90}
              className="brightness-[2] opacity-90"
            />
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <SignedIn>
            {/* Top nav group */}
            <p className="px-3 mb-2 text-[10px] font-semibold uppercase tracking-[0.1em]" style={{ color: 'rgba(255,255,255,0.2)' }}>
              Tools
            </p>
            <ul className="flex flex-col gap-0.5 mb-6">
              {navLinks.slice(0, 6).map((link) => {
                const isActive = link.route === pathname;
                return (
                  <li key={link.route} className="relative">
                    {/* Active left bar */}
                    {isActive && (
                      <span
                        className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-r-full"
                        style={{ background: '#6ee7f7' }}
                      />
                    )}
                    <Link
                      href={link.route}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-md text-[13.5px] font-medium transition-all duration-150"
                      style={{
                        color: isActive ? '#f9fafb' : 'rgba(255,255,255,0.38)',
                        background: isActive ? 'rgba(255,255,255,0.07)' : 'transparent',
                      }}
                      onMouseEnter={e => {
                        if (!isActive) (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.04)';
                        if (!isActive) (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.7)';
                      }}
                      onMouseLeave={e => {
                        if (!isActive) (e.currentTarget as HTMLElement).style.background = 'transparent';
                        if (!isActive) (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.38)';
                      }}
                    >
                      <Image
                        src={link.icon}
                        alt={link.label}
                        width={16}
                        height={16}
                        className="flex-shrink-0"
                        style={{ filter: isActive ? 'brightness(10)' : 'brightness(2) opacity(0.5)' }}
                      />
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* Utility nav group */}
            <p className="px-3 mb-2 text-[10px] font-semibold uppercase tracking-[0.1em]" style={{ color: 'rgba(255,255,255,0.2)' }}>
              Account
            </p>
            <ul className="flex flex-col gap-0.5">
              {navLinks.slice(6).map((link) => {
                const isActive = link.route === pathname;
                return (
                  <li key={link.route} className="relative">
                    {isActive && (
                      <span
                        className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-r-full"
                        style={{ background: '#6ee7f7' }}
                      />
                    )}
                    <Link
                      href={link.route}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-md text-[13.5px] font-medium transition-all duration-150"
                      style={{
                        color: isActive ? '#f9fafb' : 'rgba(255,255,255,0.38)',
                        background: isActive ? 'rgba(255,255,255,0.07)' : 'transparent',
                      }}
                      onMouseEnter={e => {
                        if (!isActive) (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.04)';
                        if (!isActive) (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.7)';
                      }}
                      onMouseLeave={e => {
                        if (!isActive) (e.currentTarget as HTMLElement).style.background = 'transparent';
                        if (!isActive) (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.38)';
                      }}
                    >
                      <Image
                        src={link.icon}
                        alt={link.label}
                        width={16}
                        height={16}
                        className="flex-shrink-0"
                        style={{ filter: isActive ? 'brightness(10)' : 'brightness(2) opacity(0.5)' }}
                      />
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </SignedIn>

          <SignedOut>
            <div className="px-1 pt-2">
              <Button
                asChild
                className="w-full rounded-md py-2.5 text-white font-medium text-[13px]"
                style={{ background: '#1f2937', border: '1px solid rgba(255,255,255,0.08)' }}
              >
                <Link href="/sign-in">Sign in</Link>
              </Button>
            </div>
          </SignedOut>
        </nav>

        {/* User footer */}
        <SignedIn>
          <div
            className="px-4 py-4 border-t"
            style={{ borderColor: 'rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.02)' }}
          >
            <UserButton afterSignOutUrl='/' showName />
          </div>
        </SignedIn>

      </div>
    </aside>
  )
}

export default Sidebar