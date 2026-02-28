export default function ProductsLoading() {
    return (
        <main className="min-h-screen bg-background">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
                {/* Header skeleton */}
                <div className="mb-12 space-y-3">
                    <div className="h-9 bg-secondary rounded-lg w-56 animate-pulse" />
                    <div className="h-5 bg-secondary rounded-lg w-80 animate-pulse" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Sidebar skeleton */}
                    <div className="lg:col-span-1 space-y-4">
                        <div className="h-10 bg-secondary rounded-xl animate-pulse" />
                        <div className="bg-card border border-border/50 rounded-xl p-5 space-y-3">
                            <div className="h-4 bg-secondary rounded w-20 animate-pulse" />
                            {[...Array(5)].map((_, i) => (
                                <div key={i} className="h-9 bg-secondary rounded-lg animate-pulse" />
                            ))}
                        </div>
                        <div className="h-24 bg-card border border-border/50 rounded-xl animate-pulse" />
                    </div>

                    {/* Grid skeleton */}
                    <div className="lg:col-span-3">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[...Array(9)].map((_, i) => (
                                <div key={i} className="rounded-2xl overflow-hidden border border-border/40 bg-card">
                                    <div className="aspect-square bg-secondary animate-pulse" />
                                    <div className="p-5 space-y-3">
                                        <div className="h-4 bg-secondary rounded animate-pulse w-3/4" />
                                        <div className="h-3 bg-secondary rounded animate-pulse w-1/2" />
                                        <div className="flex justify-between items-center pt-2">
                                            <div className="h-6 bg-secondary rounded animate-pulse w-20" />
                                            <div className="h-8 bg-secondary rounded-full animate-pulse w-20" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
