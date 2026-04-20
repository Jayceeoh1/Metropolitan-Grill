'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useCartStore } from '@/store/cartStore'
import { createClient } from '@/lib/supabase/client'
import toast from 'react-hot-toast'
import Footer from '@/components/layout/Footer'

const inp = 'w-full bg-white/5 border border-white/8 text-white placeholder-[#7a6e66] rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-[#c0392b]/50'

export default function CheckoutPage() {
  const router = useRouter()
  const { items, clearCart } = useCartStore()
  const [loading, setLoading] = useState(false)
  const [deliveryType, setDeliveryType] = useState('livrare')

  const [numeComplet, setNumeComplet] = useState('')
  const [telefon, setTelefon] = useState('')
  const [strada, setStrada] = useState('')
  const [numar, setNumar] = useState('')
  const [bloc, setBloc] = useState('')
  const [scara, setScara] = useState('')
  const [apartament, setApartament] = useState('')
  const [codInterfon, setCodInterfon] = useState('')
  const [instructiuni, setInstructiuni] = useState('')

  const subtotal = items.reduce((s, i) => s + (i.promo || i.price) * i.qty, 0)
  const deliveryFee = deliveryType === 'ridicare' ? 0 : 0
  const total = subtotal + deliveryFee

  const handleOrder = async (e) => {
    e.preventDefault()
    if (items.length === 0) { toast.error('Cosul este gol!'); return }

    setLoading(true)
    const supabase = createClient()

    const { data, error } = await supabase
      .from('orders')
      .insert({
        full_name: numeComplet,
        phone: telefon,
        delivery_type: deliveryType,
        localitate: 'Gaesti',
        judet: 'Dambovita',
        strada: deliveryType === 'livrare' ? strada : null,
        numar: deliveryType === 'livrare' ? numar : null,
        bloc: bloc || null,
        scara: scara || null,
        apartament: apartament || null,
        cod_interfon: codInterfon || null,
        instructiuni: instructiuni || null,
        interval_orar: 'cat-mai-curand',
        payment_method: 'numerar',
        items: items.map(i => ({
          id: i.id, name: i.name,
          price: i.promo || i.price,
          qty: i.qty,
          options: i.options || {},
          icon: i.icon,
        })),
        subtotal,
        delivery_fee: deliveryFee,
        discount_amount: 0,
        tip: 0,
        total,
        status: 'new',
      })
      .select()
      .single()

    setLoading(false)

    if (error) {
      console.error(error)
      toast.error('Eroare la plasarea comenzii. Incearca din nou.')
      return
    }

    clearCart()
    router.push('/confirmare?nr=' + data.order_number)
  }

  return (
    <div className="page-enter pt-16">
      <div className="bg-[#111] border-b border-white/5 py-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h1 className="font-bebas text-5xl sm:text-6xl text-white">
            FINALIZEAZA <span className="text-[#f39c12]">COMANDA</span>
          </h1>
          <p className="text-[#b8a99a] mt-2">Livrare in Gaesti · Plata numerar la livrare</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        <form onSubmit={handleOrder}>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8 items-start">
            <div className="space-y-5">

              {/* Tip livrare */}
              <div className="bg-[#1a1a1a] border border-white/8 rounded-[18px] p-6">
                <h2 className="font-condensed font-bold text-lg uppercase tracking-wide text-white mb-5 pb-3 border-b border-white/8">
                  Tip Livrare
                </h2>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { val: 'livrare', icon: '🛵', label: 'Livrare la adresa' },
                    { val: 'ridicare', icon: '🏪', label: 'Ridicare din local' },
                  ].map(opt => (
                    <button key={opt.val} type="button" onClick={() => setDeliveryType(opt.val)}
                      className={`flex flex-col items-center gap-2 py-5 rounded-xl border-2 transition-all ${deliveryType === opt.val ? 'border-[#c0392b] bg-[#c0392b]/10' : 'border-white/8 hover:border-white/20'}`}>
                      <span className="text-3xl">{opt.icon}</span>
                      <span className="text-sm font-semibold text-white">{opt.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Date contact */}
              <div className="bg-[#1a1a1a] border border-white/8 rounded-[18px] p-6">
                <h2 className="font-condensed font-bold text-lg uppercase tracking-wide text-white mb-5 pb-3 border-b border-white/8">
                  Date Contact
                </h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wide text-[#7a6e66] mb-1.5">Nume Complet</label>
                      <input required className={inp} placeholder="Ion Popescu" value={numeComplet} onChange={e => setNumeComplet(e.target.value)} />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wide text-[#7a6e66] mb-1.5">Telefon</label>
                      <input required className={inp} placeholder="07XX XXX XXX" value={telefon} onChange={e => setTelefon(e.target.value)} />
                    </div>
                  </div>

                  {deliveryType === 'livrare' && (
                    <>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="col-span-2">
                          <label className="block text-xs font-bold uppercase tracking-wide text-[#7a6e66] mb-1.5">Strada</label>
                          <input required className={inp} placeholder="Str. 13 Decembrie" value={strada} onChange={e => setStrada(e.target.value)} />
                        </div>
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wide text-[#7a6e66] mb-1.5">Numar</label>
                          <input required className={inp} placeholder="69" value={numar} onChange={e => setNumar(e.target.value)} />
                        </div>
                      </div>

                      <div className="grid grid-cols-4 gap-3">
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wide text-[#7a6e66] mb-1.5">Bloc</label>
                          <input className={inp} placeholder="A2" value={bloc} onChange={e => setBloc(e.target.value)} />
                        </div>
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wide text-[#7a6e66] mb-1.5">Scara</label>
                          <input className={inp} placeholder="1" value={scara} onChange={e => setScara(e.target.value)} />
                        </div>
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wide text-[#7a6e66] mb-1.5">Apart.</label>
                          <input className={inp} placeholder="14" value={apartament} onChange={e => setApartament(e.target.value)} />
                        </div>
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wide text-[#7a6e66] mb-1.5">Interfon</label>
                          <input className={inp} placeholder="1234" value={codInterfon} onChange={e => setCodInterfon(e.target.value)} />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wide text-[#7a6e66] mb-1.5">Mentiuni (optional)</label>
                        <textarea rows={2} className={inp + ' resize-none'} placeholder="Ex: Sunati la interfon, etaj 2..." value={instructiuni} onChange={e => setInstructiuni(e.target.value)} />
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Info plata */}
              <div className="bg-[#1a1a1a] border border-white/8 rounded-[18px] p-5 flex items-center gap-4">
                <span className="text-4xl">💵</span>
                <div>
                  <p className="font-condensed font-bold text-base uppercase tracking-wide text-white">Plata numerar la livrare</p>
                  <p className="text-sm text-[#7a6e66]">Platesti curierului cand primesti comanda</p>
                </div>
              </div>

            </div>

            {/* Sumar */}
            <div className="bg-[#1a1a1a] border border-white/8 rounded-[18px] p-6 sticky top-20">
              <h2 className="font-condensed font-bold text-lg uppercase tracking-wide text-white mb-5 pb-3 border-b border-white/8">
                Sumar Comanda
              </h2>

              {items.length === 0 ? (
                <p className="text-sm text-[#7a6e66] text-center py-6">Cosul este gol</p>
              ) : (
                <div className="space-y-2 mb-4">
                  {items.map(item => (
                    <div key={item.key} className="flex justify-between items-center py-2 border-b border-white/5">
                      <span className="text-sm text-[#b8a99a] flex items-center gap-2">
                        <span>{item.icon}</span>
                        <span className="truncate max-w-[150px]">{item.name} x{item.qty}</span>
                      </span>
                      <span className="text-sm font-semibold text-white shrink-0">
                        {(item.promo || item.price) * item.qty} lei
                      </span>
                    </div>
                  ))}
                </div>
              )}

              <div className="space-y-2 border-t border-white/8 pt-4">
                <div className="flex justify-between text-sm">
                  <span className="text-[#b8a99a]">Subtotal:</span>
                  <span className="text-white">{subtotal} lei</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#b8a99a]">Transport:</span>
                  <span className="text-green-400">GRATUIT</span>
                </div>
              </div>

              <div className="flex justify-between items-center border-t border-white/8 pt-4 mt-4">
                <span className="font-condensed font-bold text-lg uppercase text-white">Total:</span>
                <span className="font-bebas text-4xl text-[#f39c12]">{total} lei</span>
              </div>

              <button type="submit" disabled={loading}
                className="w-full mt-5 bg-gradient-to-r from-[#c0392b] to-[#96251e] hover:from-[#e74c3c] hover:to-[#c0392b] disabled:opacity-50 text-white font-condensed font-bold text-xl uppercase tracking-widest py-4 rounded-xl transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-red-900/40">
                {loading ? 'Se trimite...' : 'Plaseaza Comanda'}
              </button>
              <p className="text-center text-xs text-[#7a6e66] mt-3">
                Datele tale sunt in siguranta
              </p>
            </div>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  )
}