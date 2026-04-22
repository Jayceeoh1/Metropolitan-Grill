'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

export default function AdminDashboard() {
  const [stats, setStats] = useState({ today: 0, revenue: 0, total: 0, new: 0 })
  const [recentOrders, setRecentOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      const supabase = createClient()
      const today = new Date()
      today.setHours(0, 0, 0, 0)

      const { data: orders } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false })

      if (orders) {
        const todayOrders = orders.filter(o => new Date(o.created_at) >= today)
        const todayRevenue = todayOrders.reduce((s, o) => s + Number(o.total), 0)
        const newOrders = orders.filter(o => o.status === 'new')

        setStats({
          today: todayOrders.length,
          revenue: todayRevenue,
          total: orders.length,
          new: newOrders.length,
        })
        setRecentOrders(orders.slice(0, 5))
      }
      setLoading(false)
    }
    fetchStats()
  }, [])

  const STATUS_STYLE = {
    new: 'bg-blue-900/20 text-blue-400 border-blue-800/30',
    accepted: 'bg-purple-900/20 text-purple-400 border-purple-800/30',
    preparing: 'bg-yellow-900/20 text-yellow-400 border-yellow-800/30',
    delivered: 'bg-green-900/20 text-green-400 border-green-800/30',
    cancelled: 'bg-red-900/20 text-red-400 border-red-800/30',
  }

  const STATUS_LABELS = {
    new: 'Noua', accepted: 'Acceptata', preparing: 'Preparare',
    ready: 'Gata', delivery: 'Livrare', delivered: 'Livrata', cancelled: 'Anulata',
  }

  const formatTime = (ts) => {
    const d = new Date(ts)
    return d.toLocaleDateString('ro-RO') + ' ' + d.toLocaleTimeString('ro-RO', { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <div className="page-enter">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-bebas text-4xl text-white">DASHBOARD</h1>
        <span className="text-sm text-[#7a6e66]">{new Date().toLocaleDateString('ro-RO', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Comenzi Astazi', value: loading ? '...' : stats.today },
          { label: 'Venituri Astazi', value: loading ? '...' : stats.revenue + ' lei' },
          { label: 'Comenzi Noi', value: loading ? '...' : stats.new, alert: stats.new > 0 },
          { label: 'Total Comenzi', value: loading ? '...' : stats.total },
        ].map(stat => (
          <div key={stat.label} className={`bg-[#1a1a1a] border rounded-[14px] p-5 ${stat.alert ? 'border-[#c0392b]/40' : 'border-white/8'}`}>
            <p className="text-xs font-bold uppercase tracking-wide text-[#7a6e66] mb-2">{stat.label}</p>
            <p className={`font-bebas text-4xl leading-none ${stat.alert ? 'text-[#e74c3c]' : 'text-[#f39c12]'}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Recent orders */}
      <div className="bg-[#1a1a1a] border border-white/8 rounded-[18px] overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/8">
          <h2 className="font-condensed font-bold text-base uppercase tracking-wide text-white">Comenzi Recente</h2>
          <Link href="/admin/comenzi" className="text-xs text-[#7a6e66] hover:text-[#e74c3c] transition-colors">
            Vezi toate →
          </Link>
        </div>
        {loading ? (
          <div className="p-8 text-center text-[#7a6e66]">Se incarca...</div>
        ) : recentOrders.length === 0 ? (
          <div className="p-8 text-center">
            <span className="text-4xl block mb-3">📭</span>
            <p className="text-[#7a6e66]">Nicio comanda inca</p>
          </div>
        ) : (
          <table className="admin-table w-full">
            <thead>
              <tr><th>#Comanda</th><th>Client</th><th>Telefon</th><th>Produse</th><th>Total</th><th>Ora</th><th>Status</th></tr>
            </thead>
            <tbody>
              {recentOrders.map(order => (
                <tr key={order.id}>
                  <td className="text-[#f39c12] font-bold font-condensed">{order.order_number}</td>
                  <td className="text-white font-medium">{order.full_name}</td>
                  <td>{order.phone}</td>
                  <td className="text-xs max-w-[160px] truncate">
                    {(order.items || []).map(i => i.name + ' x' + i.qty).join(', ')}
                  </td>
                  <td className="text-white font-bold">{order.total} lei</td>
                  <td className="text-xs">{formatTime(order.created_at)}</td>
                  <td>
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${STATUS_STYLE[order.status] || STATUS_STYLE.new}`}>
                      {STATUS_LABELS[order.status] || order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}