'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { AlertTriangle } from 'lucide-react'

export default function GlobalError({
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    return (
        <html lang="en-IN">
            <body>
                <main className="min-h-screen bg-background flex items-center justify-center p-4">
                    <div className="text-center max-w-md">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-destructive/10 mb-6">
                            <AlertTriangle className="w-8 h-8 text-destructive" />
                        </div>
                        <h1 className="text-2xl font-bold text-foreground mb-3">Unexpected Error</h1>
                        <p className="text-muted-foreground mb-8">
                            Something went wrong. Please try again or go back to the homepage.
                        </p>
                        <div className="flex gap-3 justify-center">
                            <Button onClick={reset} variant="outline">Try again</Button>
                            <Link href="/">
                                <Button>Go Home</Button>
                            </Link>
                        </div>
                    </div>
                </main>
            </body>
        </html>
    )
}
