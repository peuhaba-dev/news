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
      categories: {
        Row: {
          id: string
          name: string
          slug: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          created_at?: string
        }
        Relationships: []
      }
      posts: {
        Row: {
          id: string
          title: string
          slug: string
          content: string
          excerpt: string
          featured_image: string | null
          category_id: string | null
          author: string
          created_at: string
          updated_at: string
          views: number
          published: boolean
        }
        Insert: {
          id?: string
          title: string
          slug: string
          content?: string
          excerpt?: string
          featured_image?: string | null
          category_id?: string | null
          author?: string
          created_at?: string
          updated_at?: string
          views?: number
          published?: boolean
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          content?: string
          excerpt?: string
          featured_image?: string | null
          category_id?: string | null
          author?: string
          created_at?: string
          updated_at?: string
          views?: number
          published?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "posts_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          }
        ]
      }
      comments: {
        Row: {
          id: string
          post_id: string
          name: string
          content: string
          approved: boolean
          created_at: string
        }
        Insert: {
          id?: string
          post_id: string
          name: string
          content: string
          approved?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          post_id?: string
          name?: string
          content?: string
          approved?: boolean
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "comments_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          }
        ]
      }
      breaking_news: {
        Row: {
          id: string
          text: string
          active: boolean
          created_at: string
        }
        Insert: {
          id?: string
          text: string
          active?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          text?: string
          active?: boolean
          created_at?: string
        }
        Relationships: []
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