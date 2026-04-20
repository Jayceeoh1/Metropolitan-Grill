'use client'
import { useCartStore } from '@/store/cartStore'
import { PRODUCTS } from '@/lib/data'
import toast from 'react-hot-toast'

const ORDERS = [
  { id: '#MG-2025-00847', date: 'Astăzi · 20:10', items: 'Shaorma Vită Premium, Inele de ceapă, Ayran', total: 54, status: 'prep', statusLabel: '⏳ În preparare' },
  { id: '#MG-2025-00846', date: '15 Ian 2025 · 19:34', items: 'Shaorma Pui Clasică ×2, Cartofi prăjiți, Cola', total: 68, status: 'done', statusLabel: '✓ Livrat' },
  { id: '#MG-2025-00802', date: '12 Ian 2025 · 13:15', items: 'Meniu Duo Metropolitan, Sos Samurai ×2', total: 89, status: 'done', statusLabel: '✓ Livrat' },
]

const STATUS_STYLES = {
  prep: 'bg-yellow-900/20 text-yellow-400 border border-yellow-800/30',
  done: 'bg-green-900/20 text-green-400 border border-green-800/30',
  new: 'bg-blue-900/20 text-blue-400 border border-blue-800/30',
}

export default function ComenziPage() {
  const addItem = useCartStore(s => s.addItem)

  const reorder = () => {
    addItem(PRODUCTS[0])
    toast.success('Produse adăugate în coș!')
    window.dispatchEvent(new CustomEvent('openCart'))
  }

  return (
    <div className="bg-[#1a1a1a] border border-white/8 rounded-[18px] p-7">
      <h2 className="font-condensed font-bold text-xl uppercase tracking-wide text-white mb-6 pb-4 border-b border-white/8">Comenzile Mele</h2>
      <div className="space-y-4">
        {ORDERS.map(order => (
          <div key={order.id} className="bg-white/[0.03] border border-white/8 rounded-[14px] p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="font-condensed font-bold text-base text-white">{order.id}</span>
              <span className={`text-xs font-bold px-3 py-1 rounded-full ${STATUS_STYLES[order.status]}`}>{order.statusLabel}</span>
            </div>
            <p className="text-xs text-[#7a6e66] mb-2">{order.date}</p>
            <p className="text-sm text-[#b8a99a] mb-4">{order.items}</p>
            <div className="flex items-center justify-between">
              <span className="font-bebas text-2xl text-[#f39c12]">{order.total} lei</span>
              <button
                onClick={reorder}
                className="text-sm border border-[#c0392b]/30 text-[#e74c3c] px-4 py-2 rounded-lg font-condensed font-bold hover:bg-[#c0392b]/10 transition-all"
              >
                ↺ Recomandă
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
