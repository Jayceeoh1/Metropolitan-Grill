'use client'
import { useState, useMemo } from 'react'
import { Search } from 'lucide-react'
import { PRODUCTS, CATEGORIES } from '@/lib/data'
import ProductCard from '@/components/menu/ProductCard'
import Footer from '@/components/layout/Footer'

const ALL_CATS = [{ id: 'all', name: 'Toate', icon: '🍽' }, ...CATEGORIES]

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState('default')

  const filtered = useMemo(() => {
    let items = PRODUCTS
    if (activeCategory !== 'all') items = items.filter(p => p.category === activeCategory)
    if (search) items = items.filter(p =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase())
    )
    if (sortBy === 'price-asc') items = [...items].sort((a, b) => (a.promo || a.price) - (b.promo || b.price))
    if (sortBy === 'price-desc') items = [...items].sort((a, b) => (b.promo || b.price) - (a.promo || a.price))
    if (sortBy === 'promo') items = items.filter(p => p.promo)
    return items
  }, [activeCategory, search, sortBy])

  return (
    <div className="page-enter pt-16">
      {/* Header */}
      <div className="bg-[#111] border-b border-white/5 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <p className="text-xs font-bold tracking-[3px] uppercase text-[#e74c3c] mb-2">Descoperă</p>
          <h1 className="font-bebas text-5xl sm:text-6xl text-white">
            MENIU <span className="text-[#f39c12]">COMPLET</span>
          </h1>
          <p className="text-[#b8a99a] mt-2">
            {PRODUCTS.length} produse · Personalizabile · Livrare în 30 de minute
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Search + Sort bar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7a6e66]" />
            <input
              type="text"
              placeholder="Caută în meniu..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-[#1a1a1a] border border-white/8 text-white placeholder-[#7a6e66] rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-[#c0392b]/50"
            />
          </div>
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            className="bg-[#1a1a1a] border border-white/8 text-[#b8a99a] rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-[#c0392b]/50 sm:w-48"
          >
            <option value="default">Sortare: Implicit</option>
            <option value="price-asc">Preț: Crescător</option>
            <option value="price-desc">Preț: Descrescător</option>
            <option value="promo">Doar Promoții</option>
          </select>
        </div>

        <div className="flex gap-8 items-start">
          {/* Sidebar */}
          <aside className="hidden lg:block w-56 shrink-0 sticky top-20">
            <div className="bg-[#1a1a1a] border border-white/8 rounded-[18px] p-4">
              <p className="text-xs font-bold uppercase tracking-[2px] text-[#7a6e66] mb-3">Categorii</p>
              <div className="space-y-1">
                {ALL_CATS.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all text-left ${
                      activeCategory === cat.id
                        ? 'bg-[#c0392b]/15 text-[#e74c3c] border-l-2 border-[#c0392b]'
                        : 'text-[#b8a99a] hover:bg-white/5'
                    }`}
                  >
                    <span className="text-lg w-6 text-center">{cat.icon}</span>
                    <span className="font-medium">{cat.name}</span>
                  </button>
                ))}
                <div className="border-t border-white/5 pt-2 mt-2">
                  <p className="text-xs font-bold uppercase tracking-[2px] text-[#7a6e66] mb-2 px-1">Filtre</p>
                  <button
                    onClick={() => setSortBy('promo')}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all text-left ${sortBy === 'promo' ? 'bg-[#c0392b]/15 text-[#e74c3c]' : 'text-[#b8a99a] hover:bg-white/5'}`}
                  >
                    <span className="text-lg w-6 text-center">🔥</span>
                    <span className="font-medium">Promoții Active</span>
                  </button>
                  <button
                    onClick={() => setActiveCategory('all')}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-[#b8a99a] hover:bg-white/5 transition-all text-left"
                  >
                    <span className="text-lg w-6 text-center">⭐</span>
                    <span className="font-medium">Bestseller</span>
                  </button>
                </div>
              </div>
            </div>
          </aside>

          {/* Mobile category chips */}
          <div className="lg:hidden w-full -mt-2 mb-2">
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {ALL_CATS.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all border ${
                    activeCategory === cat.id
                      ? 'bg-[#c0392b] border-[#c0392b] text-white'
                      : 'bg-[#1a1a1a] border-white/8 text-[#b8a99a]'
                  }`}
                >
                  {cat.icon} {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Products grid */}
          <div className="flex-1">
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <span className="text-6xl mb-4">🔍</span>
                <p className="font-condensed text-xl font-bold text-[#7a6e66] uppercase tracking-wide">Niciun produs găsit</p>
                <p className="text-sm text-[#7a6e66] mt-2">Încearcă alt termen de căutare sau categorie</p>
                <button onClick={() => { setSearch(''); setActiveCategory('all') }} className="mt-6 px-6 py-3 bg-[#c0392b]/20 border border-[#c0392b]/30 text-[#e74c3c] rounded-xl font-condensed font-bold text-sm uppercase tracking-wide">
                  Resetează filtrele
                </button>
              </div>
            ) : (
              <>
                <p className="text-sm text-[#7a6e66] mb-5">{filtered.length} produse găsite</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                  {filtered.map(p => <ProductCard key={p.id} product={p} />)}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
