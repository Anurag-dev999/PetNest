-- PetNest Seed Data — 20 Real Products with Guaranteed Working Images
-- 6 AI-generated product images (local) + 14 Pexels CDN product shots
-- All prices in INR (₹)

DELETE FROM order_items;
DELETE FROM orders;
DELETE FROM products;

INSERT INTO products (name, description, price, category, pet_type, image_url, rating, stock) VALUES

-- ═══════════════════════════════════════════
-- DOG PRODUCTS (5) — AI-generated images
-- ═══════════════════════════════════════════
('Royal Canin Maxi Adult Dry Dog Food',
 'Complete and balanced nutrition for large breed adult dogs (26–44 kg). Promotes optimal digestive security and joint support. 15 kg bag.',
 6800.00, 'Food', 'Dog',
 '/products/dog-food.png', 4.8, 45),

('Pedigree Meat Jerky Stix — Roasted Lamb',
 'A deliciously chewy and meaty treat. Made with real meat, highly nutritious and easily digestible. Resealable pouch.',
 450.00, 'Treats', 'Dog',
 '/products/dog-treats.png', 4.6, 200),

('Petsy Premium Reflective Nylon Leash',
 'Heavy-duty 5 ft nylon leash with highly reflective threads for night safety. Features a comfortable padded handle and sturdy metal clasp.',
 799.00, 'Accessories', 'Dog',
 '/products/dog-leash.png', 4.7, 85),

('KONG Classic Durable Rubber Chew Toy',
 'The gold standard of dog chew toys. Made from ultra-durable red rubber, perfect for chewing, fetching, and stuffing with treats.',
 1250.00, 'Toys', 'Dog',
 '/products/dog-toy.png', 4.9, 120),

('Orthopaedic Memory Foam Dog Bed',
 'Premium memory foam bed that contours to the body, providing superior joint and muscle relief. Removable, machine-washable velvet cover.',
 4500.00, 'Furniture', 'Dog',
 '/products/dog-bed.png', 4.8, 30),

-- ═══════════════════════════════════════════
-- CAT PRODUCTS (5) — 1 AI + 4 Pexels
-- ═══════════════════════════════════════════
('Whiskas Adult Dry Cat Food — Ocean Fish',
 '100% complete and balanced nutrition for adult cats. Enriched with Omega-3 & 6, zinc, and vital vitamins for a healthy coat and active lifestyle.',
 1850.00, 'Food', 'Cat',
 '/products/cat-food.png', 4.7, 110),

('Premium Clumping Cat Litter — 10 kg',
 'Ultra-premium clay litter with 40-day odour control technology. 99.9% dust-free and forms extra-hard, easy-to-scoop clumps.',
 1699.00, 'Supplies', 'Cat',
 'https://images.pexels.com/photos/4587979/pexels-photo-4587979.jpeg?auto=compress&w=800&h=800&fit=crop', 4.9, 80),

('Multi-Level Luxury Cat Tree with Sisal Posts',
 'Luxurious multi-level condo featuring cozy hideaways, perches, and natural sisal rope scratching posts to save your furniture.',
 8500.00, 'Furniture', 'Cat',
 'https://images.pexels.com/photos/7725961/pexels-photo-7725961.jpeg?auto=compress&w=800&h=800&fit=crop', 4.8, 15),

('Interactive Feather Wand Cat Toy',
 'Colourful feather and bell wand toy that triggers natural hunting instincts. Encourages healthy exercise and mental stimulation.',
 599.00, 'Toys', 'Cat',
 'https://images.pexels.com/photos/6957667/pexels-photo-6957667.jpeg?auto=compress&w=800&h=800&fit=crop', 4.4, 65),

('Dreamies Cat Treats — Chicken Flavour',
 'Crunchy on the outside, soft on the inside. Helps reduce tartar build-up while offering irresistible taste. Only 2 kcal per treat.',
 250.00, 'Treats', 'Cat',
 'https://images.pexels.com/photos/5731862/pexels-photo-5731862.jpeg?auto=compress&w=800&h=800&fit=crop', 4.8, 300),

