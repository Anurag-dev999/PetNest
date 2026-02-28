'use client'

import Link from 'next/link'
import { ShoppingCart, Leaf, User, LogOut } from 'lucide-react'
import { useCart } from '@/lib/context/cart-context'
import { useAuth } from '@/lib/context/auth-context'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export function Header() {
  const { items, isLoaded } = useCart()
  const { user, signOut } = useAuth()
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <div className="p-2 bg-primary rounded-lg">
              <Leaf className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-foreground">PetNest</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
            <Link href="/" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Home
            </Link>
            <Link href="/products" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Shop
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {/* User Auth */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="hidden sm:flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span className="text-sm truncate max-w-[100px]">{user.email?.split('@')[0]}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 rounded-xl">
                  <DropdownMenuItem className="text-xs text-muted-foreground break-all px-3 py-2">
                    {user.email}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={signOut} className="text-destructive cursor-pointer px-3 py-2 mt-1 focus:bg-destructive/10">
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/login" className="hidden sm:block">
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                  Log in
                </Button>
              </Link>
            )}

            {/* Cart Button */}
            <Link href="/cart" aria-label={`Shopping cart${cartCount > 0 ? `, ${cartCount} items` : ''}`}>
              <Button variant="outline" size="sm" className="relative group">
                <ShoppingCart className="w-4 h-4 group-hover:scale-110 transition-transform" />
                {isLoaded && cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-[10px] rounded-full min-w-[20px] h-5 px-1 flex items-center justify-center font-bold shadow-sm animate-in zoom-in">
                    {cartCount}
                  </span>
                )}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
