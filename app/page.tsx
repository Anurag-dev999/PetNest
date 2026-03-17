import { Leaf, Heart, Truck, Shield } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'
import { ProductCard } from '@/components/product-card'
import { NewsletterForm } from '@/components/newsletter-form'
import { getFeaturedProductsServer } from '@/lib/queries/products'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'PetNest | Premium Pet Essentials & Supplies India',
  description: 'Your one-stop destination for premium pet food, toys, and supplies. Quality products for dogs, cats, birds, and more. Fast shipping across India.',
}

export default async function HomePage() {
  const featuredProducts = await getFeaturedProductsServer()

  const categories = [
    { name: 'Dogs', slug: 'dog', image: '/categories/dogs.png', color: 'bg-blue-50' },
    { name: 'Cats', slug: 'cat', image: '/categories/cats.png', color: 'bg-purple-50' },
    { name: 'Birds', slug: 'bird', image: '/categories/birds.png', color: 'bg-yellow-50' },
    { name: 'Fish', slug: 'fish', image: '/categories/fish.png', color: 'bg-cyan-50' },
    { name: 'Small Pets', slug: 'small pets', image: '/categories/small-pets.png', color: 'bg-orange-50' },
  ]

  return (
    <main>
      {/* Hero Section */}
      <section className="relative pt-6 pb-16 sm:pt-10 sm:pb-24 overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Left Column */}
            <div className="space-y-6">
              <div className="inline-block">
                <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-accent/10 text-primary border border-accent/20">
                  Welcome to PetNest
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl font-bold text-balance leading-tight">
                Premium Essentials for Your <span className="text-primary">Beloved Pets</span>
              </h1>

              <p className="text-lg text-muted-foreground leading-relaxed max-w-md">
                Discover a curated collection of high-quality pet supplies. From nutrition to comfort, we have everything your furry, feathered, or aquatic friends need.
              </p>

              <div className="flex gap-3 pt-4">
                <Link href="/products">
                  <Button size="lg" className="gap-2">
                    <Leaf className="w-5 h-5" />
                    Shop Now
                  </Button>
                </Link>
                <Button size="lg" variant="outline">
                  Learn More
                </Button>
              </div>
            </div>

            {/* Right Column - Hero Image */}
            <div className="relative h-[400px] sm:h-[550px] rounded-[2.5rem] overflow-hidden border border-border/50 shadow-premium">
              <Image
                src="/hero-pets.png"
                alt="Happy golden retriever and orange tabby cat together"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
              <div className="relative z-10 flex items-end justify-center h-full pb-10">
                <p className="text-2xl font-bold tracking-tight text-foreground drop-shadow-lg bg-background/40 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/20">
                  Happy Pets, Happy Life
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-secondary/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                icon: Heart,
                title: 'Quality Assured',
                description: 'All products meet strict quality standards',
              },
              {
                icon: Truck,
                title: 'Fast Shipping',
                description: 'Quick delivery to your doorstep',
              },
              {
                icon: Shield,
                title: 'Secure Purchase',
                description: '100% safe and secure transactions',
              },
              {
                icon: Leaf,
                title: 'Eco-Friendly',
                description: 'Sustainable and responsible sourcing',
              },
            ].map((feature, idx) => {
              const Icon = feature.icon
              return (
                <div key={idx} className="text-center group p-6 rounded-2xl hover:bg-card hover:shadow-premium transition-all duration-300 border border-transparent hover:border-border/50 cursor-default">
                  <div className="inline-block p-4 bg-primary/10 rounded-xl mb-4 group-hover:scale-110 group-hover:bg-primary/15 transition-all duration-300">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-card border-y border-border/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-4">
              Shop by Pet Type
            </h2>
            <p className="text-lg text-muted-foreground max-w-md mx-auto">
              Find everything your pet needs organized by species
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
            {categories.map((category) => (
              <Link key={category.name} href={`/products?pet_type=${category.slug}`} className="group outline-none">
                <div className={`${category.color} rounded-3xl p-6 text-center hover:shadow-premium border border-transparent hover:border-border/20 hover:-translate-y-1 transition-all duration-300`}>
                  <div className="relative w-20 h-20 mx-auto mb-4 rounded-2xl overflow-hidden transform transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3">
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>
                  <h3 className="font-semibold text-[17px] text-foreground tracking-tight">{category.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 bg-secondary/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
              Featured Products
            </h2>
            <p className="text-lg text-muted-foreground max-w-md mx-auto">
              Bestsellers loved by pet owners everywhere
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                image_url={product.image_url}
                category={product.category}
              />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/products">
              <Button size="lg" variant="outline">
                View All Products
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          <div className="bg-primary/5 border border-primary/20 rounded-2xl p-8 sm:p-12 text-center">
            <h2 className="text-3xl font-bold text-foreground mb-3">
              Never Miss a Deal
            </h2>
            <p className="text-muted-foreground mb-6">
              Subscribe to get exclusive offers and pet care tips delivered to your inbox
            </p>
            <NewsletterForm />
          </div>
        </div>
      </section>
    </main>
  )
}