-- ═══════════════════════════════════════════
-- BIRD PRODUCTS (4) — Pexels
-- ═══════════════════════════════════════════
('Vitapol Premium Seed Mix for Budgies',
 'Complete formulated diet with a mix of seeds, grains, and fruits designed specifically for the nutritional needs of budgerigars.',
 350.00, 'Food', 'Bird',
 'https://images.pexels.com/photos/4588065/pexels-photo-4588065.jpeg?auto=compress&w=800&h=800&fit=crop', 4.6, 150),

('Wrought Iron Flight Cage with Rolling Stand',
 'Spacious flight cage with large front doors, pull-out bottom grille, and debris tray for easy cleaning. Includes rolling stand.',
 12500.00, 'Furniture', 'Bird',
 'https://images.pexels.com/photos/6853506/pexels-photo-6853506.jpeg?auto=compress&w=800&h=800&fit=crop', 4.8, 10),

('Colourful Mirror & Bell Bird Toy',
 'Engaging mirror toy that satisfies a bird''s natural curiosity. The attached bell provides auditory stimulation for endless entertainment.',
 450.00, 'Toys', 'Bird',
 'https://images.pexels.com/photos/4588052/pexels-photo-4588052.jpeg?auto=compress&w=800&h=800&fit=crop', 4.5, 90),

('Natural Wood Perch Set (3-Pack)',
 'Pack of 3 natural wooden branches for bird cages. Provides variable gripping surfaces to reduce foot fatigue and trim nails.',
 699.00, 'Accessories', 'Bird',
 'https://images.pexels.com/photos/4588047/pexels-photo-4588047.jpeg?auto=compress&w=800&h=800&fit=crop', 4.7, 210),

-- ═══════════════════════════════════════════
-- FISH PRODUCTS (3) — Pexels
-- ═══════════════════════════════════════════
('TetraBits Complete Fish Food Granules',
 'Premium sinking granules that provide optimal nutrition and promote brilliant coloration for Discus and tropical mid-water feeders.',
 595.00, 'Food', 'Fish',
 'https://images.pexels.com/photos/3014019/pexels-photo-3014019.jpeg?auto=compress&w=800&h=800&fit=crop', 4.8, 200),

('5-Gallon Glass Nano Aquarium Kit',
 'Sleek, modern nano aquarium with etched-glass detailing. Includes a powerful 3-stage filtration system and a sleek LED lighting fixture.',
 9500.00, 'Furniture', 'Fish',
 'https://images.pexels.com/photos/2156311/pexels-photo-2156311.jpeg?auto=compress&w=800&h=800&fit=crop', 4.7, 20),

('100W Submersible Glass Aquarium Heater',
 'Precision quartz glass aquarium heater. Shatter-proof, fully submersible, and features a highly accurate temperature dial.',
 2200.00, 'Supplies', 'Fish',
 'https://images.pexels.com/photos/1145274/pexels-photo-1145274.jpeg?auto=compress&w=800&h=800&fit=crop', 4.9, 45),

-- ═══════════════════════════════════════════
-- SMALL PETS PRODUCTS (3) — Pexels
-- ═══════════════════════════════════════════
('Oxbow Western Timothy Hay — 1 kg',
 'Sweet-smelling, high-fibre grass hay essential for the digestive health and dental wear of herbivores like rabbits and guinea pigs.',
 1200.00, 'Food', 'Small Pets',
 'https://images.pexels.com/photos/4588070/pexels-photo-4588070.jpeg?auto=compress&w=800&h=800&fit=crop', 4.8, 120),

('Large Indoor Cage for Guinea Pigs & Rabbits',
 'Extra-large habitat with a rounded, opening roof for easy access. Comes fully equipped with a hay feeder, drinking bottle, and resting house.',
 6800.00, 'Furniture', 'Small Pets',
 'https://images.pexels.com/photos/4588055/pexels-photo-4588055.jpeg?auto=compress&w=800&h=800&fit=crop', 4.6, 25),

('Leak-Proof Glass Water Bottle — 500 ml',
 'Premium double-ball bearing glass water dispenser. Guarantees a drip-proof seal to keep your small pet''s cage completely dry.',
 750.00, 'Supplies', 'Small Pets',
 'https://images.pexels.com/photos/4587998/pexels-photo-4587998.jpeg?auto=compress&w=800&h=800&fit=crop', 4.7, 180);
