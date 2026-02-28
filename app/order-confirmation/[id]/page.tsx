'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { CheckCircle2, Package, Truck, Home, ArrowRight } from 'lucide-react'
import { useParams } from 'next/navigation'
import { formatINR } from '@/lib/utils/currency'

interface OrderItem {
  id: string
  product_id: string
  quantity: number
  price: number
  products?: { name: string; image_url: string } | { name: string; image_url: string }[] | null
}

interface Order {
  id: string
  email: string
  total: number
  status: string
  created_at: string
  order_items: OrderItem[]
}

export default function OrderConfirmationPage() {
  const params = useParams()
  const id = params.id as string
  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchOrder()
  }, [id])

  const fetchOrder = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('orders')
        .select(`
          id,
          email,
          total,
          status,
          created_at,
          order_items(
            id,
            product_id,
            quantity,
            price,
            products(name, image_url)
          )
        `)
        .eq('id', id)
        .single()

      if (error) throw error
      setOrder(data as Order)
    } catch (error) {
      console.error('Error fetching order:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-background py-12">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="h-48 bg-secondary rounded-2xl animate-pulse" />
          <div className="h-64 bg-secondary rounded-2xl animate-pulse" />
          <div className="h-40 bg-secondary rounded-2xl animate-pulse" />
        </div>
      </main>
    )
  }

  if (!order) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-foreground mb-4">Order Not Found</h1>
          <p className="text-muted-foreground mb-6">We couldn't find this order. It may have been removed.</p>
          <Link href="/products">
            <Button>Continue Shopping</Button>
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Success Header */}
        <div className="text-center mb-10">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-green-400/20 rounded-full scale-125 animate-pulse" />
              <div className="relative bg-green-50 border-2 border-green-200 rounded-full p-6">
                <CheckCircle2 className="w-16 h-16 text-green-600" />
              </div>
            </div>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-foreground mb-3">
            Order Confirmed! 🎉
          </h1>
          <p className="text-lg text-muted-foreground mb-2">
            Thank you, your order has been placed successfully.
          </p>
          <p className="text-sm text-muted-foreground">
            A confirmation has been sent to <span className="font-semibold text-foreground">{order.email}</span>
          </p>
        </div>

        {/* Order Details Card */}
        <div className="bg-card border border-border/60 rounded-2xl p-6 sm:p-8 mb-6 shadow-sm">
          {/* Order Meta */}
          <div className="grid grid-cols-3 gap-4 mb-8 pb-8 border-b border-border">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Order ID</p>
              <p className="text-sm font-bold text-foreground font-mono tracking-wider">
                #{order.id.substring(0, 8).toUpperCase()}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Date</p>
              <p className="text-sm font-semibold text-foreground">
                {new Date(order.created_at).toLocaleDateString('en-IN', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Status</p>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </span>
            </div>
          </div>

          {/* Items — now with product names! */}
          <div className="mb-8">
            <h2 className="text-base font-bold text-foreground mb-4">Items Ordered</h2>
            <div className="space-y-3">
              {order.order_items?.map((item) => {
                const productInfo = Array.isArray(item.products) ? item.products[0] : item.products
                const productName = productInfo?.name ?? `Product (${item.product_id.substring(0, 6)}...)`
                const productImage = productInfo?.image_url
                return (
                  <div
                    key={item.id}
                    className="flex items-center gap-3 p-3 bg-secondary/40 rounded-xl"
                  >
                    {productImage && (
                      <div className="w-12 h-12 rounded-lg overflow-hidden bg-background flex-shrink-0">
                        <img src={productImage} alt={productName} className="w-full h-full object-cover" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground text-sm truncate">{productName}</p>
                      <p className="text-xs text-muted-foreground">Qty: {item.quantity} × {formatINR(item.price)}</p>
                    </div>
                    <p className="font-bold text-foreground text-sm whitespace-nowrap">
                      {formatINR(item.price * item.quantity)}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Total */}
          <div className="flex justify-between items-center pt-6 border-t border-border">
            <p className="text-base font-bold text-foreground">Grand Total</p>
            <p className="text-3xl font-bold text-primary">
              {formatINR(order.total)}
            </p>
          </div>
        </div>

        {/* Delivery Timeline */}
        <div className="bg-card border border-border/60 rounded-2xl p-6 sm:p-8 mb-6 shadow-sm">
          <h2 className="text-base font-bold text-foreground mb-6">Delivery Status</h2>
          <div className="space-y-5">
            {[
              { icon: CheckCircle2, status: 'Order Confirmed', sub: 'Just now', completed: true },
              { icon: Package, status: 'Processing', sub: 'Within 24 hours', completed: true },
              { icon: Truck, status: 'Out for Delivery', sub: '2–4 business days', completed: false },
              { icon: Home, status: 'Delivered', sub: '3–5 business days', completed: false },
            ].map((step, idx) => {
              const Icon = step.icon
              return (
                <div key={idx} className="flex items-center gap-4">
                  <div className={`p-2.5 rounded-full flex-shrink-0 ${step.completed ? 'bg-primary' : 'bg-secondary'}`}>
                    <Icon className={`w-5 h-5 ${step.completed ? 'text-primary-foreground' : 'text-muted-foreground'}`} />
                  </div>
                  <div className="flex-1">
                    <p className={`font-semibold text-sm ${step.completed ? 'text-foreground' : 'text-muted-foreground'}`}>
                      {step.status}
                    </p>
                    <p className="text-xs text-muted-foreground">{step.sub}</p>
                  </div>
                  {step.completed && (
                    <span className="text-xs text-green-600 font-medium bg-green-50 px-2 py-1 rounded-full">Done</span>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/products" className="flex-1">
            <Button variant="outline" size="lg" className="w-full rounded-xl">
              Continue Shopping
            </Button>
          </Link>
          <Link href="/" className="flex-1">
            <Button size="lg" className="w-full rounded-xl gap-2">
              Back to Home <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </main>
  )
}
