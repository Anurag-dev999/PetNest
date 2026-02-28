export type Database = {
  public: {
    Tables: {
      products: {
        Row: {
          id: string
          name: string
          description: string
          price: number
          image_url: string
          category: string
          pet_type: string
          stock: number
          created_at: string
        }
        Insert: Omit<
          Database['public']['Tables']['products']['Row'],
          'id' | 'created_at'
        >
        Update: Partial<
          Database['public']['Tables']['products']['Insert']
        >
        Relationships: []
      }
      orders: {
        Row: {
          id: string
          user_id: string | null
          email: string
          total: number
          status: string
          created_at: string
        }
        Insert: Omit<
          Database['public']['Tables']['orders']['Row'],
          'id' | 'created_at'
        >
        Update: Partial<
          Database['public']['Tables']['orders']['Insert']
        >
        Relationships: []
      }
      order_items: {
        Row: {
          id: string
          order_id: string
          product_id: string
          quantity: number
          price: number
          created_at: string
        }
        Insert: Omit<
          Database['public']['Tables']['order_items']['Row'],
          'id' | 'created_at'
        >
        Update: Partial<
          Database['public']['Tables']['order_items']['Insert']
        >
        Relationships: [
          {
            foreignKeyName: "order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
