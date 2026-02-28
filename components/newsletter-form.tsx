'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { CheckCircle2 } from 'lucide-react'

export function NewsletterForm() {
    const [email, setEmail] = useState('')
    const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!email) return

        setStatus('loading')

        // Simulate API request
        await new Promise((resolve) => setTimeout(resolve, 1000))

        setStatus('success')
        setEmail('')
    }

    if (status === 'success') {
        return (
            <div className="flex items-center justify-center gap-2 p-4 mx-auto max-w-md bg-green-50 text-green-700 rounded-lg border border-green-200">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                <span className="font-semibold">Thanks for subscribing!</span>
            </div>
        )
    }

    return (
        <form onSubmit={handleSubmit} className="flex gap-2 max-w-md mx-auto">
            <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={status === 'loading'}
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50 transition-all"
            />
            <Button type="submit" disabled={status === 'loading'} className="min-w-[110px]">
                {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
            </Button>
        </form>
    )
}
