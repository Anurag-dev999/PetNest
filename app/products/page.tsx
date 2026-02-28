import { ProductsGrid } from '@/components/ecommerce/products-grid'
import { getProducts } from '@/lib/queries/products'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Shop All Products | PetNest',
  description: 'Browse our complete collection of premium pet supplies for dogs, cats, birds, fish, and small pets.',
  openGraph: {
    title: 'Shop All Products | PetNest',
    description: 'Browse our complete collection of premium pet supplies for dogs, cats, birds, fish, and small pets.',
  },
}

export default async function ProductsPage(props: { searchParams: Promise<{ pet_type?: string }> }) {
  const searchParams = await props.searchParams
  const products = await getProducts(searchParams.pet_type)

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Shop Our Products
          </h1>
          <p className="text-muted-foreground">
            Discover our complete collection of premium pet supplies
          </p>
        </div>

        <ProductsGrid
          key={searchParams.pet_type || 'all'}
          initialProducts={products}
          initialCategory={searchParams.pet_type || ''}
        />
      </div>
    </main>
  )
}
