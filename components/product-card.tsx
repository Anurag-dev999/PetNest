'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ShoppingCart, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCart } from '@/lib/context/cart-context'
import { useState } from 'react'
import { formatINR } from '@/lib/utils/currency'

interface ProductCardProps {
  id: string
  name: string
  price: number
  image_url: string
  category: string
}

export function ProductCard({ id, name, price, image_url, category }: ProductCardProps) {
  const { addItem } = useCart()
  const [added, setAdded] = useState(false)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    addItem({
      id,
      name,
      price,
      image_url,
      quantity: 1,
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <Link href={`/products/${id}`} className="block h-full outline-none">
      <div className="group h-full border border-border/60 rounded-2xl overflow-hidden hover:shadow-premium hover:-translate-y-1 transition-all duration-300 bg-card flex flex-col cursor-pointer">
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden bg-secondary/30">
          <Image
            src={image_url}
            alt={`${name} — product image`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          />
          {/* Subtle overlay on hover */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />

          <div className="absolute top-3 right-3 bg-background/90 backdrop-blur-sm border border-border/50 shadow-sm px-3 py-1.5 rounded-full text-[11px] font-semibold tracking-wide text-foreground uppercase">
            {category}
          </div>
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-1">
          <h3 className="font-semibold text-base text-card-foreground line-clamp-2 md:line-clamp-1 mb-2 group-hover:text-primary transition-colors leading-snug">
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
              variant={added ? 'secondary' : 'default'}
              className={`gap-2 rounded-full px-4 h-9 shadow-sm transition-all active:scale-95 ${added ? 'bg-green-100 text-green-800 hover:bg-green-200 border-transparent' : ''
                }`}
              aria-label={added ? `${name} added to cart` : `Add ${name} to cart`}
            >
              <ShoppingCart className="w-4 h-4" />
              <span className="font-semibold">{added ? 'Added' : 'Add'}</span>
            </Button>
          </div>
        </div>
      </div>
    </Link>
  )
}
