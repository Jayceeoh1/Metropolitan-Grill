'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const ADMIN_PASSWORD = 'Alinmetropolitan2026#!'

export default function AdminLoginPage() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)

  const handleLogin = (e) => {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem('admin_auth', 'true')
      router.push('/panou-alin')
    } else {
      setError(true)
      setPassword('')
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="font-bebas text-4xl text-[#f39c12] mb-1">METROPOLITAN</div>
          <div className="text-xs text-[#e74c3c] font-bold tracking-[2px] uppercase">Panou Administrare</div>
        </div>
        <div className="bg-[#1a1a1a] border border-white/8 rounded-[18px] p-8">
          <h1 className="font-condensed font-bold text-xl uppercase tracking-wide text-white mb-6 text-center">
            Autentificare Admin
          </h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wide text-[#7a6e66] mb-1.5">Parola</label>
              <input
                type="password" required autoFocus
                value={password}
                onChange={e => { setPassword(e.target.value); setError(false) }}
                placeholder="••••••••••••"
                className={`w-full bg-white/5 border rounded-xl py-3 px-4 text-sm text-white placeholder-[#7a6e66] focus:outline-none transition-colors ${error ? 'border-[#e74c3c]' : 'border-white/8 focus:border-[#c0392b]/50'}`}
              />
              {error && <p className="text-xs text-[#e74c3c] mt-1.5">Parola incorecta. Incearca din nou.</p>}
            </div>
            <button type="submit"
              className="w-full bg-gradient-to-r from-[#c0392b] to-[#96251e] hover:from-[#e74c3c] hover:to-[#c0392b] text-white font-condensed font-bold text-base uppercase tracking-widest py-3.5 rounded-xl transition-all hover:-translate-y-0.5">
              Intra in Admin
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}