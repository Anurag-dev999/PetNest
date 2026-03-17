import { createClient } from '../supabase/server'
import { Database } from '@/types/supabase'

export type Product = Database['public']['Tables']['products']['Row']

/**
 * Fetches products from the database with optional filtering and search.
 * @param petType - Optional pet type to filter by (e.g., 'dog', 'cat')
 * @param searchTerm - Optional search term to match against product name or category
 * @param minPrice - Minimum price for filtering (default: 0)
 * @param maxPrice - Maximum price for filtering (default: 50000)
 * @returns A promise that resolves to an array of products
 */
export async function getProducts(
  petType?: string,
  searchTerm?: string,
  minPrice = 0,
  maxPrice = 50000
): Promise<Product[]> {
  try {
    const serverClient = await createClient()
    let query = serverClient.from('products').select('*')

    // Apply pet type filter if provided and not "all"
    if (petType && petType.toLowerCase() !== 'all') {
      query = query.ilike('pet_type', petType)
    }

    // Apply search filter if provided
    if (searchTerm) {
      query = query.or(`name.ilike.%${searchTerm}%,category.ilike.%${searchTerm}%`)
    }

    // Apply price range and default ordering
    query = query
      .gte('price', minPrice)
      .lte('price', maxPrice)
      .order('created_at', { ascending: false })

    const { data, error } = await query

    if (error) {
      throw error
    }

    return (data as Product[]) || []
  } catch (error) {
    console.error('getProducts: Error fetching products:', error)
    return []
  }
}

/**
 * Fetches a single product by its unique ID.
 * @param id - The UUID of the product
 * @returns A promise that resolves to the product object or null if not found
 */
export async function getProductById(id: string): Promise<Product | null> {
  try {
    const serverClient = await createClient()
    const { data, error } = await serverClient
      .from('products')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      throw error
    }

    return data as Product
  } catch (error) {
    console.error(`getProductById: Error fetching product ${id}:`, error)
    return null
  }
}

/**
 * Fetches a limited set of featured products for the home page.
 * @param limit - Number of products to fetch (default: 8)
 * @returns A promise that resolves to an array of featured products
 */
export async function getFeaturedProductsServer(limit = 8): Promise<Product[]> {
  try {
    const serverClient = await createClient()
    const { data, error } = await serverClient
      .from('products')
      .select('*')
      .limit(limit)

    if (error) {
      throw error
    }

    return (data as Product[]) || []
  } catch (error) {
    console.error('getFeaturedProductsServer: Error fetching featured products:', error)
    return []
  }
}

/**
 * Aggregates product counts grouped by pet type across the entire catalog.
 * Useful for sidebar filter counts that shouldn't change when a filter is applied.
 * @returns A promise that resolves to an object mapping pet types to counts
 */
export async function getCategoryCounts(): Promise<Record<string, number>> {
  try {
    const serverClient = await createClient()
    const { data, error } = await serverClient.from('products').select('pet_type')

    if (error) {
      throw error
    }

    const counts: Record<string, number> = {}
    data.forEach((item) => {
      if (!item.pet_type) return
      const type = item.pet_type.toLowerCase()
      counts[type] = (counts[type] || 0) + 1
    })

    return counts
  } catch (error) {
    console.error('getCategoryCounts: Error fetching category counts:', error)
    return {}
  }
}
