'use client'
import { useState, useEffect, useMemo } from 'react'
import { Search, Plus, ShoppingBag } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import ProductModal from '@/components/menu/ProductModal'
import { createPortal } from 'react-dom'
import { useCartStore } from '@/store/cartStore'
import toast from 'react-hot-toast'
import Footer from '@/components/layout/Footer'

const CAT_COLORS = {
  pui:     { neon: '#f1c40f', border: 'border-[#f1c40f]/40', bg: 'bg-[#f1c40f]/5',  text: 'text-[#f1c40f]',  label: 'PUI',    icon: '🐔' },
  vita:    { neon: '#e74c3c', border: 'border-[#e74c3c]/40', bg: 'bg-[#e74c3c]/5',  text: 'text-[#e74c3c]',  label: 'VITA',   icon: '🐂' },
  mixta:   { neon: '#2ecc71', border: 'border-[#2ecc71]/40', bg: 'bg-[#2ecc71]/5',  text: 'text-[#2ecc71]',  label: 'MIXTA',  icon: '🌟' },
  meniu:   { neon: '#3498db', border: 'border-[#3498db]/40', bg: 'bg-[#3498db]/5',  text: 'text-[#3498db]',  label: 'SPECIALITATI', icon: '⭐' },
  sides:   { neon: '#e67e22', border: 'border-[#e67e22]/40', bg: 'bg-[#e67e22]/5',  text: 'text-[#e67e22]',  label: 'CRISPY / SNACKS', icon: '🍟' },
  bauturi: { neon: '#9b59b6', border: 'border-[#9b59b6]/40', bg: 'bg-[#9b59b6]/5',  text: 'text-[#9b59b6]',  label: 'BAUTURI', icon: '🥤' },
}

function ProductRow({ product, color, onOpen }) {
  const addItem = useCartStore(s => s.addItem)

  const handleAdd = (e) => {
    e.stopPropagation()
    addItem(product)
    toast.success(product.name + ' adaugat!')
    window.dispatchEvent(new CustomEvent('openCart'))
  }

  return (
    <div
      onClick={() => onOpen(product)}
      className="flex items-center justify-between py-2.5 px-3 rounded-xl hover:bg-white/5 cursor-pointer group transition-all border border-transparent hover:border-white/8"
    >
      <div className="flex items-center gap-3 flex-1 min-w-0">
        {product.image_url ? (
          <img src={product.image_url} alt={product.name} className="w-10 h-10 object-contain rounded-lg bg-[#111] shrink-0" />
        ) : (
          <span className="text-2xl w-10 text-center shrink-0">{product.icon}</span>
        )}
        <div className="min-w-0">
          <p className="text-white font-condensed font-bold text-sm uppercase tracking-wide truncate group-hover:text-[#f39c12] transition-colors">
            {product.name}
          </p>
          {product.weight && (
            <p className="text-[#7a6e66] text-xs">{product.weight}</p>
          )}
        </div>
      </div>
      <div className="flex items-center gap-3 shrink-0">
        <div className="text-right">
          <span className={`font-bebas text-xl ${color.text}`}>{product.promo_price || product.price} LEI</span>
          {product.promo_price && (
            <span className="text-[#7a6e66] text-xs line-through ml-1">{product.price}</span>
          )}
        </div>
        <button
          onClick={handleAdd}
          className="w-7 h-7 rounded-lg flex items-center justify-center text-white transition-all opacity-0 group-hover:opacity-100 hover:scale-110"
          style={{ background: color.neon }}
        >
          <Plus size={14} />
        </button>
      </div>
    </div>
  )
}

function CategoryBlock({ category, products, onOpen }) {
  const color = CAT_COLORS[category.id] || CAT_COLORS.pui
  const catProducts = products.filter(p => p.category_id === category.id)
  if (catProducts.length === 0) return null

  return (
    <div className={`rounded-[18px] border ${color.border} ${color.bg} overflow-hidden`}>
      {/* Header */}
      <div className="px-4 py-3 border-b border-white/8 flex items-center gap-2">
        <span className="text-xl">{color.icon}</span>
        <h2 className="font-bebas text-2xl tracking-widest" style={{ color: color.neon, textShadow: `0 0 20px ${color.neon}60` }}>
          {color.label}
        </h2>
        {category.id === 'mixta' && (
          <span className="text-xs text-[#7a6e66] ml-1">(VITA+PUI)</span>
        )}
      </div>
      {/* Products */}
      <div className="p-2">
        {catProducts.map(p => (
          <ProductRow key={p.id} product={p} color={color} onOpen={onOpen} />
        ))}
      </div>
    </div>
  )
}

