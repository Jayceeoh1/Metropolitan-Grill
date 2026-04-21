import { Toaster } from 'react-hot-toast'
import Navbar from '@/components/layout/Navbar'
import CartDrawer from '@/components/cart/CartDrawer'
import WhatsAppButton from '@/components/ui/WhatsAppButton'
import './globals.css'

export const metadata = {
  title: 'Metropolitan Shaorma & Grill',
  description: 'Shaorma premium, gratar autentic si livrare rapida in Gaesti. Comanda online!',
  keywords: 'shaorma, grill, livrare, gaesti, metropolitan, fast food',
  manifest: '/manifest.json',
  themeColor: '#c0392b',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Metropolitan',
  },
  openGraph: {
    title: 'Metropolitan Shaorma & Grill',
    description: 'Shaorma premium, gust autentic, livrare rapida in Gaesti.',
    type: 'website',
  },
}

export const viewport = {
  themeColor: '#c0392b',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({ children }) {
  return (
    <html lang="ro">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Metropolitan" />
        <link rel="apple-touch-icon" href="/logo.png" />
        <meta name="mobile-web-app-capable" content="yes" />
      </head>
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