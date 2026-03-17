'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useWishlist } from '@/lib/context/wishlist-context'
import { useCart } from '@/lib/context/cart-context'
import { Button } from '@/components/ui/button'
import { Trash2, Heart, ArrowLeft, ShoppingCart } from 'lucide-react'
import { formatINR } from '@/lib/utils/currency'

export const dynamic = 'force-dynamic'

export default function WishlistPage() {
  const { items, removeItem, clearWishlist, isLoaded } = useWishlist()
  const { addItem: addToCart } = useCart()

  if (!isLoaded) return null

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center py-20 px-4">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-secondary mb-6">
            <Heart className="w-12 h-12 text-muted-foreground" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-3">
            Your Wishlist is Empty
          </h1>
          <p className="text-muted-foreground mb-8 max-w-sm mx-auto">
            Save your favorite items here to view them later or easily add them to your cart.
          </p>
          <Link href="/products">
            <Button size="lg" className="gap-2 rounded-full px-8 transition-transform active:scale-95">
              <ArrowLeft className="w-4 h-4" />
              Explore Products
            </Button>
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Header */}
        <div className="mb-8">
          <Link href="/products" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-4">
            <ArrowLeft className="w-4 h-4" />
            Continue Shopping
          </Link>
          <h1 className="text-4xl font-bold tracking-tight text-foreground flex items-center gap-3">
            My Wishlist
            <Heart className="w-8 h-8 text-red-500 fill-red-500" />
          </h1>
          <p className="text-muted-foreground mt-1">{items.length} {items.length === 1 ? 'item' : 'items'} saved</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Wishlist Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row gap-4 p-4 bg-card border border-border/60 rounded-2xl hover:shadow-premium transition-all duration-200 relative group"
              >
                {/* Product Image */}
                <Link href={`/products/${item.id}`} className="relative w-full sm:w-32 h-32 sm:h-auto aspect-square rounded-xl overflow-hidden bg-secondary flex-shrink-0 block">
                  <Image
                    src={item.image_url}
                    alt={item.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 left-2 bg-background/90 backdrop-blur-sm px-2 py-0.5 rounded text-[10px] font-semibold tracking-wide uppercase">
                    {item.category}
                  </div>
                </Link>

                {/* Product Details */}
                <div className="flex-1 min-w-0 flex flex-col justify-center sm:py-2">
                  <Link href={`/products/${item.id}`}>
                    <h3 className="font-semibold text-lg text-foreground truncate mb-1 hover:text-primary transition-colors">
                      {item.name}
                    </h3>
                  </Link>
                  <p className="text-xl font-bold text-primary mb-4">
                    {formatINR(item.price)}
                  </p>
                  
                  <div className="flex items-center gap-3 mt-auto">
                    <Button 
                      onClick={() => {
                        addToCart({ ...item, quantity: 1 })
                        removeItem(item.id)
                      }}
                      className="gap-2 rounded-full flex-1 sm:flex-none"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      Move to Cart
                    </Button>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-2.5 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-full transition-colors"
                      aria-label="Remove from wishlist"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Actions Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-20 bg-card border border-border/60 rounded-2xl p-6 shadow-premium">
              <h2 className="text-xl font-bold text-foreground mb-4">Wishlist Actions</h2>
              <p className="text-sm text-muted-foreground mb-6">
                You have {items.length} items saved in your wishlist. Add them to your cart before they go out of stock!
              </p>

              <Button 
                onClick={() => {
                  items.forEach(item => addToCart({ ...item, quantity: 1 }))
                  clearWishlist()
                }}
                className="w-full mb-3 rounded-xl gap-2 transition-transform active:scale-[0.98]"
              >
                <ShoppingCart className="w-4 h-4" />
                Move All to Cart
              </Button>

              <button
                onClick={() => clearWishlist()}
                className="w-full py-2 text-sm text-muted-foreground hover:text-destructive hover:bg-destructive/5 rounded-xl transition-colors"
              >
                Clear Wishlist
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
