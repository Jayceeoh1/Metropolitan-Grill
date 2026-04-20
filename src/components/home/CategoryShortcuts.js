// CategoryShortcuts.js
'use client'
import Link from 'next/link'

const CATS = [
  { icon: '🌯', name: 'Shaorma', count: 4, slug: 'shaorma' },
  { icon: '🍔', name: 'Burgeri', count: 3, slug: 'burger' },
  { icon: '🎁', name: 'Meniuri', count: 4, slug: 'meniu' },
  { icon: '🍟', name: 'Garnituri', count: 2, slug: 'sides' },
  { icon: '🫙', name: 'Sosuri', count: 6, slug: 'sosuri' },
  { icon: '🥤', name: 'Băuturi', count: 4, slug: 'bauturi' },
]

export default function CategoryShortcuts() {
  return (
    <section className="py-16 bg-[#111] border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          {CATS.map(cat => (
            <Link
              key={cat.slug}
              href={`/meniu?cat=${cat.slug}`}
              className="flex flex-col items-center gap-2 py-5 px-3 rounded-2xl bg-white/[0.03] border border-white/8 hover:bg-[#c0392b]/10 hover:border-[#c0392b]/30 transition-all group text-center"
            >
              <span className="text-4xl group-hover:scale-110 transition-transform duration-200">{cat.icon}</span>
              <span className="font-condensed font-bold text-sm uppercase tracking-wide text-white">{cat.name}</span>
              <span className="text-xs text-[#7a6e66]">{cat.count} produse</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
