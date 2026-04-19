// app/admin/posts/new/NewPostForm.tsx
'use client'

import { useState, useCallback } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import Placeholder from '@tiptap/extension-placeholder'
import { useDropzone } from 'react-dropzone'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Sparkles, Upload, X, Bold, Italic, List, ListOrdered, Quote, Heading2, Link as LinkIcon, Image as ImageIcon } from 'lucide-react'

// Komponen toolbar editor
const MenuBar = ({ editor }: { editor: any }) => {
  if (!editor) return null

  return (
    <div className="flex flex-wrap gap-1 p-2 border-b border-border bg-gray-50 rounded-t-lg">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('bold') ? 'bg-gray-200 text-aceh-green' : ''}`}
        type="button"
      >
        <Bold size={16} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('italic') ? 'bg-gray-200 text-aceh-green' : ''}`}
        type="button"
      >
        <Italic size={16} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('heading', { level: 2 }) ? 'bg-gray-200 text-aceh-green' : ''}`}
        type="button"
      >
        <Heading2 size={16} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('bulletList') ? 'bg-gray-200 text-aceh-green' : ''}`}
        type="button"
      >
        <List size={16} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('orderedList') ? 'bg-gray-200 text-aceh-green' : ''}`}
        type="button"
      >
        <ListOrdered size={16} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('blockquote') ? 'bg-gray-200 text-aceh-green' : ''}`}
        type="button"
      >
        <Quote size={16} />
      </button>
      <button
        onClick={() => {
          const url = window.prompt('Masukkan URL tautan:')
          if (url) editor.chain().focus().setLink({ href: url }).run()
        }}
        className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('link') ? 'bg-gray-200 text-aceh-green' : ''}`}
        type="button"
      >
        <LinkIcon size={16} />
      </button>
      <button
        onClick={() => {
          const url = window.prompt('Masukkan URL gambar:')
          if (url) editor.chain().focus().setImage({ src: url }).run()
        }}
        className="p-2 rounded hover:bg-gray-200"
        type="button"
      >
        <ImageIcon size={16} />
      </button>
    </div>
  )
}

export default function NewPostForm({ categories, createPost }: { categories: any[], createPost: any }) {
  const [featuredImageUrl, setFeaturedImageUrl] = useState('')
  const [uploading, setUploading] = useState(false)
  const [aiLoading, setAiLoading] = useState(false)
  const supabase = createClientComponentClient()

  // Inisialisasi TipTap editor
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Link,
      Placeholder.configure({
        placeholder: 'Tulis konten artikel Anda di sini...',
      }),
    ],
    content: '',
    editorProps: {
      attributes: {
        class: 'prose prose-sm max-w-none min-h-[300px] p-4 focus:outline-none',
      },
    },
  })

  // Drag & drop untuk featured image
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (!file) return

    setUploading(true)
    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`
      const { error } = await supabase.storage
        .from('articles') // ganti dengan nama bucket Anda
        .upload(`featured/${fileName}`, file)

      if (error) throw error

      const { data: { publicUrl } } = supabase.storage
        .from('articles')
        .getPublicUrl(`featured/${fileName}`)

      setFeaturedImageUrl(publicUrl)
    } catch (error) {
      console.error('Upload error:', error)
      alert('Gagal mengunggah gambar')
    } finally {
      setUploading(false)
    }
  }, [supabase])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    maxFiles: 1,
    disabled: uploading,
  })

  // Fungsi generate AI (simulasi)
  const handleAIGenerate = async () => {
    setAiLoading(true)
    try {
      // Ganti dengan endpoint AI sesungguhnya
      const res = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: editor?.getHTML() || '' }),
      })
      const data = await res.json()
      
      // Isi field judul dan excerpt
      const titleInput = document.querySelector('input[name="title"]') as HTMLInputElement
      const excerptInput = document.querySelector('textarea[name="excerpt"]') as HTMLTextAreaElement
      if (titleInput) titleInput.value = data.title || ''
      if (excerptInput) excerptInput.value = data.excerpt || ''
    } catch (error) {
      console.error('AI error:', error)
      alert('Gagal generate dengan AI')
    } finally {
      setAiLoading(false)
    }
  }

  return (
    <div className="max-w-4xl">
      <h1 className="font-head text-[28px] font-bold text-ink mb-8">Tulis Artikel Baru</h1>

      <form action={createPost} className="space-y-6 bg-white border border-border rounded-xl p-6">
        {/* Judul + AI Button */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-[13px] font-semibold text-ink-mid">
              Judul <span className="text-aceh-red">*</span>
            </label>
            <button
              type="button"
              onClick={handleAIGenerate}
              disabled={aiLoading}
              className="flex items-center gap-1.5 text-xs font-medium text-aceh-green hover:text-aceh-green-dark transition-colors disabled:opacity-50"
            >
              <Sparkles size={14} />
              {aiLoading ? 'Generating...' : 'AI Suggest Judul & Ringkasan'}
            </button>
          </div>
          <input
            type="text"
            name="title"
            required
            placeholder="Judul artikel yang menarik..."
            className="w-full border border-border rounded-md px-3.5 py-2.5 text-[15px] text-ink
                       outline-none focus:border-aceh-green focus:ring-2 focus:ring-aceh-green/20"
          />
        </div>

        {/* Kategori & Penulis */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-[13px] font-semibold text-ink-mid mb-1.5">Kategori</label>
            <select
              name="category_id"
              className="w-full border border-border rounded-md px-3.5 py-2.5 text-[14px] text-ink
                         outline-none focus:border-aceh-green focus:ring-2 focus:ring-aceh-green/20"
            >
              <option value="">Pilih kategori...</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-[13px] font-semibold text-ink-mid mb-1.5">
              Penulis <span className="text-aceh-red">*</span>
            </label>
            <input
              type="text"
              name="author"
              required
              placeholder="Nama penulis"
              className="w-full border border-border rounded-md px-3.5 py-2.5 text-[14px] text-ink
                         outline-none focus:border-aceh-green focus:ring-2 focus:ring-aceh-green/20"
            />
          </div>
        </div>

        {/* Upload Gambar Utama (Drag & Drop) */}
        <div>
          <label className="block text-[13px] font-semibold text-ink-mid mb-1.5">
            Gambar Utama
          </label>
          <div
            {...getRootProps()}
            className={`relative border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors
              ${isDragActive ? 'border-aceh-green bg-aceh-green/5' : 'border-gray-300 hover:border-aceh-green/50'}
              ${uploading ? 'opacity-50 pointer-events-none' : ''}`}
          >
            <input {...getInputProps()} />
            {featuredImageUrl ? (
              <div className="relative">
                <img
                  src={featuredImageUrl}
                  alt="Featured"
                  className="max-h-48 mx-auto rounded"
                />
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    setFeaturedImageUrl('')
                  }}
                  className="absolute top-0 right-0 bg-white rounded-full p-1 shadow-md hover:bg-gray-100"
                >
                  <X size={16} />
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                <Upload className="mx-auto text-gray-400" size={32} />
                <p className="text-sm text-gray-600">
                  {isDragActive
                    ? 'Lepaskan file di sini...'
                    : 'Seret & lepas gambar di sini, atau klik untuk pilih'}
                </p>
                <p className="text-xs text-gray-400">PNG, JPG, WEBP (maks 5MB)</p>
              </div>
            )}
          </div>
          {/* Hidden input untuk featured_image */}
          <input type="hidden" name="featured_image" value={featuredImageUrl} />
        </div>

        {/* Ringkasan */}
        <div>
          <label className="block text-[13px] font-semibold text-ink-mid mb-1.5">
            Ringkasan <span className="text-aceh-red">*</span>
          </label>
          <textarea
            name="excerpt"
            required
            rows={2}
            maxLength={300}
            placeholder="Ringkasan singkat artikel (maks 300 karakter)..."
            className="w-full border border-border rounded-md px-3.5 py-2.5 text-[14px] text-ink
                       outline-none focus:border-aceh-green focus:ring-2 focus:ring-aceh-green/20 resize-none"
          />
        </div>

        {/* Rich Text Editor */}
        <div>
          <label className="block text-[13px] font-semibold text-ink-mid mb-1.5">
            Konten Artikel <span className="text-aceh-red">*</span>
          </label>
          <div className="border border-border rounded-lg overflow-hidden">
            <MenuBar editor={editor} />
            <EditorContent editor={editor} />
          </div>
          {/* Hidden input untuk konten HTML */}
          <input type="hidden" name="content" value={editor?.getHTML() || ''} />
        </div>

        {/* Published Checkbox */}
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="published"
            name="published"
            value="true"
            defaultChecked
            className="w-4 h-4 accent-aceh-green"
          />
          <label htmlFor="published" className="text-[13px] font-semibold text-ink-mid cursor-pointer">
            Langsung tayangkan artikel
          </label>
        </div>

        {/* Tombol Submit */}
        <div className="flex items-center gap-3 pt-2 border-t border-border">
          <button
            type="submit"
            className="bg-aceh-green text-white font-label font-semibold tracking-[0.5px]
                       px-6 py-2.5 rounded hover:bg-aceh-green-dark transition-colors"
          >
            Simpan & Tayangkan
          </button>
          <a
            href="/admin/posts"
            className="text-ink-soft font-label text-[13px] hover:text-ink transition-colors"
          >
            Batal
          </a>
        </div>
      </form>
    </div>
  )
}