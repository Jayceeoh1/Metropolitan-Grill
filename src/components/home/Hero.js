'use client'
import Link from 'next/link'

export default function Hero() {
  return (
    <section className="relative min-h-[88vh] flex items-center overflow-hidden">
      <div className="absolute inset-0" style={{background: 'radial-gradient(ellipse 80% 60% at 60% 40%, rgba(192,57,43,0.18) 0%, transparent 60%), radial-gradient(ellipse 40% 50% at 80% 20%, rgba(243,156,18,0.1) 0%, transparent 50%), linear-gradient(135deg, #0a0a0a 0%, #1a0a08 50%, #0a0a0a 100%)'}} />
      <div className="absolute inset-0 opacity-[0.03]" style={{backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)', backgroundSize: '60px 60px'}} />
      <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full pointer-events-none" style={{background: 'rgba(192,57,43,0.1)', filter: 'blur(120px)'}} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 w-full py-16">
        {/* Desktop: grid 2 col / Mobile: stack */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">

          {/* Text content */}
          <div>
            <div className="inline-flex items-center gap-2 bg-[#c0392b]/15 border border-[#c0392b]/30 rounded-full px-4 py-2 text-xs font-bold tracking-[2px] uppercase text-[#e74c3c] mb-6">
              🔥 Grill Autentic · Livrare Rapida
            </div>

            <h1 className="font-bebas text-[72px] sm:text-[90px] lg:text-[110px] leading-[0.9] text-white mb-3">
              SHAORMA
              <span className="block text-[#f39c12]">PREMIUM</span>
            </h1>

            <p className="font-condensed text-xl sm:text-2xl text-[#e74c3c] font-bold tracking-[3px] uppercase mb-5">
              Savoare Urbana Autentica
            </p>

            <p className="text-sm sm:text-base text-[#b8a99a] leading-relaxed max-w-md mb-8">
              Carne proaspata la gratar, ingrediente selectionate si sosuri artizanale.
              Metropolitan Grill — gustul care te aduce mereu inapoi.
            </p>

            <div className="flex flex-wrap gap-3 mb-8">
              <Link href="/meniu"
                className="flex items-center gap-2 bg-gradient-to-r from-[#c0392b] to-[#96251e] hover:from-[#e74c3c] hover:to-[#c0392b] text-white font-condensed font-bold text-base sm:text-lg uppercase tracking-wide px-6 sm:px-8 py-3.5 rounded-xl transition-all hover:-translate-y-1 hover:shadow-2xl hover:shadow-red-900/40">
                🍖 Comanda Acum
              </Link>
              <Link href="/meniu"
                className="flex items-center gap-2 bg-transparent border border-white/20 hover:border-[#f39c12] text-white hover:text-[#f39c12] font-condensed font-bold text-base sm:text-lg uppercase tracking-wide px-6 sm:px-8 py-3.5 rounded-xl transition-all">
                Vezi Meniu →
              </Link>
            </div>

            {/* Stats */}
            <div className="flex gap-6 sm:gap-8">
              {[
                { num: '4.9★', label: 'Rating Clienti' },
                { num: "30'", label: 'Timp Livrare' },
                { num: '2k+', label: 'Comenzi Zilnice' },
              ].map(stat => (
                <div key={stat.label}>
                  <div className="font-bebas text-3xl sm:text-4xl text-[#f39c12] leading-none">{stat.num}</div>
                  <div className="text-[10px] text-[#7a6e66] uppercase tracking-wide mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Shaorma image — shown on both mobile and desktop */}
          <div className="flex items-center justify-center">
            <div className="relative w-[280px] h-[280px] sm:w-[360px] sm:h-[360px] lg:w-[460px] lg:h-[460px]">
              {/* Glow rings */}
              <div className="absolute inset-0 rounded-full animate-spin" style={{border: '1px solid rgba(192,57,43,0.15)', animationDuration: '18s'}} />
              <div className="absolute inset-6 rounded-full animate-spin" style={{border: '1px dashed rgba(243,156,18,0.1)', animationDuration: '12s', animationDirection: 'reverse'}} />

              {/* Glow */}
              <div className="absolute inset-0 rounded-full animate-pulse" style={{background: 'rgba(192,57,43,0.2)', filter: 'blur(70px)', animationDuration: '3s'}} />
              <div className="absolute inset-12 rounded-full animate-pulse" style={{background: 'rgba(243,156,18,0.1)', filter: 'blur(50px)', animationDuration: '4s', animationDelay: '1s'}} />

              {/* Badges */}
              <div className="absolute top-4 right-2 sm:top-8 sm:right-4 z-20 bg-[#f39c12] text-black font-bebas text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-1.5 rounded-full shadow-lg"
                style={{animation: 'floatBadge 3s ease-in-out infinite'}}>
                ⭐ BESTSELLER
              </div>
              <div className="absolute bottom-10 left-0 sm:bottom-16 sm:left-2 z-20 bg-[#c0392b] text-white font-bebas text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-1.5 rounded-full shadow-lg"
                style={{animation: 'floatBadge 3.5s ease-in-out infinite', animationDelay: '1s'}}>
                🔥 PROASPAT
              </div>
              <div className="absolute top-1/2 -right-2 sm:-right-4 z-20 bg-[#1a1a1a] border border-[#c0392b]/40 text-[#e74c3c] font-bebas text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-1.5 rounded-full"
                style={{animation: 'floatBadge 4s ease-in-out infinite', animationDelay: '0.5s'}}>
                🌶 PICANT
              </div>

              {/* Shaorma image */}
              <div className="absolute inset-0 flex items-center justify-center z-10"
                style={{animation: 'shaormaFloat 4s ease-in-out infinite'}}>
                <img
                  src="/shaorma-hero.png"
                  alt="Shaorma Metropolitan"
                  className="w-[220px] h-[220px] sm:w-[300px] sm:h-[300px] lg:w-[360px] lg:h-[360px] object-contain"
                  style={{
                    filter: 'drop-shadow(0 20px 60px rgba(192,57,43,0.6)) drop-shadow(0 0 40px rgba(243,156,18,0.2))',
                    animation: 'shaormaRotate 8s ease-in-out infinite',
                  }}
                />
              </div>

              <style>{`
                @keyframes shaormaFloat {
                  0%, 100% { transform: translateY(0px); }
                  50% { transform: translateY(-18px); }
                }
                @keyframes shaormaRotate {
                  0%, 100% { transform: rotate(-4deg) scale(1); }
                  25% { transform: rotate(0deg) scale(1.03); }
                  50% { transform: rotate(4deg) scale(1); }
                  75% { transform: rotate(0deg) scale(0.97); }
                }
                @keyframes floatBadge {
                  0%, 100% { transform: translateY(0px); }
                  50% { transform: translateY(-8px); }
                }
              `}</style>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}