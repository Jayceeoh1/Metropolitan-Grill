# 🌯 Metropolitan Shaorma & Grill — Next.js App

Platformă completă de comandă online pentru restaurantul Metropolitan Shaorma & Grill.

## Stack Tehnologic

- **Frontend**: Next.js 14 (App Router) + JavaScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand (coș persistent)
- **Backend / Auth / DB**: Supabase
- **Deploy**: Vercel

---

## 🚀 Instalare Rapidă

### 1. Clonează / extrage proiectul

```bash
cd metropolitan-grill
npm install
```

### 2. Configurează Supabase

1. Creează un proiect nou pe [supabase.com](https://supabase.com)
2. Du-te la **SQL Editor** și rulează în ordine:
   - `supabase/schema.sql`
   - `supabase/seed.sql`
3. Din **Settings → API** copiază URL-ul și cheile

### 3. Configurează variabilele de mediu

```bash
cp .env.local.example .env.local
```

Editează `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 4. Rulează local

```bash
npm run dev
```

Accesează: **http://localhost:3000**

---

## 📁 Structura Proiectului

```
src/
├── app/
│   ├── page.js                  # Homepage
│   ├── layout.js                # Root layout (Navbar, CartDrawer, Toaster)
│   ├── globals.css              # Stiluri globale + variabile CSS
│   ├── meniu/page.js            # Pagina meniu cu filtrare/căutare
│   ├── promotii/page.js         # Promoții active + coduri
│   ├── despre/page.js           # Pagina despre noi
│   ├── contact/page.js          # Formular contact + locație
│   ├── checkout/page.js         # Flux checkout complet
│   ├── confirmare/page.js       # Confirmare comandă + tracker
│   ├── cont/
│   │   ├── layout.js            # Layout cont cu sidebar
│   │   ├── comenzi/page.js      # Istoricul comenzilor
│   │   ├── favorite/page.js     # Produse favorite
│   │   ├── adrese/page.js       # Adrese salvate
│   │   └── setari/page.js       # Setări cont
│   └── admin/
│       ├── layout.js            # Layout admin cu sidebar
│       ├── page.js              # Dashboard + statistici
│       ├── comenzi/page.js      # Gestionare comenzi live
│       ├── meniu/page.js        # CRUD produse meniu
│       ├── clienti/page.js      # Lista clienți
│       ├── setari/page.js       # Setări restaurant
│       ├── livrare/page.js      # Zone și tarife livrare
│       └── promotii/page.js     # Coduri promoționale
│
├── components/
│   ├── layout/
│   │   ├── Navbar.js            # Navigare sticky cu cart badge
│   │   └── Footer.js            # Footer complet
│   ├── cart/
│   │   └── CartDrawer.js        # Drawer coș lateral
│   ├── menu/
│   │   ├── ProductCard.js       # Card produs cu quick-add
│   │   └── ProductModal.js      # Modal detalii + personalizare
│   └── home/
│       ├── Hero.js              # Secțiunea hero cu SVG
│       ├── CategoryShortcuts.js # Shortcut-uri categorii
│       ├── FeaturedProducts.js  # Grid produse recomandate
│       ├── HowItWorks.js        # Pași comandă
│       ├── PromoBanners.js      # Bannere promoționale
│       ├── DeliveryInfo.js      # Info livrare
│       └── Testimonials.js      # Recenzii clienți
│
├── store/
│   └── cartStore.js             # Zustand store coș persistent
│
└── lib/
    ├── data.js                  # Date mock + constante
    └── supabase/
        ├── client.js            # Supabase browser client
        └── server.js            # Supabase server client

supabase/
├── schema.sql                   # Schema completă bază de date
└── seed.sql                     # Date inițiale (produse, categorii)
```

---

## 🗄️ Baza de Date (Supabase)

Tabele principale:
| Tabel | Descriere |
|-------|-----------|
| `user_profiles` | Profiluri utilizatori |
| `addresses` | Adrese salvate per utilizator |
| `categories` | Categorii meniu |
| `menu_items` | Produse cu prețuri și detalii |
| `menu_item_images` | Imagini produse |
| `ingredients` | Ingrediente disponibile |
| `sauces` | Sosuri disponibile |
| `extras` | Extra ingrediente cu prețuri |
| `coupons` | Coduri promoționale |
| `orders` | Comenzi clienți |
| `order_items` | Produse per comandă |
| `order_item_options` | Opțiuni selectate (sos, picant, extra) |
| `reviews` | Recenzii produse |
| `favorites` | Produse favorite per utilizator |
| `site_settings` | Setări globale restaurant |
| `business_hours` | Program orar |
| `delivery_zones` | Zone livrare cu tarife |

---

## 🌐 Deploy pe Vercel

```bash
# Instalează Vercel CLI
npm i -g vercel

# Deploy
vercel

# Setează variabilele de mediu în dashboard Vercel:
# NEXT_PUBLIC_SUPABASE_URL
# NEXT_PUBLIC_SUPABASE_ANON_KEY
# SUPABASE_SERVICE_ROLE_KEY
```

Sau conectează repo-ul GitHub la Vercel pentru deploy automat la fiecare push.

---

## ✨ Funcționalități

### Website Public
- ✅ Homepage complet cu hero, categorii, bestseller-uri, promoții, testimoniale
- ✅ Meniu cu filtrare pe categorii, căutare live, sortare
- ✅ Modal produs cu personalizare (sos, picant, extra ingrediente)
- ✅ Pagini: Promoții, Despre Noi, Contact

### Coș & Checkout
- ✅ Cart drawer lateral persistent (Zustand + localStorage)
- ✅ Checkout cu toate câmpurile românești
- ✅ Coduri promoționale (METRO10, WEEKEND20, STUDENT15)
- ✅ Livrare gratuită automată peste 80 lei
- ✅ Bacșiș opțional curier
- ✅ Confirmare comandă cu tracker status

### Cont Client
- ✅ Istoricul comenzilor cu reorder
- ✅ Produse favorite
- ✅ Adrese salvate
- ✅ Setări cont + schimbare parolă

### Panou Admin
- ✅ Dashboard cu statistici zilnice
- ✅ Gestionare comenzi cu avansare status
- ✅ CRUD meniu (adăugare, activare/dezactivare produse)
- ✅ Lista clienți
- ✅ Setări restaurant + program
- ✅ Zone și tarife livrare editabile
- ✅ Coduri promoționale (activare/dezactivare)

---

## 🎨 Design

- Dark theme cu accente roșu/auriu
- Font-uri: Bebas Neue (headings) + Barlow (body)
- Glassmorphism cards, hover animations
- Fully responsive (mobile-first)

---

## 📞 Suport

Metropolitan Shaorma & Grill
- Tel: 0721 234 567
- Email: office@metropolitan.ro
- Adresă: Str. Mihai Eminescu 42, Sector 2, București
