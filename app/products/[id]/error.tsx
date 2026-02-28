'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { AlertTriangle } from 'lucide-react'

export default function ProductDetailError({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    return (
        <main className="min-h-screen bg-background flex items-center justify-center p-4">
            <div className="text-center max-w-md">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-destructive/10 mb-6">
                    <AlertTriangle className="w-8 h-8 text-destructive" />
                </div>
                <h1 className="text-2xl font-bold text-foreground mb-3">Something went wrong</h1>
                <p className="text-muted-foreground mb-8">
                    We couldn&apos;t load this product. This might be a temporary issue.
                </p>
                <div className="flex gap-3 justify-center">
                    <Button onClick={reset} variant="outline">
                        Try again
                    </Button>
                    <Link href="/products">
                        <Button>Browse Products</Button>
                    </Link>
                </div>
            </div>
        </main>
    )
}
