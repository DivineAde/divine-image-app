"use client"

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { navLinks } from "@/constants"
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "../ui/button"

const MobileNav = () => {
  const pathname = usePathname();

  return (
    <header className="header">
      <Link href="/" className="flex items-center">
         <Image
                      src="/divine image app-logo-transparent.png"
                      alt="logo"
                      width={60}
                      height={60}
                      className="brightness-[2] opacity-90"
                    />
      </Link>

      <nav className="flex gap-3 items-center">
        <SignedIn>
          <UserButton afterSignOutUrl="/" />

          <Sheet>
            <SheetTrigger asChild>
              <button
                className="flex items-center justify-center w-8 h-8 rounded-md transition-colors"
                style={{ background: '#f3f4f6', border: '2px solid #000' }}
                aria-label="Open menu"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M4 6h16M4 12h16M4 18h16" stroke="#374151" strokeWidth="1.75" strokeLinecap="round"/>
                </svg>
              </button>
            </SheetTrigger>

            <SheetContent
              className="sheet-content sm:w-64 p-0"
              style={{ background: '#09090f', border: 'none', borderLeft: '1px solid rgba(255,255,255,0.05)' }}
            >
              <div className="flex flex-col h-full">
                {/* Sheet logo */}
                <div className="px-5 py-5 border-b" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
                  <div className="flex items-center gap-2.5">
                    <Image
                      src="/divine image app-logo-transparent.png"
                      alt="logo"
                      width={60}
                      height={10}
                      className="brightness-[2] opacity-90"
                    />
                  </div>
                </div>

                {/* Nav links */}
                <div className="flex-1 px-3 py-4 overflow-y-auto">
                  <ul className="flex flex-col gap-0.5">
                    {navLinks.map((link) => {
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
                      )
                    })}
                  </ul>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </SignedIn>

        <SignedOut>
          <Button
            asChild
            className="rounded-md px-4 py-2 text-white font-medium text-sm"
            style={{ background: '#111827', border: '1px solid rgba(0,0,0,0.15)' }}
          >
            <Link href="/sign-in">Sign in</Link>
          </Button>
        </SignedOut>
      </nav>
    </header>
  )
}

export default MobileNav