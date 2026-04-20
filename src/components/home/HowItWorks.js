export default function HowItWorks() {
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
          <h2 className="font-bebas text-5xl sm:text-6xl text-white">
            CUM <span className="text-[#f39c12]">FUNCȚIONEAZĂ</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 relative">
          <div className="hidden lg:block absolute top-8 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-[#c0392b]/30 to-transparent" />
          {steps.map((step, i) => (
            <div key={i} className="text-center relative z-10">
              <div className="w-16 h-16 rounded-full bg-[#c0392b]/10 border border-[#c0392b]/30 flex items-center justify-center text-2xl mx-auto mb-5">
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
