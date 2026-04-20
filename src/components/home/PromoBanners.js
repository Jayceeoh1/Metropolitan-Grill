import Link from 'next/link'

export default function PromoBanners() {
  const promos = [
    { bg: 'from-[#1a0a08] to-[#3d1a10]', emoji: '🌯', badge: 'HOT DEAL', badgeClass: 'badge-red', title: '2+1 SHAORMA', desc: 'Cumpara 2 shaorme si primesti a 3-a gratis!' },
    { bg: 'from-[#0a1a0a] to-[#103d18]', emoji: '🎁', badge: 'WEEKEND', badgeClass: 'badge-gold', title: 'MENIU DUO -20%', desc: 'Sambata si duminica, Meniu Duo cu 20% reducere!' },
    { bg: 'from-[#0a0f1a] to-[#101c3d]', emoji: '🚚', badge: 'GRATUIT', badgeClass: 'badge-green', title: 'LIVRARE GRATUITA', desc: 'La comenzi peste 80 lei, livrarea este gratuita!' },
  ]

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <p className="text-xs font-bold tracking-[3px] uppercase text-[#e74c3c] mb-3">Oferte Speciale</p>
          <h2 className="font-bebas text-5xl sm:text-6xl text-white">PROMOTII <span className="text-[#f39c12]">ACTIVE</span></h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {promos.map((p, i) => (
            <div key={i} className={`relative bg-gradient-to-br ${p.bg} border border-white/8 rounded-[18px] p-8 overflow-hidden min-h-[220px] flex flex-col justify-end group hover:-translate-y-1 transition-all`}>

              {/* Continut normal */}
              <span className="absolute top-5 right-5 text-5xl opacity-50 group-hover:scale-110 transition-transform duration-300">{p.emoji}</span>
              <span className={`${p.badgeClass} mb-2 self-start`}>{p.badge}</span>
              <h3 className="font-bebas text-3xl text-white mb-1">{p.title}</h3>
              <p className="text-sm text-[#b8a99a] mb-4">{p.desc}</p>
              <Link href="/promotii" className="self-start bg-white/10 border border-white/20 text-white font-condensed font-bold text-sm uppercase tracking-wide px-5 py-2 rounded-lg hover:bg-white/20 transition-all">
                Profita Acum
              </Link>

              {/* Blur overlay "In curand" */}
              <div className="absolute inset-0 rounded-[18px] flex flex-col items-center justify-center"
                style={{ backdropFilter: 'blur(6px)', background: 'rgba(0,0,0,0.45)' }}>
                <span className="text-4xl mb-3">⏳</span>
                <span className="font-bebas text-4xl text-white tracking-widest">IN CURAND</span>
                <span className="text-xs text-white/50 mt-1 uppercase tracking-widest">Disponibil in curand</span>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  )
}