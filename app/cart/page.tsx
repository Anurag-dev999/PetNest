'use client'
// Note: metadata cannot be exported from 'use client'. Cart title is set via document.title on mount.
// For SEO, the layout.tsx title serves as fallback.

import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/lib/context/cart-context'
import { Button } from '@/components/ui/button'
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag } from 'lucide-react'
import { formatINR } from '@/lib/utils/currency'

export const dynamic = 'force-dynamic'

export default function CartPage() {
  const { items, removeItem, updateQuantity, total, clearCart, isLoaded } = useCart()

  if (!isLoaded) return null

  const tax = total * 0.18 // GST 18%
  const isFreeShipping = total >= 999
  const shipping = isFreeShipping ? 0 : 99
  const grandTotal = total + tax + shipping

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center py-20 px-4">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-secondary mb-6">
            <ShoppingBag className="w-12 h-12 text-muted-foreground" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-3">
            Your Cart is Empty
          </h1>
          <p className="text-muted-foreground mb-8 max-w-sm mx-auto">
            Looks like you haven't added anything yet. Find amazing products for your pet!
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
          <h1 className="text-4xl font-bold tracking-tight text-foreground">Shopping Cart</h1>
          <p className="text-muted-foreground mt-1">{items.length} {items.length === 1 ? 'item' : 'items'}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 p-4 bg-card border border-border/60 rounded-2xl hover:shadow-premium transition-all duration-200"
              >
                {/* Product Image */}
                <Link href={`/products/${item.id}`} className="relative w-24 h-24 rounded-xl overflow-hidden bg-secondary flex-shrink-0 block group">
                  <Image
                    src={item.image_url}
                    alt={item.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </Link>

                {/* Product Details */}
                <div className="flex-1 min-w-0">
                  <Link href={`/products/${item.id}`}>
                    <h3 className="font-semibold text-foreground truncate mb-1 hover:text-primary transition-colors">
                      {item.name}
                    </h3>
                  </Link>
                  <p className="text-lg font-bold text-primary mb-3">
                    {formatINR(item.price)}
                  </p>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-1 w-max border border-border rounded-full px-1 py-1">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-7 h-7 flex items-center justify-center hover:bg-secondary rounded-full transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-8 text-center text-sm font-semibold">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-7 h-7 flex items-center justify-center hover:bg-secondary rounded-full transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Price and Remove */}
                <div className="flex flex-col items-end justify-between">
                  <button
                    onClick={() => removeItem(item.id)}
                    className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                    aria-label="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground mb-0.5">Subtotal</p>
                    <p className="text-base font-bold text-foreground">
                      {formatINR(item.price * item.quantity)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-20 bg-card border border-border/60 rounded-2xl p-6 shadow-premium">
              <h2 className="text-xl font-bold text-foreground mb-6">Order Summary</h2>

              <div className="space-y-3 mb-6 pb-6 border-b border-border">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal ({items.length} items)</span>
                  <span className="text-foreground font-medium">{formatINR(total)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  {isFreeShipping ? (
                    <span className="text-green-600 font-semibold">Free 🎉</span>
                  ) : (
                    <span className="text-foreground">{formatINR(99)}</span>
                  )}
                </div>
                {!isFreeShipping && (
                  <p className="text-xs text-muted-foreground bg-secondary/50 rounded-lg px-3 py-2">
                    Add {formatINR(999 - total)} more for free shipping!
                  </p>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">GST (18%)</span>
                  <span className="text-foreground">{formatINR(tax)}</span>
                </div>
              </div>

              <div className="flex justify-between mb-6">
                <span className="font-bold text-lg text-foreground">Total</span>
                <span className="text-2xl font-bold text-primary">
                  {formatINR(grandTotal)}
                </span>
              </div>

              <Link href="/checkout">
                <Button size="lg" className="w-full mb-3 rounded-xl transition-transform active:scale-[0.98]">
                  Proceed to Checkout →
                </Button>
              </Link>

              <button
                onClick={() => clearCart()}
                className="w-full py-2 text-sm text-muted-foreground hover:text-destructive hover:bg-destructive/5 rounded-xl transition-colors"
              >
                Clear Cart
              </button>

              {/* Benefits */}
              <div className="mt-6 pt-6 border-t border-border space-y-2.5">
                <div className="flex gap-2 text-xs">
                  <span className="text-green-500">✓</span>
                  <span className="text-muted-foreground">Free shipping on orders above ₹999</span>
                </div>
                <div className="flex gap-2 text-xs">
                  <span className="text-green-500">✓</span>
                  <span className="text-muted-foreground">30-day hassle-free returns</span>
                </div>
                <div className="flex gap-2 text-xs">
                  <span className="text-green-500">✓</span>
                  <span className="text-muted-foreground">100% secure checkout</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
