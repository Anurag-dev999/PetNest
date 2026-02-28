import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase credentials in .env.local')
    process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

const products = [
    // ═══════════════════════════════════════════
    // DOG PRODUCTS (5) — AI-generated images
    // ═══════════════════════════════════════════
    { name: 'Royal Canin Maxi Adult Dry Dog Food', description: 'Complete and balanced nutrition for large breed adult dogs (26–44 kg). Promotes optimal digestive security and joint support. 15 kg bag.', price: 6800.00, category: 'Food', pet_type: 'Dog', image_url: '/products/dog-food.png', rating: 4.8, stock: 45 },
    { name: 'Pedigree Meat Jerky Stix — Roasted Lamb', description: 'A deliciously chewy and meaty treat. Made with real meat, highly nutritious and easily digestible. Resealable pouch.', price: 450.00, category: 'Treats', pet_type: 'Dog', image_url: '/products/dog-treats.png', rating: 4.6, stock: 200 },
    { name: 'Petsy Premium Reflective Nylon Leash', description: 'Heavy-duty 5 ft nylon leash with highly reflective threads for night safety. Features a comfortable padded handle and sturdy metal clasp.', price: 799.00, category: 'Accessories', pet_type: 'Dog', image_url: '/products/dog-leash.png', rating: 4.7, stock: 85 },
    { name: 'KONG Classic Durable Rubber Chew Toy', description: 'The gold standard of dog chew toys. Made from ultra-durable red rubber, perfect for chewing, fetching, and stuffing with treats.', price: 1250.00, category: 'Toys', pet_type: 'Dog', image_url: '/products/dog-toy.png', rating: 4.9, stock: 120 },
    { name: 'Orthopaedic Memory Foam Dog Bed', description: 'Premium memory foam bed that contours to the body, providing superior joint and muscle relief. Removable, machine-washable velvet cover.', price: 4500.00, category: 'Furniture', pet_type: 'Dog', image_url: '/products/dog-bed.png', rating: 4.8, stock: 30 },

    // ═══════════════════════════════════════════
    // CAT PRODUCTS (5) — 1 AI + 4 (now AI generated)
    // ═══════════════════════════════════════════
    { name: 'Whiskas Adult Dry Cat Food — Ocean Fish', description: '100% complete and balanced nutrition for adult cats. Enriched with Omega-3 & 6, zinc, and vital vitamins for a healthy coat and active lifestyle.', price: 1850.00, category: 'Food', pet_type: 'Cat', image_url: '/products/cat-food.png', rating: 4.7, stock: 110 },
    { name: 'Premium Clumping Cat Litter — 10 kg', description: 'Ultra-premium clay litter with 40-day odour control technology. 99.9% dust-free and forms extra-hard, easy-to-scoop clumps.', price: 1699.00, category: 'Supplies', pet_type: 'Cat', image_url: '/products/cat-litter.png', rating: 4.9, stock: 80 },
    { name: 'Multi-Level Luxury Cat Tree with Sisal Posts', description: 'Luxurious multi-level condo featuring cozy hideaways, perches, and natural sisal rope scratching posts to save your furniture.', price: 8500.00, category: 'Furniture', pet_type: 'Cat', image_url: '/products/cat-tree.png', rating: 4.8, stock: 15 },
    { name: 'Interactive Feather Wand Cat Toy', description: 'Colourful feather and bell wand toy that triggers natural hunting instincts. Encourages healthy exercise and mental stimulation.', price: 599.00, category: 'Toys', pet_type: 'Cat', image_url: '/products/cat-toy.png', rating: 4.4, stock: 65 },
    { name: 'Dreamies Cat Treats — Chicken Flavour', description: 'Crunchy on the outside, soft on the inside. Helps reduce tartar build-up while offering irresistible taste. Only 2 kcal per treat.', price: 250.00, category: 'Treats', pet_type: 'Cat', image_url: '/products/cat-treats.png', rating: 4.8, stock: 300 },

    // ═══════════════════════════════════════════
    // BIRD PRODUCTS (4) — Now AI generated
    // ═══════════════════════════════════════════
    { name: 'Vitapol Premium Seed Mix for Budgies', description: 'Complete formulated diet with a mix of seeds, grains, and fruits designed specifically for the nutritional needs of budgerigars.', price: 350.00, category: 'Food', pet_type: 'Bird', image_url: '/products/bird-food.png', rating: 4.6, stock: 150 },
    { name: 'Wrought Iron Flight Cage with Rolling Stand', description: 'Spacious flight cage with large front doors, pull-out bottom grille, and debris tray for easy cleaning. Includes rolling stand.', price: 12500.00, category: 'Furniture', pet_type: 'Bird', image_url: '/products/bird-cage.png', rating: 4.8, stock: 10 },
    { name: 'Colourful Mirror & Bell Bird Toy', description: 'Engaging mirror toy that satisfies a bird\'s natural curiosity. The attached bell provides auditory stimulation for endless entertainment.', price: 450.00, category: 'Toys', pet_type: 'Bird', image_url: '/products/bird-toy.png', rating: 4.5, stock: 90 },
    { name: 'Natural Wood Perch Set (3-Pack)', description: 'Pack of 3 natural wooden branches for bird cages. Provides variable gripping surfaces to reduce foot fatigue and trim nails.', price: 699.00, category: 'Accessories', pet_type: 'Bird', image_url: '/products/bird-accessories.png', rating: 4.7, stock: 210 },

    // ═══════════════════════════════════════════
    // FISH PRODUCTS (3) — Now AI generated
    // ═══════════════════════════════════════════
    { name: 'TetraBits Complete Fish Food Granules', description: 'Premium sinking granules that provide optimal nutrition and promote brilliant coloration for Discus and tropical mid-water feeders.', price: 595.00, category: 'Food', pet_type: 'Fish', image_url: '/products/fish-food.png', rating: 4.8, stock: 200 },
    { name: '5-Gallon Glass Nano Aquarium Kit', description: 'Sleek, modern nano aquarium with etched-glass detailing. Includes a powerful 3-stage filtration system and a sleek LED lighting fixture.', price: 9500.00, category: 'Furniture', pet_type: 'Fish', image_url: '/products/fish-aquarium.png', rating: 4.7, stock: 20 },
    { name: '100W Submersible Glass Aquarium Heater', description: 'Precision quartz glass aquarium heater. Shatter-proof, fully submersible, and features a highly accurate temperature dial.', price: 2200.00, category: 'Supplies', pet_type: 'Fish', image_url: '/products/fish-supplies.png', rating: 4.9, stock: 45 },

    // ═══════════════════════════════════════════
    // SMALL PETS PRODUCTS (3) — Now AI generated
    // ═══════════════════════════════════════════
    { name: 'Oxbow Western Timothy Hay — 1 kg', description: 'Sweet-smelling, high-fibre grass hay essential for the digestive health and dental wear of herbivores like rabbits and guinea pigs.', price: 1200.00, category: 'Food', pet_type: 'Small Pets', image_url: '/products/smallpet-food.png', rating: 4.8, stock: 120 },
    { name: 'Large Indoor Cage for Guinea Pigs & Rabbits', description: 'Extra-large habitat with a rounded, opening roof for easy access. Comes fully equipped with a hay feeder, drinking bottle, and resting house.', price: 6800.00, category: 'Furniture', pet_type: 'Small Pets', image_url: '/products/smallpet-furniture.png', rating: 4.6, stock: 25 },
    { name: 'Leak-Proof Glass Water Bottle — 500 ml', description: 'Premium double-ball bearing glass water dispenser. Guarantees a drip-proof seal to keep your small pet\'s cage completely dry.', price: 750.00, category: 'Supplies', pet_type: 'Small Pets', image_url: '/products/smallpet-supplies.png', rating: 4.7, stock: 180 }
]

async function seed() {
    console.log('Replacing existing products with real-world products...')

    // Delete order items, orders, then products (in order due to foreign keys)
    const { error: deleteOrderItems } = await supabase
        .from('order_items')
        .delete()
        .neq('id', '00000000-0000-0000-0000-000000000000')
    if (deleteOrderItems) console.warn('Note: Could not delete order_items:', deleteOrderItems.message)

    const { error: deleteOrders } = await supabase
        .from('orders')
        .delete()
        .neq('id', '00000000-0000-0000-0000-000000000000')
    if (deleteOrders) console.warn('Note: Could not delete orders:', deleteOrders.message)

    const { error: deleteError } = await supabase
        .from('products')
        .delete()
        .neq('id', '00000000-0000-0000-0000-000000000000')
    if (deleteError) console.warn('Note: Could not delete old products:', deleteError.message)

    // Insert new products
    const { data, error } = await supabase
        .from('products')
        .insert(products)
        .select()

    if (error) {
        console.error('Error inserting new products:', error)
    } else {
        console.log(`✓ Successfully added ${data.length} real-world products!`)
    }
}

seed()
