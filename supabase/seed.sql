-- ================================================
-- METROPOLITAN SHAORMA & GRILL — Seed Data
-- Run after schema.sql
-- ================================================

-- Menu Items
insert into public.menu_items (name, description, category_id, price, promo_price, icon, weight, kcal, allergens, badges, sort_order) values

-- Shaorma
('Shaorma Pui Clasică', 'Pui la grătar, roșii, castraveți, varză, sos de usturoi în lipie caldă. Rețeta noastră clasică, iubită de mii de clienți.', 'shaorma', 29, null, '🌯', '350g', 520, 'Gluten, Lactate', array['bestseller'], 1),
('Shaorma Vită Premium', 'Vită 100%, carne marinată 24h, legume proaspete, sos samurai, lipie artizanală. Experiența Metropolitan la nivel următor.', 'shaorma', 39, null, '🌯', '400g', 620, 'Gluten', array['premium'], 2),
('Shaorma Mix Metropolitan', 'Mix de pui și vită, dublu sos, extra legume, rețeta exclusivă Metropolitan. Cel mai popular produs al nostru.', 'shaorma', 43, 38, '🌯', '450g', 680, 'Gluten, Lactate', array['promo', 'recomandat'], 3),
('Shaorma Crispy Box', 'Pui crispy pane, cartofi pai, sos de muștar și miere, servit în cutie. Noua senzație Metropolitan.', 'shaorma', 32, null, '🍗', '420g', 720, 'Gluten, Ouă', array['nou'], 4),

-- Burgeri
('Burger BBQ Grill', 'Carne vită 180g, cheddar afumat, bacon crocant, sos BBQ, ceapă caramelizată, brioche prăjit.', 'burger', 35, null, '🍔', '380g', 780, 'Gluten, Lactate, Ouă', array['bestseller'], 5),
('Burger Metropolitan', 'Dublu patty vită, cheddar dublu, castraveți murați, sos secret Metropolitan. Exclusiv pentru gurmanzi.', 'burger', 38, null, '🍔', '480g', 950, 'Gluten, Lactate, Ouă', array['premium'], 6),
('Burger Chicken Crispy', 'Piept de pui crispy, salată coleslaw, sos ranch, roșii, brioche cu susan.', 'burger', 32, null, '🍔', '340g', 650, 'Gluten, Lactate, Ouă', array[]::text[], 7),

-- Meniuri
('Meniu Duo Metropolitan', '2 shaorme la alegere + 2 garnituri la alegere + 2 băuturi 0.5L. Perfect pentru două persoane.', 'meniu', 89, 71, '🎁', '~1.2kg', null, 'Gluten, Lactate', array['promo'], 8),
('Family Bucket Metropolitan', '4 shaorme mix + 2 porții cartofi mari + 4 băuturi + 6 sosuri la alegere. Răsfăț pentru toată familia.', 'meniu', 149, null, '🎁', '~2.5kg', null, 'Gluten, Lactate, Ouă', array['family'], 9),
('Meniu Solo Metropolitan', '1 shaormă la alegere + 1 garnitură + 1 băutură 0.5L. Combinația perfectă pentru prânz.', 'meniu', 49, null, '🎁', '~700g', null, 'Gluten, Lactate', array['recomandat'], 10),

-- Garnituri
('Cartofi Prăjiți', 'Cartofi pai belgieni, prăjiți în ulei de floarea soarelui, sărați cu fleur de sel.', 'sides', 12, null, '🍟', '200g', 380, null, array[]::text[], 11),
('Inele de Ceapă', 'Inele de ceapă dulce în crustă crocantă de bere, servite cu sos de chili dulce.', 'sides', 14, null, '🧅', '180g', 320, 'Gluten, Ouă', array[]::text[], 12),

-- Sosuri
('Sos Usturoi', 'Sos de usturoi cremos, preparat zilnic din usturoi proaspăt și smântână. Clasicul Metropolitan.', 'sosuri', 5, null, '🫙', '60ml', 90, 'Lactate', array[]::text[], 13),
('Sos Burger', 'Sos thousand island cu castraveți murați și paprika afumată. Perfect pentru burgeri.', 'sosuri', 5, null, '🫙', '60ml', 120, 'Ouă, Muștar', array[]::text[], 14),
('Sos Samurai', 'Sos picant-dulce cu ardei iute, miere și ghimbir. Specialitatea casei Metropolitan.', 'sosuri', 5, null, '🫙', '60ml', 80, null, array['picant'], 15),
('Sos Picant Metropolitan', 'Extra hot! Ardei iute, chili, habanero. Doar pentru cei cu adevărat curajoși.', 'sosuri', 5, null, '🫙', '60ml', 30, null, array['picant'], 16),

-- Băuturi
('Cola 0.5L', 'Coca-Cola clasică, servită rece cu gheață.', 'bauturi', 8, null, '🥤', '500ml', 210, null, array[]::text[], 17),
('Fanta Portocale 0.5L', 'Fanta portocale, răcoritoare și plăcută.', 'bauturi', 8, null, '🥤', '500ml', 195, null, array[]::text[], 18),
('Ayran 0.33L', 'Ayran tradițional turcesc, iaurt bătut cu sare, perfect alături de shaorma.', 'bauturi', 7, null, '🥛', '330ml', 85, 'Lactate', array['recomandat'], 19),
('Apă Plată 0.5L', 'Apă minerală plată Borsec.', 'bauturi', 4, null, '💧', '500ml', 0, null, array[]::text[], 20);
