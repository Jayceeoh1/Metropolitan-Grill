'use client'
import { useEffect, useState } from 'react'
import { X, Minus, Plus, ShoppingBag, ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useCartStore } from '@/store/cartStore'

export default function CartDrawer() {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const { items, updateQty, removeItem } = useCartStore()
  const subtotal = items.reduce((s, i) => s + (i.promo || i.price) * i.qty, 0)
  const deliveryFee = subtotal >= 80 ? 0 : 7
  const total = subtotal + deliveryFee

  useEffect(() => {
    const handler = () => setOpen(true)
    window.addEventListener('openCart', handler)
    return () => window.removeEventListener('openCart', handler)
  }, [])

  const close = () => setOpen(false)
  const goCheckout = () => { close(); router.push('/checkout') }

  return (
    <>
      {/* Overlay */}
      <div
        onClick={close}
        className={`fixed inset-0 bg-black/70 z-[200] transition-opacity duration-300 ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      />

      {/* Drawer */}
      <div className={`fixed top-0 right-0 bottom-0 w-full max-w-[420px] bg-[#111] border-l border-white/8 z-[201] flex flex-col transition-transform duration-350 ease-[cubic-bezier(0.4,0,0.2,1)] ${open ? 'translate-x-0' : 'translate-x-full'}`}>
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/8">
          <h2 className="font-bebas text-2xl text-white tracking-wide">COȘUL TĂU</h2>
          <button onClick={close} className="w-8 h-8 rounded-lg bg-white/5 border border-white/8 flex items-center justify-center text-[#b8a99a] hover:text-white transition-colors">
            <X size={16} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingBag size={56} className="text-white/10 mb-4" />
              <p className="font-condensed text-lg font-bold text-[#7a6e66] uppercase tracking-wide">Coșul e gol</p>
              <p className="text-sm text-[#7a6e66] mt-1">Adaugă produse din meniu</p>
              <button
                onClick={() => { close(); router.push('/meniu') }}
                className="mt-6 px-6 py-3 bg-[#c0392b] hover:bg-[#e74c3c] text-white font-condensed font-bold text-sm rounded-xl uppercase tracking-wide transition-all"
              >
                Vezi Meniu
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {items.map(item => (
                <div key={item.key} className="flex gap-3 py-3 border-b border-white/5">
                  <div className="w-12 h-12 rounded-xl bg-[#1a1a1a] flex items-center justify-center text-2xl shrink-0">
                    {item.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-white truncate">{item.name}</p>
                    {item.options?.sauce && (
                      <p className="text-xs text-[#7a6e66] mt-0.5">{item.options.sauce}</p>
                    )}
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQty(item.key, item.qty - 1)}
                          className="w-6 h-6 rounded-md bg-white/5 flex items-center justify-center text-[#b8a99a] hover:bg-[#c0392b] hover:text-white transition-all"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="text-sm font-semibold text-white w-5 text-center">{item.qty}</span>
                        <button
                          onClick={() => updateQty(item.key, item.qty + 1)}
                          className="w-6 h-6 rounded-md bg-white/5 flex items-center justify-center text-[#b8a99a] hover:bg-[#c0392b] hover:text-white transition-all"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                      <span className="font-bebas text-xl text-[#f39c12]">{(item.promo || item.price) * item.qty} lei</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-6 py-4 border-t border-white/8">
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-[#b8a99a]">Subtotal:</span>
                <span className="text-white">{subtotal} lei</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#b8a99a]">Transport:</span>
                <span className={deliveryFee === 0 ? 'text-green-400' : 'text-white'}>
                  {deliveryFee === 0 ? 'GRATUIT 🎉' : `${deliveryFee} lei`}
                </span>
              </div>
              {subtotal < 80 && (
                <p className="text-xs text-[#7a6e66]">
                  Adaugă {80 - subtotal} lei pentru livrare gratuită
                </p>
              )}
            </div>
            <div className="flex justify-between items-center mb-4">
              <span className="font-condensed font-bold text-lg uppercase text-white">Total:</span>
              <span className="font-bebas text-3xl text-[#f39c12]">{total} lei</span>
            </div>
            <button
              onClick={goCheckout}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#c0392b] to-[#96251e] hover:from-[#e74c3c] hover:to-[#c0392b] text-white font-condensed font-bold text-lg uppercase tracking-widest py-4 rounded-xl transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-red-900/40"
            >
              Finalizează Comanda <ArrowRight size={18} />
            </button>
          </div>
        )}
      </div>
    </>
  )
}
