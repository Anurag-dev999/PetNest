'use client'

import { Suspense, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { getSupabase } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Leaf, Eye, EyeOff } from 'lucide-react'

function LoginContent() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [isLogin, setIsLogin] = useState(true)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [successMsg, setSuccessMsg] = useState<string | null>(null)
    const [showPassword, setShowPassword] = useState(false)
    const supabase = getSupabase()

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        try {
            if (isLogin) {
                const { error } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                })
                if (error) throw error
            } else {
                const { error } = await supabase.auth.signUp({
                    email,
                    password,
                })
                if (error) throw error
                setSuccessMsg('Registration successful! Please check your email to verify your account.')
                setIsLogin(true)
                setLoading(false)
                return
            }

            const redirectTo = searchParams.get('redirect') || '/'
            router.push(redirectTo)
            router.refresh()
        } catch (err: any) {
            setError(err.message || 'An error occurred during authentication')
        } finally {
            setLoading(false)
        }
    }

    return (
        <main className="min-h-screen bg-secondary/30 flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-card rounded-3xl p-8 border border-border/50 shadow-premium">
                <div className="flex flex-col items-center mb-8">
                    <div className="p-3 bg-primary/10 rounded-2xl mb-4">
                        <Leaf className="w-8 h-8 text-primary" />
                    </div>
                    <h1 className="text-2xl font-bold text-foreground">
                        {isLogin ? 'Welcome back to PetNest' : 'Create a PetNest Account'}
                    </h1>
                    <p className="text-muted-foreground text-sm mt-2 text-center">
                        {isLogin
                            ? 'Enter your details to access your account'
                            : 'Sign up to shop premium pet essentials seamlessly'}
                    </p>
                </div>

                {error && (
                    <div className="p-3 mb-6 bg-destructive/10 border border-destructive/20 text-destructive text-sm rounded-xl text-center">
                        {error}
                    </div>
                )}

                {successMsg && (
                    <div className="p-4 mb-6 bg-green-50 border border-green-200 text-green-700 text-sm rounded-xl text-center flex flex-col items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 mb-1">
                            ✓
                        </div>
                        <p className="font-medium text-base">Check your email</p>
                        <p>{successMsg}</p>
                    </div>
                )}

                <form onSubmit={handleAuth} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-foreground mb-1.5">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 border border-border rounded-xl bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
                            placeholder="you@example.com"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-foreground mb-1.5">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full pl-4 pr-12 py-3 border border-border rounded-xl bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
                                placeholder="••••••••"
                                required
                                minLength={6}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-1"
                            >
                                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                        </div>
                    </div>

                    <Button
                        type="submit"
                        className="w-full h-12 text-base rounded-xl mt-2 transition-transform active:scale-[0.98]"
                        disabled={loading}
                    >
                        {loading ? 'Please wait...' : isLogin ? 'Sign In' : 'Create Account'}
                    </Button>
                </form>

                <div className="mt-8 text-center">
                    <button
                        onClick={() => {
                            setIsLogin(!isLogin)
                            setError(null)
                            setSuccessMsg(null)
                        }}
                        className="text-sm font-medium text-primary hover:underline transition-all"
                    >
                        {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
                    </button>
                </div>
            </div>
        </main>
    )
}

export default function LoginPage() {
    return (
        <Suspense fallback={<main className="min-h-screen bg-secondary/30 flex items-center justify-center p-4" />}>
            <LoginContent />
        </Suspense>
    )
}
