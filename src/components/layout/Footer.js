'use client'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="pt-14 pb-8 mt-10"
      style={{ background: 'linear-gradient(180deg, #080808 0%, #0d0400 100%)', borderTop: '1px solid rgba(241,196,15,0.15)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div>
            <img src="/logo.png" alt="Metropolitan" className="h-14 w-auto object-contain mb-3" />
            <p className="text-sm leading-relaxed max-w-[240px]" style={{ color: '#7a6e66' }}>
              Restaurant de fast-food premium cu traditie in gatit la gratar. Livram savoare autentica direct la tine acasa.
            </p>
          </div>
          <div>
            <h4 className="font-condensed font-bold text-sm uppercase tracking-[2px] mb-4" style={{ color: '#f1c40f' }}>Meniu</h4>
            {['Shaorma Pui', 'Shaorma Vita', 'Shaorma Mixta', 'Specialitati', 'Bauturi'].map(item => (
              <Link key={item} href="/meniu" className="block text-sm mb-2 transition-colors hover:text-[#f1c40f]" style={{ color: '#7a6e66' }}>{item}</Link>
            ))}
          </div>
          <div>
            <h4 className="font-condensed font-bold text-sm uppercase tracking-[2px] mb-4" style={{ color: '#e74c3c' }}>Companie</h4>
            {[{ label: 'Despre Noi', href: '/despre' }, { label: 'Contact', href: '/contact' }, { label: 'Promotii', href: '/promotii' }, { label: 'Termeni & Conditii', href: '#' }].map(item => (
              <Link key={item.label} href={item.href} className="block text-sm mb-2 transition-colors hover:text-[#e74c3c]" style={{ color: '#7a6e66' }}>{item.label}</Link>
            ))}
          </div>
          <div>
            <h4 className="font-condensed font-bold text-sm uppercase tracking-[2px] mb-4" style={{ color: '#2ecc71' }}>Contact</h4>
            <div className="space-y-2 text-sm" style={{ color: '#7a6e66' }}>
              <a href="tel:0758793231" className="flex items-center gap-2 hover:text-[#2ecc71] transition-colors">📞 0758-793-231</a>
              <p>📍 Str. 13 Decembrie nr. 69, Gaesti</p>
              <p>🕐 Lu–Vi: 10:00–22:00</p>
              <p>🕐 Sam–Dum: 10:00–23:00</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <p className="text-xs" style={{ color: '#7a6e66' }}>© 2025 Metropolitan Shaorma & Grill. Toate drepturile rezervate.</p>
          <p className="text-xs" style={{ color: '#7a6e66' }}>🌯 Gust Autentic · Carne Frageda · Livrare Rapida</p>
        </div>
      </div>
    </footer>
  )
}