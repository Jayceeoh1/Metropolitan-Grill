'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ShoppingBag, User, Menu, X } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'

const NAV_LINKS = [
  { href: '/', label: 'Acasă' },
  { href: '/meniu', label: 'Meniu' },
  { href: '/promotii', label: 'Promoții' },
  { href: '/despre', label: 'Despre' },
  { href: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const itemCount = useCartStore(s => s.items.reduce((sum, i) => sum + i.qty, 0))

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Expose cart open to CartDrawer via custom event
  const openCart = () => window.dispatchEvent(new CustomEvent('openCart'))

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 h-16 flex items-center transition-all duration-300 ${scrolled ? 'bg-[#0a0a0a]/95 backdrop-blur-xl border-b border-white/8' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full flex items-center gap-6">
          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0">
            <img
              src="/logo.png"
              alt="Metropolitan Shaorma & Grill"
              className="h-16 w-auto object-contain"
            />
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1 ml-4">
            {NAV_LINKS.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  pathname === link.href
                    ? 'text-[#f39c12] bg-white/5'
                    : 'text-[#b8a99a] hover:text-white hover:bg-white/5'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="ml-auto flex items-center gap-3">
            <Link
              href="/cont"
              className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg border border-white/10 text-[#b8a99a] hover:text-white hover:border-[#c0392b]/40 transition-all text-sm"
            >
              <User size={15} />
              Contul Meu
            </Link>

            {/* Cart button */}
            <button
              onClick={openCart}
              className="flex items-center gap-2 bg-[#c0392b] hover:bg-[#e74c3c] text-white px-4 py-2 rounded-xl font-condensed font-bold text-sm tracking-wide transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-red-900/40"
            >
              <ShoppingBag size={16} />
              Coș
              {itemCount > 0 && (
                <span className="bg-[#f39c12] text-black text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-lg bg-white/5 text-[#b8a99a]"
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="fixed top-16 left-0 right-0 z-40 bg-[#111]/95 backdrop-blur-xl border-b border-white/8 md:hidden">
          <div className="p-4 flex flex-col gap-1">
            {NAV_LINKS.map(link => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  pathname === link.href ? 'text-[#f39c12] bg-white/5' : 'text-[#b8a99a]'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link href="/cont" onClick={() => setMobileOpen(false)} className="px-4 py-3 rounded-xl text-sm text-[#b8a99a]">
              Contul Meu
            </Link>
          </div>
        </div>
      )}
    </>
  )
}
