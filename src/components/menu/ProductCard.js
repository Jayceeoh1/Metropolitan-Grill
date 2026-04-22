'use client'
import { useState } from 'react'
import { Plus } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import toast from 'react-hot-toast'
import ProductModal from '@/components/menu/ProductModal'
import { createPortal } from 'react-dom'

const BADGE_STYLES = {
  bestseller: 'badge-gold', promo: 'badge-red', premium: 'badge-gold',
  nou: 'badge-green', family: 'badge-green', recomandat: 'badge-green', picant: 'badge-red',
}
const BADGE_LABELS = {
  bestseller: 'Best', promo: 'Promo', premium: 'Premium',
  nou: 'Nou', family: 'Family', recomandat: 'Recomandat', picant: 'Picant',
}

export default function ProductCard({ product }) {
  const [modalOpen, setModalOpen] = useState(false)
  const addItem = useCartStore(s => s.addItem)

  const handleQuickAdd = (e) => {
    e.stopPropagation()
    addItem(product)
    toast.success(product.name + ' adaugat in cos!')
    window.dispatchEvent(new CustomEvent('openCart'))
  }

  const displayPrice = product.promo || product.price

  return (
    <>
      <div
        className="product-card bg-[#1a1a1a] border border-white/8 rounded-[18px] overflow-hidden cursor-pointer group"
        onClick={() => setModalOpen(true)}
      >
        {/* Image area */}
        <div className="h-48 flex items-center justify-center relative bg-gradient-to-br from-[#222] to-[#1a1a1a] overflow-hidden">
          {product.image ? (
            <>
              {/* Imagine cu zoom la hover */}
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                style={{ objectPosition: 'center' }}
              />
              {/* Overlay gradient jos */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-transparent to-transparent opacity-80" />
              {/* Overlay rosu la hover */}
              <div className="absolute inset-0 bg-[#c0392b]/0 group-hover:bg-[#c0392b]/10 transition-all duration-300" />
            </>
          ) : (
            <span className="text-7xl transition-transform duration-300 group-hover:scale-110">{product.icon}</span>
          )}

          {/* Badges */}
          {product.badges.length > 0 && (
            <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
              {product.badges.slice(0, 2).map(b => (
                <span key={b} className={BADGE_STYLES[b] || 'badge-green'}>
                  {BADGE_LABELS[b] || b}
                </span>
              ))}
            </div>
          )}

          {/* Buton adauga apare la hover pe imagine */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 z-10">
            <div className="bg-[#c0392b] text-white font-condensed font-bold text-sm uppercase tracking-wide px-5 py-2 rounded-xl shadow-xl transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
              Vezi Detalii
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-4">
          <h3 className="font-condensed font-bold text-lg uppercase tracking-wide text-white mb-1 leading-tight group-hover:text-[#f39c12] transition-colors duration-200">
            {product.name}
          </h3>
          <p className="text-xs text-[#7a6e66] leading-relaxed mb-3 line-clamp-2">
            {product.description}
          </p>
          {product.weight && (
            <p className="text-xs text-[#7a6e66] mb-3">{product.weight} · {product.kcal ? product.kcal + ' kcal' : 'Combo'}</p>
          )}

          <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-2">
              <span className="font-bebas text-2xl text-[#f39c12]">{displayPrice} lei</span>
              {product.promo && (
                <span className="text-sm text-[#7a6e66] line-through">{product.price} lei</span>
              )}
            </div>
            <button
              onClick={handleQuickAdd}
              className="w-9 h-9 rounded-xl bg-[#c0392b] hover:bg-[#e74c3c] flex items-center justify-center text-white transition-all hover:scale-110 active:scale-95 shadow-lg shadow-red-900/30"
            >
              <Plus size={18} />
            </button>
          </div>
        </div>
      </div>

      {modalOpen && typeof window !== 'undefined' && createPortal(
        <ProductModal product={product} open={modalOpen} onClose={() => setModalOpen(false)} />,
        document.body
      )}
    </>
  )
}