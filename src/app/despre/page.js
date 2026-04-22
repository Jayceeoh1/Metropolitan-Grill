import Footer from '@/components/layout/Footer'

export const metadata = { title: 'Despre Noi — Metropolitan Shaorma & Grill' }

const VALUES = [
  { icon: '🥩', title: 'Carne Premium', desc: 'Selectăm zilnic carne proaspătă de la fermieri locali. Nicio bucată congelată în bucătăria noastră.' },
  { icon: '⚡', title: 'Livrare în 30\'', desc: 'Flota noastră de curieri asigură livrarea în 30 de minute sau comanda este gratuită.' },
  { icon: '🌱', title: 'Ingrediente Locale', desc: 'Legumele și condimentele provin de la producători locali din zona București-Ilfov.' },
]

const TEAM = [
  { name: 'Andrei Ionescu', role: 'Fondator & Chef Principal', initials: 'AI' },
  { name: 'Maria Popa', role: 'Manager Operațiuni', initials: 'MP' },
  { name: 'Radu Constantin', role: 'Chef Grătar', initials: 'RC' },
]

export default function DesprePage() {
  return (
    <div className="page-enter pt-16">
      {/* Hero */}
      <div className="relative bg-gradient-to-br from-[#1a0a08] to-[#0a0a0a] border-b border-white/5 py-24 overflow-hidden">
        <span className="absolute top-0 right-0 text-[200px] opacity-[0.04] leading-none select-none pointer-events-none">🔥</span>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <p className="text-xs font-bold tracking-[3px] uppercase text-[#e74c3c] mb-4">Povestea noastră</p>
          <h1 className="font-bebas text-6xl sm:text-8xl text-white leading-none mb-4">
            METROPOLITAN<br />
            <span className="text-[#f39c12]">SHAORMA & GRILL</span>
          </h1>
          <p className="text-[#b8a99a] text-lg leading-relaxed max-w-2xl mx-auto">
            Din 2018, Metropolitan Grill aduce pe mesele bucureștenilor shaorma autentică, preparată cu pasiune, carne de calitate superioară și rețete transmise din generație în generație.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        {/* Mission & Vision */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-16">
          <div className="bg-[#1a1a1a] border border-white/8 rounded-[18px] p-8">
            <h2 className="font-bebas text-3xl text-[#f39c12] mb-4">MISIUNEA NOASTRĂ</h2>
            <p className="text-[#b8a99a] leading-relaxed">
              Credem că fast-food-ul poate fi și de calitate. Fiecare shaormă Metropolitan este preparată la comandă, cu ingrediente proaspete și carne la grătar, nu prăjită. Promitem autenticitate la fiecare mușcătură.
            </p>
          </div>
          <div className="bg-[#1a1a1a] border border-white/8 rounded-[18px] p-8">
            <h2 className="font-bebas text-3xl text-[#f39c12] mb-4">VALORILE NOASTRE</h2>
            <p className="text-[#b8a99a] leading-relaxed">
              Calitate fără compromis, viteză de livrare record, prețuri corecte și un zâmbet la fiecare comandă. Metropolitan înseamnă comunitate și bucuria de a mânca bine în fiecare zi.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-16">
          {[
            { num: '2018', label: 'An înființare' },
            { num: '2k+', label: 'Comenzi zilnice' },
            { num: '4.9★', label: 'Rating mediu' },
            { num: '50+', label: 'Angajați' },
          ].map(stat => (
            <div key={stat.label} className="bg-[#1a1a1a] border border-white/8 rounded-[14px] p-6 text-center">
              <div className="font-bebas text-4xl text-[#f39c12] mb-1">{stat.num}</div>
              <div className="text-xs text-[#7a6e66] uppercase tracking-wide">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Values */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <h2 className="font-bebas text-4xl text-white">DE CE <span className="text-[#f39c12]">SUNTEM DIFERIȚI</span></h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {VALUES.map((v, i) => (
              <div key={i} className="bg-white/[0.03] border border-white/8 rounded-[18px] p-7 text-center hover:border-[#c0392b]/20 transition-all">
                <span className="text-5xl block mb-5">{v.icon}</span>
                <h3 className="font-condensed font-bold text-lg uppercase tracking-wide text-white mb-3">{v.title}</h3>
                <p className="text-sm text-[#7a6e66] leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <h2 className="font-bebas text-4xl text-white">ECHIPA <span className="text-[#f39c12]">NOASTRĂ</span></h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {TEAM.map((member, i) => (
              <div key={i} className="bg-[#1a1a1a] border border-white/8 rounded-[18px] p-6 text-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#96251e] to-[#c0392b] flex items-center justify-center font-bebas text-3xl text-white mx-auto mb-4">
                  {member.initials}
                </div>
                <h3 className="font-condensed font-bold text-lg text-white">{member.name}</h3>
                <p className="text-sm text-[#7a6e66] mt-1">{member.role}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Map placeholder */}
        <div className="bg-[#1a1a1a] border border-white/8 rounded-[18px] h-56 flex items-center justify-center text-center">
          <div>
            <span className="text-5xl block mb-3">📍</span>
            <p className="font-condensed font-bold text-lg text-white uppercase tracking-wide">Str. Mihai Eminescu 42, Sector 2, București</p>
            <p className="text-sm text-[#7a6e66] mt-1">Luni–Vineri: 10:00–23:00 · Sâmbătă–Duminică: 10:00–24:00</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}