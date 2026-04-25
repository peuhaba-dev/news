'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import ImageExtension from '@tiptap/extension-image'
import LinkExtension from '@tiptap/extension-link'
import Placeholder from '@tiptap/extension-placeholder'
import { useCallback } from 'react'

interface RichTextEditorProps {
  content: string
  onChange: (html: string) => void
  placeholder?: string
}

interface ToolbarButton {
  label: string
  command: string
  args?: Record<string, unknown>
  title: string
}

const TOOLBAR_GROUPS: ToolbarButton[][] = [
  [
    { label: 'B', command: 'toggleBold', title: 'Bold' },
    { label: 'I', command: 'toggleItalic', title: 'Italic' },
    { label: 'S', command: 'toggleStrike', title: 'Strikethrough' },
  ],
  [
    { label: 'H2', command: 'toggleHeading', args: { level: 2 }, title: 'Heading 2' },
    { label: 'H3', command: 'toggleHeading', args: { level: 3 }, title: 'Heading 3' },
  ],
  [
    { label: '• List', command: 'toggleBulletList', title: 'Bullet List' },
    { label: '1. List', command: 'toggleOrderedList', title: 'Ordered List' },
    { label: '❝', command: 'toggleBlockquote', title: 'Blockquote' },
  ],
  [
    { label: '—', command: 'setHorizontalRule', title: 'Horizontal Rule' },
  ],
]

export default function RichTextEditor({ content, onChange, placeholder }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3] },
      }),
      ImageExtension.configure({
        HTMLAttributes: { class: 'rounded-lg max-w-full' },
      }),
      LinkExtension.configure({
        openOnClick: false,
        HTMLAttributes: { class: 'text-aceh-green underline' },
      }),
      Placeholder.configure({
        placeholder: placeholder || 'Tulis konten artikel di sini...',
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm max-w-none min-h-[300px] outline-none p-4 text-[15px] leading-relaxed',
      },
    },
  })

  const addImage = useCallback(() => {
    if (!editor) return
    const url = window.prompt('URL gambar:')
    if (url) {
      editor.chain().focus().setImage({ src: url }).run()
    }
  }, [editor])

  const addLink = useCallback(() => {
    if (!editor) return
    const url = window.prompt('URL link:')
    if (url) {
      editor.chain().focus().setLink({ href: url }).run()
    }
  }, [editor])

  if (!editor) return null

  return (
    <div className="border border-border rounded-lg overflow-hidden bg-white">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-0.5 p-2 bg-surface border-b border-border">
        {TOOLBAR_GROUPS.map((group, gi) => (
          <div key={gi} className="flex items-center gap-0.5">
            {gi > 0 && <div className="w-px h-5 bg-border mx-1" />}
            {group.map((btn) => (
              <button
                key={btn.label}
                type="button"
                title={btn.title}
                onClick={() => {
                  const chain = editor.chain().focus()
                  if (btn.args) {
                    ;(chain as any)[btn.command](btn.args).run()
                  } else {
                    ;(chain as any)[btn.command]().run()
                  }
                }}
                className={`px-2 py-1 text-[12px] font-label font-bold rounded transition-colors
                  ${editor.isActive(btn.command.replace('toggle', '').toLowerCase(), btn.args)
                    ? 'bg-aceh-green text-white'
                    : 'text-ink-mid hover:bg-gray-200'
                  }`}
              >
                {btn.label}
              </button>
            ))}
          </div>
        ))}

        <div className="w-px h-5 bg-border mx-1" />

        <button
          type="button"
          title="Tambah Gambar"
          onClick={addImage}
          className="px-2 py-1 text-[12px] font-label font-bold text-ink-mid hover:bg-gray-200 rounded"
        >
          🖼 Gambar
        </button>

        <button
          type="button"
          title="Tambah Link"
          onClick={addLink}
          className="px-2 py-1 text-[12px] font-label font-bold text-ink-mid hover:bg-gray-200 rounded"
        >
          🔗 Link
        </button>
      </div>

      {/* Editor */}
      <EditorContent editor={editor} />

      {/* Hidden input for form submission */}
      <input type="hidden" name="content" value={editor.getHTML()} />
    </div>
  )
}
