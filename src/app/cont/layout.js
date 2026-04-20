'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV = [
  { href: '/cont/comenzi', icon: '📦', label: 'Comenzile Mele' },
  { href: '/cont/favorite', icon: '❤️', label: 'Favorite' },
  { href: '/cont/adrese', icon: '📍', label: 'Adresele Mele' },
  { href: '/cont/setari', icon: '⚙️', label: 'Setări Cont' },
]

export default function ContLayout({ children }) {
  const pathname = usePathname()
  return (
    <div className="page-enter pt-16">
      <div className="bg-[#111] border-b border-white/5 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h1 className="font-bebas text-4xl sm:text-5xl text-white">CONTUL <span className="text-[#f39c12]">MEU</span></h1>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-8 items-start">
          {/* Sidebar */}
          <aside className="bg-[#1a1a1a] border border-white/8 rounded-[18px] overflow-hidden sticky top-20">
            <div className="p-6 border-b border-white/8 text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#96251e] to-[#c0392b] flex items-center justify-center font-bebas text-2xl text-white mx-auto mb-3">IP</div>
              <p className="font-semibold text-white">Ion Popescu</p>
              <p className="text-xs text-[#7a6e66] mt-0.5">ion.popescu@email.ro</p>
            </div>
            <nav className="py-2">
              {NAV.map(item => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-5 py-3 text-sm transition-all ${
                    pathname === item.href
                      ? 'border-l-2 border-[#c0392b] bg-[#c0392b]/10 text-[#e74c3c]'
                      : 'text-[#b8a99a] hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <span>{item.icon}</span> {item.label}
                </Link>
              ))}
            </nav>
          </aside>

          {/* Content */}
          <div>{children}</div>
        </div>
      </div>
    </div>
  )
}
