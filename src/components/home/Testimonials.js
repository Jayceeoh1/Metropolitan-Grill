export default function Testimonials() {
  const items = [
    { stars: 5, text: 'Cea mai bună shaorma din oraș, fără discuție. Carnea e fragedă, sosul de usturoi e divin. Comand de 2 ori pe săptămână!', name: 'Alexandru M.', city: 'București', initials: 'AM' },
    { stars: 5, text: 'Livrare în 25 de minute, mâncarea caldă și super ambalată. Meniu Duo la preț excelent. Recomand cu cea mai mare căldură!', name: 'Ioana R.', city: 'Sector 2', initials: 'IR' },
    { stars: 5, text: 'Family Bucket a salvat o seară de film în familie. Cantitate generoasă, gust excepțional. Metropolitan este primul număr pe speed dial!', name: 'Mihai P.', city: 'Pipera', initials: 'MP' },
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
            <div key={i} className="bg-[#1a1a1a] border border-white/8 rounded-[18px] p-6 hover:border-[#c0392b]/20 transition-all">
              <div className="text-[#f39c12] text-lg tracking-widest mb-3">{'★'.repeat(t.stars)}</div>
              <p className="text-sm text-[#b8a99a] leading-relaxed italic mb-5">"{t.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#96251e] to-[#c0392b] flex items-center justify-center text-xs font-bold text-white shrink-0">
                  {t.initials}
                </div>
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
