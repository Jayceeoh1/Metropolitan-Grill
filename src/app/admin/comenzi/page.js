'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import toast from 'react-hot-toast'

const STATUS_LABELS = {
  new: 'Noua',
  accepted: 'Acceptata',
  preparing: 'In preparare',
  ready: 'Gata',
  delivery: 'La livrare',
  delivered: 'Livrata',
  cancelled: 'Anulata',
}

const STATUS_STYLE = {
  new: 'bg-blue-900/20 text-blue-400 border-blue-800/30',
  accepted: 'bg-purple-900/20 text-purple-400 border-purple-800/30',
  preparing: 'bg-yellow-900/20 text-yellow-400 border-yellow-800/30',
  ready: 'bg-orange-900/20 text-orange-400 border-orange-800/30',
  delivery: 'bg-indigo-900/20 text-indigo-400 border-indigo-800/30',
  delivered: 'bg-green-900/20 text-green-400 border-green-800/30',
  cancelled: 'bg-red-900/20 text-red-400 border-red-800/30',
}

const NEXT_STATUS = {
  new: 'accepted',
  accepted: 'preparing',
  preparing: 'ready',
  ready: 'delivery',
  delivery: 'delivered',
}

const NEXT_LABEL = {
  new: 'Accepta',
  accepted: 'Incepe preparare',
  preparing: 'Gata de livrare',
  ready: 'Trimite la livrare',
  delivery: 'Marcat livrat',
}

