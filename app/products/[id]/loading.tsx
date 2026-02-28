export default function ProductDetailLoading() {
  return (
    <main className="min-h-screen bg-background py-8 sm:py-12">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-8">
          {[80, 20, 120, 20, 160].map((w, i) => (
            <div key={i} className={`h-4 bg-secondary rounded animate-pulse`} style={{ width: w }} />
          ))}
        </div>
        {/* Back link */}
        <div className="h-4 bg-secondary rounded animate-pulse w-36 mb-6" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-14 mt-4">
          {/* Image skeleton */}
          <div>
            <div className="aspect-square rounded-2xl bg-secondary animate-pulse" />
            <div className="h-3 bg-secondary rounded animate-pulse w-32 mx-auto mt-3" />
          </div>

          {/* Details skeleton */}
          <div className="space-y-4 pt-2">
            <div className="h-6 bg-secondary rounded-full animate-pulse w-24" />
            <div className="h-9 bg-secondary rounded-lg animate-pulse w-3/4" />
            <div className="h-4 bg-secondary rounded animate-pulse w-40" />
            <div className="h-24 bg-secondary rounded-2xl animate-pulse mt-2" />
            <div className="space-y-2">
              <div className="h-3 bg-secondary rounded animate-pulse" />
              <div className="h-3 bg-secondary rounded animate-pulse w-5/6" />
              <div className="h-3 bg-secondary rounded animate-pulse w-4/6" />
            </div>
            <div className="h-10 bg-secondary rounded-full animate-pulse w-40" />
            <div className="h-14 bg-secondary rounded-xl animate-pulse mt-2" />
            <div className="flex gap-3">
              <div className="flex-1 h-12 bg-secondary rounded-xl animate-pulse" />
              <div className="flex-1 h-12 bg-secondary rounded-xl animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
