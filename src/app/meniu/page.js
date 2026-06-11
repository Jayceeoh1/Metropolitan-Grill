'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import ProductModal from '@/components/menu/ProductModal'
import { createPortal } from 'react-dom'
import { useCartStore } from '@/store/cartStore'
import toast from 'react-hot-toast'
import Footer from '@/components/layout/Footer'
import { Plus } from 'lucide-react'

const CAT_CONFIG = {
  pui:     { color: '#f1c40f', label: 'PUI',              icon: '🐔', shadow: 'rgba(241,196,15,0.4)' },
  vita:    { color: '#e74c3c', label: 'VITA',             icon: '🐂', shadow: 'rgba(231,76,60,0.4)' },
  mixta:   { color: '#2ecc71', label: 'MIXTA (VITA+PUI)', icon: '🌟', shadow: 'rgba(46,204,113,0.4)' },
  meniu:   { color: '#3498db', label: 'SPECIALITATI',     icon: '⭐', shadow: 'rgba(52,152,219,0.4)' },
  sides:   { color: '#e67e22', label: 'CRISPY / SNACKS',  icon: '🍟', shadow: 'rgba(230,126,34,0.4)' },
  bauturi: { color: '#9b59b6', label: 'BAUTURI',          icon: '🥤', shadow: 'rgba(155,89,182,0.4)' },
}

function NeonBox({ catId, products, onOpen, columns = 1 }) {
  const cfg = CAT_CONFIG[catId] || CAT_CONFIG.pui
  const items = products.filter(p => p.category_id === catId)
  const addItem = useCartStore(s => s.addItem)
  if (!items.length) return null

  const handleAdd = (e, product) => {
    e.stopPropagation()
    addItem(product)
    toast.success(product.name + ' adaugat!')
    window.dispatchEvent(new CustomEvent('openCart'))
  }

  const ProductRow = ({ p }) => (
    <div
      onClick={() => onOpen(p)}
      className="flex items-center justify-between py-2 px-2 rounded-xl cursor-pointer group transition-all hover:bg-white/5"
    >
      <div className="flex items-center gap-2 flex-1 min-w-0">
        {p.image_url ? (
          <img src={p.image_url} alt={p.name} className="w-9 h-9 object-contain rounded-lg shrink-0" style={{ background: '#111' }} />
        ) : (
          <span className="text-xl w-9 text-center shrink-0">{p.icon}</span>
        )}
        <div className="min-w-0">
          <p className="font-condensed font-bold text-sm uppercase tracking-wide text-white truncate group-hover:text-[#f39c12] transition-colors leading-tight">
            {p.name}
          </p>
          {p.weight && <p className="text-[#7a6e66] text-xs leading-none mt-0.5">{p.weight}</p>}
        </div>
      </div>
      <div className="flex items-center gap-2 shrink-0 ml-2">
        <div className="text-right">
          {p.promo_price && <p className="text-[#7a6e66] text-xs line-through leading-none">{p.price} lei</p>}
          <p className="font-bebas text-lg leading-none" style={{ color: cfg.color }}>
            {p.promo_price || p.price} LEI
          </p>
        </div>
        <button
          onClick={e => handleAdd(e, p)}
          className="w-7 h-7 rounded-lg flex items-center justify-center text-black font-bold opacity-0 group-hover:opacity-100 transition-all hover:scale-110 shrink-0"
          style={{ background: cfg.color }}
        >
          <Plus size={14} />
        </button>
      </div>
    </div>
  )

  return (
    <div
      className="rounded-2xl overflow-hidden flex flex-col"
      style={{
        border: `1.5px solid ${cfg.color}60`,
        background: `linear-gradient(160deg, ${cfg.color}08 0%, #0a0a0a 60%)`,
        boxShadow: `0 0 20px ${cfg.color}15, inset 0 0 40px ${cfg.color}05`,
      }}
    >
      <div className="px-4 py-3 flex items-center gap-2"
        style={{ borderBottom: `1px solid ${cfg.color}30`, background: `${cfg.color}10` }}>
        <span className="text-xl">{cfg.icon}</span>
        <h3 className="font-bebas text-2xl tracking-widest"
          style={{ color: cfg.color, textShadow: `0 0 15px ${cfg.shadow}, 0 0 30px ${cfg.shadow}` }}>
          {cfg.label}
        </h3>
      </div>

      {/* Items — 2 columns when columns=2 */}
      <div className={`flex-1 p-2 ${columns === 2 ? 'grid grid-cols-1 sm:grid-cols-2 gap-x-2' : ''}`}>
        {items.map(p => <ProductRow key={p.id} p={p} />)}
      </div>
    </div>
  )
}

