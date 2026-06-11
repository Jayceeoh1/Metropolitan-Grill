'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Hero() {
  const [visible, setVisible] = useState(false)
  useEffect(() => { setTimeout(() => setVisible(true), 100) }, [])

  return (
    <section
      className="relative min-h-[90vh] flex items-center overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #080808 0%, #120400 50%, #080808 100%)' }}
    >
      {/* Animated background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(241,196,15,0.4), transparent)' }} />
        <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(231,76,60,0.3), transparent)' }} />
        {/* Glow orbs */}
        <div className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full animate-neon-pulse" style={{ background: 'radial-gradient(circle, rgba(192,57,43,0.12) 0%, transparent 70%)', filter: 'blur(40px)' }} />
        <div className="absolute bottom-1/3 right-1/4 w-64 h-64 rounded-full animate-neon-pulse" style={{ background: 'radial-gradient(circle, rgba(241,196,15,0.08) 0%, transparent 70%)', filter: 'blur(40px)', animationDelay: '1s' }} />
        {/* Grid */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 w-full py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left content */}
          <div style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(30px)', transition: 'all 0.8s ease' }}>
            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-[2px] mb-6"
              style={{ background: 'rgba(231,76,60,0.12)', border: '1px solid rgba(231,76,60,0.3)', color: '#e74c3c' }}
            >
              <span style={{ animation: 'flicker 3s infinite' }}>🔥</span>
              Grill Autentic · Livrare Rapida
            </div>

            {/* Title */}
            <h1
              className="font-bebas leading-none mb-2"
              style={{
                fontSize: 'clamp(70px, 10vw, 120px)',
                color: '#fff',
                letterSpacing: '3px',
                textShadow: '0 0 40px rgba(255,255,255,0.1)',
              }}
            >
              SHAORMA
            </h1>
            <h1
              className="font-bebas leading-none mb-4 animate-flicker"
              style={{
                fontSize: 'clamp(70px, 10vw, 120px)',
                color: '#f1c40f',
                letterSpacing: '3px',
                textShadow: '0 0 20px rgba(241,196,15,0.8), 0 0 60px rgba(241,196,15,0.3)',
              }}
            >
              PREMIUM
            </h1>
            <p
              className="font-condensed font-bold uppercase tracking-[4px] mb-6"
              style={{
                fontSize: 'clamp(16px, 2.5vw, 24px)',
                color: '#e74c3c',
                textShadow: '0 0 15px rgba(231,76,60,0.5)',
              }}
            >
              Savoare Urbana Autentica
            </p>
            <p className="text-base leading-relaxed mb-10 max-w-md" style={{ color: '#b8a99a' }}>
              Carne proaspata la gratar, ingrediente selectionate si sosuri artizanale.
              Metropolitan Grill — gustul care te aduce mereu inapoi.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-4 mb-12">
              <Link
                href="/meniu"
                className="flex items-center gap-2 font-condensed font-bold text-lg uppercase tracking-wide px-8 py-4 rounded-xl transition-all hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg, #c0392b, #96251e)',
                  color: '#fff',
                  boxShadow: '0 0 20px rgba(192,57,43,0.4), 0 8px 25px rgba(192,57,43,0.2)',
                }}
              >
                🍖 Comanda Acum
              </Link>
              <Link
                href="/meniu"
                className="flex items-center gap-2 font-condensed font-bold text-lg uppercase tracking-wide px-8 py-4 rounded-xl transition-all hover:scale-105"
                style={{
                  background: 'transparent',
                  border: '1.5px solid rgba(241,196,15,0.4)',
                  color: '#f1c40f',
                  boxShadow: '0 0 15px rgba(241,196,15,0.1)',
                }}
              >
                Vezi Meniu →
              </Link>
            </div>

            {/* Stats */}
            <div className="flex gap-8">
              {[
                { num: '4.9★', label: 'Rating Clienti', color: '#f1c40f' },
                { num: "30'", label: 'Timp Livrare', color: '#e74c3c' },
                { num: '2k+', label: 'Comenzi Zilnice', color: '#2ecc71' },
              ].map(stat => (
                <div key={stat.label}>
                  <div
                    className="font-bebas text-4xl leading-none"
                    style={{ color: stat.color, textShadow: `0 0 15px ${stat.color}80` }}
                  >
                    {stat.num}
                  </div>
                  <div className="text-xs uppercase tracking-wide mt-1" style={{ color: '#7a6e66' }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Shaorma image */}
          <div
            className="flex items-center justify-center"
            style={{ opacity: visible ? 1 : 0, transition: 'all 1s ease 0.3s' }}
          >
            <div className="relative w-[300px] h-[300px] sm:w-[400px] sm:h-[400px]">
              {/* Rotating rings */}
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  border: '1px solid rgba(241,196,15,0.15)',
                  animation: 'rotateGlow 15s linear infinite',
                }}
              />
              <div
                className="absolute inset-8 rounded-full"
                style={{
                  border: '1px dashed rgba(231,76,60,0.1)',
                  animation: 'rotateGlow 10s linear infinite reverse',
                }}
              />
              {/* Glow */}
              <div
                className="absolute inset-0 rounded-full animate-neon-pulse"
                style={{ background: 'radial-gradient(circle, rgba(192,57,43,0.25) 0%, transparent 70%)', filter: 'blur(30px)' }}
              />
              {/* Badges */}
              <div
                className="absolute top-4 right-0 font-bebas text-sm px-3 py-1.5 rounded-full z-20 animate-float"
                style={{ background: '#f1c40f', color: '#000', boxShadow: '0 0 15px rgba(241,196,15,0.6)', animationDelay: '0s' }}
              >
                ⭐ BESTSELLER
              </div>
              <div
                className="absolute bottom-12 left-0 font-bebas text-sm px-3 py-1.5 rounded-full z-20 animate-float"
                style={{ background: '#e74c3c', color: '#fff', boxShadow: '0 0 15px rgba(231,76,60,0.6)', animationDelay: '1s' }}
              >
                🔥 PROASPAT
              </div>
              <div
                className="absolute top-1/2 -right-4 font-bebas text-sm px-3 py-1 rounded-full z-20 animate-float"
                style={{ background: '#080808', border: '1px solid rgba(231,76,60,0.5)', color: '#e74c3c', animationDelay: '0.5s' }}
              >
                🌶 PICANT
              </div>
              {/* Image */}
              <div
                className="absolute inset-0 flex items-center justify-center z-10"
                style={{ animation: 'floatUp 4s ease-in-out infinite' }}
              >
                <img
                  src="/shaorma-hero.png"
                  alt="Shaorma Metropolitan"
                  className="object-contain"
                  style={{
                    width: '80%',
                    height: '80%',
                    filter: 'drop-shadow(0 20px 50px rgba(192,57,43,0.6)) drop-shadow(0 0 30px rgba(241,196,15,0.2))',
                    animation: 'rotateGlow 0s, floatUp 4s ease-in-out infinite',
                  }}
                />
              </div>

              <style>{`
                @keyframes heroFloat {
                  0%, 100% { transform: translateY(0) rotate(-3deg); }
                  50% { transform: translateY(-15px) rotate(3deg); }
                }
              `}</style>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}