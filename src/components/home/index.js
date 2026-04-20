'use client'
import Link from 'next/link'
import ProductCard from '@/components/menu/ProductCard'
import { PRODUCTS } from '@/lib/data'

// Featured Products
export function FeaturedProducts() {
  const featured = PRODUCTS.filter(p => p.badges.includes('bestseller') || p.badges.includes('recomandat')).slice(0, 6)
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <p className="text-xs font-bold tracking-[3px] uppercase text-[#e74c3c] mb-3">Bestseller-uri</p>
          <h2 className="font-bebas text-5xl sm:text-6xl text-white">CELE MAI <span className="text-[#f39c12]">POPULARE</span></h2>
          <p className="text-[#b8a99a] mt-3 max-w-md mx-auto">Preparatele preferate de clienții noștri fideli</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {featured.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
        <div className="text-center mt-10">
          <Link href="/meniu" className="inline-flex items-center gap-2 border border-white/15 hover:border-[#f39c12] text-[#b8a99a] hover:text-[#f39c12] font-condensed font-bold uppercase tracking-wide px-8 py-3 rounded-xl transition-all">
            Vezi Meniu Complet →
          </Link>
        </div>
      </div>
    </section>
  )
}

// How It Works
export function HowItWorks() {
  const steps = [
    { icon: '📱', title: 'Alege din Meniu', desc: 'Explorează categoriile și personalizează comanda după preferințe.' },
    { icon: '🛒', title: 'Adaugă în Coș', desc: 'Selectează sosuri, extra ingrediente și nivel picant.' },
    { icon: '💳', title: 'Plasează Comanda', desc: 'Completează datele de livrare și alege metoda de plată.' },
    { icon: '🛵', title: 'Primești Acasă', desc: 'Curierul ajunge în maxim 30 de minute la ușa ta.' },
  ]
  return (
    <section className="py-20 bg-[#111] border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <p className="text-xs font-bold tracking-[3px] uppercase text-[#e74c3c] mb-3">Simplu & Rapid</p>
          <h2 className="font-bebas text-5xl sm:text-6xl text-white">CUM <span className="text-[#f39c12]">FUNCȚIONEAZĂ</span></h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connector line */}
          <div className="hidden lg:block absolute top-9 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-[#c0392b]/30 to-transparent" />
          {steps.map((step, i) => (
            <div key={i} className="text-center relative">
              <div className="w-16 h-16 rounded-full bg-[#c0392b]/10 border border-[#c0392b]/30 flex items-center justify-center text-2xl mx-auto mb-5 relative z-10">
                {step.icon}
              </div>
              <h3 className="font-condensed font-bold text-base uppercase tracking-wide text-white mb-2">{step.title}</h3>
              <p className="text-sm text-[#7a6e66] leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Promo Banners
export function PromoBanners() {
  const promos = [
    { bg: 'from-[#1a0a08] to-[#3d1a10]', emoji: '🌯', badge: 'HOT DEAL', badgeClass: 'badge-red', title: '2+1 SHAORMA', desc: 'Cumpără 2 shaorme și primești a 3-a gratis!', href: '/promotii' },
    { bg: 'from-[#0a1a0a] to-[#103d18]', emoji: '🎁', badge: 'WEEKEND', badgeClass: 'badge-gold', title: 'MENIU DUO -20%', desc: 'Sâmbătă și duminică, Meniu Duo cu 20% reducere!', href: '/promotii' },
    { bg: 'from-[#0a0f1a] to-[#101c3d]', emoji: '🚚', badge: 'GRATUIT', badgeClass: 'badge-green', title: 'LIVRARE GRATUITĂ', desc: 'La comenzi peste 80 lei, livrarea este gratuită!', href: '/promotii' },
  ]
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <p className="text-xs font-bold tracking-[3px] uppercase text-[#e74c3c] mb-3">Oferte Speciale</p>
          <h2 className="font-bebas text-5xl sm:text-6xl text-white">PROMOȚII <span className="text-[#f39c12]">ACTIVE</span></h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {promos.map((p, i) => (
            <div key={i} className={`relative bg-gradient-to-br ${p.bg} border border-white/8 rounded-[18px] p-8 overflow-hidden min-h-[220px] flex flex-col justify-end group hover:-translate-y-1 transition-all cursor-pointer`}>
              <span className="absolute top-5 right-5 text-5xl opacity-50 group-hover:scale-110 transition-transform">{p.emoji}</span>
              <span className={p.badgeClass + ' mb-2 self-start'}>{p.badge}</span>
              <h3 className="font-bebas text-3xl text-white mb-1">{p.title}</h3>
              <p className="text-sm text-[#b8a99a] mb-4">{p.desc}</p>
              <Link href={p.href} className="self-start bg-white/10 border border-white/20 text-white font-condensed font-bold text-sm uppercase tracking-wide px-5 py-2 rounded-lg hover:bg-white/20 transition-all">
                Profită Acum
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Delivery Info
export function DeliveryInfo() {
  const items = [
    { icon: '⚡', title: 'Livrare Ultra Rapidă', desc: 'Garantăm livrarea în 30 de minute sau îți returnăm banii. Fiecare minut contează.' },
    { icon: '🌿', title: 'Ingrediente Proaspete', desc: 'Carne proaspătă zilnic, legume locale, sosuri preparate în restaurant. Nicio compromisie.' },
    { icon: '🏆', title: 'Cel Mai Bun Rating', desc: '4.9 stele din 2,400+ recenzii. Clienții noștri se întorc în medie de 3 ori pe lună.' },
  ]
  return (
    <section className="py-20 bg-[#111] border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <p className="text-xs font-bold tracking-[3px] uppercase text-[#e74c3c] mb-3">Servicii</p>
          <h2 className="font-bebas text-5xl sm:text-6xl text-white">DE CE <span className="text-[#f39c12]">NE ALEGI</span></h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {items.map((item, i) => (
            <div key={i} className="bg-white/[0.03] border border-white/8 rounded-[18px] p-7 text-center">
              <span className="text-5xl block mb-5">{item.icon}</span>
              <h3 className="font-condensed font-bold text-lg uppercase tracking-wide text-white mb-3">{item.title}</h3>
              <p className="text-sm text-[#7a6e66] leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Testimonials
export function Testimonials() {
  const items = [
    { stars: 5, text: 'Cea mai bună shaorma din oraș, fără discuție. Carnea e fragedă, sosul de usturoi e divin. Comand de 2 ori pe săptămână!', name: 'Alexandru M.', city: 'București', initials: 'AM' },
    { stars: 5, text: 'Livrare în 25 de minute, mâncarea caldă și super ambalată. Meniu Duo la preț excelent. Recomand cu cea mai mare căldură!', name: 'Ioana R.', city: 'Sector 2', initials: 'IR' },
    { stars: 5, text: 'Family Bucket a salvat o seară de film în familie. Cantitate generoasă, gust excepțional. Metropolitan e primul număr pe speed dial!', name: 'Mihai P.', city: 'Pipera', initials: 'MP' },
  ]
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <p className="text-xs font-bold tracking-[3px] uppercase text-[#e74c3c] mb-3">Recenzii</p>
          <h2 className="font-bebas text-5xl sm:text-6xl text-white">CE SPUN <span className="text-[#f39c12]">CLIENȚII</span></h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {items.map((t, i) => (
            <div key={i} className="bg-[#1a1a1a] border border-white/8 rounded-[18px] p-6">
              <div className="text-[#f39c12] text-lg tracking-widest mb-3">{'★'.repeat(t.stars)}</div>
              <p className="text-sm text-[#b8a99a] leading-relaxed italic mb-5">"{t.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#96251e] to-[#c0392b] flex items-center justify-center text-xs font-bold text-white">{t.initials}</div>
                <div>
                  <div className="text-sm font-semibold text-white">{t.name}</div>
                  <div className="text-xs text-[#7a6e66]">{t.city}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
