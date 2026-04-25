export interface Category {
  id: string
  name: string
  slug: string
  created_at: string
}

export interface Author {
  id: string
  name: string
  slug: string
  avatar_url: string | null
  bio: string | null
}

export interface Post {
  id: string
  title: string
  slug: string
  content: string
  excerpt: string
  featured_image: string | null
  category_id: string | null
  category?: Category
  author: string
  author_id?: string | null
  author_detail?: Author | null
  created_at: string
  updated_at: string
  views: number
  published: boolean
}

export interface Comment {
  id: string
  post_id: string
  name: string
  content: string
  approved: boolean
  created_at: string
}

export interface BreakingNews {
  id: string
  text: string
  active: boolean
  created_at: string
}
