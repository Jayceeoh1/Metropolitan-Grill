'use client'
import Link from 'next/link'

export function HowItWorks() {
  const steps = [
    { icon: '📱', title: 'Alege din Meniu', desc: 'Exploreaza categoriile si personalizeaza comanda.', color: '#f1c40f' },
    { icon: '🛒', title: 'Adauga in Cos', desc: 'Selecteaza sosuri, extra ingrediente si nivel picant.', color: '#e74c3c' },
    { icon: '💵', title: 'Plaseaza Comanda', desc: 'Completeaza datele de livrare. Plata numerar la livrare.', color: '#2ecc71' },
    { icon: '🛵', title: 'Primesti Acasa', desc: 'Curierul ajunge in maxim 30 de minute.', color: '#3498db' },
  ]
  return (
    <section className="py-20" style={{ background: '#0d0400', borderTop: '1px solid rgba(255,255,255,0.04)', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <p className="text-xs font-bold tracking-[3px] uppercase mb-3" style={{ color: '#e74c3c' }}>Simplu & Rapid</p>
          <h2 className="font-bebas text-5xl sm:text-6xl text-white">
            CUM <span style={{ color: '#f1c40f', textShadow: '0 0 20px rgba(241,196,15,0.5)' }}>FUNCTIONEAZA</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          <div className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(241,196,15,0.3), rgba(231,76,60,0.3), rgba(46,204,113,0.3), transparent)' }} />
          {steps.map((step, i) => (
            <div key={i} className="text-center relative z-10">
              <div className="w-20 h-20 rounded-full flex items-center justify-center text-3xl mx-auto mb-5 transition-transform hover:scale-110"
                style={{ border: `1.5px solid ${step.color}40`, background: `${step.color}10`, boxShadow: `0 0 20px ${step.color}20` }}>
                {step.icon}
              </div>
              <h3 className="font-condensed font-bold text-base uppercase tracking-wide mb-2" style={{ color: step.color }}>{step.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: '#7a6e66' }}>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function PromoBanners() {
  const promos = [
    { color: '#e74c3c', emoji: '🌯', badge: 'HOT DEAL', title: '2+1 SHAORMA', desc: 'Cumpara 2 shaorme si primesti a 3-a gratis!' },
    { color: '#f1c40f', emoji: '🎁', badge: 'WEEKEND', title: 'MENIU DUO -20%', desc: 'Sambata si duminica, Meniu Duo cu 20% reducere!' },
    { color: '#2ecc71', emoji: '🚚', badge: 'GRATUIT', title: 'LIVRARE GRATUITA', desc: 'La comenzi peste 80 lei, livrarea este gratuita!' },
  ]
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <p className="text-xs font-bold tracking-[3px] uppercase mb-3" style={{ color: '#e74c3c' }}>Oferte Speciale</p>
          <h2 className="font-bebas text-5xl sm:text-6xl text-white">
            PROMOTII <span style={{ color: '#f1c40f', textShadow: '0 0 20px rgba(241,196,15,0.4)' }}>ACTIVE</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {promos.map((p, i) => (
            <div key={i} className="relative rounded-2xl p-8 overflow-hidden min-h-[200px] flex flex-col justify-end transition-all hover:-translate-y-1"
              style={{ background: `linear-gradient(160deg, ${p.color}15 0%, #080808 70%)`, border: `1.5px solid ${p.color}30` }}>
              <div className="absolute inset-0 rounded-2xl flex flex-col items-center justify-center z-10" style={{ backdropFilter: 'blur(6px)', background: 'rgba(0,0,0,0.5)' }}>
                <span className="text-4xl mb-2">⏳</span>
                <span className="font-bebas text-3xl tracking-widest" style={{ color: p.color, textShadow: `0 0 15px ${p.color}80` }}>IN CURAND</span>
              </div>
              <span className="absolute top-5 right-5 text-5xl opacity-30">{p.emoji}</span>
              <h3 className="font-bebas text-3xl text-white mb-1">{p.title}</h3>
              <p className="text-sm" style={{ color: '#b8a99a' }}>{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function DeliveryInfo() {
  const items = [
    { icon: '⚡', title: 'Livrare Ultra Rapida', desc: 'Garantam livrarea in 30 de minute sau comanda e gratuita.', color: '#f1c40f' },
    { icon: '🌿', title: 'Ingrediente Proaspete', desc: 'Carne proaspata zilnic, legume locale, sosuri preparate in restaurant.', color: '#2ecc71' },
    { icon: '🏆', title: 'Cel Mai Bun Rating', desc: '4.9 stele din 2,400+ recenzii. Clientii nostri revin mereu.', color: '#e74c3c' },
  ]
  return (
    <section className="py-20" style={{ background: '#0d0400', borderTop: '1px solid rgba(255,255,255,0.04)', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <p className="text-xs font-bold tracking-[3px] uppercase mb-3" style={{ color: '#e74c3c' }}>De ce noi</p>
          <h2 className="font-bebas text-5xl sm:text-6xl text-white">
            DE CE <span style={{ color: '#f1c40f', textShadow: '0 0 20px rgba(241,196,15,0.4)' }}>NE ALEGI</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {items.map((item, i) => (
            <div key={i} className="text-center p-7 rounded-2xl transition-all hover:scale-[1.02]"
              style={{ background: `${item.color}06`, border: `1.5px solid ${item.color}20` }}>
              <div className="w-16 h-16 rounded-full flex items-center justify-center text-3xl mx-auto mb-5"
                style={{ background: `${item.color}15`, border: `1px solid ${item.color}30`, boxShadow: `0 0 20px ${item.color}20` }}>
                {item.icon}
              </div>
              <h3 className="font-condensed font-bold text-lg uppercase tracking-wide mb-3" style={{ color: item.color }}>{item.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: '#7a6e66' }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function Testimonials() {
  const items = [
    { stars: 5, text: 'Cea mai buna shaorma din oras, fara discutie. Carnea e frageda, sosul de usturoi e divin. Comand de 2 ori pe saptamana!', name: 'Alexandru M.', city: 'Gaesti', color: '#f1c40f' },
    { stars: 5, text: 'Livrare in 25 de minute, mancarea calda si super ambalata. Recomand cu cea mai mare caldura!', name: 'Ioana R.', city: 'Gaesti', color: '#e74c3c' },
    { stars: 5, text: 'Shaorma farfurie vita a fost extraordinara. Portie mare, gust exceptional. Metropolitan e restaurantul meu preferat!', name: 'Mihai P.', city: 'Gaesti', color: '#2ecc71' },
  ]
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <p className="text-xs font-bold tracking-[3px] uppercase mb-3" style={{ color: '#e74c3c' }}>Recenzii</p>
          <h2 className="font-bebas text-5xl sm:text-6xl text-white">
            CE SPUN <span style={{ color: '#f1c40f', textShadow: '0 0 20px rgba(241,196,15,0.4)' }}>CLIENTII</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {items.map((t, i) => (
            <div key={i} className="p-6 rounded-2xl"
              style={{ background: 'linear-gradient(160deg, #1a1a1a 0%, #0f0f0f 100%)', border: `1px solid ${t.color}20` }}>
              <div className="text-lg tracking-widest mb-3" style={{ color: t.color }}>{'★'.repeat(t.stars)}</div>
              <p className="text-sm leading-relaxed italic mb-5" style={{ color: '#b8a99a' }}>"{t.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center font-bebas text-sm text-white"
                  style={{ background: `linear-gradient(135deg, ${t.color}80, ${t.color})` }}>
                  {t.name[0]}{t.name.split(' ')[1]?.[0]}
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">{t.name}</div>
                  <div className="text-xs" style={{ color: '#7a6e66' }}>{t.city}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}