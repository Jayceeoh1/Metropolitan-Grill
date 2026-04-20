import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      coupon: null,
      couponDiscount: 0,
      deliveryFee: 7,
      tip: 5,

      addItem: (product, options = {}) => {
        const { items } = get()
        const key = `${product.id}-${JSON.stringify(options)}`
        const existing = items.find(i => i.key === key)
        if (existing) {
          set({ items: items.map(i => i.key === key ? { ...i, qty: i.qty + 1 } : i) })
        } else {
          set({ items: [...items, { ...product, key, qty: 1, options }] })
        }
      },

      removeItem: (key) => set({ items: get().items.filter(i => i.key !== key) }),

      updateQty: (key, qty) => {
        if (qty <= 0) {
          set({ items: get().items.filter(i => i.key !== key) })
        } else {
          set({ items: get().items.map(i => i.key === key ? { ...i, qty } : i) })
        }
      },

      clearCart: () => set({ items: [], coupon: null, couponDiscount: 0 }),

      applyCoupon: (code, discount) => set({ coupon: code, couponDiscount: discount }),

      setDeliveryFee: (fee) => set({ deliveryFee: fee }),
      setTip: (tip) => set({ tip }),

      get subtotal() {
        return get().items.reduce((sum, i) => sum + (i.promo || i.price) * i.qty, 0)
      },

      get itemCount() {
        return get().items.reduce((sum, i) => sum + i.qty, 0)
      },

      get total() {
        const s = get()
        const sub = s.items.reduce((sum, i) => sum + (i.promo || i.price) * i.qty, 0)
        const discountAmt = Math.round(sub * s.couponDiscount)
        return sub - discountAmt + s.deliveryFee + s.tip
      },
    }),
    { name: 'metropolitan-cart' }
  )
)
