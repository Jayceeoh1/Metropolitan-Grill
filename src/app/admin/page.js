import Link from 'next/link'

const STATS = [
  { label: 'Comenzi Astăzi', value: '47', change: '↑ +12%', up: true },
  { label: 'Venituri Astăzi', value: '2.840 lei', change: '↑ +8%', up: true },
  { label: 'Timp Mediu Livrare', value: "26'", change: '↓ −2 min', up: true },
  { label: 'Rating Mediu', value: '4.9 ★', change: 'Excelent', up: true },
]

const RECENT_ORDERS = [
  { id: '#MG-847', client: 'Ion Popescu', items: 'Shaorma ×2, Cola', total: '61 lei', status: 'prep', statusLabel: '⏳ Preparare' },
  { id: '#MG-846', client: 'Maria Ion', items: 'Burger BBQ, Cartofi', total: '47 lei', status: 'done', statusLabel: '✓ Livrat' },
  { id: '#MG-845', client: 'Andrei N.', items: 'Family Bucket', total: '149 lei', status: 'new', statusLabel: '◉ Nouă' },
  { id: '#MG-844', client: 'Elena M.', items: 'Meniu Duo, Sos', total: '95 lei', status: 'prep', statusLabel: '⏳ Preparare' },
]

const STATUS_STYLE = {
  prep: 'bg-yellow-900/20 text-yellow-400 border-yellow-800/30',
  done: 'bg-green-900/20 text-green-400 border-green-800/30',
  new: 'bg-blue-900/20 text-blue-400 border-blue-800/30',
}

export default function AdminDashboard() {
  return (
    <div className="page-enter">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-bebas text-4xl text-white">DASHBOARD</h1>
        <span className="text-sm text-[#7a6e66]">15 Ianuarie 2025</span>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {STATS.map(stat => (
          <div key={stat.label} className="bg-[#1a1a1a] border border-white/8 rounded-[14px] p-5">
            <p className="text-xs font-bold uppercase tracking-wide text-[#7a6e66] mb-2">{stat.label}</p>
            <p className="font-bebas text-4xl text-[#f39c12] leading-none mb-1">{stat.value}</p>
            <p className={`text-xs ${stat.up ? 'text-green-400' : 'text-[#e74c3c]'}`}>{stat.change}</p>
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
        <table className="admin-table w-full">
          <thead>
            <tr>
              <th>#Comandă</th><th>Client</th><th>Produse</th><th>Total</th><th>Status</th><th>Acțiuni</th>
            </tr>
          </thead>
          <tbody>
            {RECENT_ORDERS.map(order => (
              <tr key={order.id}>
                <td className="text-[#f39c12] font-bold">{order.id}</td>
                <td>{order.client}</td>
                <td>{order.items}</td>
                <td className="text-white">{order.total}</td>
                <td>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full border ${STATUS_STYLE[order.status]}`}>
                    {order.statusLabel}
                  </span>
                </td>
                <td>
                  <Link href="/admin/comenzi" className="text-xs border border-[#c0392b]/30 text-[#e74c3c] px-3 py-1.5 rounded-lg hover:bg-[#c0392b]/10 transition-all">
                    Detalii
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
