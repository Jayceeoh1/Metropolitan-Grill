export const CATEGORIES = [
  { id: 'pui', name: 'Shaorma Pui', icon: '🌯', slug: 'pui' },
  { id: 'vita', name: 'Shaorma Vita', icon: '🥩', slug: 'vita' },
  { id: 'mixta', name: 'Shaorma Mixta', icon: '🌯', slug: 'mixta' },
  { id: 'meniu', name: 'Meniuri', icon: '🍽', slug: 'meniuri' },
  { id: 'sides', name: 'Garnituri', icon: '🍟', slug: 'garnituri' },
  { id: 'bauturi', name: 'Bauturi', icon: '🥤', slug: 'bauturi' },
]

export const PRODUCTS = [
  // --- SHAORMA PUI ---
  {
    id: 1, name: 'Shaorma Mica Pui', price: 28, promo: null,
    category: 'pui', icon: '🌯', badges: [],
    description: 'Shaorma de pui 500g cu salata de varza, rosii, castraveti, ceapa sau ceapa crispy, ardei copt, patrunjel si ardei iute.',
    ingredients: ['Pui la gratar', 'Lipie', 'Salata varza', 'Rosii', 'Castraveti', 'Ceapa', 'Ardei copt'],
    allergens: 'Gluten', weight: '500g', kcal: 480,
  },
  {
    id: 2, name: 'Shaorma Mare Pui', price: 31, promo: null,
    category: 'pui', icon: '🌯', badges: ['bestseller'],
    description: 'Shaorma de pui 650g cu salata de varza, rosii, castraveti, ceapa sau ceapa crispy, ardei copt, patrunjel si ardei iute.',
    ingredients: ['Pui la gratar', 'Lipie', 'Salata varza', 'Rosii', 'Castraveti', 'Ceapa', 'Ardei copt'],
    allergens: 'Gluten', weight: '650g', kcal: 620,
  },
  {
    id: 3, name: 'Shaorma Farfurie Pui', price: 36, promo: null,
    category: 'pui', icon: '🍽', badges: ['recomandat'],
    description: 'Shaorma de pui 750g servita pe farfurie cu garnitura si sos la alegere.',
    ingredients: ['Pui la gratar', 'Lipie', 'Salata varza', 'Rosii', 'Castraveti', 'Ceapa'],
    allergens: 'Gluten', weight: '750g', kcal: 720,
  },
  {
    id: 4, name: 'Kebab Pui Chifla', price: 25, promo: null,
    category: 'pui', icon: '🍔', badges: [],
    description: 'Kebab de pui 350g servit in chifla cu salata si sos la alegere.',
    ingredients: ['Pui la gratar', 'Chifla', 'Salata', 'Rosii', 'Ceapa'],
    allergens: 'Gluten, Oua', weight: '350g', kcal: 420,
  },

  // --- SHAORMA VITA ---
  {
    id: 5, name: 'Shaorma Mica Vita', price: 30, promo: null,
    category: 'vita', icon: '🌯', badges: [],
    description: 'Shaorma de vita 500g cu salata de varza, rosii, castraveti, ceapa, ardei copt si sos la alegere.',
    ingredients: ['Vita la gratar', 'Lipie', 'Salata varza', 'Rosii', 'Castraveti', 'Ceapa'],
    allergens: 'Gluten', weight: '500g', kcal: 510,
  },
  {
    id: 6, name: 'Shaorma Mare Vita', price: 33, promo: null,
    category: 'vita', icon: '🌯', badges: ['bestseller'],
    description: 'Shaorma de vita 650g cu salata de varza, rosii, castraveti, ceapa, ardei copt si sos la alegere.',
    ingredients: ['Vita la gratar', 'Lipie', 'Salata varza', 'Rosii', 'Castraveti', 'Ceapa'],
    allergens: 'Gluten', weight: '650g', kcal: 650,
  },
  {
    id: 7, name: 'Shaorma Farfurie Vita', price: 38, promo: null,
    category: 'vita', icon: '🍽', badges: ['premium'],
    description: 'Shaorma de vita 750g servita pe farfurie cu garnitura si sos la alegere.',
    ingredients: ['Vita la gratar', 'Lipie', 'Salata varza', 'Rosii', 'Castraveti', 'Ceapa'],
    allergens: 'Gluten', weight: '750g', kcal: 750,
  },
  {
    id: 8, name: 'Kebab Vita Chifla', price: 27, promo: null,
    category: 'vita', icon: '🍔', badges: [],
    description: 'Kebab de vita 350g servit in chifla cu salata si sos la alegere.',
    ingredients: ['Vita la gratar', 'Chifla', 'Salata', 'Rosii', 'Ceapa'],
    allergens: 'Gluten', weight: '350g', kcal: 440,
  },

  // --- SHAORMA MIXTA ---
  {
    id: 9, name: 'Shaorma Mica Mixta', price: 29, promo: null,
    category: 'mixta', icon: '🌯', badges: [],
    description: 'Shaorma mix pui si vita 500g cu salata de varza, rosii, castraveti, ceapa si sos la alegere.',
    ingredients: ['Pui + Vita la gratar', 'Lipie', 'Salata varza', 'Rosii', 'Castraveti', 'Ceapa'],
    allergens: 'Gluten', weight: '500g', kcal: 495,
  },
  {
    id: 10, name: 'Shaorma Mare Mixta', price: 32, promo: null,
    category: 'mixta', icon: '🌯', badges: ['recomandat'],
    description: 'Shaorma mix pui si vita 650g cu salata de varza, rosii, castraveti, ceapa si sos la alegere.',
    ingredients: ['Pui + Vita la gratar', 'Lipie', 'Salata varza', 'Rosii', 'Castraveti', 'Ceapa'],
    allergens: 'Gluten', weight: '650g', kcal: 635,
  },
  {
    id: 11, name: 'Shaorma Farfurie Mixta', price: 37, promo: null,
    category: 'mixta', icon: '🍽', badges: ['recomandat'],
    description: 'Shaorma mix pui si vita 750g servita pe farfurie cu garnitura si sos la alegere.',
    ingredients: ['Pui + Vita la gratar', 'Lipie', 'Salata varza', 'Rosii', 'Castraveti', 'Ceapa'],
    allergens: 'Gluten', weight: '750g', kcal: 730,
  },
  {
    id: 12, name: 'Kebab Mix Chifla', price: 26, promo: null,
    category: 'mixta', icon: '🍔', badges: [],
    description: 'Kebab mix pui si vita 350g servit in chifla cu salata si sos la alegere.',
    ingredients: ['Pui + Vita la gratar', 'Chifla', 'Salata', 'Rosii', 'Ceapa'],
    allergens: 'Gluten', weight: '350g', kcal: 430,
  },

  // --- MENIURI ---
  {
    id: 13, name: 'Piept de Pui', price: 29, promo: null,
    category: 'meniu', icon: '🍽', badges: [],
    description: 'Piept de pui cu cartofi prajiti, salata, sos si chifla 650g.',
    ingredients: ['Piept pui', 'Cartofi prajiti', 'Salata', 'Sos la alegere', 'Chifla'],
    allergens: 'Gluten', weight: '650g', kcal: 750,
  },
  {
    id: 14, name: 'Pulpa de Pui', price: 29, promo: null,
    category: 'meniu', icon: '🍽', badges: [],
    description: 'Pulpa de pui cu cartofi prajiti, salata, sos si chifla 650g.',
    ingredients: ['Pulpa pui', 'Cartofi prajiti', 'Salata', 'Sos la alegere', 'Chifla'],
    allergens: 'Gluten', weight: '650g', kcal: 780,
  },
  {
    id: 15, name: 'Mici', price: 29, promo: null,
    category: 'meniu', icon: '🍖', badges: ['bestseller'],
    description: 'Mici cu cartofi prajiti, salata, sos si chifla 650g.',
    ingredients: ['Mici', 'Cartofi prajiti', 'Salata', 'Sos la alegere', 'Chifla'],
    allergens: 'Gluten', weight: '650g', kcal: 820,
  },
  {
    id: 16, name: 'Snitel la Farfurie', price: 29, promo: null,
    category: 'meniu', icon: '🍽', badges: [],
    description: 'Snitel cu cartofi prajiti, salata, sos si chifla 650g.',
    ingredients: ['Snitel pui', 'Cartofi prajiti', 'Salata', 'Sos la alegere', 'Chifla'],
    allergens: 'Gluten, Oua', weight: '650g', kcal: 800,
  },
  {
    id: 17, name: 'Aripioare Crispy', price: 29, promo: null,
    category: 'meniu', icon: '🍗', badges: ['nou'],
    description: 'Aripioare crispy cu cartofi prajiti, salata, sos si chifla 650g.',
    ingredients: ['Aripioare pui crispy', 'Cartofi prajiti', 'Salata', 'Sos la alegere', 'Chifla'],
    allergens: 'Gluten, Oua', weight: '650g', kcal: 860,
  },
  {
    id: 18, name: 'Pui Shanghai', price: 29, promo: null,
    category: 'meniu', icon: '🍽', badges: [],
    description: 'Pui Shanghai cu cartofi prajiti, salata, sos si chifla 650g.',
    ingredients: ['Pui Shanghai', 'Cartofi prajiti', 'Salata', 'Sos la alegere', 'Chifla'],
    allergens: 'Gluten, Oua', weight: '650g', kcal: 790,
  },
  {
    id: 19, name: 'Snitel la Lipie', price: 29, promo: null,
    category: 'meniu', icon: '🌯', badges: [],
    description: 'Snitel de pui 650g servit in lipie cu salata si sos la alegere.',
    ingredients: ['Snitel pui', 'Lipie', 'Salata', 'Sos la alegere'],
    allergens: 'Gluten, Oua', weight: '650g', kcal: 720,
  },
  {
    id: 20, name: 'Snitel Chifla', price: 25, promo: null,
    category: 'meniu', icon: '🍔', badges: [],
    description: 'Snitel de pui 350g in chifla cu salata si sos la alegere.',
    ingredients: ['Snitel pui', 'Chifla', 'Salata', 'Sos la alegere'],
    allergens: 'Gluten, Oua', weight: '350g', kcal: 520,
  },
  {
    id: 21, name: 'Pui Shanghai la Lipie', price: 29, promo: null,
    category: 'meniu', icon: '🌯', badges: [],
    description: 'Pui Shanghai 650g servit in lipie cu salata si sos la alegere.',
    ingredients: ['Pui Shanghai', 'Lipie', 'Salata', 'Sos la alegere'],
    allergens: 'Gluten, Oua', weight: '650g', kcal: 710,
  },
  {
    id: 22, name: 'Cheese Kebab Pui', price: 35, promo: null,
    category: 'meniu', icon: '🧀', badges: ['recomandat'],
    description: 'Cheese Kebab de pui 650g cu cascaval topit, salata si sos la alegere.',
    ingredients: ['Pui la gratar', 'Cascaval', 'Lipie', 'Salata', 'Sos la alegere'],
    allergens: 'Gluten, Lactate', weight: '650g', kcal: 780,
  },
  {
    id: 23, name: 'Cheese Kebab Vita', price: 37, promo: null,
    category: 'meniu', icon: '🧀', badges: ['premium'],
    description: 'Cheese Kebab de vita 650g cu cascaval topit, salata si sos la alegere.',
    ingredients: ['Vita la gratar', 'Cascaval', 'Lipie', 'Salata', 'Sos la alegere'],
    allergens: 'Gluten, Lactate', weight: '650g', kcal: 820,
  },
  {
    id: 24, name: 'Cheese Kebab Mix', price: 36, promo: null,
    category: 'meniu', icon: '🧀', badges: [],
    description: 'Cheese Kebab mix pui si vita 650g cu cascaval topit, salata si sos la alegere.',
    ingredients: ['Pui + Vita la gratar', 'Cascaval', 'Lipie', 'Salata', 'Sos la alegere'],
    allergens: 'Gluten, Lactate', weight: '650g', kcal: 800,
  },

  // --- GARNITURI ---
  {
    id: 25, name: 'Cartofi Prajiti', price: 7, promo: null,
    category: 'sides', icon: '🍟', badges: [],
    description: 'Cartofi prajiti 200g, crocanți si aurii.',
    ingredients: ['Cartofi', 'Ulei', 'Sare'],
    allergens: '', weight: '200g', kcal: 320,
  },

  // --- BAUTURI ---
  {
    id: 26, name: 'Apa Plata 500ml', price: 7, promo: null,
    category: 'bauturi', icon: '💧', badges: [],
    description: 'Apa plata 500ml.',
    ingredients: [], allergens: '', weight: '500ml', kcal: 0,
  },
  {
    id: 27, name: 'Pepsi 500ml', price: 10, promo: null,
    category: 'bauturi', icon: '🥤', badges: [],
    description: 'Pepsi Cola 500ml.',
    ingredients: [], allergens: '', weight: '500ml', kcal: 210,
  },
  {
    id: 28, name: 'Pepsi 330ml', price: 8, promo: null,
    category: 'bauturi', icon: '🥤', badges: [],
    description: 'Pepsi Cola doza 330ml.',
    ingredients: [], allergens: '', weight: '330ml', kcal: 140,
  },
  {
    id: 29, name: 'Prigat Portocale 500ml', price: 10, promo: null,
    category: 'bauturi', icon: '🍊', badges: [],
    description: 'Prigat portocale 500ml.',
    ingredients: [], allergens: '', weight: '500ml', kcal: 190,
  },
  {
    id: 30, name: 'Prigat Piersica 500ml', price: 10, promo: null,
    category: 'bauturi', icon: '🍑', badges: [],
    description: 'Prigat piersica 500ml.',
    ingredients: [], allergens: '', weight: '500ml', kcal: 185,
  },
  {
    id: 31, name: 'Lipton 500ml', price: 10, promo: null,
    category: 'bauturi', icon: '🍵', badges: [],
    description: 'Lipton Ice Tea 500ml.',
    ingredients: [], allergens: '', weight: '500ml', kcal: 170,
  },
  {
    id: 32, name: 'Limonada Mica 250ml', price: 10, promo: null,
    category: 'bauturi', icon: '🍋', badges: [],
    description: 'Limonada proaspata 250ml.',
    ingredients: ['Lamaie', 'Apa', 'Zahar'], allergens: '', weight: '250ml', kcal: 120,
  },
  {
    id: 33, name: 'Limonada Mare 1000ml', price: 14, promo: null,
    category: 'bauturi', icon: '🍋', badges: ['recomandat'],
    description: 'Limonada proaspata 1000ml pentru toata familia.',
    ingredients: ['Lamaie', 'Apa', 'Zahar'], allergens: '', weight: '1000ml', kcal: 480,
  },
  {
    id: 34, name: 'Ayran 330ml', price: 10, promo: null,
    category: 'bauturi', icon: '🥛', badges: [],
    description: 'Ayran traditional 330ml, perfect cu shaorma.',
    ingredients: ['Iaurt', 'Apa', 'Sare'], allergens: 'Lactate', weight: '330ml', kcal: 85,
  },
]

