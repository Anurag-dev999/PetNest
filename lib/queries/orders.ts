import { getSupabaseBrowserClient } from '../supabase/client'
import { Database } from '@/types/supabase'

type OrderInsert = Database['public']['Tables']['orders']['Insert']
type OrderItemInsert = Database['public']['Tables']['order_items']['Insert']

/**
 * Creates a new order and its associated items in a client-side transaction flow.
 * Uses the lazy browser client factory to ensure build-safety.
 */
export async function createOrder(order: OrderInsert, items: Omit<OrderItemInsert, 'order_id'>[]) {
    try {
        const supabase = getSupabaseBrowserClient()
        if (!supabase) {
            throw new Error('Supabase client failed to initialize.')
        }

        // 1. Create order
        const { data: orderData, error: orderError } = await supabase
            .from('orders')
            .insert([order])
            .select()
            .single()

        if (orderError) throw orderError

        // 2. Create order items
        const orderItems: OrderItemInsert[] = items.map(item => ({
            ...item,
            order_id: orderData.id
        }))

        const { error: itemsError } = await supabase
            .from('order_items')
            .insert(orderItems)

        if (itemsError) throw itemsError

        return { success: true, orderId: orderData.id }
    } catch (error) {
        console.error('createOrder: Error creating order:', error)
        return { success: false, error: 'Failed to create order' }
    }
}
