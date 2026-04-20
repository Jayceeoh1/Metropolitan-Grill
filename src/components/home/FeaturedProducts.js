'use client'
import Link from 'next/link'
import ProductCard from '@/components/menu/ProductCard'
import { PRODUCTS } from '@/lib/data'

export default function FeaturedProducts() {
  const featured = PRODUCTS.filter(p =>
    p.badges.includes('bestseller') || p.badges.includes('recomandat')
  ).slice(0, 6)

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <p className="text-xs font-bold tracking-[3px] uppercase text-[#e74c3c] mb-3">Bestseller-uri</p>
          <h2 className="font-bebas text-5xl sm:text-6xl text-white">
            CELE MAI <span className="text-[#f39c12]">POPULARE</span>
          </h2>
          <p className="text-[#b8a99a] mt-3 max-w-md mx-auto leading-relaxed">
            Preparatele preferate de clienții noștri fideli
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {featured.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
        <div className="text-center mt-10">
          <Link
            href="/meniu"
            className="inline-flex items-center gap-2 border border-white/15 hover:border-[#f39c12] text-[#b8a99a] hover:text-[#f39c12] font-condensed font-bold uppercase tracking-wide px-8 py-3 rounded-xl transition-all"
          >
            Vezi Meniu Complet →
          </Link>
        </div>
      </div>
    </section>
  )
}
