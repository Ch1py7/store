export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      Auth: {
        Row: {
          created_at: string
          email: string
          id: string
          password: string
          salt: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at: string
          email: string
          id: string
          password: string
          salt: string
          updated_at: string
          user_id: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          password?: string
          salt?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "Auth_userId_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "User"
            referencedColumns: ["id"]
          },
        ]
      }
      Cart: {
        Row: {
          created_at: string
          id: string
          products: Json
          total: number
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at: string
          id: string
          products: Json
          total: number
          updated_at: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          products?: Json
          total?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "Cart_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "User"
            referencedColumns: ["id"]
          },
        ]
      }
      Inventory: {
        Row: {
          attributes: Json
          created_at: string
          id: string
          product_id: string
          stock: number
          updated_at: string
        }
        Insert: {
          attributes: Json
          created_at: string
          id: string
          product_id: string
          stock: number
          updated_at: string
        }
        Update: {
          attributes?: Json
          created_at?: string
          id?: string
          product_id?: string
          stock?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "Inventory_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "Product"
            referencedColumns: ["id"]
          },
        ]
      }
      Order: {
        Row: {
          created_at: string
          id: string
          products: Json
          status: number
          total: number
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at: string
          id: string
          products: Json
          status: number
          total: number
          updated_at: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          products?: Json
          status?: number
          total?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "Order_status_fkey"
            columns: ["status"]
            isOneToOne: false
            referencedRelation: "Statuses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Order_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "User"
            referencedColumns: ["id"]
          },
        ]
      }
      Product: {
        Row: {
          category: number
          created_at: string
          description: string
          id: string
          name: string
          price: number
          updated_at: string
        }
        Insert: {
          category: number
          created_at: string
          description: string
          id: string
          name: string
          price: number
          updated_at: string
        }
        Update: {
          category?: number
          created_at?: string
          description?: string
          id?: string
          name?: string
          price?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "Product_category_fkey"
            columns: ["category"]
            isOneToOne: false
            referencedRelation: "ProductsCategories"
            referencedColumns: ["id"]
          },
        ]
      }
      ProductAttributes: {
        Row: {
          attribute_name: string
          attribute_value: string
          id: string
          product_id: string
        }
        Insert: {
          attribute_name: string
          attribute_value: string
          id: string
          product_id: string
        }
        Update: {
          attribute_name?: string
          attribute_value?: string
          id?: string
          product_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ProductAttributes_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "Product"
            referencedColumns: ["id"]
          },
        ]
      }
      ProductsCategories: {
        Row: {
          category: string
          id: number
          is_deleted: boolean
        }
        Insert: {
          category: string
          id?: number
          is_deleted?: boolean
        }
        Update: {
          category?: string
          id?: number
          is_deleted?: boolean
        }
        Relationships: []
      }
      Promotions: {
        Row: {
          category_id: number
          created_at: string
          end_date: string
          id: number
          is_active: boolean
          percentage_discount: number
          product_id: string
          start_date: string
          updated_at: string
        }
        Insert: {
          category_id: number
          created_at: string
          end_date: string
          id?: number
          is_active: boolean
          percentage_discount: number
          product_id: string
          start_date: string
          updated_at: string
        }
        Update: {
          category_id?: number
          created_at?: string
          end_date?: string
          id?: number
          is_active?: boolean
          percentage_discount?: number
          product_id?: string
          start_date?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "Promotions_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "ProductsCategories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Promotions_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "Product"
            referencedColumns: ["id"]
          },
        ]
      }
      RefreshToken: {
        Row: {
          created_at: string
          expires_at: string
          id: string
          is_revoked: boolean
          refresh_token: string
          user_id: string
        }
        Insert: {
          created_at: string
          expires_at: string
          id: string
          is_revoked: boolean
          refresh_token: string
          user_id: string
        }
        Update: {
          created_at?: string
          expires_at?: string
          id?: string
          is_revoked?: boolean
          refresh_token?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "Tokens_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "User"
            referencedColumns: ["id"]
          },
        ]
      }
      Roles: {
        Row: {
          id: number
          is_deleted: boolean
          role: string
        }
        Insert: {
          id?: number
          is_deleted: boolean
          role: string
        }
        Update: {
          id?: number
          is_deleted?: boolean
          role?: string
        }
        Relationships: []
      }
      Statuses: {
        Row: {
          id: number
          is_deleted: boolean
          status: string
        }
        Insert: {
          id?: number
          is_deleted?: boolean
          status: string
        }
        Update: {
          id?: number
          is_deleted?: boolean
          status?: string
        }
        Relationships: []
      }
      User: {
        Row: {
          created_at: string
          email: string
          first_name: string
          id: string
          is_deleted: boolean
          is_verified: boolean
          last_name: string
          role_id: number
          updated_at: string
          verification_code: string
        }
        Insert: {
          created_at: string
          email: string
          first_name: string
          id: string
          is_deleted: boolean
          is_verified: boolean
          last_name: string
          role_id: number
          updated_at: string
          verification_code: string
        }
        Update: {
          created_at?: string
          email?: string
          first_name?: string
          id?: string
          is_deleted?: boolean
          is_verified?: boolean
          last_name?: string
          role_id?: number
          updated_at?: string
          verification_code?: string
        }
        Relationships: [
          {
            foreignKeyName: "User_roleId_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "Roles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      insert_user_auth: {
        Args: {
          user_table_data: Json
          auth_table_data: Json
        }
        Returns: undefined
      }
      update_product_from_order: {
        Args: {
          order_table_data: Json
          product_table_data: Json[]
        }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