export default function AdminComenziPage() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [selected, setSelected] = useState(null)

  const supabase = createClient()

  const fetchOrders = async () => {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false })
    if (!error) setOrders(data || [])
    setLoading(false)
  }

  useEffect(() => {
    fetchOrders()
    // Realtime updates
    const channel = supabase
      .channel('orders-realtime')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'orders' }, () => {
        fetchOrders()
      })
      .subscribe()
    return () => supabase.removeChannel(channel)
  }, [])

  const updateStatus = async (id, newStatus) => {
    const { error } = await supabase
      .from('orders')
      .update({ status: newStatus, updated_at: new Date().toISOString() })
      .eq('id', id)
    if (!error) {
      toast.success('Status actualizat: ' + STATUS_LABELS[newStatus])
      fetchOrders()
    } else {
      toast.error('Eroare la actualizare')
    }
  }

  const filtered = filter === 'all' ? orders : orders.filter(o => o.status === filter)

  const formatTime = (ts) => {
    const d = new Date(ts)
    return d.toLocaleDateString('ro-RO') + ' ' + d.toLocaleTimeString('ro-RO', { hour: '2-digit', minute: '2-digit' })
  }

  const FILTERS = [
    { val: 'all', label: 'Toate' },
    { val: 'new', label: 'Noi' },
    { val: 'accepted', label: 'Acceptate' },
    { val: 'preparing', label: 'Preparare' },
    { val: 'delivery', label: 'Livrare' },
    { val: 'delivered', label: 'Livrate' },
    { val: 'cancelled', label: 'Anulate' },
  ]

  return (
    <div className="page-enter">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-bebas text-4xl text-white">COMENZI</h1>
          <p className="text-sm text-[#7a6e66] mt-1">{orders.filter(o => o.status === 'new').length} comenzi noi</p>
        </div>
        <button onClick={fetchOrders} className="bg-white/5 border border-white/10 text-[#b8a99a] font-condensed font-bold text-sm uppercase tracking-wide px-5 py-2.5 rounded-xl hover:border-white/20 transition-all">
          Reincarca
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-2 flex-wrap mb-6">
        {FILTERS.map(f => (
          <button key={f.val} onClick={() => setFilter(f.val)}
            className={`px-4 py-2 rounded-xl text-sm font-condensed font-bold uppercase border transition-all ${filter === f.val ? 'bg-[#c0392b] border-[#c0392b] text-white' : 'bg-transparent border-white/10 text-[#b8a99a] hover:border-white/20'}`}>
            {f.label}
            {f.val !== 'all' && (
              <span className="ml-1.5 opacity-60 text-xs">
                {orders.filter(o => o.status === f.val).length}
              </span>
            )}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="text-center py-20 text-[#7a6e66]">Se incarca comenzile...</div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20">
          <span className="text-5xl block mb-3">📭</span>
          <p className="text-[#7a6e66] font-condensed font-bold text-lg uppercase">Nicio comanda</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map(order => (
            <div key={order.id} className="bg-[#1a1a1a] border border-white/8 rounded-[18px] overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
                <div className="flex items-center gap-4">
                  <div>
                    <span className="font-condensed font-bold text-lg text-[#f39c12]">{order.order_number}</span>
                    <span className="text-xs text-[#7a6e66] ml-3">{formatTime(order.created_at)}</span>
                  </div>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full border ${STATUS_STYLE[order.status] || STATUS_STYLE.new}`}>
                    {STATUS_LABELS[order.status] || order.status}
                  </span>
                </div>
                <span className="font-bebas text-2xl text-[#f39c12]">{order.total} lei</span>
              </div>

              {/* Body */}
              <div className="px-6 py-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Client */}
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-[#7a6e66] mb-2">Client</p>
                  <p className="text-white font-semibold">{order.full_name}</p>
                  <p className="text-[#b8a99a] text-sm">{order.phone}</p>
                  {order.email && <p className="text-[#7a6e66] text-xs">{order.email}</p>}
                </div>

                {/* Livrare */}
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-[#7a6e66] mb-2">
                    {order.delivery_type === 'ridicare' ? 'Ridicare din local' : 'Adresa livrare'}
                  </p>
                  {order.delivery_type === 'livrare' ? (
                    <>
                      <p className="text-[#b8a99a] text-sm">{order.strada} {order.numar}</p>
                      {order.bloc && <p className="text-[#7a6e66] text-xs">Bl {order.bloc}{order.scara ? ', Sc ' + order.scara : ''}{order.apartament ? ', Ap ' + order.apartament : ''}</p>}
                      <p className="text-[#7a6e66] text-xs">{order.localitate}, {order.judet}</p>
                      {order.cod_interfon && <p className="text-[#7a6e66] text-xs">Interfon: {order.cod_interfon}</p>}
                      {order.instructiuni && <p className="text-[#e74c3c] text-xs mt-1">! {order.instructiuni}</p>}
                    </>
                  ) : (
                    <p className="text-[#b8a99a] text-sm">Str. 13 Decembrie nr. 69, Gaesti</p>
                  )}
                  <p className="text-[#7a6e66] text-xs mt-1">Interval: {order.interval_orar}</p>
                </div>

                {/* Produse */}
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-[#7a6e66] mb-2">Produse</p>
                  <div className="space-y-1">
                    {(order.items || []).map((item, i) => (
                      <p key={i} className="text-sm text-[#b8a99a]">
                        {item.icon} {item.name} x{item.qty} — <span className="text-white">{item.price * item.qty} lei</span>
                      </p>
                    ))}
                  </div>
                  <div className="mt-2 pt-2 border-t border-white/5 text-xs text-[#7a6e66] space-y-0.5">
                    <p>Plata: {order.payment_method}</p>
                    {order.tip > 0 && <p>Bacsis: {order.tip} lei</p>}
                    {order.discount_amount > 0 && <p className="text-green-400">Reducere: -{order.discount_amount} lei</p>}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="px-6 py-3 bg-white/[0.02] border-t border-white/5 flex items-center gap-3">
                {NEXT_STATUS[order.status] && (
                  <button
                    onClick={() => updateStatus(order.id, NEXT_STATUS[order.status])}
                    className="bg-gradient-to-r from-[#c0392b] to-[#96251e] hover:from-[#e74c3c] hover:to-[#c0392b] text-white font-condensed font-bold text-sm uppercase tracking-wide px-5 py-2 rounded-xl transition-all"
                  >
                    {NEXT_LABEL[order.status]} →
                  </button>
                )}
                <button
                  onClick={() => updateStatus(order.id, 'cancelled')}
                  className="border border-red-900/30 text-red-400 font-condensed font-bold text-sm uppercase tracking-wide px-4 py-2 rounded-xl hover:bg-red-900/10 transition-all"
                >
                  Anuleaza
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}