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
          name: string
          slug: string
        }
        Update: {
          name?: string
          slug?: string
        }
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
        Insert: {
          title: string
          slug: string
          content: string
          excerpt: string
          featured_image?: string | null
          category_id: string
          author: string
        }
        Update: {
          title?: string
          slug?: string
          content?: string
          excerpt?: string
          featured_image?: string | null
          category_id?: string
          author?: string
        }
      }
      comments: {
        Row: {
          id: string
          post_id: string
          name: string
          content: string
          created_at: string
        }
        Insert: {
          post_id: string
          name: string
          content: string
        }
        Update: {
          post_id?: string
          name?: string
          content?: string
        }
      }
      breaking_news: {
        Row: {
          id: string
          text: string
          active: boolean
          created_at: string
        }
        Insert: {
          text: string
          active?: boolean
        }
        Update: {
          text?: string
          active?: boolean
        }
      }
    }
  }
}