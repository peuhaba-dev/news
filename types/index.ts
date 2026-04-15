export interface Category {
  id: string
  name: string
  slug: string
  created_at: string
}

export interface Post {
  id: string
  title: string
  slug: string
  content: string
  excerpt: string
  featured_image: string | null
  category_id: string
  category?: Category
  author: string
  created_at: string
  views: number
}

export interface Comment {
  id: string
  post_id: string
  name: string
  content: string
  created_at: string
}

export interface BreakingNews {
  id: string
  text: string
  active: boolean
  created_at: string
}
