import { supabase } from '../supabase/client'
import { Database } from '@/types/supabase'

type OrderInsert = Database['public']['Tables']['orders']['Insert']
type OrderItemInsert = Database['public']['Tables']['order_items']['Insert']

export async function createOrder(order: OrderInsert, items: Omit<OrderItemInsert, 'order_id'>[]) {
    try {
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
        console.error('Error creating order:', error)
        return { success: false, error: 'Failed to create order' }
    }
}
