'use client'

import { useEditor, EditorContent, type Editor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import Link from '@tiptap/extension-link'
import TextAlign from '@tiptap/extension-text-align'
import Placeholder from '@tiptap/extension-placeholder'
import { useCallback } from 'react'

interface RichTextEditorProps {
  content: string
  onChange: (html: string) => void
  placeholder?: string
}

export function RichTextEditor({ content, onChange, placeholder = 'Tell investors your story...' }: RichTextEditorProps) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3, 4, 5] },
      }),
      Underline,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: { class: 'text-accent underline underline-offset-2' },
      }),
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Placeholder.configure({ placeholder }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class: 'prose-editor outline-none min-h-[280px] px-4 py-3 text-sm leading-relaxed',
      },
    },
  })

  if (!editor) return null

  return (
    <div className="rounded-xl border border-border bg-white/[0.015] overflow-hidden">
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  )
}

/* ── Toolbar ── */

function Toolbar({ editor }: { editor: Editor }) {
  const setLink = useCallback(() => {
    const url = window.prompt('Enter URL')
    if (url === null) return
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run()
      return
    }
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
  }, [editor])

  return (
    <div className="flex flex-wrap items-center gap-0.5 border-b border-border px-2 py-1.5">
      {/* Heading dropdown */}
      <HeadingSelect editor={editor} />

      <Divider />

      {/* Inline formatting */}
      <ToolbarBtn
        active={editor.isActive('bold')}
        onClick={() => editor.chain().focus().toggleBold().run()}
        title="Bold"
      >
        <span className="font-bold">B</span>
      </ToolbarBtn>
      <ToolbarBtn
        active={editor.isActive('italic')}
        onClick={() => editor.chain().focus().toggleItalic().run()}
        title="Italic"
      >
        <span className="italic">I</span>
      </ToolbarBtn>
      <ToolbarBtn
        active={editor.isActive('underline')}
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        title="Underline"
      >
        <span className="underline">U</span>
      </ToolbarBtn>
      <ToolbarBtn
        active={editor.isActive('strike')}
        onClick={() => editor.chain().focus().toggleStrike().run()}
        title="Strikethrough"
      >
        <span className="line-through">S</span>
      </ToolbarBtn>

      <Divider />

      {/* Lists */}
      <ToolbarBtn
        active={editor.isActive('bulletList')}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        title="Bullet list"
      >
        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" />
        </svg>
      </ToolbarBtn>
      <ToolbarBtn
        active={editor.isActive('orderedList')}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        title="Numbered list"
      >
        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 6h13M8 12h13M8 18h13M3.5 6V4.5l1-0.5M3 18.5h2M3.5 13l1.5-1M3 12h2" />
        </svg>
      </ToolbarBtn>

      <Divider />

      {/* Block formatting */}
      <ToolbarBtn
        active={editor.isActive('blockquote')}
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        title="Blockquote"
      >
        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h4l-2 4h4l-2 4M13 10h4l-2 4h4l-2 4" />
        </svg>
      </ToolbarBtn>
      <ToolbarBtn
        active={editor.isActive('codeBlock')}
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        title="Code block"
      >
        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
        </svg>
      </ToolbarBtn>

      <Divider />

      {/* Link */}
      <ToolbarBtn
        active={editor.isActive('link')}
        onClick={setLink}
        title="Insert link"
      >
        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m9.86-2.54a4.5 4.5 0 00-1.242-7.244l-4.5-4.5a4.5 4.5 0 00-6.364 6.364L4.343 8.82" />
        </svg>
      </ToolbarBtn>

      <Divider />

      {/* Alignment */}
      <ToolbarBtn
        active={editor.isActive({ textAlign: 'left' })}
        onClick={() => editor.chain().focus().setTextAlign('left').run()}
        title="Align left"
      >
        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 6h18M3 12h12M3 18h18" />
        </svg>
      </ToolbarBtn>
      <ToolbarBtn
        active={editor.isActive({ textAlign: 'center' })}
        onClick={() => editor.chain().focus().setTextAlign('center').run()}
        title="Align center"
      >
        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 6h18M6 12h12M3 18h18" />
        </svg>
      </ToolbarBtn>
      <ToolbarBtn
        active={editor.isActive({ textAlign: 'right' })}
        onClick={() => editor.chain().focus().setTextAlign('right').run()}
        title="Align right"
      >
        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 6h18M9 12h12M3 18h18" />
        </svg>
      </ToolbarBtn>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Undo/Redo */}
      <ToolbarBtn
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().undo()}
        title="Undo"
      >
        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
        </svg>
      </ToolbarBtn>
      <ToolbarBtn
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().redo()}
        title="Redo"
      >
        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 15l6-6m0 0l-6-6m6 6H9a6 6 0 000 12h3" />
        </svg>
      </ToolbarBtn>
    </div>
  )
}

/* ── Heading select ── */

function HeadingSelect({ editor }: { editor: Editor }) {
  const currentLevel = [1, 2, 3, 4, 5].find((l) =>
    editor.isActive('heading', { level: l })
  )
  const value = currentLevel ? `h${currentLevel}` : 'p'

  return (
    <select
      value={value}
      onChange={(e) => {
        const val = e.target.value
        if (val === 'p') {
          editor.chain().focus().setParagraph().run()
        } else {
          const level = parseInt(val.replace('h', '')) as 1 | 2 | 3 | 4 | 5
          editor.chain().focus().toggleHeading({ level }).run()
        }
      }}
      className="h-7 rounded-md bg-white/[0.04] border border-transparent px-1.5 text-xs text-text-secondary outline-none hover:bg-white/[0.06] focus:border-accent/30 cursor-pointer"
    >
      <option value="p">Paragraph</option>
      <option value="h1">Heading 1</option>
      <option value="h2">Heading 2</option>
      <option value="h3">Heading 3</option>
      <option value="h4">Heading 4</option>
      <option value="h5">Heading 5</option>
    </select>
  )
}

/* ── Toolbar button ── */

function ToolbarBtn({
  children,
  active,
  onClick,
  disabled,
  title,
}: {
  children: React.ReactNode
  active?: boolean
  onClick: () => void
  disabled?: boolean
  title?: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={`flex h-7 w-7 items-center justify-center rounded-md text-xs transition-colors ${
        active
          ? 'bg-accent/15 text-accent'
          : 'text-text-secondary hover:bg-white/[0.06] hover:text-text-primary'
      } ${disabled ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer'}`}
    >
      {children}
    </button>
  )
}

/* ── Divider ── */

function Divider() {
  return <div className="mx-0.5 h-4 w-px bg-border" />
}
