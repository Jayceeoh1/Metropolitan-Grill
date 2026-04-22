'use client'
import { useState } from 'react'
import { Plus } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import toast from 'react-hot-toast'
import ProductModal from '@/components/menu/ProductModal'
import { createPortal } from 'react-dom'

const BADGE_STYLES = {
  bestseller: 'badge-gold',
  promo: 'badge-red',
  premium: 'badge-gold',
  nou: 'badge-green',
  family: 'badge-green',
  recomandat: 'badge-green',
  picant: 'badge-red',
}

const BADGE_LABELS = {
  bestseller: 'Best',
  promo: 'Promo',
  premium: 'Premium',
  nou: 'Nou',
  family: 'Family',
  recomandat: 'Recomandat',
  picant: 'Picant',
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
        <div className="h-44 flex items-center justify-center relative bg-[#111] overflow-hidden">
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              className="h-40 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <span className="text-7xl transition-transform duration-300 group-hover:scale-110">{product.icon}</span>
          )}

          {product.badges.length > 0 && (
            <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
              {product.badges.slice(0, 2).map(b => (
                <span key={b} className={BADGE_STYLES[b] || 'badge-green'}>
                  {BADGE_LABELS[b] || b}
                </span>
              ))}
            </div>
          )}

          <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-[#1a1a1a] to-transparent" />
        </div>

        <div className="p-4">
          <h3 className="font-condensed font-bold text-lg uppercase tracking-wide text-white mb-1 leading-tight">
            {product.name}
          </h3>
          <p className="text-xs text-[#7a6e66] leading-relaxed mb-4 line-clamp-2">
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
              className="w-9 h-9 rounded-xl bg-[#c0392b] hover:bg-[#e74c3c] flex items-center justify-center text-white transition-all hover:scale-110 active:scale-95"
            >
              <Plus size={18} />
            </button>
          </div>
        </div>
      </div>

      {modalOpen && typeof window !== 'undefined' && createPortal(
        <ProductModal
          product={product}
          open={modalOpen}
          onClose={() => setModalOpen(false)}
        />,
        document.body
      )}
    </>
  )
}