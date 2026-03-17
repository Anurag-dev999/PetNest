import Link from 'next/link'
import { ArrowLeft, Home } from 'lucide-react'

/**
 * A static-safe Not Found page that doesn't rely on Supabase or cookie-based state.
 * This prevents build-time prerendering crashes on Netlify.
 */
export default function NotFound() {
  return (
    <main className="min-h-[70vh] flex items-center justify-center bg-background px-4">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-6">
          <span className="text-4xl">🐾</span>
        </div>
        
        <h1 className="text-4xl font-bold text-foreground mb-4">404 - Page Not Found</h1>
        
        <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto">
          Oops! It seems like this page has run off. Let's get you back to familiar territory.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link 
            href="/" 
            className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-xl font-medium hover:opacity-90 transition-all active:scale-95"
          >
            <Home className="w-4 h-4" />
            Back to Home
          </Link>
          
          <Link 
            href="/products" 
            className="flex items-center gap-2 border border-border px-6 py-3 rounded-xl font-medium hover:bg-secondary transition-all active:scale-95"
          >
            <ArrowLeft className="w-4 h-4" />
            Browse Products
          </Link>
        </div>
      </div>
    </main>
  )
}
