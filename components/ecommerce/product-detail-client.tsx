'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/lib/context/cart-context'
import { Button } from '@/components/ui/button'
import { ImageLightbox } from '@/components/ui/image-lightbox'
import { Star, Heart, Share2, Truck, Shield, RotateCcw, Minus, Plus, ShoppingCart, ArrowLeft } from 'lucide-react'
import { formatINR } from '@/lib/utils/currency'
import type { Product } from '@/types/product'

interface ProductDetailClientProps {
    product: Product
}

export function ProductDetailClient({ product }: ProductDetailClientProps) {
    const [quantity, setQuantity] = useState(1)
    const [wishlist, setWishlist] = useState(false)
    const [addedToCart, setAddedToCart] = useState(false)
    const { addItem } = useCart()

    const handleAddToCart = () => {
        addItem({
            id: product.id,
            name: product.name,
            price: product.price,
            image_url: product.image_url,
            quantity,
        })
        setAddedToCart(true)
        setTimeout(() => setAddedToCart(false), 2500)
    }

    const handleShare = () => {
        if (typeof navigator !== 'undefined') {
            navigator.share?.({ title: product.name, url: window.location.href })
        }
    }

    return (
        <main className="min-h-screen bg-background">
            <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
                {/* Breadcrumb */}
                <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
                    <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
                    <span aria-hidden="true">/</span>
                    <Link href="/products" className="hover:text-foreground transition-colors">Products</Link>
                    <span aria-hidden="true">/</span>
                    <span className="text-foreground font-medium truncate max-w-[200px]">{product.name}</span>
                </nav>

                <Link href="/products" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-6">
                    <ArrowLeft className="w-4 h-4" />
                    Back to Products
                </Link>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-14 mt-4">
                    {/* Left — Image with Lightbox */}
                    <div>
                        <div className="relative aspect-square rounded-2xl overflow-hidden bg-secondary border border-border/50 shadow-premium">
                            <ImageLightbox src={product.image_url} alt={product.name} />
                        </div>
                        <p className="text-xs text-center text-muted-foreground mt-3 flex items-center justify-center gap-1">
                            <span aria-hidden="true">🔍</span> Click image to zoom
                        </p>
                    </div>

                    {/* Right — Details */}
                    <div className="flex flex-col">
                        {/* Category Badge */}
                        <div className="mb-3">
                            <span className="px-3 py-1.5 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20 capitalize tracking-wide">
                                {product.category}
                            </span>
                        </div>

                        {/* Title */}
                        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-3 text-balance leading-tight">
                            {product.name}
                        </h1>

                        {/* Rating */}
                        <div className="flex items-center gap-2 mb-5" aria-label="4.8 out of 5 stars, 124 reviews">
                            <div className="flex gap-0.5" aria-hidden="true">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                                ))}
                            </div>
                            <span className="text-sm text-muted-foreground">(124 reviews)</span>
                        </div>

                        {/* Price block */}
                        <div className="mb-6 p-5 bg-gradient-to-br from-primary/5 to-background rounded-2xl border border-primary/20">
                            <div className="text-4xl font-bold text-primary mb-2">
                                {formatINR(product.price)}
                            </div>
                            <div className="flex items-center gap-3">
                                {product.stock > 0 ? (
                                    <span className="inline-flex items-center gap-1.5 text-sm text-green-600 font-semibold">
                                        <span className="w-2 h-2 rounded-full bg-green-500 inline-block animate-pulse" aria-hidden="true" />
                                        In Stock ({product.stock} left)
                                    </span>
                                ) : (
                                    <span className="text-sm text-destructive font-semibold">Out of Stock</span>
                                )}
                            </div>
                            <p className="text-xs text-muted-foreground mt-2">Inclusive of all taxes</p>
                        </div>

                        {/* Description */}
                        <p className="text-muted-foreground leading-relaxed mb-8 text-sm">
                            {product.description}
                        </p>

                        {/* Quantity selector */}
                        <div className="mb-5">
                            <label className="block text-sm font-semibold text-foreground mb-3">Quantity</label>
                            <div className="flex items-center gap-2 w-max border border-border rounded-full px-2 py-1.5" role="group" aria-label="Quantity selector">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="w-8 h-8 flex items-center justify-center hover:bg-secondary rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50"
                                    aria-label="Decrease quantity"
                                >
                                    <Minus className="w-3.5 h-3.5" />
                                </button>
                                <span className="w-10 text-center font-bold text-lg" aria-live="polite">{quantity}</span>
                                <button
                                    onClick={() => setQuantity(Math.min(product.stock || 99, quantity + 1))}
                                    className="w-8 h-8 flex items-center justify-center hover:bg-secondary rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50"
                                    aria-label="Increase quantity"
                                >
                                    <Plus className="w-3.5 h-3.5" />
                                </button>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="space-y-3">
                            <Button
                                onClick={handleAddToCart}
                                disabled={product.stock === 0}
                                size="lg"
                                className={`w-full h-14 text-base gap-3 rounded-xl transition-all duration-200 active:scale-[0.98] ${addedToCart ? 'bg-green-600 hover:bg-green-700' : ''
                                    }`}
                                aria-label={addedToCart ? 'Added to cart' : `Add ${quantity} to cart for ${formatINR(product.price * quantity)}`}
                            >
                                <ShoppingCart className="w-5 h-5" />
                                {addedToCart ? '✓ Added to Cart!' : `Add to Cart — ${formatINR(product.price * quantity)}`}
                            </Button>

                            <div className="flex gap-3">
                                <button
                                    onClick={() => setWishlist(!wishlist)}
                                    className={`flex-1 py-3 px-4 rounded-xl border-2 transition-all flex items-center justify-center gap-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/50 ${wishlist
                                            ? 'bg-primary/10 text-primary border-primary'
                                            : 'border-border hover:border-primary/30 hover:bg-secondary'
                                        }`}
                                    aria-pressed={wishlist}
                                    aria-label={wishlist ? 'Remove from wishlist' : 'Add to wishlist'}
                                >
                                    <Heart className={`w-4 h-4 ${wishlist ? 'fill-current' : ''}`} />
                                    {wishlist ? 'Wishlisted' : 'Wishlist'}
                                </button>
                                <button
                                    onClick={handleShare}
                                    className="flex-1 py-3 px-4 rounded-xl border-2 border-border hover:border-primary/30 hover:bg-secondary transition-all flex items-center justify-center gap-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/50"
                                    aria-label="Share this product"
                                >
                                    <Share2 className="w-4 h-4" />
                                    Share
                                </button>
                            </div>
                        </div>

                        {/* Benefits */}
                        <div className="mt-8 pt-6 border-t border-border space-y-3">
                            {[
                                { icon: Truck, text: 'Free delivery on orders above ₹999' },
                                { icon: RotateCcw, text: '30-day easy returns & exchanges' },
                                { icon: Shield, text: '100% secure & encrypted checkout' },
                            ].map((benefit) => {
                                const Icon = benefit.icon
                                return (
                                    <div key={benefit.text} className="flex items-center gap-3">
                                        <Icon className="w-4 h-4 text-primary flex-shrink-0" aria-hidden="true" />
                                        <span className="text-sm text-muted-foreground">{benefit.text}</span>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
