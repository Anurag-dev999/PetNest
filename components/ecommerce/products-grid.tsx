'use client'

import { useState, useMemo, useTransition } from 'react'
import { ProductCard } from '@/components/product-card'
import { Button } from '@/components/ui/button'
import { Search, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Product } from '@/lib/queries/products'
import { formatINR } from '@/lib/utils/currency'

interface ProductsGridProps {
  /** Initial products list fetched from the server based on current URL */
  initialProducts: Product[]
  /** Currently active category from URL params */
  initialCategory?: string
  /** Global category counts for the sidebar indicators */
  categoryCounts: Record<string, number>
}

/**
 * A comprehensive product listing grid with dynamic filtering by:
 * - Pet Type (Category)
 * - Search Term (Name/Category)
 * - Price Range
 * 
 * Uses React transitions to provide a smooth loading experience during server-side re-fetches.
 */
export function ProductsGrid({ initialProducts, initialCategory = '', categoryCounts }: ProductsGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory.toLowerCase())
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 20000])
  
  const router = useRouter()
  // Track if a navigation or server re-fetch is in progress
  const [isPending, startTransition] = useTransition()

  /**
   * Triggers a category change, updating both local state and the URL.
   * Wrapped in startTransition to prevent UI flickering and enable skeleton states.
   */
  const handleCategoryChange = (category: string) => {
    startTransition(() => {
      setSelectedCategory(category)
      if (category) {
        router.push(`/products?pet_type=${category.toLowerCase()}`)
      } else {
        router.push(`/products`)
      }
    })
  }

  // Predefined static categories to display in the filter sidebar
  const categories = ['dog', 'cat', 'bird', 'fish', 'small pets']

  /**
   * Combined client-side filtering logic for search and price range.
   * Category filtering happens primarily server-side, but client-side matching ensures 
   * consistency while the new data is arriving.
   */
  const filteredProducts = useMemo(() => {
    let result = initialProducts

    // Filter by category locally to maintain consistency with the selected state
    if (selectedCategory) {
      result = result.filter(
        (p) => p.pet_type.toLowerCase() === selectedCategory.toLowerCase()
      )
    }

    // Filter by live search term
    if (searchTerm) {
      const lowerSearch = searchTerm.toLowerCase()
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(lowerSearch) ||
          p.category.toLowerCase().includes(lowerSearch)
      )
    }

    // Filter by price range
    result = result.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    )

    return result
  }, [initialProducts, selectedCategory, searchTerm, priceRange])

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      {/* Sidebar Filters */}
      <aside className="lg:col-span-1">
        <div className="sticky top-20 space-y-6">
          {/* Search Input */}
          <section>
            <label className="block text-sm font-semibold text-foreground mb-3">
              Search Products
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Find something special..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-3 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
              />
            </div>
          </section>

          {/* Pet Type Selection */}
          <section className="bg-card p-5 rounded-xl border border-border/50 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <label className="block text-sm font-semibold text-foreground">
                Pet Type
              </label>
              {selectedCategory && (
                <button
                  onClick={() => handleCategoryChange('')}
                  className="text-xs text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
                >
                  <X className="w-3 h-3" /> Clear
                </button>
              )}
            </div>
            <div className="flex flex-col gap-1.5">
              {categories.map((category) => {
                const count = categoryCounts[category] || 0
                const isSelected = selectedCategory === category
                return (
                  <button
                    key={category}
                    onClick={() => handleCategoryChange(isSelected ? '' : category)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all flex items-center justify-between group ${
                      isSelected
                        ? 'bg-primary text-primary-foreground font-medium shadow-sm'
                        : 'hover:bg-secondary text-foreground'
                    }`}
                  >
                    <span className="capitalize">{category}</span>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full transition-colors ${
                        isSelected
                          ? 'bg-primary-foreground/20'
                          : 'bg-background text-muted-foreground group-hover:bg-background/80'
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                )
              })}
            </div>
          </section>

          {/* Pricing Controls */}
          <section>
            <label className="block text-sm font-semibold text-foreground mb-3">
              Price Range
            </label>
            <div className="space-y-4">
              <input
                type="range"
                min="0"
                max="20000"
                step="500"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                className="w-full accent-primary"
              />
              <div className="text-sm font-medium text-muted-foreground bg-secondary/30 p-2 rounded flex justify-between">
                <span>{formatINR(priceRange[0])}</span>
                <span>{formatINR(priceRange[1])}</span>
              </div>
            </div>
          </section>

          {/* Quick Statistics */}
          <footer className="pt-4 border-t border-border/50">
            <p className="text-sm text-muted-foreground italic">
              Found <span className="font-bold text-foreground">{filteredProducts.length}</span> matching items
            </p>
          </footer>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="lg:col-span-3">
        {isPending ? (
          /* Premium Skeleton Loading Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-[360px] rounded-2xl bg-card border border-border/60 overflow-hidden flex flex-col">
                <div className="relative aspect-square bg-secondary/80 animate-pulse" />
                <div className="p-5 flex flex-col flex-1 gap-4">
                  <div className="h-5 bg-secondary/80 rounded animate-pulse w-3/4" />
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, j) => (
                      <div key={j} className="w-3.5 h-3.5 bg-secondary/80 rounded-full animate-pulse" />
                    ))}
                  </div>
                  <div className="flex justify-between items-center mt-auto pt-4 border-t border-border/50">
                    <div className="h-6 bg-secondary/80 rounded animate-pulse w-16" />
                    <div className="h-9 w-24 bg-secondary/80 rounded-full animate-pulse" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          /* Empty Search State */
          <div className="text-center py-24 bg-card rounded-2xl border border-border/50 shadow-sm animate-in fade-in zoom-in duration-300">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary mb-6">
              <Search className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">No products found</h3>
            <p className="text-muted-foreground mb-8 max-w-sm mx-auto px-4">
              We couldn't find anything matching your current filters. Try adjusting them or clearing your search.
            </p>
            <Button
              variant="outline"
              onClick={() => {
                handleCategoryChange('')
                setSearchTerm('')
                setPriceRange([0, 20000])
              }}
              className="rounded-full px-8 hover:bg-primary hover:text-primary-foreground transition-all"
            >
              Reset All Filters
            </Button>
          </div>
        ) : (
          /* Resulting Product Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {filteredProducts.map((product) => (
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
        )}
      </div>
    </div>
  )
}
