import { supabase } from '../supabase/client'
import { createServerClient } from '../supabase/server'
import { Database } from '@/types/supabase'

export type Product = Database['public']['Tables']['products']['Row']

export async function getProducts(petType?: string, searchTerm?: string, minPrice = 0, maxPrice = 50000) {
    const serverClient = createServerClient()
    let query = serverClient.from('products').select('*')

    if (petType && petType.toLowerCase() !== 'all') {
        query = query.eq('pet_type', petType.toLowerCase())
    }

    if (searchTerm) {
        query = query.or(`name.ilike.%${searchTerm}%,category.ilike.%${searchTerm}%`)
    }

    query = query.gte('price', minPrice).lte('price', maxPrice).order('created_at', { ascending: false })

    const { data, error } = await query

    if (error) {
        console.error('Error fetching products from server:', error.message || error)
        return []
    }

    return (data as Product[]) || []
}

export async function getProductById(id: string) {
    const serverClient = createServerClient()
    const { data, error } = await serverClient.from('products').select('*').eq('id', id).single()

    if (error) {
        console.error(`Error fetching product ${id}:`, error)
        return null
    }

    return data as Product
}

export async function getFeaturedProductsServer(): Promise<Product[]> {
    const serverClient = createServerClient()
    const { data, error } = await serverClient
        .from('products')
        .select('*')
        .limit(8)

    if (error) {
        console.error('Error fetching featured products:', error.message || error)
        return []
    }

    return (data as Product[]) || []
}
