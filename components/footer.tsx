import Link from 'next/link'
import { Leaf, Instagram, Facebook, Twitter } from 'lucide-react'

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 font-bold text-lg">
              <div className="p-2 bg-primary rounded-xl">
                <Leaf className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="tracking-tight">PetNest</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Premium pet essentials curated for your beloved furry, feathered, and aquatic companions. Made with love in India 🇮🇳
            </p>
          </div>

          {/* Shop */}
          <div>
            <h3 className="font-semibold text-foreground mb-5 text-sm uppercase tracking-wider">Shop</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <Link href="/products" className="hover:text-foreground transition-colors">
                  All Products
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="font-semibold text-foreground mb-5 text-sm uppercase tracking-wider">Connect</h3>
            <div className="flex gap-3 mb-6">
              <a
                href="#"
                aria-label="Instagram"
                className="p-2.5 rounded-xl bg-secondary hover:bg-primary hover:text-primary-foreground text-muted-foreground transition-all duration-200"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#"
                aria-label="Facebook"
                className="p-2.5 rounded-xl bg-secondary hover:bg-primary hover:text-primary-foreground text-muted-foreground transition-all duration-200"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#"
                aria-label="Twitter"
                className="p-2.5 rounded-xl bg-secondary hover:bg-primary hover:text-primary-foreground text-muted-foreground transition-all duration-200"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              📦 Free delivery on orders above ₹999<br />
              🔄 Easy 30-day returns<br />
              🔒 100% secure checkout
            </p>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-border pt-8 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} PetNest. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Crafted with ❤️ for pet lovers across India by Anurag
          </p>
        </div>
      </div>
    </footer>
  )
}