export default function MenuPage() {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('all')
  const [modalProduct, setModalProduct] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      const supabase = createClient()
      const [{ data: cats }, { data: prods }] = await Promise.all([
        supabase.from('categories').select('*').eq('active', true).order('sort_order'),
        supabase.from('menu_items').select('*').eq('active', true).order('sort_order'),
      ])
      setCategories(cats || [])
      setProducts((prods || []).map(p => ({
        ...p, category: p.category_id, promo: p.promo_price || null,
        badges: p.badges || [], ingredients: [], image: p.image_url || null,
      })))
      setLoading(false)
    }
    fetchData()
  }, [])

  const tabs = [
    { id: 'all', label: 'TOT MENIUL', color: '#f5f0e8' },
    { id: 'shaorma', label: 'SHAORMA', color: '#f39c12' },
    { id: 'specialitati', label: 'SPECIALITATI', color: '#3498db' },
    { id: 'altele', label: 'CRISPY & BAUTURI', color: '#e67e22' },
  ]

  const shaormaCats = ['pui', 'vita', 'mixta']
  const specialitatiCats = ['meniu']
  const alteleCats = ['sides', 'bauturi']

  return (
    <div className="page-enter pt-16 min-h-screen" style={{ background: '#080808' }}>

      {/* HERO HEADER */}
      <div className="relative py-8 sm:py-12 overflow-hidden"
        style={{ background: 'linear-gradient(180deg, #1a0800 0%, #0d0400 60%, #080808 100%)', borderBottom: '1px solid rgba(243,156,18,0.2)' }}>
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(ellipse at 15% 50%, rgba(192,57,43,0.15) 0%, transparent 50%), radial-gradient(ellipse at 85% 50%, rgba(192,57,43,0.15) 0%, transparent 50%)' }} />
        <div className="relative max-w-5xl mx-auto px-4 text-center">
          <h1 className="font-bebas leading-none mb-0" style={{ fontSize: 'clamp(48px, 10vw, 110px)', color: '#fff', textShadow: '0 0 30px rgba(243,156,18,0.3)', letterSpacing: '4px' }}>METROPOLITAN</h1>
          <h2 className="font-bebas leading-none mb-3" style={{ fontSize: 'clamp(28px, 6vw, 70px)', color: '#e74c3c', textShadow: '0 0 20px rgba(231,76,60,0.6)', letterSpacing: '6px' }}>SHAORMA & GRILL</h2>
          <div className="flex items-center gap-3 justify-center mb-3">
            <div className="h-px flex-1 max-w-[100px]" style={{ background: 'linear-gradient(to right, transparent, #f39c12)' }} />
            <span className="font-bebas text-base tracking-[6px]" style={{ color: '#f39c12' }}>SHAORMA</span>
            <div className="h-px flex-1 max-w-[100px]" style={{ background: 'linear-gradient(to left, transparent, #f39c12)' }} />
          </div>
          <p className="text-xs sm:text-sm uppercase tracking-[3px] sm:tracking-[6px]" style={{ color: '#7a6e66' }}>
            Ingrediente Proaspete Zi de Zi ✦ Gust Autentic ✦ Carne Frageda 100% Calitate
          </p>
        </div>
      </div>

      {/* TAB NAVIGATION */}
      <div className="sticky top-16 z-30 px-4 py-3" style={{ background: 'rgba(8,8,8,0.95)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="max-w-5xl mx-auto flex gap-2 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
          {tabs.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className="shrink-0 px-4 py-2 rounded-xl font-condensed font-bold text-sm uppercase tracking-wide transition-all border"
              style={activeTab === tab.id ? { background: tab.color, borderColor: tab.color, color: '#000', boxShadow: `0 0 15px ${tab.color}60` } : { background: 'transparent', borderColor: tab.color + '30', color: tab.color }}>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-5xl mx-auto px-4 py-6">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => <div key={i} className="rounded-2xl h-64 skeleton" />)}
          </div>
        ) : (
          <>
            {(activeTab === 'all' || activeTab === 'shaorma') && (
              <div className="mb-8">
                {activeTab === 'all' && (
                  <div className="flex items-center gap-3 mb-5">
                    <div className="h-px flex-1" style={{ background: 'linear-gradient(to right, transparent, rgba(241,196,15,0.4))' }} />
                    <h2 className="font-bebas text-2xl sm:text-3xl tracking-[5px]" style={{ color: '#f1c40f', textShadow: '0 0 20px rgba(241,196,15,0.5)' }}>🌯 SHAORMA</h2>
                    <div className="h-px flex-1" style={{ background: 'linear-gradient(to left, transparent, rgba(241,196,15,0.4))' }} />
                  </div>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {shaormaCats.map(id => <NeonBox key={id} catId={id} products={products} onOpen={setModalProduct} />)}
                </div>
              </div>
            )}

            {(activeTab === 'all' || activeTab === 'specialitati') && (
              <div className="mb-8">
                {activeTab === 'all' && (
                  <div className="flex items-center gap-3 mb-5">
                    <div className="h-px flex-1" style={{ background: 'linear-gradient(to right, transparent, rgba(52,152,219,0.4))' }} />
                    <h2 className="font-bebas text-2xl sm:text-3xl tracking-[5px]" style={{ color: '#3498db', textShadow: '0 0 20px rgba(52,152,219,0.5)' }}>★ SPECIALITATI ★</h2>
                    <div className="h-px flex-1" style={{ background: 'linear-gradient(to left, transparent, rgba(52,152,219,0.4))' }} />
                  </div>
                )}
                {/* Specialitati pe toata latimea cu 2 coloane interne */}
                <div className="w-full">
                  {specialitatiCats.map(id => <NeonBox key={id} catId={id} products={products} onOpen={setModalProduct} columns={2} />)}
                </div>
              </div>
            )}

            {(activeTab === 'all' || activeTab === 'altele') && (
              <div className="mb-8">
                {activeTab === 'all' && (
                  <div className="flex items-center gap-3 mb-5">
                    <div className="h-px flex-1" style={{ background: 'linear-gradient(to right, transparent, rgba(230,126,34,0.4))' }} />
                    <h2 className="font-bebas text-2xl sm:text-3xl tracking-[5px]" style={{ color: '#e67e22', textShadow: '0 0 20px rgba(230,126,34,0.5)' }}>🍟 CRISPY & BAUTURI</h2>
                    <div className="h-px flex-1" style={{ background: 'linear-gradient(to left, transparent, rgba(230,126,34,0.4))' }} />
                  </div>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {alteleCats.map(id => <NeonBox key={id} catId={id} products={products} onOpen={setModalProduct} />)}
                </div>
              </div>
            )}

            {activeTab === 'all' && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6">
                {[
                  { icon: '🌯', text: 'INGREDIENTE PROASPETE ZI DE ZI', color: '#e74c3c' },
                  { icon: '🔥', text: 'GUST AUTENTIC!', color: '#f39c12', accent: true },
                  { icon: '🥩', text: 'CARNE FRAGEDA 100% CALITATE', color: '#2ecc71' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-center gap-3 py-4 px-5 rounded-2xl"
                    style={{ border: `1.5px solid ${item.color}40`, background: `${item.color}08`, boxShadow: item.accent ? `0 0 20px ${item.color}20` : 'none' }}>
                    <span className="text-2xl">{item.icon}</span>
                    <span className="font-condensed font-bold text-sm uppercase tracking-wide" style={{ color: item.color }}>{item.text}</span>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      <Footer />

      {modalProduct && typeof window !== 'undefined' && createPortal(
        <ProductModal product={modalProduct} open={!!modalProduct} onClose={() => setModalProduct(null)} />,
        document.body
      )}
    </div>
  )
}
