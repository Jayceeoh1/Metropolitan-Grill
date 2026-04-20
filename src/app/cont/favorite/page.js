'use client'
import { useCartStore } from '@/store/cartStore'
import { PRODUCTS } from '@/lib/data'
import toast from 'react-hot-toast'

const FAVS = [
  { id: 2, icon: '🌯', name: 'Shaorma Vită Premium', desc: 'Carne vită · Sos samurai', price: 39 },
  { id: 5, icon: '🍔', name: 'Burger BBQ Grill', desc: 'Carne vită 180g · Cheddar · Sos BBQ', price: 35 },
  { id: 8, icon: '🎁', name: 'Family Bucket Metropolitan', desc: '4 shaorme + 2 garnituri + 4 băuturi', price: 149 },
]

export default function FavoritePage() {
  const addItem = useCartStore(s => s.addItem)

  const add = (fav) => {
    const p = PRODUCTS.find(x => x.id === fav.id) || { ...fav, category: 'shaorma', badges: [], description: fav.desc, ingredients: [], allergens: '', weight: '', kcal: null }
    addItem(p)
    toast.success(`${fav.icon} ${fav.name} adăugat în coș!`)
    window.dispatchEvent(new CustomEvent('openCart'))
  }

  return (
    <div className="bg-[#1a1a1a] border border-white/8 rounded-[18px] p-7">
      <h2 className="font-condensed font-bold text-xl uppercase tracking-wide text-white mb-6 pb-4 border-b border-white/8">Produsele Mele Favorite</h2>
      <div className="space-y-3">
        {FAVS.map(fav => (
          <div key={fav.id} className="flex items-center gap-4 bg-white/[0.03] border border-white/8 rounded-[14px] p-4">
            <div className="w-14 h-14 rounded-xl bg-[#111] flex items-center justify-center text-3xl shrink-0">{fav.icon}</div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-white truncate">{fav.name}</p>
              <p className="text-xs text-[#7a6e66] mt-0.5">{fav.desc}</p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <span className="font-bebas text-2xl text-[#f39c12]">{fav.price} lei</span>
              <button
                onClick={() => add(fav)}
                className="w-9 h-9 rounded-xl bg-[#c0392b] hover:bg-[#e74c3c] flex items-center justify-center text-white transition-all text-xl"
              >+</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
