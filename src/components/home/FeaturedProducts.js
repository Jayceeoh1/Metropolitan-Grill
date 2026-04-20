'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import ProductCard from '@/components/menu/ProductCard'
import { createClient } from '@/lib/supabase/client'

export default function FeaturedProducts() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetch = async () => {
      const supabase = createClient()
      const { data } = await supabase
        .from('menu_items')
        .select('*')
        .eq('active', true)
        .contains('badges', ['bestseller'])
        .order('sort_order')
        .limit(6)
      setProducts((data || []).map(p => ({
        ...p,
        category: p.category_id,
        promo: p.promo_price || null,
        badges: p.badges || [],
        ingredients: [],
        image: p.image_url || null,
      })))
      setLoading(false)
    }
    fetch()
  }, [])

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <p className="text-xs font-bold tracking-[3px] uppercase text-[#e74c3c] mb-3">Bestseller-uri</p>
          <h2 className="font-bebas text-5xl sm:text-6xl text-white">
            CELE MAI <span className="text-[#f39c12]">POPULARE</span>
          </h2>
          <p className="text-[#b8a99a] mt-3 max-w-md mx-auto leading-relaxed">
            Preparatele preferate de clientii nostri fideli
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-[#1a1a1a] rounded-[18px] h-64 skeleton" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {products.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        )}

        <div className="text-center mt-10">
          <Link href="/meniu"
            className="inline-flex items-center gap-2 border border-white/15 hover:border-[#f39c12] text-[#b8a99a] hover:text-[#f39c12] font-condensed font-bold uppercase tracking-wide px-8 py-3 rounded-xl transition-all">
            Vezi Meniu Complet →
          </Link>
        </div>
      </div>
    </section>
  )
}