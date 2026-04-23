'use client'
import { useState } from 'react'
import { X, Plus, Minus } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import toast from 'react-hot-toast'
import { EXTRAS, SPICE_LEVELS } from '@/lib/data'

const SAUCES = [
  { id: 'maioneza-usturoi', name: 'Maioneza Usturoi' },
  { id: 'maioneza-simpla', name: 'Maioneza Simpla' },
  { id: 'sos-curry', name: 'Sos Curry' },
  { id: 'sos-branza', name: 'Sos Branza' },
  { id: 'maioneza-picanta', name: 'Maioneza Picanta' },
  { id: 'ketchup-dulce', name: 'Ketchup Dulce' },
  { id: 'ketchup-picant', name: 'Ketchup Picant' },
]

const SALADS = [
  { id: 'varza', name: 'Varza' },
  { id: 'rosii', name: 'Rosii' },
  { id: 'castraveti', name: 'Castraveti' },
  { id: 'ceapa', name: 'Ceapa' },
  { id: 'ceapa-crispy', name: 'Ceapa Crispy' },
  { id: 'ardei-copt', name: 'Ardei Copt' },
  { id: 'patrunjel', name: 'Patrunjel' },
  { id: 'ardei-iute', name: 'Ardei Iute' },
]

export default function ProductModal({ product, open, onClose }) {
  const addItem = useCartStore(s => s.addItem)
  const [selectedSauces, setSelectedSauces] = useState(['maioneza-usturoi'])
  const [selectedSalads, setSelectedSalads] = useState(['varza', 'rosii', 'castraveti', 'ceapa'])
  const [selectedSpice, setSelectedSpice] = useState('fara')
  const [selectedExtras, setSelectedExtras] = useState([])
  const [qty, setQty] = useState(1)

  if (!open || !product) return null

  const extrasTotal = selectedExtras.reduce((sum, id) => {
    const e = EXTRAS.find(x => x.id === id)
    return sum + (e?.price || 0)
  }, 0)

  const basePrice = product.promo || product.price
  const totalPrice = (basePrice + extrasTotal) * qty

  const toggleSauce = (id) => {
    setSelectedSauces(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    )
  }

  const toggleSalad = (id) => {
    setSelectedSalads(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    )
  }

  const toggleExtra = (id) => {
    setSelectedExtras(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    )
  }

  const handleAdd = () => {
    const sauceNames = selectedSauces.map(id => SAUCES.find(s => s.id === id)?.name).filter(Boolean)
    addItem(product, {
      sauces: sauceNames,
      salads: selectedSalads,
      spice: SPICE_LEVELS.find(s => s.id === selectedSpice)?.label,
      extras: selectedExtras,
      qty,
    })
    toast.success(product.name + ' adaugat in cos!')
    window.dispatchEvent(new CustomEvent('openCart'))
    onClose()
  }

  const showOptions = ['pui', 'vita', 'mixta', 'meniu'].includes(product.category)
  const showSpice = ['pui', 'vita', 'mixta'].includes(product.category)

  const chipClass = (selected) =>
    `px-3 py-1.5 rounded-lg text-sm transition-all border cursor-pointer select-none ${
      selected
        ? 'bg-[#c0392b]/20 border-[#c0392b]/40 text-[#e74c3c]'
        : 'bg-white/4 border-white/8 text-[#b8a99a] hover:border-white/20'
    }`

  return (
    <div
      className="fixed inset-0 bg-black/80 z-[300] flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-[#111] border border-white/8 rounded-[24px] w-full max-w-lg max-h-[90vh] overflow-y-auto">

        {/* Image */}
        <div className="h-48 flex items-center justify-center bg-[#111] rounded-t-[24px] relative overflow-hidden">
          {product.image ? (
            <img src={product.image} alt={product.name} className="h-40 w-auto object-contain drop-shadow-2xl" />
          ) : (
            <span className="text-[90px]">{product.icon}</span>
          )}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-xl bg-black/40 flex items-center justify-center text-white/60 hover:text-white transition-colors border border-white/10"
          >
            <X size={16} />
          </button>
        </div>

        <div className="p-6">
          {/* Title */}
          <div className="flex flex-wrap gap-1.5 mb-2">
            {product.badges.map(b => (
              <span key={b} className="badge-gold">{b}</span>
            ))}
          </div>
          <h2 className="font-bebas text-3xl text-white mb-1">{product.name}</h2>
          <p className="text-sm text-[#b8a99a] leading-relaxed mb-1">{product.description}</p>
          {product.weight && (
            <p className="text-xs text-[#7a6e66] mb-1">{product.weight} {product.kcal ? '· ' + product.kcal + ' kcal' : ''}</p>
          )}
          {product.allergens && (
            <p className="text-xs text-[#7a6e66] mb-4">Alergeni: {product.allergens}</p>
          )}

          {showOptions && (
            <>
              {/* Salate */}
              <div className="mb-5">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs font-bold uppercase tracking-widest text-[#7a6e66]">Salate la alegere</p>
                  <span className="text-xs text-[#c0392b]">Selectie multipla</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {SALADS.map(s => (
                    <button
                      key={s.id}
                      onClick={() => toggleSalad(s.id)}
                      className={chipClass(selectedSalads.includes(s.id))}
                    >
                      {s.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sosuri */}
              <div className="mb-5">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs font-bold uppercase tracking-widest text-[#7a6e66]">Sosuri la alegere</p>
                  <span className="text-xs text-[#c0392b]">Selectie multipla</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {SAUCES.map(s => (
                    <button
                      key={s.id}
                      onClick={() => toggleSauce(s.id)}
                      className={chipClass(selectedSauces.includes(s.id))}
                    >
                      {s.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Nivel picant */}
              {showSpice && (
                <div className="mb-5">
                  <p className="text-xs font-bold uppercase tracking-widest text-[#7a6e66] mb-2">Nivel Picant</p>
                  <div className="flex flex-wrap gap-2">
                    {SPICE_LEVELS.map(s => (
                      <button
                        key={s.id}
                        onClick={() => setSelectedSpice(s.id)}
                        className={chipClass(selectedSpice === s.id)}
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

          {/* Ingrediente */}
          {product.ingredients.length > 0 && (
            <div className="mb-5">
              <p className="text-xs font-bold uppercase tracking-widest text-[#7a6e66] mb-2">Ingrediente</p>
              <div className="flex flex-wrap gap-1.5">
                {product.ingredients.map(ing => (
                  <span key={ing} className="text-xs bg-white/5 border border-white/8 rounded-full px-3 py-1 text-[#b8a99a]">
                    {ing}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Extra */}
          <div className="mb-6">
            <p className="text-xs font-bold uppercase tracking-widest text-[#7a6e66] mb-2">Extra ingrediente</p>
            <div className="flex flex-wrap gap-2">
              {EXTRAS.map(e => (
                <button
                  key={e.id}
                  onClick={() => toggleExtra(e.id)}
                  className={chipClass(selectedExtras.includes(e.id))}
                >
                  + {e.name} (+{e.price} lei)
                </button>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-white/8">
            <div>
              <span className="font-bebas text-4xl text-[#f39c12]">{totalPrice} lei</span>
              {product.promo && (
                <span className="text-sm text-[#7a6e66] line-through ml-2">{product.price * qty} lei</span>
              )}
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-[#b8a99a] hover:bg-white/10 transition-all"
                >
                  <Minus size={14} />
                </button>
                <span className="font-bold text-white w-6 text-center">{qty}</span>
                <button
                  onClick={() => setQty(qty + 1)}
                  className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-[#b8a99a] hover:bg-white/10 transition-all"
                >
                  <Plus size={14} />
                </button>
              </div>
              <button
                onClick={handleAdd}
                className="px-6 py-3 bg-gradient-to-r from-[#c0392b] to-[#96251e] hover:from-[#e74c3c] hover:to-[#c0392b] text-white font-condensed font-bold text-base uppercase tracking-wide rounded-xl transition-all hover:-translate-y-0.5"
              >
                Adauga in Cos
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}