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

export default function FeaturedProducts() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [modalProduct, setModalProduct] = useState(null)
  const addItem = useCartStore(s => s.addItem)

  useEffect(() => {
    const fetchData = async () => {
      const supabase = createClient()
      const { data } = await supabase
        .from('menu_items')
        .select('*')
        .eq('active', true)
        .contains('badges', ['bestseller'])
        .order('sort_order')
        .limit(6)
      setProducts((data || []).map(p => ({
        ...p,
        category: p.category_id,
        promo: p.promo_price || null,
        badges: p.badges || [],
        ingredients: [],
        image: p.image_url || null,
      })))
      setLoading(false)
    }
    fetchData()
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
                    transition: 'all 0.3s ease',
                  }}
                >
                  <div className="h-44 flex items-center justify-center relative overflow-hidden" style={{ background: '#111' }}>
                    {p.image_url ? (
                      <img
                        src={p.image_url}
                        alt={p.name}
                        className="h-36 w-auto object-contain transition-transform duration-500 group-hover:scale-110"
                        style={{ filter: `drop-shadow(0 10px 20px ${cfg.color}40)` }}
                      />
                    ) : (
                      <span className="text-6xl transition-transform duration-300 group-hover:scale-110">{p.icon}</span>
                    )}
                    <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, #0f0f0f 0%, transparent 60%)' }} />
                    <div className="absolute top-3 left-3 font-bebas text-xs px-2 py-1 rounded-lg"
                      style={{ background: `${cfg.color}20`, border: `1px solid ${cfg.color}40`, color: cfg.color }}>
                      {cfg.icon} {cfg.label}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-condensed font-bold text-lg uppercase tracking-wide text-white mb-1 group-hover:text-[#f39c12] transition-colors">
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