'use client'

import { memo, useState, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ShoppingCart, Star, Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCart } from '@/lib/context/cart-context'
import { useWishlist } from '@/lib/context/wishlist-context'
import { formatINR } from '@/lib/utils/currency'

interface ProductCardProps {
  id: string
  name: string
  price: number
  image_url: string
  category: string
}

export const ProductCard = memo(function ProductCard({ id, name, price, image_url, category }: ProductCardProps) {
  const { addItem: addToCart } = useCart()
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlist()
  const [addedToCart, setAddedToCart] = useState(false)
  const isWishlisted = isInWishlist(id)

  const handleAddToCart = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    addToCart({
      id,
      name,
      price,
      image_url,
      quantity: 1,
    })
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2000)
  }, [addToCart, id, name, price, image_url])

  const handleToggleWishlist = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    if (isWishlisted) {
      removeFromWishlist(id)
    } else {
      addToWishlist({ id, name, price, image_url, category })
    }
  }, [isWishlisted, id, name, price, image_url, category, addToWishlist, removeFromWishlist])

  return (
    <Link href={`/products/${id}`} className="block h-full outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-2xl">
      <div className="group h-full border border-border/60 rounded-2xl overflow-hidden hover:shadow-premium hover:-translate-y-1 transition-all duration-200 bg-card flex flex-col cursor-pointer">
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden bg-secondary/30">
          <Image
            src={image_url}
            alt={`${name} — product image`}
            fill
            loading="lazy"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover group-hover:scale-105 transition-transform duration-300 ease-out"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-200" />

          <div className="absolute top-3 left-3 bg-background/90 backdrop-blur-sm border border-border/50 shadow-sm px-3 py-1.5 rounded-full text-[11px] font-semibold tracking-wide text-foreground uppercase">
            {category}
          </div>

          <button
            onClick={handleToggleWishlist}
            className="absolute top-3 right-3 p-2 bg-background/90 backdrop-blur-sm border border-border/50 shadow-sm rounded-full text-muted-foreground hover:text-red-500 hover:scale-110 active:scale-95 transition-all z-10"
            aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart className={`w-4 h-4 transition-colors ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-1">
          <h3 className="font-semibold text-base text-card-foreground line-clamp-2 md:line-clamp-1 mb-2 group-hover:text-primary transition-colors duration-200 leading-snug">
            {name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1.5 mb-4">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-3.5 h-3.5 fill-accent text-accent"
                />
              ))}
            </div>
            <span className="text-xs text-muted-foreground">(124)</span>
          </div>

          {/* Price and Button */}
          <div className="flex items-center justify-between mt-auto pt-4 border-t border-border/50">
            <div className="text-xl font-bold tracking-tight text-foreground">
              {formatINR(price)}
            </div>
            <Button
              size="sm"
              onClick={handleAddToCart}
              variant={addedToCart ? 'secondary' : 'default'}
              className={`gap-2 rounded-full px-4 h-9 shadow-sm transition-all duration-200 active:scale-95 ${addedToCart ? 'bg-green-100 text-green-800 hover:bg-green-200 border-transparent' : ''
                }`}
              aria-label={addedToCart ? `${name} added to cart` : `Add ${name} to cart`}
            >
              <ShoppingCart className="w-4 h-4" />
              <span className="font-semibold">{addedToCart ? 'Added' : 'Add'}</span>
            </Button>
          </div>
        </div>
      </div>
    </Link>
  )
})
