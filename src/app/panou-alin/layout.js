'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

const NAV_GROUPS = [
  {
    label: 'Principal',
    items: [
      { href: '/panou-alin', icon: '📊', label: 'Dashboard' },
      { href: '/panou-alin/comenzi', icon: '📦', label: 'Comenzi' },
      { href: '/panou-alin/meniu', icon: '🌯', label: 'Meniu' },
      { href: '/panou-alin/clienti', icon: '👥', label: 'Clienti' },
    ],
  },
  {
    label: 'Configurare',
    items: [
      { href: '/panou-alin/setari', icon: '⚙️', label: 'Setari' },
      { href: '/panou-alin/livrare', icon: '🛵', label: 'Livrare' },
      { href: '/panou-alin/promotii', icon: '🏷', label: 'Promotii' },
    ],
  },
]

export default function AdminLayout({ children }) {
  const pathname = usePathname()
  const router = useRouter()
  const [authorized, setAuthorized] = useState(false)
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    const auth = sessionStorage.getItem('admin_auth')
    if (!auth && pathname !== '/panou-alin/login') {
      router.push('/panou-alin/login')
    } else {
      setAuthorized(true)
    }
    setChecking(false)
  }, [pathname])

  const logout = () => {
    sessionStorage.removeItem('admin_auth')
    router.push('/panou-alin/login')
  }

  if (pathname === '/panou-alin/login') {
    return <>{children}</>
  }

  if (checking || !authorized) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-[#7a6e66]">Se verifica accesul...</div>
      </div>
    )
  }

  return (
    <div className="pt-16 flex min-h-screen">
      <aside className="w-56 shrink-0 bg-[#111] border-r border-white/8 fixed top-16 bottom-0 overflow-y-auto flex flex-col">
        <div className="px-5 py-5 border-b border-white/8">
          <div className="font-bebas text-lg text-[#f39c12]">METROPOLITAN</div>
          <div className="text-[9px] text-[#7a6e66] tracking-[1.5px] uppercase">Panou Administrare</div>
        </div>

        <div className="flex-1">
          {NAV_GROUPS.map(group => (
            <div key={group.label} className="py-3">
              <p className="text-[10px] font-bold uppercase tracking-[2px] text-[#7a6e66] px-5 mb-1">{group.label}</p>
              {group.items.map(item => (
                <Link key={item.href} href={item.href}
                  className={`flex items-center gap-3 px-5 py-2.5 text-sm transition-all ${
                    pathname === item.href
                      ? 'border-l-2 border-[#c0392b] bg-[#c0392b]/10 text-[#e74c3c]'
                      : 'text-[#b8a99a] hover:bg-white/5 hover:text-white'
                  }`}>
                  <span className="w-5 text-center">{item.icon}</span>
                  {item.label}
                </Link>
              ))}
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-white/8">
          <button onClick={logout}
            className="w-full flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm text-[#7a6e66] hover:text-[#e74c3c] hover:bg-[#c0392b]/10 transition-all">
            <span>🚪</span> Deconectare
          </button>
        </div>
      </aside>

      <main className="ml-56 flex-1 p-8 bg-[#0a0a0a]">
        {children}
      </main>
    </div>
  )
}