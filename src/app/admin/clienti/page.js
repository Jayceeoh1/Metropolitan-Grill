'use client'
import toast from 'react-hot-toast'

const CLIENTS = [
  { name: 'Ion Popescu', email: 'ion.p@email.ro', phone: '0721 234 567', orders: 24, total: 1840, since: 'Mar 2024' },
  { name: 'Maria Ion', email: 'maria.i@email.ro', phone: '0732 567 890', orders: 18, total: 1250, since: 'Apr 2024' },
  { name: 'Andrei Niculescu', email: 'andrei.n@email.ro', phone: '0741 890 123', orders: 31, total: 2670, since: 'Ian 2024' },
  { name: 'Elena Mihăilescu', email: 'elena.m@email.ro', phone: '0752 123 456', orders: 9, total: 720, since: 'Oct 2024' },
  { name: 'Radu Georgescu', email: 'radu.g@email.ro', phone: '0761 345 678', orders: 15, total: 1100, since: 'Iun 2024' },
]

export default function AdminClientiPage() {
  return (
    <div className="page-enter">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-bebas text-4xl text-white">CLIENȚI</h1>
        <button onClick={() => toast.success('Export CSV generat!')} className="bg-gradient-to-r from-[#c0392b] to-[#96251e] text-white font-condensed font-bold text-sm uppercase tracking-wide px-5 py-2.5 rounded-xl hover:from-[#e74c3c] hover:to-[#c0392b] transition-all">
          Export CSV
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: 'Total Clienți', value: '2.847' },
          { label: 'Clienți Noi Luna Aceasta', value: '143' },
          { label: 'Valoare Medie Comandă', value: '67 lei' },
        ].map(s => (
          <div key={s.label} className="bg-[#1a1a1a] border border-white/8 rounded-[14px] p-5">
            <p className="text-xs font-bold uppercase tracking-wide text-[#7a6e66] mb-2">{s.label}</p>
            <p className="font-bebas text-3xl text-[#f39c12]">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-[#1a1a1a] border border-white/8 rounded-[18px] overflow-hidden">
        <table className="admin-table w-full">
          <thead>
            <tr>
              <th>Client</th><th>Email</th><th>Telefon</th><th>Comenzi</th><th>Total Cheltuit</th><th>Înregistrat</th><th>Acțiuni</th>
            </tr>
          </thead>
          <tbody>
            {CLIENTS.map(c => (
              <tr key={c.email}>
                <td className="text-white font-medium">{c.name}</td>
                <td>{c.email}</td>
                <td>{c.phone}</td>
                <td className="text-[#f39c12] font-bold">{c.orders}</td>
                <td className="text-white">{c.total.toLocaleString()} lei</td>
                <td>{c.since}</td>
                <td>
                  <button onClick={() => toast.success(`Profil ${c.name}`)} className="text-xs border border-white/10 text-[#7a6e66] px-3 py-1.5 rounded-lg hover:text-white hover:border-white/20 transition-all">
                    Vezi Profil
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
