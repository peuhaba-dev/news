// app/admin/posts/new/page.tsx
import { createPost } from '@/lib/actions'
import { getAllCategories } from '@/lib/queries'
import NewPostForm from './NewPostForm'

export default async function NewPostPage() {
  const categories = await getAllCategories()
  return <NewPostForm categories={categories} createPost={createPost} />
}