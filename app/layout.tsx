import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { CartProvider } from '@/lib/context/cart-context'
import { WishlistProvider } from '@/lib/context/wishlist-context'
import { AuthProvider } from '@/lib/context/auth-context'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

const geist = Geist({ subsets: ["latin"] });
const geistMono = Geist_Mono({ subsets: ["latin"] });
void geistMono // mono font available if needed

export const metadata: Metadata = {
  title: {
    default: 'PetNest | Premium Pet Essentials & Supplies India',
    template: '%s | PetNest'
  },
  description: 'Shop high-quality pet supplies for dogs, cats, birds, fish, and small pets at PetNest. Fast shipping and premium quality products.',
  keywords: ['pet supplies', 'dog food', 'cat toys', 'pet store india', 'bird supplies', 'fish food'],
  authors: [{ name: 'PetNest' }],
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://petnest.co.in',
    siteName: 'PetNest',
    title: 'PetNest | Premium Pet Essentials & Supplies India',
    description: 'Shop high-quality pet supplies for dogs, cats, birds, fish, and small pets at PetNest.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'PetNest Premium Pet Supplies',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PetNest | Premium Pet Essentials',
    description: 'Shop high-quality pet supplies for dogs, cats, birds, fish, and small pets at PetNest.',
    images: ['/og-image.png'],
  },
  icons: {
    icon: '/icon.svg',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en-IN">
      <body className={`${geist.className} font-sans antialiased`}>
        <AuthProvider>
          <WishlistProvider>
            <CartProvider>
              <Header />
              {children}
              <Footer />
            </CartProvider>
          </WishlistProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
