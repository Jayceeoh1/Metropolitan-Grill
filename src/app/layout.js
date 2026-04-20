import { Toaster } from 'react-hot-toast'
import Navbar from '@/components/layout/Navbar'
import CartDrawer from '@/components/cart/CartDrawer'
import WhatsAppButton from '@/components/ui/WhatsAppButton'
import './globals.css'

export const metadata = {
  title: 'Metropolitan Shaorma & Grill',
  description: 'Shaorma premium, grătar autentic și livrare rapidă în București. Comandă online!',
  keywords: 'shaorma, grill, livrare, bucuresti, metropolitan, fast food',
  openGraph: {
    title: 'Metropolitan Shaorma & Grill',
    description: 'Shaorma premium, gust autentic, livrare în 30 de minute.',
    type: 'website',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="ro">
      <body>
        <Navbar />
        <CartDrawer />
        <WhatsAppButton />
        <main>{children}</main>
        <Toaster
          position="bottom-center"
          toastOptions={{
            style: {
              background: '#1a1a1a',
              color: '#f5f0e8',
              border: '1px solid rgba(192,57,43,0.3)',
              borderRadius: '12px',
              fontFamily: 'Barlow, sans-serif',
              fontSize: '14px',
            },
            success: { iconTheme: { primary: '#f39c12', secondary: '#0a0a0a' } },
          }}
        />
      </body>
    </html>
  )
}