export default function MenuPage() {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState('all')
  const [search, setSearch] = useState('')
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

  const ALL_CATS = [{ id: 'all', name: 'Toate', icon: '🍽' }, ...categories]

  const filteredProducts = useMemo(() => {
    let items = products
    if (activeCategory !== 'all') items = items.filter(p => p.category_id === activeCategory)
    if (search) items = items.filter(p =>
      p.name.toLowerCase().includes(search.toLowerCase())
    )
    return items
  }, [products, activeCategory, search])

  const visibleCategories = activeCategory === 'all'
    ? categories
    : categories.filter(c => c.id === activeCategory)

  return (
    <div className="page-enter pt-16 min-h-screen" style={{ background: '#0a0a0a' }}>
      {/* Header */}
      <div className="relative overflow-hidden py-10 border-b border-white/5" style={{ background: 'linear-gradient(180deg, #1a0a00 0%, #0a0a0a 100%)' }}>
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, #f39c12 0%, transparent 50%), radial-gradient(circle at 80% 50%, #c0392b 0%, transparent 50%)' }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <h1 className="font-bebas text-5xl sm:text-7xl text-white mb-1" style={{ textShadow: '0 0 40px rgba(243,156,18,0.3)' }}>
            METROPOLITAN
          </h1>
          <h2 className="font-bebas text-3xl sm:text-5xl mb-4" style={{ color: '#e74c3c', textShadow: '0 0 30px rgba(231,76,60,0.5)' }}>
            SHAORMA & GRILL
          </h2>
          <p className="text-[#7a6e66] text-sm uppercase tracking-[4px]">
            ✦ Ingrediente Proaspete Zi de Zi ✦ Gust Autentic ✦ Carne Frageda 100% Calitate ✦
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {/* Search + filter chips */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7a6e66]" />
            <input
              type="text"
              placeholder="Cauta in meniu..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-[#1a1a1a] border border-white/8 text-white placeholder-[#7a6e66] rounded-xl py-3 pl-9 pr-4 text-sm focus:outline-none focus:border-[#c0392b]/50"
            />
          </div>
        </div>

        {/* Category chips */}
        <div className="flex gap-2 overflow-x-auto pb-3 mb-6" style={{ scrollbarWidth: 'none' }}>
          <button
            onClick={() => setActiveCategory('all')}
            className={`shrink-0 px-4 py-2 rounded-full text-sm font-condensed font-bold uppercase tracking-wide border transition-all ${activeCategory === 'all' ? 'bg-white text-black border-white' : 'bg-transparent border-white/20 text-[#b8a99a] hover:border-white/40'}`}
          >
            Toate
          </button>
          {categories.map(cat => {
            const color = CAT_COLORS[cat.id]
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`shrink-0 px-4 py-2 rounded-full text-sm font-condensed font-bold uppercase tracking-wide border transition-all`}
                style={activeCategory === cat.id ? {
                  background: color?.neon,
                  borderColor: color?.neon,
                  color: '#000',
                } : {
                  background: 'transparent',
                  borderColor: color?.neon + '40',
                  color: color?.neon,
                }}
              >
                {color?.icon} {color?.label || cat.name}
              </button>
            )
          })}
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-[#1a1a1a] rounded-[18px] h-48 skeleton" />
            ))}
          </div>
        ) : search ? (
          // Search results as simple list
          <div className="bg-[#1a1a1a] border border-white/8 rounded-[18px] p-4">
            <p className="text-sm text-[#7a6e66] mb-4">{filteredProducts.length} produse gasite</p>
            {filteredProducts.map(p => {
              const color = CAT_COLORS[p.category_id] || CAT_COLORS.pui
              return <ProductRow key={p.id} product={p} color={color} onOpen={setModalProduct} />
            })}
          </div>
        ) : (
          // Category grid layout
          <>
            {/* SHAORMA section - 3 columns on desktop */}
            {(activeCategory === 'all' || ['pui','vita','mixta'].includes(activeCategory)) && (
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#f39c12]/30 to-transparent" />
                  <h2 className="font-bebas text-3xl text-[#f39c12] tracking-[4px]" style={{ textShadow: '0 0 20px rgba(243,156,18,0.4)' }}>
                    SHAORMA
                  </h2>
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#f39c12]/30 to-transparent" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {['pui','vita','mixta'].filter(id => activeCategory === 'all' || activeCategory === id).map(catId => {
                    const cat = categories.find(c => c.id === catId)
                    if (!cat) return null
                    return <CategoryBlock key={catId} category={cat} products={products} onOpen={setModalProduct} />
                  })}
                </div>
              </div>
            )}

            {/* SPECIALITATI */}
            {(activeCategory === 'all' || activeCategory === 'meniu') && (
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#3498db]/30 to-transparent" />
                  <h2 className="font-bebas text-3xl tracking-[4px]" style={{ color: '#3498db', textShadow: '0 0 20px rgba(52,152,219,0.4)' }}>
                    ★ SPECIALITATI ★
                  </h2>
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#3498db]/30 to-transparent" />
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {categories.filter(c => c.id === 'meniu').map(cat => (
                    <CategoryBlock key={cat.id} category={cat} products={products} onOpen={setModalProduct} />
                  ))}
                </div>
              </div>
            )}

            {/* CRISPY + BAUTURI */}
            {(activeCategory === 'all' || ['sides','bauturi'].includes(activeCategory)) && (
              <div className="mb-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {['sides','bauturi'].filter(id => activeCategory === 'all' || activeCategory === id).map(catId => {
                    const cat = categories.find(c => c.id === catId)
                    if (!cat) return null
                    return <CategoryBlock key={catId} category={cat} products={products} onOpen={setModalProduct} />
                  })}
                </div>
              </div>
            )}

            {/* Bottom banner */}
            {activeCategory === 'all' && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
                {[
                  { icon: '🌯', text: 'INGREDIENTE PROASPETE ZI DE ZI' },
                  { icon: '🔥', text: 'GUST AUTENTIC', accent: true },
                  { icon: '🥩', text: 'CARNE FRAGEDA 100% CALITATE' },
                ].map((item, i) => (
                  <div key={i} className={`flex items-center justify-center gap-3 py-4 px-5 rounded-[14px] border ${item.accent ? 'border-[#f39c12]/40 bg-[#f39c12]/5' : 'border-white/8 bg-white/[0.02]'}`}>
                    <span className="text-2xl">{item.icon}</span>
                    <span className={`font-condensed font-bold text-sm uppercase tracking-wide ${item.accent ? 'text-[#f39c12]' : 'text-[#b8a99a]'}`}>{item.text}</span>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      <Footer />

      {/* Modal */}
      {modalProduct && typeof window !== 'undefined' && createPortal(
        <ProductModal
          product={modalProduct}
          open={!!modalProduct}
          onClose={() => setModalProduct(null)}
        />,
        document.body
      )}
    </div>
  )
}