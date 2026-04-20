import Footer from '@/components/layout/Footer'

export const metadata = { title: 'Promoții — Metropolitan Shaorma & Grill' }

const PROMOS = [
  { bg: 'from-[#1a0a08] to-[#3d1a10]', emoji: '🌯', badge: 'HOT DEAL · Zilnic', badgeClass: 'badge-red', title: '2+1 SHAORMA GRATUITĂ', desc: 'Cumpără orice 2 shaorme din meniu și a 3-a de valoare egală sau mai mică este gratuită! Ofertă valabilă pentru toate tipurile de shaorma.', valid: 'Valabilă zilnic, fără limită de timp' },
  { bg: 'from-[#0a1a0a] to-[#103d18]', emoji: '🎁', badge: 'WEEKEND · Sâm–Dum', badgeClass: 'badge-gold', title: 'MENIU DUO -20%', desc: 'În weekend, Meniu Duo Metropolitan beneficiază de 20% reducere automată aplicată în coș. Perfect pentru două persoane.', valid: 'Valabilă sâmbătă și duminică' },
  { bg: 'from-[#0a0f1a] to-[#101c3d]', emoji: '🚚', badge: 'PERMANENT', badgeClass: 'badge-green', title: 'LIVRARE GRATUITĂ +80 LEI', desc: 'La comenzi cu valoare de minim 80 lei, livrarea la domiciliu este complet gratuită, indiferent de zonă sau distanță.', valid: 'Permanentă, fără excepții' },
  { bg: 'from-[#1a0f08] to-[#3d2810]', emoji: '🎓', badge: 'STUDENȚI', badgeClass: 'badge-gold', title: 'REDUCERE STUDENȚI 15%', desc: 'Prezintă carnetul de student la ridicare sau menționează codul STUDENT15 la comandă. 15% reducere la toate produsele.', valid: 'Valabilă până 31 Ianuarie 2025' },
]

const CODES = [
  { code: 'METRO10', label: '10% reducere la prima comandă', color: 'text-[#f39c12]' },
  { code: 'WEEKEND20', label: '20% reducere în weekend', color: 'text-[#e74c3c]' },
  { code: 'STUDENT15', label: '15% reducere studenți', color: 'text-green-400' },
]

export default function PromotiiPage() {
  return (
    <div className="page-enter pt-16">
      <div className="bg-[#111] border-b border-white/5 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <p className="text-xs font-bold tracking-[3px] uppercase text-[#e74c3c] mb-2">Oferte Exclusive</p>
          <h1 className="font-bebas text-5xl sm:text-6xl text-white">PROMOȚII <span className="text-[#f39c12]">SPECIALE</span></h1>
          <p className="text-[#b8a99a] mt-2">Cele mai bune oferte pentru clienții noștri. Valabile până la epuizarea stocurilor.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        {/* Promo cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-16">
          {PROMOS.map((p, i) => (
            <div key={i} className={`relative bg-gradient-to-br ${p.bg} border border-white/8 rounded-[18px] p-8 overflow-hidden group hover:-translate-y-1 transition-all`}>
              <span className="absolute top-5 right-5 text-6xl opacity-40 group-hover:scale-110 transition-transform duration-300">{p.emoji}</span>
              <span className={`${p.badgeClass} mb-3 inline-block`}>{p.badge}</span>
              <h2 className="font-bebas text-4xl text-white mb-3">{p.title}</h2>
              <p className="text-[#b8a99a] text-sm leading-relaxed mb-4">{p.desc}</p>
              <p className="text-xs text-[#7a6e66]">📅 {p.valid}</p>
            </div>
          ))}
        </div>

        {/* Coupon codes */}
        <div className="bg-[#1a1a1a] border border-[#c0392b]/20 rounded-[24px] p-10 text-center">
          <span className="text-5xl block mb-5">🎟</span>
          <h2 className="font-bebas text-4xl text-white mb-3">CODURI PROMOȚIONALE</h2>
          <p className="text-[#b8a99a] mb-8 max-w-md mx-auto leading-relaxed">
            Folosește un cod de reducere la checkout pentru discount suplimentar. Un singur cod per comandă.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {CODES.map(c => (
              <div key={c.code} className="bg-[#111] border border-dashed border-[#c0392b]/30 rounded-xl px-8 py-5">
                <code className={`font-mono text-2xl font-bold ${c.color} block mb-1`}>{c.code}</code>
                <p className="text-xs text-[#7a6e66]">{c.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
