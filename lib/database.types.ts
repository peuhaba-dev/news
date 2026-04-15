// Auto-generate this with: npx supabase gen types typescript --project-id YOUR_PROJECT_ID
// This is a placeholder — replace after running the generator.
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
        Insert: Omit<Database['public']['Tables']['categories']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['categories']['Insert']>
      }
      posts: {
        Row: {
          id: string
          title: string
          slug: string
          content: string
          excerpt: string
          featured_image: string | null
          category_id: string
          author: string
          created_at: string
          views: number
        }
        Insert: Omit<Database['public']['Tables']['posts']['Row'], 'id' | 'created_at' | 'views'>
        Update: Partial<Database['public']['Tables']['posts']['Insert']>
      }
      comments: {
        Row: {
          id: string
          post_id: string
          name: string
          content: string
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['comments']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['comments']['Insert']>
      }
      breaking_news: {
        Row: {
          id: string
          text: string
          active: boolean
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['breaking_news']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['breaking_news']['Insert']>
      }
    }
  }
}
