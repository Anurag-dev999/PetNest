'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useCart } from '@/lib/context/cart-context'
import { useAuth } from '@/lib/context/auth-context'
import { Button } from '@/components/ui/button'
import { createOrder } from '@/lib/queries/orders'
import { Lock, ArrowLeft, CreditCard, MapPin, User } from 'lucide-react'
import Link from 'next/link'
import { formatINR } from '@/lib/utils/currency'

const inputClass =
  'w-full px-4 py-3 border border-border rounded-xl bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow text-sm'

const labelClass = 'block text-sm font-medium text-foreground mb-2'

export default function CheckoutPage() {
  const router = useRouter()
  const { items, total, clearCart, isLoaded } = useCart()
  const { user, isLoading: isAuthLoading } = useAuth()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    pinCode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  })

  const tax = total * 0.18  // GST 18%
  const shipping = total >= 999 ? 0 : 99
  const grandTotal = total + tax + shipping

  useEffect(() => {
    // Pre-fill email if user is logged in
    if (user?.email && !formData.email) {
      setFormData(prev => ({ ...prev, email: user.email! }))
    }
  }, [user])

  // Wait for auth to initialize before making decisions
  if (isAuthLoading) {
    return <main className="min-h-screen bg-background" />
  }

  if (isLoaded && items.length === 0) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center py-12 px-4">
          <h1 className="text-3xl font-bold text-foreground mb-4">Cart is Empty</h1>
          <p className="text-muted-foreground mb-8">Add some products before checking out.</p>
          <Link href="/products">
            <Button>Continue Shopping</Button>
          </Link>
        </div>
      </main>
    )
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (
        !formData.email ||
        !formData.firstName ||
        !formData.lastName ||
        !formData.address ||
        !formData.city ||
        !formData.state ||
        !formData.pinCode
      ) {
        alert('Please fill in all required fields')
        setLoading(false)
        return
      }

      const orderItems = items.map((item) => ({
        product_id: item.id,
        quantity: item.quantity,
        price: item.price,
      }))

      const result = await createOrder(
        {
          user_id: user?.id || null,
          email: formData.email,
          total: grandTotal,
          status: 'confirmed',
        },
        orderItems
      )

      if (!result.success || !result.orderId) {
        throw new Error(result.error)
      }

      clearCart()
      router.push(`/order-confirmation/${result.orderId}`)
    } catch (error) {
      console.error('Error creating order:', error)
      alert('Failed to place order. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Header */}
        <div className="mb-10">
          <Link href="/cart" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-5">
            <ArrowLeft className="w-4 h-4" />
            Back to Cart
          </Link>
          <h1 className="text-4xl font-bold tracking-tight text-foreground">Checkout</h1>
          <p className="text-muted-foreground mt-1">Complete your order securely</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Checkout Form — 3 cols */}
          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Contact Information */}
              <div className="bg-card border border-border/60 rounded-2xl p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-5">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <User className="w-4 h-4 text-primary" />
                  </div>
                  <h2 className="text-base font-bold text-foreground">Contact Information</h2>
                </div>
                <div>
                  <label className={labelClass}>Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={inputClass}
                    placeholder="you@example.com"
                    required
                  />
                </div>
              </div>

              {/* Shipping Address */}
              <div className="bg-card border border-border/60 rounded-2xl p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-5">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <MapPin className="w-4 h-4 text-primary" />
                  </div>
                  <h2 className="text-base font-bold text-foreground">Shipping Address</h2>
                </div>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className={labelClass}>First Name *</label>
                      <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} className={inputClass} placeholder="Aarav" required />
                    </div>
                    <div>
                      <label className={labelClass}>Last Name *</label>
                      <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} className={inputClass} placeholder="Sharma" required />
                    </div>
                  </div>

                  <div>
                    <label className={labelClass}>Address *</label>
                    <input type="text" name="address" value={formData.address} onChange={handleInputChange} className={inputClass} placeholder="Flat no, Street, Area" required />
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className={labelClass}>City *</label>
                      <input type="text" name="city" value={formData.city} onChange={handleInputChange} className={inputClass} placeholder="Mumbai" required />
                    </div>
                    <div>
                      <label className={labelClass}>State *</label>
                      <input type="text" name="state" value={formData.state} onChange={handleInputChange} className={inputClass} placeholder="Maharashtra" required />
                    </div>
                    <div>
                      <label className={labelClass}>PIN Code *</label>
                      <input type="text" name="pinCode" value={formData.pinCode} onChange={handleInputChange} className={inputClass} placeholder="400001" required maxLength={6} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Information */}
              <div className="bg-card border border-border/60 rounded-2xl p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-5">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <CreditCard className="w-4 h-4 text-primary" />
                  </div>
                  <h2 className="text-base font-bold text-foreground">Payment Details</h2>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className={labelClass}>Card Number</label>
                    <input type="text" name="cardNumber" value={formData.cardNumber} onChange={handleInputChange} className={inputClass} placeholder="1234 5678 9012 3456" maxLength={19} required />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className={labelClass}>Expiry Date</label>
                      <input type="text" name="expiryDate" value={formData.expiryDate} onChange={handleInputChange} className={inputClass} placeholder="MM/YY" maxLength={5} required />
                    </div>
                    <div>
                      <label className={labelClass}>CVV</label>
                      <input type="text" name="cvv" value={formData.cvv} onChange={handleInputChange} className={inputClass} placeholder="123" maxLength={4} required />
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Button & Auth Wall */}
              {!user ? (
                <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 text-center">
                  <h3 className="text-lg font-bold text-foreground mb-2">Account Required</h3>
                  <p className="text-sm text-muted-foreground mb-6">
                    Please log in or create an account to securely complete your purchase.
                  </p>
                  <Link href={`/login?redirect=/checkout`}>
                    <Button type="button" size="lg" className="w-full h-14 text-base rounded-xl transition-transform active:scale-[0.98]">
                      <User className="w-5 h-5 mr-2" />
                      Sign In / Register to Pay
                    </Button>
                  </Link>
                </div>
              ) : (
                <>
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full gap-3 h-14 text-base rounded-xl transition-transform active:scale-[0.98]"
                    disabled={loading}
                  >
                    <Lock className="w-5 h-5" />
                    {loading ? 'Placing your order...' : `Pay ${formatINR(grandTotal)}`}
                  </Button>

                  <p className="text-center text-xs text-muted-foreground">
                    🔒 Your payment information is encrypted and secure
                  </p>
                </>
              )}
            </form>
          </div>

          {/* Order Summary — 2 cols */}
          <div className="lg:col-span-2">
            <div className="sticky top-20 bg-card border border-border/60 rounded-2xl p-6 shadow-sm">
              <h2 className="text-base font-bold text-foreground mb-5">Order Summary</h2>

              {/* Items */}
              <div className="space-y-3 mb-5 pb-5 border-b border-border max-h-52 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 text-sm">
                    <div className="w-10 h-10 rounded-lg overflow-hidden bg-secondary flex-shrink-0">
                      <img src={item.image_url} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground truncate">{item.name}</p>
                      <p className="text-muted-foreground">Qty: {item.quantity}</p>
                    </div>
                    <span className="font-semibold text-foreground whitespace-nowrap">
                      {formatINR(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 text-sm mb-5 pb-5 border-b border-border">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="text-foreground">{formatINR(total)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  {shipping === 0 ? (
                    <span className="text-green-600 font-semibold">Free</span>
                  ) : (
                    <span className="text-foreground">{formatINR(shipping)}</span>
                  )}
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">GST (18%)</span>
                  <span className="text-foreground">{formatINR(tax)}</span>
                </div>
              </div>

              <div className="flex justify-between items-center font-bold">
                <span className="text-foreground">Total</span>
                <span className="text-2xl text-primary">{formatINR(grandTotal)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
