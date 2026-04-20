'use client'
import Link from 'next/link'

export default function Hero() {
  return (
    <section className="relative min-h-[88vh] flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 hero-gradient" />
      <div className="absolute inset-0 hero-grid opacity-[0.03]" />
      {/* Glow orbs */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-[#c0392b]/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/3 w-64 h-64 rounded-full bg-[#f39c12]/5 blur-[100px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center py-20">
        {/* Left */}
        <div>
          <div className="inline-flex items-center gap-2 bg-[#c0392b]/15 border border-[#c0392b]/30 rounded-full px-4 py-2 text-xs font-bold tracking-[2px] uppercase text-[#e74c3c] mb-6">
            🔥 Grill Autentic · Livrare Rapidă
          </div>

          <h1 className="font-bebas text-[80px] sm:text-[100px] lg:text-[110px] leading-[0.9] text-white mb-3">
            SHAORMA
            <span className="block text-[#f39c12]">PREMIUM</span>
          </h1>

          <p className="font-condensed text-2xl sm:text-3xl text-[#e74c3c] font-bold tracking-[3px] uppercase mb-6">
            Savoare Urbană Autentică
          </p>

          <p className="text-base text-[#b8a99a] leading-relaxed max-w-md mb-10">
            Carne proaspătă la grătar, ingrediente selecționate și sosuri artizanale.
            Metropolitan Grill — gustul care te aduce mereu înapoi.
          </p>

          <div className="flex flex-wrap gap-4 mb-12">
            <Link
              href="/meniu"
              className="flex items-center gap-2 bg-gradient-to-r from-[#c0392b] to-[#96251e] hover:from-[#e74c3c] hover:to-[#c0392b] text-white font-condensed font-bold text-lg uppercase tracking-wide px-8 py-4 rounded-xl transition-all hover:-translate-y-1 hover:shadow-2xl hover:shadow-red-900/40"
            >
              🍖 Comandă Acum
            </Link>
            <Link
              href="/meniu"
              className="flex items-center gap-2 bg-transparent border border-white/20 hover:border-[#f39c12] text-white hover:text-[#f39c12] font-condensed font-bold text-lg uppercase tracking-wide px-8 py-4 rounded-xl transition-all"
            >
              Vezi Meniu →
            </Link>
          </div>

          {/* Stats */}
          <div className="flex gap-8">
            {[
              { num: '4.9★', label: 'Rating Clienți' },
              { num: "30'", label: 'Timp Livrare' },
              { num: '2k+', label: 'Comenzi Zilnice' },
            ].map(stat => (
              <div key={stat.label}>
                <div className="font-bebas text-4xl text-[#f39c12] leading-none">{stat.num}</div>
                <div className="text-xs text-[#7a6e66] uppercase tracking-wide mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — animated shawarma */}
        <div className="hidden lg:flex items-center justify-center">
          <div className="relative w-[460px] h-[460px]">

            {/* Outer rotating ring */}
            <div className="absolute inset-0 rounded-full border border-[#c0392b]/15 animate-spin" style={{ animationDuration: '18s' }} />
            <div className="absolute inset-6 rounded-full border border-dashed border-[#f39c12]/10 animate-spin" style={{ animationDuration: '12s', animationDirection: 'reverse' }} />

            {/* Glow layers */}
            <div className="absolute inset-0 rounded-full bg-[#c0392b]/20 blur-[70px] animate-pulse" style={{ animationDuration: '3s' }} />
            <div className="absolute inset-12 rounded-full bg-[#f39c12]/10 blur-[50px] animate-pulse" style={{ animationDuration: '4s', animationDelay: '1s' }} />

            {/* Floating badge — BESTSELLER */}
            <div
              className="absolute top-8 right-6 z-20 bg-[#f39c12] text-black font-bebas text-sm px-3 py-1.5 rounded-full shadow-lg shadow-yellow-900/40"
              style={{ animation: 'floatBadge 3s ease-in-out infinite' }}
            >
              ⭐ BESTSELLER
            </div>

            {/* Floating badge — FRESH */}
            <div
              className="absolute bottom-16 left-4 z-20 bg-[#c0392b] text-white font-bebas text-sm px-3 py-1.5 rounded-full shadow-lg shadow-red-900/40"
              style={{ animation: 'floatBadge 3.5s ease-in-out infinite', animationDelay: '1s' }}
            >
              🔥 PROASPĂT
            </div>

            {/* Floating badge — SPICY */}
            <div
              className="absolute top-1/2 -right-2 z-20 bg-[#1a1a1a] border border-[#c0392b]/40 text-[#e74c3c] font-bebas text-sm px-3 py-1.5 rounded-full"
              style={{ animation: 'floatBadge 4s ease-in-out infinite', animationDelay: '0.5s' }}
            >
              🌶 PICANT
            </div>

            {/* Main shawarma image — floating + subtle rotate */}
            <div
              className="absolute inset-0 flex items-center justify-center z-10"
              style={{ animation: 'shaormaFloat 4s ease-in-out infinite' }}
            >
              <img
                src="/shaorma-hero.png"
                alt="Shaorma Metropolitan"
                className="w-[340px] h-[340px] object-contain"
                style={{
                  filter: 'drop-shadow(0 30px 60px rgba(192,57,43,0.6)) drop-shadow(0 0 40px rgba(243,156,18,0.2))',
                  animation: 'shaormaRotate 8s ease-in-out infinite',
                }}
              />
            </div>

            {/* CSS keyframes injected via style tag */}
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
    </section>
  )
}
