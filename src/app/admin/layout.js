'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV_GROUPS = [
  {
    label: 'Principal',
    items: [
      { href: '/admin', icon: '📊', label: 'Dashboard' },
      { href: '/admin/comenzi', icon: '📦', label: 'Comenzi' },
      { href: '/admin/meniu', icon: '🌯', label: 'Meniu' },
      { href: '/admin/clienti', icon: '👥', label: 'Clienți' },
    ],
  },
  {
    label: 'Configurare',
    items: [
      { href: '/admin/setari', icon: '⚙️', label: 'Setări' },
      { href: '/admin/livrare', icon: '🛵', label: 'Livrare' },
      { href: '/admin/promotii', icon: '🏷', label: 'Promoții' },
    ],
  },
]

export default function AdminLayout({ children }) {
  const pathname = usePathname()
  return (
    <div className="pt-16 flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-56 shrink-0 bg-[#111] border-r border-white/8 fixed top-16 bottom-0 overflow-y-auto">
        <div className="px-5 py-5 border-b border-white/8">
          <div className="font-bebas text-lg text-[#f39c12]">METROPOLITAN</div>
          <div className="text-[9px] text-[#7a6e66] tracking-[1.5px] uppercase">Panou Administrare</div>
        </div>
        {NAV_GROUPS.map(group => (
          <div key={group.label} className="py-3">
            <p className="text-[10px] font-bold uppercase tracking-[2px] text-[#7a6e66] px-5 mb-1">{group.label}</p>
            {group.items.map(item => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-5 py-2.5 text-sm transition-all ${
                  pathname === item.href
                    ? 'border-l-2 border-[#c0392b] bg-[#c0392b]/10 text-[#e74c3c]'
                    : 'text-[#b8a99a] hover:bg-white/5 hover:text-white'
                }`}
              >
                <span className="w-5 text-center">{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </div>
        ))}
      </aside>

      {/* Content */}
      <main className="ml-56 flex-1 p-8 bg-[#0a0a0a]">
        {children}
      </main>
    </div>
  )
}
