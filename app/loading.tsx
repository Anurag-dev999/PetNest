import { Leaf } from 'lucide-react'

export default function RootLoading() {
    return (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[100] flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
                <div className="relative">
                    <div className="absolute inset-0 bg-primary/20 rounded-full scale-150 animate-ping" />
                    <div className="relative bg-primary text-primary-foreground p-4 rounded-full shadow-lg">
                        <Leaf className="w-8 h-8 animate-pulse" />
                    </div>
                </div>
                <div className="flex flex-col items-center gap-1">
                    <p className="text-xl font-bold tracking-tight text-foreground">PetNest</p>
                    <div className="flex gap-1">
                        {[0, 1, 2].map((i) => (
                            <div
                                key={i}
                                className="w-1.5 h-1.5 rounded-full bg-primary/40 animate-bounce"
                                style={{ animationDelay: `${i * 0.15}s` }}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
