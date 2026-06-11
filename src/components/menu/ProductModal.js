'use client'
import { useState } from 'react'
import { X, Plus, Minus, ShoppingBag } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import { SAUCES, EXTRAS, SPICE_LEVELS } from '@/lib/data'
import toast from 'react-hot-toast'

const SALATE = [
  { id: 'varza', name: 'Varza' }, { id: 'rosii', name: 'Rosii' },
  { id: 'castraveti', name: 'Castraveti' }, { id: 'ceapa', name: 'Ceapa' },
  { id: 'ceapa-crispy', name: 'Ceapa Crispy' }, { id: 'ardei-copt', name: 'Ardei Copt' },
  { id: 'patrunjel', name: 'Patrunjel' }, { id: 'ardei-iute', name: 'Ardei Iute' },
]

const CAT_COLORS = {
  pui: '#f1c40f', vita: '#e74c3c', mixta: '#2ecc71',
  meniu: '#3498db', sides: '#e67e22', bauturi: '#9b59b6',
}

export default function ProductModal({ product, open, onClose }) {
  const addItem = useCartStore(s => s.addItem)
  const [qty, setQty] = useState(1)
  const [selectedSalate, setSelectedSalate] = useState(['varza', 'rosii', 'castraveti', 'ceapa'])
  const [selectedSauces, setSelectedSauces] = useState(['maioneza-usturoi'])
  const [spice, setSpice] = useState('fara')
  const [extras, setExtras] = useState([])

  if (!open || !product) return null

  const accentColor = CAT_COLORS[product.category_id || product.category] || '#f1c40f'
  const price = product.promo_price || product.promo || product.price
  const total = (price + extras.reduce((s, e) => s + (EXTRAS.find(x => x.id === e)?.price || 0), 0)) * qty

  const toggleArr = (arr, setArr, id) =>
    setArr(arr.includes(id) ? arr.filter(x => x !== id) : [...arr, id])

  const handleAdd = () => {
    addItem({ ...product, qty, options: { salate: selectedSalate, sauces: selectedSauces, spice, extras } })
    toast.success(product.name + ' adaugat in cos!')
    window.dispatchEvent(new CustomEvent('openCart'))
    onClose()
  }

  const Chip = ({ id, label, selected, onToggle, color }) => (
    <button onClick={() => onToggle(id)}
      className="px-3 py-1.5 rounded-xl text-xs font-condensed font-bold uppercase tracking-wide transition-all border"
      style={selected ? {
        background: `${color}25`,
        borderColor: `${color}80`,
        color: color,
        boxShadow: `0 0 8px ${color}30`,
      } : {
        background: 'rgba(255,255,255,0.03)',
        borderColor: 'rgba(255,255,255,0.1)',
        color: '#7a6e66',
      }}>
      {label}
    </button>
  )

  return (
    <div className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center p-0 sm:p-4"
      style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(10px)' }}
      onClick={e => e.target === e.currentTarget && onClose()}>

      <div className="w-full sm:max-w-lg max-h-[92vh] overflow-y-auto sm:rounded-[24px] rounded-t-[24px]"
        style={{
          background: 'linear-gradient(160deg, #141414 0%, #0a0a0a 100%)',
          border: `1.5px solid ${accentColor}30`,
          boxShadow: `0 0 40px ${accentColor}15, 0 25px 60px rgba(0,0,0,0.8)`,
        }}>

        {/* Image header */}
        <div className="relative h-52 flex items-center justify-center overflow-hidden rounded-t-[24px] sm:rounded-t-[24px]"
          style={{ background: `linear-gradient(160deg, ${accentColor}15 0%, #0a0a0a 100%)` }}>
          {product.image_url || product.image ? (
            <img src={product.image_url || product.image} alt={product.name}
              className="h-44 w-auto object-contain"
              style={{ filter: `drop-shadow(0 10px 30px ${accentColor}60)` }} />
          ) : (
            <span className="text-8xl" style={{ filter: `drop-shadow(0 10px 30px ${accentColor}40)` }}>{product.icon}</span>
          )}
          {/* Glow */}
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: `radial-gradient(ellipse at 50% 80%, ${accentColor}15 0%, transparent 60%)` }} />
          {/* Close button */}
          <button onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-xl flex items-center justify-center transition-all hover:scale-110"
            style={{ background: 'rgba(0,0,0,0.6)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }}>
            <X size={16} />
          </button>
          {/* Category badge */}
          <div className="absolute top-4 left-4 font-bebas text-xs px-3 py-1 rounded-lg"
            style={{ background: `${accentColor}20`, border: `1px solid ${accentColor}50`, color: accentColor }}>
            {product.category_id || product.category}
          </div>
        </div>

        {/* Content */}
        <div className="p-5 space-y-5">
          {/* Title & price */}
          <div>
            <h2 className="font-bebas text-3xl text-white tracking-wide">{product.name}</h2>
            <p className="text-sm mt-1 leading-relaxed" style={{ color: '#b8a99a' }}>{product.description}</p>
            <div className="flex items-center gap-3 mt-2">
              {product.weight && <span className="text-xs px-2 py-1 rounded-lg" style={{ background: 'rgba(255,255,255,0.05)', color: '#7a6e66' }}>{product.weight}</span>}
              {(product.kcal) && <span className="text-xs px-2 py-1 rounded-lg" style={{ background: 'rgba(255,255,255,0.05)', color: '#7a6e66' }}>{product.kcal} kcal</span>}
              {product.allergens && <span className="text-xs px-2 py-1 rounded-lg" style={{ background: 'rgba(231,76,60,0.1)', color: '#e74c3c' }}>⚠ {product.allergens}</span>}
            </div>
          </div>

          {/* Salate */}
          {!['sides', 'bauturi'].includes(product.category_id || product.category) && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-condensed font-bold text-xs uppercase tracking-[2px]" style={{ color: accentColor }}>Salate la alegere</h3>
                <span className="text-xs" style={{ color: '#7a6e66' }}>Selectie multipla</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {SALATE.map(s => <Chip key={s.id} id={s.id} label={s.name} selected={selectedSalate.includes(s.id)} onToggle={id => toggleArr(selectedSalate, setSelectedSalate, id)} color={accentColor} />)}
              </div>
            </div>
          )}

          {/* Sosuri */}
          {!['sides', 'bauturi'].includes(product.category_id || product.category) && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-condensed font-bold text-xs uppercase tracking-[2px]" style={{ color: accentColor }}>Sosuri la alegere</h3>
                <span className="text-xs" style={{ color: '#7a6e66' }}>Selectie multipla</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {SAUCES.map(s => <Chip key={s.id} id={s.id} label={s.name} selected={selectedSauces.includes(s.id)} onToggle={id => toggleArr(selectedSauces, setSelectedSauces, id)} color={accentColor} />)}
              </div>
            </div>
          )}

          {/* Nivel picant */}
          {!['sides', 'bauturi'].includes(product.category_id || product.category) && (
            <div>
              <h3 className="font-condensed font-bold text-xs uppercase tracking-[2px] mb-2" style={{ color: accentColor }}>Nivel Picant</h3>
              <div className="flex flex-wrap gap-2">
                {SPICE_LEVELS.map(s => (
                  <button key={s.id} onClick={() => setSpice(s.id)}
                    className="px-3 py-1.5 rounded-xl text-xs font-condensed font-bold uppercase tracking-wide transition-all border"
                    style={spice === s.id ? { background: `${accentColor}25`, borderColor: `${accentColor}80`, color: accentColor } : { background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.1)', color: '#7a6e66' }}>
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Extra */}
          <div>
            <h3 className="font-condensed font-bold text-xs uppercase tracking-[2px] mb-2" style={{ color: accentColor }}>Extra Ingrediente</h3>
            <div className="flex flex-wrap gap-2">
              {EXTRAS.map(e => (
                <button key={e.id} onClick={() => toggleArr(extras, setExtras, e.id)}
                  className="px-3 py-1.5 rounded-xl text-xs font-condensed font-bold uppercase tracking-wide transition-all border"
                  style={extras.includes(e.id) ? { background: `${accentColor}25`, borderColor: `${accentColor}80`, color: accentColor } : { background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.1)', color: '#7a6e66' }}>
                  + {e.name} (+{e.price} lei)
                </button>
              ))}
            </div>
          </div>

          {/* Qty + Add */}
          <div className="flex items-center gap-3 pt-2" style={{ borderTop: `1px solid rgba(255,255,255,0.06)` }}>
            <div className="flex items-center gap-2 rounded-xl p-1" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <button onClick={() => qty > 1 && setQty(q => q - 1)}
                className="w-8 h-8 rounded-lg flex items-center justify-center transition-all hover:scale-110"
                style={{ background: qty > 1 ? `${accentColor}20` : 'transparent', color: qty > 1 ? accentColor : '#7a6e66' }}>
                <Minus size={14} />
              </button>
              <span className="w-8 text-center font-bebas text-xl text-white">{qty}</span>
              <button onClick={() => setQty(q => q + 1)}
                className="w-8 h-8 rounded-lg flex items-center justify-center transition-all hover:scale-110"
                style={{ background: `${accentColor}20`, color: accentColor }}>
                <Plus size={14} />
              </button>
            </div>

            <button onClick={handleAdd}
              className="flex-1 flex items-center justify-between px-5 py-3 rounded-xl font-condensed font-bold text-base uppercase tracking-wide transition-all hover:scale-[1.02] active:scale-[0.98]"
              style={{
                background: `linear-gradient(135deg, ${accentColor}, ${accentColor}cc)`,
                color: '#000',
                boxShadow: `0 0 20px ${accentColor}40`,
              }}>
              <div className="flex items-center gap-2">
                <ShoppingBag size={16} />
                Adauga in Cos
              </div>
              <span className="font-bebas text-xl">{total} LEI</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}