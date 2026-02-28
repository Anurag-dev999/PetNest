'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { X, ZoomIn } from 'lucide-react'

interface ImageLightboxProps {
    src: string
    alt: string
    className?: string
}

export function ImageLightbox({ src, alt, className = '' }: ImageLightboxProps) {
    const [isOpen, setIsOpen] = useState(false)

    const close = useCallback(() => setIsOpen(false), [])

    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') close()
        }
        if (isOpen) {
            document.addEventListener('keydown', handleKey)
            document.body.style.overflow = 'hidden'
        }
        return () => {
            document.removeEventListener('keydown', handleKey)
            document.body.style.overflow = ''
        }
    }, [isOpen, close])

    return (
        <>
            {/* Trigger — the image with a zoom hint */}
            <button
                onClick={() => setIsOpen(true)}
                className={`relative group block w-full h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-inherit overflow-hidden ${className}`}
                aria-label="Enlarge image"
            >
                <Image
                    src={src}
                    alt={alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    priority
                />
                {/* Zoom hint overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-background/80 backdrop-blur-sm rounded-full p-3 shadow-lg">
                        <ZoomIn className="w-5 h-5 text-foreground" />
                    </div>
                </div>
            </button>

            {/* Lightbox modal */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
                    onClick={close}
                    role="dialog"
                    aria-modal="true"
                    aria-label={`Preview: ${alt}`}
                >
                    {/* Close button */}
                    <button
                        onClick={close}
                        className="absolute top-4 right-4 z-10 p-2 rounded-full bg-background/20 hover:bg-background/40 text-white transition-colors"
                        aria-label="Close preview"
                    >
                        <X className="w-6 h-6" />
                    </button>

                    {/* Image container — stops click propagation so clicking image doesn't close */}
                    <div
                        className="relative max-w-4xl max-h-[85vh] w-full h-full animate-in zoom-in-95 duration-200"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Image
                            src={src}
                            alt={alt}
                            fill
                            className="object-contain"
                            quality={95}
                        />
                    </div>

                    <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/60 text-xs select-none pointer-events-none">
                        Press Esc or click outside to close
                    </p>
                </div>
            )}
        </>
    )
}
