'use client'

import { useState, useMemo } from 'react'
import { ProductCard } from '@/components/product-card'
import { Button } from '@/components/ui/button'
import { Search, X } from 'lucide-react'
import { Product } from '@/lib/queries/products'
import { formatINR } from '@/lib/utils/currency'

interface ProductsGridProps {
  initialProducts: Product[]
  initialCategory?: string
}

export function ProductsGrid({ initialProducts, initialCategory = '' }: ProductsGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory)
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 20000])

  // These match the database pet_type field exactly (case-insensitive)
  const categories = ['dog', 'cat', 'bird', 'fish', 'small pets']

  const filteredProducts = useMemo(() => {
    let result = initialProducts

    if (selectedCategory) {
      result = result.filter(
        (p) => p.pet_type.toLowerCase() === selectedCategory.toLowerCase()
      )
    }

    if (searchTerm) {
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.category.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    result = result.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    )

    return result
  }, [initialProducts, selectedCategory, searchTerm, priceRange])

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      {/* Sidebar Filters */}
      <div className="lg:col-span-1">
        <div className="sticky top-20 space-y-6">
          {/* Search */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-3">
              Search Products
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-3 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="bg-card p-5 rounded-xl border border-border/50 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <label className="block text-sm font-semibold text-foreground">
                Pet Type
              </label>
              {selectedCategory && (
                <button
                  onClick={() => setSelectedCategory('')}
                  className="text-xs text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
                >
                  <X className="w-3 h-3" /> Clear
                </button>
              )}
            </div>
            <div className="flex flex-col gap-1.5">
              {categories.map((category) => {
                const count = initialProducts.filter((p) => p.pet_type.toLowerCase() === category).length;
                const isSelected = selectedCategory === category;
                return (
                  <button
                    key={category}
                    onClick={() =>
                      setSelectedCategory(isSelected ? '' : category)
                    }
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all flex items-center justify-between group ${isSelected
                      ? 'bg-primary text-primary-foreground font-medium shadow-sm'
                      : 'hover:bg-secondary text-foreground'
                      }`}
                  >
                    <span className="capitalize">{category}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full transition-colors ${isSelected ? 'bg-primary-foreground/20' : 'bg-background text-muted-foreground group-hover:bg-background/80'
                      }`}>
                      {count}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Price Range Filter */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-3">
              Price Range
            </label>
            <div className="space-y-2">
              <input
                type="range"
                min="0"
                max="20000"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                className="w-full"
              />
              <div className="text-sm text-muted-foreground mt-2">
                {formatINR(priceRange[0])} - {formatINR(priceRange[1])}
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="pt-4 border-t border-border">
            <p className="text-sm text-muted-foreground">
              Showing <span className="font-semibold">{filteredProducts.length}</span> of{' '}
              <span className="font-semibold">{initialProducts.length}</span> products
            </p>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="lg:col-span-3">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-24 bg-card rounded-2xl border border-border/50 shadow-sm">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary mb-6">
              <Search className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">No products found</h3>
            <p className="text-muted-foreground mb-8 max-w-sm mx-auto">
              We couldn't find anything matching your current filters. Try adjusting them to find what you're looking for.
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSelectedCategory('')
                setSearchTerm('')
                setPriceRange([0, 20000])
              }}
              className="rounded-full px-6"
            >
              Reset Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