export const SAUCES = [
  { id: 'maioneza-usturoi', name: 'Maioneza Usturoi', spicy: false },
  { id: 'maioneza-simpla', name: 'Maioneza Simpla', spicy: false },
  { id: 'sos-curry', name: 'Sos Curry', spicy: false },
  { id: 'sos-branza', name: 'Sos Branza', spicy: false },
  { id: 'maioneza-picanta', name: 'Maioneza Picanta', spicy: true },
  { id: 'ketchup-dulce', name: 'Ketchup Dulce', spicy: false },
  { id: 'ketchup-picant', name: 'Ketchup Picant', spicy: true },
]

export const EXTRAS = [
  { id: 'extra-carne', name: 'Extra Carne', price: 10 },
  { id: 'extra-cascaval', name: 'Extra Cascaval', price: 5 },
  { id: 'extra-sos', name: 'Sos Suplimentar', price: 3 },
]

export const SPICE_LEVELS = [
  { id: 'fara', label: 'Fara picant' },
  { id: 'mediu', label: 'Mediu' },
  { id: 'picant', label: 'Picant' },
  { id: 'extra', label: 'Extra picant' },
]

export const COUPONS = {
  'METRO10': { discount: 0.10, label: '10% reducere prima comanda' },
  'WEEKEND20': { discount: 0.20, label: '20% reducere weekend' },
}

export const DELIVERY_ZONES = [
  { zone: 'Gaesti', fee: 0, minOrder: 30, freeOver: 0, eta: '20-30 min' },
  { zone: 'Imprejurimi Gaesti', fee: 10, minOrder: 50, freeOver: 100, eta: '30-45 min' },
]

export const RESTAURANT_INFO = {
  name: 'Metropolitan Shaorma & Grill',
  phone: '0758-793-231',
  address: 'Str. 13 Decembrie nr. 69, Gaesti',
  city: 'Gaesti',
  hours: {
    weekdays: '10:00 - 22:00',
    weekend: '10:00 - 23:00',
  },
}