'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function AdminClientiPage() {
  const [clients, setClients] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchClients = async () => {
      const supabase = createClient()
      const { data: orders } = await supabase
        .from('orders')
        .select('full_name, phone, email, total, created_at')
        .order('created_at', { ascending: false })

      if (orders) {
        // Group by phone number
        const map = {}
        orders.forEach(o => {
          const key = o.phone
          if (!map[key]) {
            map[key] = {
              name: o.full_name,
              phone: o.phone,
              email: o.email || '—',
              orders: 0,
              total: 0,
              since: new Date(o.created_at).toLocaleDateString('ro-RO', { month: 'short', year: 'numeric' }),
            }
          }
          map[key].orders++
          map[key].total += Number(o.total)
        })
        setClients(Object.values(map).sort((a, b) => b.orders - a.orders))
      }
      setLoading(false)
    }
    fetchClients()
  }, [])

  return (
    <div className="page-enter">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-bebas text-4xl text-white">CLIENTI</h1>
          <p className="text-sm text-[#7a6e66] mt-1">{clients.length} clienti unici</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: 'Total Clienti', value: clients.length },
          { label: 'Total Comenzi', value: clients.reduce((s, c) => s + c.orders, 0) },
          { label: 'Valoare Totala', value: clients.reduce((s, c) => s + c.total, 0).toFixed(0) + ' lei' },
        ].map(s => (
          <div key={s.label} className="bg-[#1a1a1a] border border-white/8 rounded-[14px] p-5">
            <p className="text-xs font-bold uppercase tracking-wide text-[#7a6e66] mb-2">{s.label}</p>
            <p className="font-bebas text-3xl text-[#f39c12]">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-[#1a1a1a] border border-white/8 rounded-[18px] overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-[#7a6e66]">Se incarca clientii...</div>
        ) : clients.length === 0 ? (
          <div className="p-8 text-center">
            <span className="text-4xl block mb-3">👥</span>
            <p className="text-[#7a6e66]">Nicio comanda plasata inca</p>
          </div>
        ) : (
          <table className="admin-table w-full">
            <thead>
              <tr><th>Client</th><th>Telefon</th><th>Email</th><th>Comenzi</th><th>Total Cheltuit</th><th>Prima Comanda</th></tr>
            </thead>
            <tbody>
              {clients.map((c, i) => (
                <tr key={i}>
                  <td className="text-white font-medium">{c.name}</td>
                  <td>{c.phone}</td>
                  <td>{c.email}</td>
                  <td className="text-[#f39c12] font-bold">{c.orders}</td>
                  <td className="text-white">{c.total.toFixed(0)} lei</td>
                  <td>{c.since}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}