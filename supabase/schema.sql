-- ================================================
-- METROPOLITAN SHAORMA & GRILL — Supabase Schema
-- ================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ----------------
-- USER PROFILES
-- ----------------
create table public.user_profiles (
  id uuid references auth.users on delete cascade primary key,
  full_name text,
  phone text,
  email text,
  date_of_birth date,
  avatar_url text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
alter table public.user_profiles enable row level security;
create policy "Users can view own profile" on public.user_profiles for select using (auth.uid() = id);
create policy "Users can update own profile" on public.user_profiles for update using (auth.uid() = id);

-- ----------------
-- ADDRESSES
-- ----------------
create table public.addresses (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.user_profiles(id) on delete cascade,
  label text default 'Acasă',
  is_primary boolean default false,
  judet text not null,
  localitate text not null,
  strada text not null,
  numar text not null,
  bloc text,
  scara text,
  etaj text,
  apartament text,
  cod_interfon text,
  instructiuni text,
  created_at timestamptz default now()
);
alter table public.addresses enable row level security;
create policy "Users manage own addresses" on public.addresses for all using (auth.uid() = user_id);

-- ----------------
-- CATEGORIES
-- ----------------
create table public.categories (
  id text primary key,
  name text not null,
  icon text,
  sort_order int default 0,
  active boolean default true
);
insert into public.categories (id, name, icon, sort_order) values
  ('shaorma', 'Shaorma', '🌯', 1),
  ('burger', 'Burgeri', '🍔', 2),
  ('meniu', 'Meniuri Combo', '🎁', 3),
  ('sides', 'Garnituri', '🍟', 4),
  ('sosuri', 'Sosuri', '🫙', 5),
  ('bauturi', 'Băuturi', '🥤', 6);

-- ----------------
-- MENU ITEMS
-- ----------------
create table public.menu_items (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  description text,
  category_id text references public.categories(id),
  price numeric(10,2) not null,
  promo_price numeric(10,2),
  icon text default '🌯',
  weight text,
  kcal int,
  allergens text,
  badges text[] default '{}',
  active boolean default true,
  sort_order int default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ----------------
-- MENU ITEM IMAGES
-- ----------------
create table public.menu_item_images (
  id uuid default uuid_generate_v4() primary key,
  menu_item_id uuid references public.menu_items(id) on delete cascade,
  url text not null,
  is_primary boolean default false,
  alt text,
  sort_order int default 0
);

-- ----------------
-- INGREDIENTS
-- ----------------
create table public.ingredients (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  active boolean default true
);
create table public.menu_item_ingredients (
  menu_item_id uuid references public.menu_items(id) on delete cascade,
  ingredient_id uuid references public.ingredients(id),
  primary key (menu_item_id, ingredient_id)
);

-- ----------------
-- SAUCES
-- ----------------
create table public.sauces (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  is_spicy boolean default false,
  price numeric(10,2) default 0,
  active boolean default true
);
insert into public.sauces (name, is_spicy, price) values
  ('Sos Usturoi', false, 0),
  ('Sos Burger', false, 0),
  ('Sos Samurai', true, 0),
  ('Sos Picant Metropolitan', true, 0),
  ('Tzatziki', false, 0),
  ('Ketchup', false, 0);

-- ----------------
-- EXTRAS
-- ----------------
create table public.extras (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  price numeric(10,2) not null,
  active boolean default true
);
insert into public.extras (name, price) values
  ('Extra Carne', 10),
  ('Extra Cașcaval', 5),
  ('Sos Suplimentar', 3),
  ('Extra Legume', 3);

-- ----------------
-- COUPONS
-- ----------------
create table public.coupons (
  id uuid default uuid_generate_v4() primary key,
  code text unique not null,
  label text not null,
  discount_type text default 'percent', -- 'percent' | 'fixed'
  discount_value numeric(10,2) not null,
  min_order numeric(10,2) default 0,
  max_uses int,
  current_uses int default 0,
  valid_from timestamptz default now(),
  valid_until timestamptz,
  active boolean default true,
  created_at timestamptz default now()
);
insert into public.coupons (code, label, discount_value, active) values
  ('METRO10', '10% reducere prima comandă', 10, true),
  ('WEEKEND20', '20% reducere weekend', 20, true),
  ('STUDENT15', '15% reducere studenți', 15, true);

-- ----------------
-- ORDERS
-- ----------------
create type order_status as enum ('new', 'accepted', 'preparing', 'ready', 'delivery', 'delivered', 'cancelled');
create type delivery_type as enum ('livrare', 'ridicare');
create type payment_method as enum ('numerar', 'card', 'online', 'applepay');

create table public.orders (
  id uuid default uuid_generate_v4() primary key,
  order_number text unique not null,
  user_id uuid references public.user_profiles(id),
  -- Contact
  full_name text not null,
  phone text not null,
  email text,
  -- Delivery
  delivery_type delivery_type default 'livrare',
  judet text,
  localitate text,
  strada text,
  numar text,
  bloc text,
  scara text,
  apartament text,
  cod_interfon text,
  instructiuni text,
  interval_orar text,
  -- Payment
  payment_method payment_method default 'numerar',
  -- Pricing
  subtotal numeric(10,2) not null,
  delivery_fee numeric(10,2) default 7,
  discount_amount numeric(10,2) default 0,
  tip numeric(10,2) default 0,
  total numeric(10,2) not null,
  coupon_id uuid references public.coupons(id),
  -- Status
  status order_status default 'new',
  notes text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Auto-generate order numbers
create sequence order_number_seq start 1000;
create or replace function generate_order_number()
returns trigger as $$
begin
  new.order_number := 'MG-' || to_char(now(), 'YYYY') || '-' || lpad(nextval('order_number_seq')::text, 5, '0');
  return new;
end;
$$ language plpgsql;
create trigger set_order_number before insert on public.orders
  for each row execute function generate_order_number();

-- ----------------
-- ORDER ITEMS
-- ----------------
create table public.order_items (
  id uuid default uuid_generate_v4() primary key,
  order_id uuid references public.orders(id) on delete cascade,
  menu_item_id uuid references public.menu_items(id),
  menu_item_name text not null,
  menu_item_price numeric(10,2) not null,
  qty int not null default 1,
  item_total numeric(10,2) not null
);

-- ----------------
-- ORDER ITEM OPTIONS
-- ----------------
create table public.order_item_options (
  id uuid default uuid_generate_v4() primary key,
  order_item_id uuid references public.order_items(id) on delete cascade,
  option_type text not null, -- 'sauce' | 'spice' | 'extra'
  option_name text not null,
  option_price numeric(10,2) default 0
);

-- ----------------
-- REVIEWS
-- ----------------
create table public.reviews (
  id uuid default uuid_generate_v4() primary key,
  order_id uuid references public.orders(id),
  user_id uuid references public.user_profiles(id),
  menu_item_id uuid references public.menu_items(id),
  rating int check (rating >= 1 and rating <= 5),
  comment text,
  approved boolean default false,
  created_at timestamptz default now()
);

-- ----------------
-- FAVORITES
-- ----------------
create table public.favorites (
  user_id uuid references public.user_profiles(id) on delete cascade,
  menu_item_id uuid references public.menu_items(id) on delete cascade,
  created_at timestamptz default now(),
  primary key (user_id, menu_item_id)
);
alter table public.favorites enable row level security;
create policy "Users manage own favorites" on public.favorites for all using (auth.uid() = user_id);

-- ----------------
-- SITE SETTINGS
-- ----------------
create table public.site_settings (
  key text primary key,
  value text,
  updated_at timestamptz default now()
);
insert into public.site_settings (key, value) values
  ('restaurant_name', 'Metropolitan Shaorma & Grill'),
  ('restaurant_phone', '0721 234 567'),
  ('restaurant_email', 'office@metropolitan.ro'),
  ('restaurant_address', 'Str. Mihai Eminescu 42, Sector 2, București'),
  ('restaurant_status', 'open'),
  ('min_order_delivery', '30'),
  ('preparation_time_minutes', '20');

-- ----------------
-- BUSINESS HOURS
-- ----------------
create table public.business_hours (
  id uuid default uuid_generate_v4() primary key,
  day_of_week int not null, -- 0=Sunday, 1=Monday, ..., 6=Saturday
  open_time time,
  close_time time,
  is_closed boolean default false
);
insert into public.business_hours (day_of_week, open_time, close_time) values
  (0, '10:00', '24:00'), -- Sunday
  (1, '10:00', '23:00'), -- Monday
  (2, '10:00', '23:00'),
  (3, '10:00', '23:00'),
  (4, '10:00', '23:00'),
  (5, '10:00', '23:00'),
  (6, '10:00', '24:00'); -- Saturday

-- ----------------
-- DELIVERY ZONES
-- ----------------
create table public.delivery_zones (
  id uuid default uuid_generate_v4() primary key,
  zone_name text not null,
  fee numeric(10,2) not null,
  min_order numeric(10,2) default 30,
  free_delivery_over numeric(10,2) default 80,
  eta_minutes_min int default 20,
  eta_minutes_max int default 40,
  active boolean default true
);
insert into public.delivery_zones (zone_name, fee, min_order, free_delivery_over, eta_minutes_min, eta_minutes_max) values
  ('Sector 1', 7, 30, 80, 25, 35),
  ('Sector 2', 7, 30, 80, 20, 30),
  ('Sector 3', 10, 40, 100, 30, 40),
  ('Sector 4', 10, 40, 100, 30, 45),
  ('Ilfov', 15, 60, 120, 40, 55);

-- ----------------
-- INDEXES
-- ----------------
create index idx_orders_user on public.orders(user_id);
create index idx_orders_status on public.orders(status);
create index idx_orders_created on public.orders(created_at desc);
create index idx_menu_items_category on public.menu_items(category_id);
create index idx_menu_items_active on public.menu_items(active);
create index idx_order_items_order on public.order_items(order_id);
create index idx_reviews_item on public.reviews(menu_item_id);
