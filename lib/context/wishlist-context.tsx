'use client'

import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react'

/** Represents a simplified product object stored within the wishlist */
export interface WishlistItem {
  id: string
  name: string
  price: number
  image_url: string
  category: string
}

/** Interface for the Wishlist Context State and Actions */
interface WishlistContextType {
  /** Array of items currently in the wishlist */
  items: WishlistItem[]
  /** Adds a new item to the wishlist (prevents duplicates) */
  addItem: (item: WishlistItem) => void
  /** Removes an item from the wishlist by its ID */
  removeItem: (id: string) => void
  /** Checks if a specific product ID is currently in the wishlist */
  isInWishlist: (id: string) => boolean
  /** Removes all items from the wishlist */
  clearWishlist: () => void
  /** Boolean indicating if the initial load from localStorage has completed */
  isLoaded: boolean
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined)

/**
 * Global provider for the Wishlist state.
 * Syncs with browser localStorage to ensure persistence across sessions.
 */
export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<WishlistItem[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  // Hydrate state from localStorage on initial client-side mount
  useEffect(() => {
    const savedWishlist = localStorage.getItem('petnest-wishlist')
    if (savedWishlist) {
      try {
        const parsed = JSON.parse(savedWishlist)
        if (Array.isArray(parsed)) {
          setItems(parsed)
        }
      } catch (error) {
        console.error('WishlistProvider: Failed to parse stored wishlist:', error)
        // Auto-recovery: Clear corrupted data from storage
        localStorage.removeItem('petnest-wishlist')
      }
    }
    setIsLoaded(true)
  }, [])

  // Persist state changes back to localStorage automatically
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('petnest-wishlist', JSON.stringify(items))
    }
  }, [items, isLoaded])

  /** Adds an item uniquely to the wishlist */
  const addItem = useCallback((newItem: WishlistItem) => {
    setItems((prevItems) => {
      const exists = prevItems.some((item) => item.id === newItem.id)
      if (exists) return prevItems
      return [...prevItems, newItem]
    })
  }, [])

  /** Removes an item from the wishlist */
  const removeItem = useCallback((id: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id))
  }, [])

  /** Returns true if the ID exists in the current wishlist array */
  const isInWishlist = useCallback((id: string) => {
    return items.some((item) => item.id === id)
  }, [items])

  /** Wipes all items from the wishlist */
  const clearWishlist = useCallback(() => {
    setItems([])
  }, [])

  const contextValue = useMemo(
    () => ({ items, addItem, removeItem, isInWishlist, clearWishlist, isLoaded }),
    [items, addItem, removeItem, isInWishlist, clearWishlist, isLoaded]
  )

  return (
    <WishlistContext.Provider value={contextValue}>
      {children}
    </WishlistContext.Provider>
  )
}

/** Hook to consume the wishlist state throughout the application component tree */
export function useWishlist() {
  const context = useContext(WishlistContext)
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider')
  }
  return context
}
