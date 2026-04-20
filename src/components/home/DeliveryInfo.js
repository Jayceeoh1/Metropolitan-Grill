export default function DeliveryInfo() {
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
            <div key={i} className="bg-white/[0.03] border border-white/8 rounded-[18px] p-7 text-center hover:border-[#c0392b]/20 transition-all">
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
