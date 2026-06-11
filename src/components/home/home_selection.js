'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useCartStore } from '@/store/cartStore'
import toast from 'react-hot-toast'
import { Plus } from 'lucide-react'
import ProductModal from '@/components/menu/ProductModal'
import { createPortal } from 'react-dom'

const CAT_CONFIG = {
  pui:     { color: '#f1c40f', label: 'PUI',     icon: '🐔' },
  vita:    { color: '#e74c3c', label: 'VITA',    icon: '🐂' },
  mixta:   { color: '#2ecc71', label: 'MIXTA',   icon: '🌟' },
  meniu:   { color: '#3498db', label: 'SPECIAL', icon: '⭐' },
  sides:   { color: '#e67e22', label: 'CRISPY',  icon: '🍟' },
  bauturi: { color: '#9b59b6', label: 'BAUTURI', icon: '🥤' },
}

// How It Works
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
          <h2 className="font-bebas text-5xl sm:text-6xl" style={{ color: '#fff', textShadow: '0 0 30px rgba(241,196,15,0.1)' }}>
            CUM <span style={{ color: '#f1c40f', textShadow: '0 0 20px rgba(241,196,15,0.5)' }}>FUNCTIONEAZA</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          <div className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(241,196,15,0.3), rgba(231,76,60,0.3), rgba(46,204,113,0.3), transparent)' }} />
          {steps.map((step, i) => (
            <div key={i} className="text-center relative z-10 group">
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center text-3xl mx-auto mb-5 transition-all group-hover:scale-110"
                style={{
                  border: `1.5px solid ${step.color}40`,
                  background: `${step.color}10`,
                  boxShadow: `0 0 20px ${step.color}20`,
                }}
              >
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

// Featured Products
export function FeaturedProducts() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [modalProduct, setModalProduct] = useState(null)
  const addItem = useCartStore(s => s.addItem)

  useEffect(() => {
    const fetch = async () => {
      const supabase = createClient()
      const { data } = await supabase
        .from('menu_items').select('*').eq('active', true)
        .contains('badges', ['bestseller']).order('sort_order').limit(6)
      setProducts((data || []).map(p => ({ ...p, category: p.category_id, promo: p.promo_price || null, badges: p.badges || [], ingredients: [], image: p.image_url || null })))
      setLoading(false)
    }
    fetch()
  }, [])

  const handleAdd = (e, p) => {
    e.stopPropagation()
    addItem(p)
    toast.success(p.name + ' adaugat!')
    window.dispatchEvent(new CustomEvent('openCart'))
  }

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <p className="text-xs font-bold tracking-[3px] uppercase mb-3" style={{ color: '#e74c3c' }}>Bestseller-uri</p>
          <h2 className="font-bebas text-5xl sm:text-6xl text-white">
            CELE MAI <span style={{ color: '#f1c40f', textShadow: '0 0 20px rgba(241,196,15,0.4)' }}>POPULARE</span>
          </h2>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[...Array(6)].map((_, i) => <div key={i} className="skeleton h-56 rounded-2xl" />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {products.map(p => {
              const cfg = CAT_CONFIG[p.category_id] || CAT_CONFIG.pui
              return (
                <div
                  key={p.id}
                  onClick={() => setModalProduct(p)}
                  className="rounded-2xl overflow-hidden cursor-pointer group transition-all hover:scale-[1.02]"
                  style={{
                    background: 'linear-gradient(160deg, #1a1a1a 0%, #0f0f0f 100%)',
                    border: `1px solid ${cfg.color}20`,
                    boxShadow: `0 0 20px ${cfg.color}08`,
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = `${cfg.color}50`; e.currentTarget.style.boxShadow = `0 0 30px ${cfg.color}15` }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = `${cfg.color}20`; e.currentTarget.style.boxShadow = `0 0 20px ${cfg.color}08` }}
                >
                  {/* Image */}
                  <div className="h-44 flex items-center justify-center relative overflow-hidden" style={{ background: '#111' }}>
                    {p.image_url ? (
                      <img src={p.image_url} alt={p.name} className="h-36 w-auto object-contain transition-transform duration-500 group-hover:scale-110" style={{ filter: `drop-shadow(0 10px 20px ${cfg.color}40)` }} />
                    ) : (
                      <span className="text-6xl transition-transform duration-300 group-hover:scale-110">{p.icon}</span>
                    )}
                    <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, #0f0f0f 0%, transparent 60%)' }} />
                    {/* Category badge */}
                    <div className="absolute top-3 left-3 font-bebas text-xs px-2 py-1 rounded-lg" style={{ background: `${cfg.color}20`, border: `1px solid ${cfg.color}40`, color: cfg.color }}>
                      {cfg.icon} {cfg.label}
                    </div>
                  </div>
                  {/* Body */}
                  <div className="p-4">
                    <h3 className="font-condensed font-bold text-lg uppercase tracking-wide text-white mb-1 transition-colors" style={{}}>
                      {p.name}
                    </h3>
                    <p className="text-xs mb-4 line-clamp-2" style={{ color: '#7a6e66' }}>{p.description}</p>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-bebas text-2xl" style={{ color: cfg.color, textShadow: `0 0 10px ${cfg.color}60` }}>
                          {p.promo_price || p.price} LEI
                        </span>
                        {p.promo_price && <span className="text-sm line-through ml-2" style={{ color: '#7a6e66' }}>{p.price}</span>}
                      </div>
                      <button
                        onClick={e => handleAdd(e, p)}
                        className="w-9 h-9 rounded-xl flex items-center justify-center text-black font-bold transition-all hover:scale-110"
                        style={{ background: cfg.color, boxShadow: `0 0 15px ${cfg.color}50` }}
                      >
                        <Plus size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        <div className="text-center mt-10">
          <Link
            href="/meniu"
            className="inline-flex items-center gap-2 font-condensed font-bold uppercase tracking-wide px-8 py-3 rounded-xl transition-all hover:scale-105"
            style={{ border: '1.5px solid rgba(241,196,15,0.3)', color: '#f1c40f' }}
          >
            Vezi Meniu Complet →
          </Link>
        </div>
      </div>

      {modalProduct && typeof window !== 'undefined' && createPortal(
        <ProductModal product={modalProduct} open={!!modalProduct} onClose={() => setModalProduct(null)} />,
        document.body
      )}
    </section>
  )
}

// Promo Banners
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
            <div
              key={i}
              className="relative rounded-2xl p-8 overflow-hidden min-h-[200px] flex flex-col justify-end group transition-all hover:-translate-y-1"
              style={{
                background: `linear-gradient(160deg, ${p.color}15 0%, #080808 70%)`,
                border: `1.5px solid ${p.color}30`,
                boxShadow: `0 0 20px ${p.color}10`,
              }}
            >
              {/* Blur overlay IN CURAND */}
              <div className="absolute inset-0 rounded-2xl flex flex-col items-center justify-center z-10" style={{ backdropFilter: 'blur(6px)', background: 'rgba(0,0,0,0.5)' }}>
                <span className="text-4xl mb-2">⏳</span>
                <span className="font-bebas text-3xl tracking-widest" style={{ color: p.color, textShadow: `0 0 15px ${p.color}80` }}>IN CURAND</span>
              </div>
              <span className="absolute top-5 right-5 text-5xl opacity-30 group-hover:scale-110 transition-transform">{p.emoji}</span>
              <span className="font-bebas text-xs px-3 py-1 rounded-full mb-2 self-start" style={{ background: `${p.color}20`, border: `1px solid ${p.color}40`, color: p.color }}>{p.badge}</span>
              <h3 className="font-bebas text-3xl text-white mb-1">{p.title}</h3>
              <p className="text-sm mb-4" style={{ color: '#b8a99a' }}>{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Delivery Info
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
            <div
              key={i}
              className="text-center p-7 rounded-2xl group transition-all hover:scale-[1.02]"
              style={{
                background: `${item.color}06`,
                border: `1.5px solid ${item.color}20`,
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = `${item.color}50`; e.currentTarget.style.boxShadow = `0 0 25px ${item.color}15` }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = `${item.color}20`; e.currentTarget.style.boxShadow = 'none' }}
            >
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center text-3xl mx-auto mb-5"
                style={{ background: `${item.color}15`, border: `1px solid ${item.color}30`, boxShadow: `0 0 20px ${item.color}20` }}
              >
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

// Testimonials
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
            <div
              key={i}
              className="p-6 rounded-2xl"
              style={{
                background: 'linear-gradient(160deg, #1a1a1a 0%, #0f0f0f 100%)',
                border: `1px solid ${t.color}20`,
              }}
            >
              <div className="text-lg tracking-widest mb-3" style={{ color: t.color }}>{'★'.repeat(t.stars)}</div>
              <p className="text-sm leading-relaxed italic mb-5" style={{ color: '#b8a99a' }}>"{t.text}"</p>
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center font-bebas text-sm text-white"
                  style={{ background: `linear-gradient(135deg, ${t.color}80, ${t.color})` }}
                >
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