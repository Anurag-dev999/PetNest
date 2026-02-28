import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase credentials in .env.local')
    process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

const products = [
    // Dog Products
    { name: 'Royal Canin Maxi Adult Dry Dog Food', description: 'Complete and balanced nutrition for large breed adult dogs (26 to 44 kg) - Over 15 months old. Promotes optimal digestive security and joint support.', price: 6800.00, category: 'Food', pet_type: 'Dog', image_url: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=800&h=800&fit=crop', rating: 4.8, stock: 45 },
    { name: 'Pedigree Meat Jerky Stix - Roasted Lamb', description: 'A deliciously chewy and meaty treat for your dog. Made with real meat, making it highly nutritious and easily digestible.', price: 450.00, category: 'Treats', pet_type: 'Dog', image_url: 'https://images.unsplash.com/photo-1548681528-6a5c45b66b42?w=800&h=800&fit=crop', rating: 4.6, stock: 200 },
    { name: 'Petsy Premium Reflective Nylon Leash', description: 'Heavy-duty 5ft nylon leash with highly reflective threads for night safety. Features a comfortable padded handle and sturdy metal clasp.', price: 799.00, category: 'Accessories', pet_type: 'Dog', image_url: 'https://images.unsplash.com/photo-1598282361139-4dff635ecae2?w=800&h=800&fit=crop', rating: 4.7, stock: 85 },
    { name: 'KONG Classic Durable Rubber Chew Toy', description: 'The gold standard of dog toys. Made from ultra-durable red rubber, perfect for chewing, fetching, and stuffing with treats.', price: 1250.00, category: 'Toys', pet_type: 'Dog', image_url: 'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?w=800&h=800&fit=crop', rating: 4.9, stock: 120 },
    { name: 'Heads Up For Tails Orthopaedic Dog Bed', description: 'Premium memory foam bed that contours to your dog\'s body, providing superior joint and muscle relief. Removable, machine-washable velvet cover.', price: 4500.00, category: 'Furniture', pet_type: 'Dog', image_url: 'https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?w=800&h=800&fit=crop', rating: 4.8, stock: 30 },
    { name: 'Wahl Pet Clipper Kit for Professional Grooming', description: 'High-carbon steel blades stay sharp longer. Includes colored guide combs for easy identification and a low-noise motor for sensitive pets.', price: 2899.00, category: 'Grooming', pet_type: 'Dog', image_url: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=800&h=800&fit=crop', rating: 4.5, stock: 60 },

    // Cat Products
    { name: 'Whiskas Adult Dry Cat Food - Ocean Fish', description: '100% complete and balanced nutrition for adult cats. Enriched with Omega 3 & 6, zinc, and vital vitamins for a healthy coat and active lifestyle.', price: 1850.00, category: 'Food', pet_type: 'Cat', image_url: 'https://images.unsplash.com/photo-1623387641177-e8a49c9b4e1e?w=800&h=800&fit=crop', rating: 4.7, stock: 110 },
    { name: 'Intersand Odourlock Premium Clumping Litter', description: 'Ultra-premium clay litter with 40-day odor control technology. 99.9% dust-free and forms extra-hard, easy-to-scoop clumps.', price: 1699.00, category: 'Supplies', pet_type: 'Cat', image_url: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800&h=800&fit=crop', rating: 4.9, stock: 80 },
    { name: 'Savic 3-Tier Luxury Cat Tree with Sisal Posts', description: 'Luxurious multi-level condo featuring cozy hideaways, perches, and natural sisal rope scratching posts to save your furniture.', price: 8500.00, category: 'Furniture', pet_type: 'Cat', image_url: 'https://images.unsplash.com/photo-1543852786-1cf6624b9987?w=800&h=800&fit=crop', rating: 4.8, stock: 15 },
    { name: 'Trixie Catch the Mouse Interactive Toy', description: 'Battery-operated interactive toy that mimics a mouse darting under a canvas cover. Keeps indoor cats mentally and physically stimulated.', price: 1999.00, category: 'Toys', pet_type: 'Cat', image_url: 'https://images.unsplash.com/photo-1495360010541-f48722b34f7d?w=800&h=800&fit=crop', rating: 4.4, stock: 65 },
    { name: 'Dreamies Cat Treats with Chicken', description: 'Crunchy on the outside, soft on the inside. Only 2 calories per treat. The irresistible taste cats dream about.', price: 250.00, category: 'Treats', pet_type: 'Cat', image_url: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=800&h=800&fit=crop', rating: 4.8, stock: 300 },

    // Bird Products
    { name: 'Vitapol Economic Food for Budgies', description: 'Complete formulated diet with a mix of seeds, grains, and fruits designed specifically for the nutritional needs of budgerigars.', price: 350.00, category: 'Food', pet_type: 'Bird', image_url: 'https://images.unsplash.com/photo-1552728089-57105a8e7ceb?w=800&h=800&fit=crop', rating: 4.6, stock: 150 },
    { name: 'Prevue Pet Products Wrought Iron Flight Cage', description: 'Spacious flight cage with large front doors, pull-out bottom grille, and debris tray for easy cleaning. Perfect for multiple small birds.', price: 12500.00, category: 'Furniture', pet_type: 'Bird', image_url: 'https://images.unsplash.com/photo-1610850090288-0fcca0d905aa?w=800&h=800&fit=crop', rating: 4.8, stock: 10 },
    { name: 'JW Pet Activitoy Bird Mirror with Bell', description: 'Engaging mirror toy that satisfies a bird\'s natural curiosity. The attached bell provides auditory stimulation for endless entertainment.', price: 450.00, category: 'Toys', pet_type: 'Bird', image_url: 'https://images.unsplash.com/photo-1536412597336-ae7b6ceac981?w=800&h=800&fit=crop', rating: 4.5, stock: 90 },

    // Fish Products
    { name: 'TetraBits Complete Fish Food for Discus & Tropicals', description: 'Premium sinking granules that provide optimal nutrition and promote brilliant coloration for Discus and all tropical mid-water feeders.', price: 595.00, category: 'Food', pet_type: 'Fish', image_url: 'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?w=800&h=800&fit=crop', rating: 4.8, stock: 200 },
    { name: 'Fluval Spec V 5-Gallon Glass Aquarium Kit', description: 'Sleek, modern nano aquarium with etched-glass detailing. Includes a powerful 3-stage filtration system and a sleek LED lighting fixture.', price: 9500.00, category: 'Furniture', pet_type: 'Fish', image_url: 'https://images.unsplash.com/photo-1535591273668-578e31182c4f?w=800&h=800&fit=crop', rating: 4.7, stock: 20 },
    { name: 'Eheim Jager 100W TruTemp Submersible Heater', description: 'Precision quartz glass aquarium heater. Shatter-proof, fully submersible, and features a highly accurate temperature dial for perfect climate control.', price: 2200.00, category: 'Supplies', pet_type: 'Fish', image_url: 'https://images.unsplash.com/photo-1544552866-d3ed42536fc6?w=800&h=800&fit=crop', rating: 4.9, stock: 45 },

    // Small Pets
    { name: 'Oxbow Animal Health Western Timothy Hay', description: 'Sweet-smelling, high-fiber grass hay essential for the digestive health and dental wear of herbivores like rabbits and guinea pigs.', price: 1200.00, category: 'Food', pet_type: 'Small Pets', image_url: 'https://images.unsplash.com/photo-1585110396000-c9fa4e5b8d2b?w=800&h=800&fit=crop', rating: 4.8, stock: 120 },
    { name: 'Ferplast Casita 100 Guinea Pig & Rabbit Cage', description: 'Extra-large habitat with a rounded, opening roof for easy access. Comes fully equipped with a hay feeder, drinking bottle, and resting house.', price: 6800.00, category: 'Furniture', pet_type: 'Small Pets', image_url: 'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?w=800&h=800&fit=crop', rating: 4.6, stock: 25 },
    { name: 'Living World Small Animal Nibblers', description: 'Nutritious, crunchy wooden chews infused with real apple flavor. Satisfies the natural gnawing instinct and helps maintain dental health.', price: 399.00, category: 'Treats', pet_type: 'Small Pets', image_url: 'https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?w=800&h=800&fit=crop', rating: 4.5, stock: 140 }
]

async function seed() {
    console.log('Replacing existing products with real-world products...')

    // Delete all existing products
    const { error: deleteError } = await supabase
        .from('products')
        .delete()
        .neq('id', '00000000-0000-0000-0000-000000000000') // Deletes everything

    if (deleteError) {
        console.error('Error deleting old products:', deleteError)
        // We'll proceed anyway in case RLS blocks delete, we can still insert new ones
    }

    // Insert new products
    const { data, error } = await supabase
        .from('products')
        .insert(products)
        .select()

    if (error) {
        console.error('Error inserting new products:', error)
    } else {
        console.log(`Successfully added ${products.length} real-world products!`)
    }
}

seed()
