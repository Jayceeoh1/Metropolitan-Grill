'use client'
import { useState, useEffect, useRef } from 'react'
import { createClient } from '@/lib/supabase/client'
import toast from 'react-hot-toast'

const STATUS_LABELS = {
  new: 'Noua',
  accepted: 'Acceptata',
  preparing: 'Preparare',
  ready: 'Gata',
  delivery: 'Livrare',
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
  const [notifEnabled, setNotifEnabled] = useState(false)
  const audioRef = useRef(null)
  const isFirstLoad = useRef(true)
  const supabase = createClient()

  // Cere permisiune notificari
  const enableNotifications = async () => {
    if ('Notification' in window) {
      const perm = await Notification.requestPermission()
      if (perm === 'granted') {
        setNotifEnabled(true)
        toast.success('Notificari activate!')
      }
    }
  }

  // Sunet notificare
  const playSound = () => {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)()
      const oscillator = ctx.createOscillator()
      const gainNode = ctx.createGain()
      oscillator.connect(gainNode)
      gainNode.connect(ctx.destination)
      oscillator.frequency.setValueAtTime(800, ctx.currentTime)
      oscillator.frequency.setValueAtTime(600, ctx.currentTime + 0.1)
      oscillator.frequency.setValueAtTime(800, ctx.currentTime + 0.2)
      gainNode.gain.setValueAtTime(0.3, ctx.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4)
      oscillator.start(ctx.currentTime)
      oscillator.stop(ctx.currentTime + 0.4)
    } catch (e) {}
  }

  // Notificare browser
  const showNotification = (order) => {
    playSound()
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('🌯 Comanda Noua!', {
        body: order.full_name + ' · ' + order.total + ' lei · ' + order.phone,
        icon: '/logo.png',
        badge: '/logo.png',
        tag: 'new-order',
        requireInteraction: true,
      })
    }
    toast.custom((t) => (
      <div className={`${t.visible ? 'animate-enter' : 'animate-leave'} flex items-center gap-4 bg-[#1a1a1a] border-2 border-[#c0392b] rounded-2xl px-6 py-4 shadow-2xl`}>
        <span className="text-4xl">🌯</span>
        <div>
          <p className="font-bebas text-xl text-[#f39c12]">COMANDA NOUA!</p>
          <p className="text-sm text-white font-semibold">{order.full_name}</p>
          <p className="text-xs text-[#b8a99a]">{order.total} lei · {order.phone}</p>
        </div>
      </div>
    ), { duration: 8000 })
  }

  const fetchOrders = async () => {
    const { data } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false })
    if (data) setOrders(data)
    setLoading(false)
  }

  useEffect(() => {
    fetchOrders()

    // Verifica permisiune existenta
    if ('Notification' in window && Notification.permission === 'granted') {
      setNotifEnabled(true)
    }

    // Realtime subscription
    const channel = supabase
      .channel('new-orders')
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'orders',
      }, (payload) => {
        if (!isFirstLoad.current) {
          showNotification(payload.new)
        }
        fetchOrders()
      })
      .on('postgres_changes', {
        event: 'UPDATE',
        schema: 'public',
        table: 'orders',
      }, () => {
        fetchOrders()
      })
      .subscribe()

    // Dupa primul load, activeaza notificarile
    setTimeout(() => { isFirstLoad.current = false }, 2000)

    return () => supabase.removeChannel(channel)
  }, [])

  const updateStatus = async (id, newStatus) => {
    await supabase
      .from('orders')
      .update({ status: newStatus, updated_at: new Date().toISOString() })
      .eq('id', id)
    toast.success('Status: ' + STATUS_LABELS[newStatus])
  }

  const filtered = filter === 'all' ? orders : orders.filter(o => o.status === filter)

  const formatTime = (ts) => {
    const d = new Date(ts)
    return d.toLocaleDateString('ro-RO') + ' ' + d.toLocaleTimeString('ro-RO', { hour: '2-digit', minute: '2-digit' })
  }

  const newCount = orders.filter(o => o.status === 'new').length

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
          {newCount > 0 && (
            <p className="text-sm text-[#e74c3c] font-bold mt-1 animate-pulse">
              🔴 {newCount} comanda noua care asteapta!
            </p>
          )}
        </div>
        <div className="flex items-center gap-3">
          {!notifEnabled ? (
            <button
              onClick={enableNotifications}
              className="flex items-center gap-2 bg-[#f39c12]/20 border border-[#f39c12]/40 text-[#f39c12] font-condensed font-bold text-sm uppercase tracking-wide px-4 py-2.5 rounded-xl hover:bg-[#f39c12]/30 transition-all"
            >
              🔔 Activeaza Notificari
            </button>
          ) : (
            <div className="flex items-center gap-2 bg-green-900/20 border border-green-800/30 text-green-400 font-condensed font-bold text-sm px-4 py-2.5 rounded-xl">
              🔔 Notificari Active
            </div>
          )}
          <button
            onClick={fetchOrders}
            className="bg-white/5 border border-white/10 text-[#b8a99a] font-condensed font-bold text-sm uppercase tracking-wide px-4 py-2.5 rounded-xl hover:border-white/20 transition-all"
          >
            ↺ Reincarca
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2 flex-wrap mb-6">
        {FILTERS.map(f => (
          <button key={f.val} onClick={() => setFilter(f.val)}
            className={`px-4 py-2 rounded-xl text-sm font-condensed font-bold uppercase border transition-all ${
              filter === f.val
                ? 'bg-[#c0392b] border-[#c0392b] text-white'
                : 'bg-transparent border-white/10 text-[#b8a99a] hover:border-white/20'
            }`}>
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
            <div key={order.id}
              className={`bg-[#1a1a1a] border rounded-[18px] overflow-hidden transition-all ${
                order.status === 'new' ? 'border-[#c0392b]/40 shadow-lg shadow-red-900/10' : 'border-white/8'
              }`}>
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
                <div className="flex items-center gap-4">
                  <span className="font-condensed font-bold text-lg text-[#f39c12]">{order.order_number}</span>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full border ${STATUS_STYLE[order.status] || STATUS_STYLE.new}`}>
                    {STATUS_LABELS[order.status] || order.status}
                  </span>
                  <span className="text-xs text-[#7a6e66]">{formatTime(order.created_at)}</span>
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
                      {order.cod_interfon && <p className="text-[#7a6e66] text-xs">Interfon: {order.cod_interfon}</p>}
                      {order.instructiuni && <p className="text-[#e74c3c] text-xs mt-1">! {order.instructiuni}</p>}
                    </>
                  ) : (
                    <p className="text-[#b8a99a] text-sm">Str. 13 Decembrie nr. 69</p>
                  )}
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
                  <p className="text-xs text-[#7a6e66] mt-1">Plata: {order.payment_method}</p>
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