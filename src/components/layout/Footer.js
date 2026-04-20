import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-[#111] border-t border-white/8 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div>
            <div className="font-bebas text-2xl text-[#f39c12] mb-1">METROPOLITAN</div>
            <div className="text-[10px] text-[#e74c3c] font-bold tracking-[2px] uppercase mb-4">Shaorma & Grill</div>
            <p className="text-sm text-[#7a6e66] leading-relaxed max-w-[240px]">
              Restaurant de fast-food premium cu tradiție în gătit la grătar. Livrăm savoare autentică direct la tine acasă.
            </p>
          </div>

          {/* Menu */}
          <div>
            <h4 className="font-condensed font-bold text-sm uppercase tracking-[1.5px] text-white mb-4">Meniu</h4>
            {['Shaorma', 'Burgeri', 'Meniuri Combo', 'Garnituri', 'Băuturi'].map(item => (
              <Link key={item} href="/meniu" className="block text-sm text-[#7a6e66] hover:text-white mb-2 transition-colors">{item}</Link>
            ))}
          </div>

          {/* Company */}
          <div>
            <h4 className="font-condensed font-bold text-sm uppercase tracking-[1.5px] text-white mb-4">Companie</h4>
            {[
              { label: 'Despre Noi', href: '/despre' },
              { label: 'Contact', href: '/contact' },
              { label: 'Promoții', href: '/promotii' },
              { label: 'Termeni & Condiții', href: '#' },
              { label: 'Politica Cookies', href: '#' },
            ].map(item => (
              <Link key={item.label} href={item.href} className="block text-sm text-[#7a6e66] hover:text-white mb-2 transition-colors">{item.label}</Link>
            ))}
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-condensed font-bold text-sm uppercase tracking-[1.5px] text-white mb-4">Contact</h4>
            <div className="space-y-2 text-sm text-[#7a6e66]">
              <p>📞 0758-793-231</p>
              <p>📍 Str. 13 Decembrie nr. 69, Găești</p>
              <p>🕐 Lu–Vi: 10:00–22:00</p>
              <p>🕐 Sâm–Dum: 10:00–23:00</p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#7a6e66]">© 2025 Metropolitan Shaorma & Grill. Toate drepturile rezervate.</p>
          <div className="flex gap-3">
            {['f', '◎', '▷'].map((icon, i) => (
              <button key={i} className="w-8 h-8 rounded-lg bg-white/5 border border-white/8 flex items-center justify-center text-xs text-[#7a6e66] hover:border-[#c0392b]/40 hover:text-[#e74c3c] transition-all">
                {icon}
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}