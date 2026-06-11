'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ShoppingBag, Menu, X } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'

const NAV_LINKS = [
  { href: '/', label: 'Acasa' },
  { href: '/meniu', label: 'Meniu' },
  { href: '/promotii', label: 'Promotii' },
  { href: '/despre', label: 'Despre' },
  { href: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const itemCount = useCartStore(s => s.items.reduce((sum, i) => sum + i.qty, 0))

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const openCart = () => window.dispatchEvent(new CustomEvent('openCart'))

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center transition-all duration-300"
        style={{
          background: scrolled ? 'rgba(8,8,8,0.96)' : 'rgba(8,8,8,0.8)',
          backdropFilter: 'blur(20px)',
          borderBottom: scrolled ? '1px solid rgba(241,196,15,0.15)' : '1px solid rgba(255,255,255,0.05)',
          boxShadow: scrolled ? '0 4px 30px rgba(0,0,0,0.5)' : 'none',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full flex items-center gap-6">
          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0">
            <img src="/logo.png" alt="Metropolitan" className="h-10 w-auto object-contain" />
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1 ml-4">
            {NAV_LINKS.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="relative px-4 py-2 rounded-lg text-sm font-condensed font-bold uppercase tracking-wide transition-all duration-200 group"
                style={{
                  color: pathname === link.href ? '#f1c40f' : '#b8a99a',
                  background: pathname === link.href ? 'rgba(241,196,15,0.08)' : 'transparent',
                }}
              >
                {link.label}
                {pathname === link.href && (
                  <span
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                    style={{ background: '#f1c40f', boxShadow: '0 0 8px #f1c40f' }}
                  />
                )}
                <span
                  className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ background: 'rgba(241,196,15,0.05)' }}
                />
              </Link>
            ))}
          </div>

          {/* Right */}
          <div className="ml-auto flex items-center gap-3">
            {/* Cart */}
            <button
              onClick={openCart}
              className="relative flex items-center gap-2 font-condensed font-bold text-sm uppercase tracking-wide px-4 py-2 rounded-xl transition-all hover:scale-105"
              style={{
                background: 'linear-gradient(135deg, #c0392b, #96251e)',
                color: '#fff',
                boxShadow: '0 0 15px rgba(192,57,43,0.3)',
              }}
            >
              <ShoppingBag size={16} />
              Cos
              {itemCount > 0 && (
                <span
                  className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold text-black"
                  style={{ background: '#f1c40f', boxShadow: '0 0 8px rgba(241,196,15,0.6)' }}
                >
                  {itemCount}
                </span>
              )}
            </button>

            {/* Mobile toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-lg text-[#b8a99a]"
              style={{ background: 'rgba(255,255,255,0.05)' }}
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className="fixed top-16 left-0 right-0 z-40 md:hidden animate-fade-up"
          style={{
            background: 'rgba(8,8,8,0.98)',
            backdropFilter: 'blur(20px)',
            borderBottom: '1px solid rgba(241,196,15,0.15)',
          }}
        >
          <div className="p-4 space-y-1">
            {NAV_LINKS.map(link => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="flex items-center px-4 py-3 rounded-xl font-condensed font-bold text-base uppercase tracking-wide transition-all"
                style={{
                  color: pathname === link.href ? '#f1c40f' : '#b8a99a',
                  background: pathname === link.href ? 'rgba(241,196,15,0.08)' : 'transparent',
                  borderLeft: pathname === link.href ? '2px solid #f1c40f' : '2px solid transparent',
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  )
}