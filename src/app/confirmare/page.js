import Link from 'next/link'

export const metadata = { title: 'Comandă Plasată — Metropolitan Shaorma & Grill' }

const STEPS = [
  { icon: '✓', label: 'Confirmată', status: 'done' },
  { icon: '👨‍🍳', label: 'Pregătire', status: 'active' },
  { icon: '🛵', label: 'Ridicare curier', status: 'pending' },
  { icon: '🏠', label: 'Livrare', status: 'pending' },
]

export default function ConfirmarePage() {
  const orderNum = '#MG-2025-' + Math.floor(Math.random() * 90000 + 10000)

  return (
    <div className="page-enter pt-16 min-h-screen flex items-center">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-20 text-center w-full">
        <span className="text-7xl block mb-6">🎉</span>
        <h1 className="font-bebas text-6xl sm:text-7xl text-white mb-3">
          COMANDĂ <span className="text-[#f39c12]">PLASATĂ!</span>
        </h1>
        <p className="text-[#b8a99a] text-lg leading-relaxed mb-8 max-w-md mx-auto">
          Mulțumim! Am primit comanda ta și o pregătim cu drag. Vei primi un SMS de confirmare în câteva minute.
        </p>

        <div className="bg-[#1a1a1a] border border-white/8 rounded-[18px] py-4 px-6 mb-8 inline-block">
          <span className="text-sm text-[#7a6e66]">Număr comandă: </span>
          <span className="font-condensed font-bold text-xl text-[#f39c12]">{orderNum}</span>
        </div>

        {/* Status tracker */}
        <div className="flex justify-center mb-3">
          <div className="flex gap-0 max-w-sm w-full">
            {STEPS.map((step, i) => (
              <div key={i} className="flex flex-col items-center flex-1">
                <div className={`w-11 h-11 rounded-full flex items-center justify-center text-lg mb-2 transition-all
                  ${step.status === 'done' ? 'bg-gradient-to-br from-[#96251e] to-[#c0392b] text-white' : ''}
                  ${step.status === 'active' ? 'bg-[#c0392b]/20 border-2 border-[#c0392b] text-[#e74c3c] pulse-track' : ''}
                  ${step.status === 'pending' ? 'bg-white/5 border border-white/10 text-[#7a6e66]' : ''}
                `}>
                  {step.icon}
                </div>
                <span className="text-xs text-[#7a6e66] text-center leading-tight">{step.label}</span>
                {i < STEPS.length - 1 && (
                  <div className="absolute" style={{ display: 'none' }} />
                )}
              </div>
            ))}
          </div>
        </div>

        <p className="text-sm text-[#7a6e66] mb-10">
          Timp estimat livrare: <strong className="text-[#f39c12]">25–30 minute</strong>
        </p>

        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            href="/"
            className="px-8 py-3 bg-gradient-to-r from-[#c0392b] to-[#96251e] hover:from-[#e74c3c] hover:to-[#c0392b] text-white font-condensed font-bold uppercase tracking-wide rounded-xl transition-all hover:-translate-y-0.5"
          >
            ← Înapoi Acasă
          </Link>
          <Link
            href="/cont/comenzi"
            className="px-8 py-3 border border-white/15 hover:border-[#f39c12] text-[#b8a99a] hover:text-[#f39c12] font-condensed font-bold uppercase tracking-wide rounded-xl transition-all"
          >
            Comenzile Mele
          </Link>
        </div>
      </div>
    </div>
  )
}
