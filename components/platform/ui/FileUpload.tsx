'use client'

import { useRef, useState, useCallback } from 'react'

interface UploadedFile {
  name: string
  size: number
  type: string
  dataUrl: string
}

interface FileUploadProps {
  value: UploadedFile | null
  onChange: (file: UploadedFile | null) => void
  label: string
  accept?: string
  hint?: string
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

const typeIcons: Record<string, string> = {
  'application/pdf': 'PDF',
  'application/msword': 'DOC',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'DOCX',
  'text/plain': 'TXT',
}

export function FileUpload({
  value,
  onChange,
  label,
  accept = '.pdf,.doc,.docx,.txt',
  hint,
}: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [dragOver, setDragOver] = useState(false)

  const handleFile = useCallback(
    (file: File | null) => {
      if (!file) return
      const reader = new FileReader()
      reader.onload = () => {
        onChange({
          name: file.name,
          size: file.size,
          type: file.type,
          dataUrl: reader.result as string,
        })
      }
      reader.readAsDataURL(file)
    },
    [onChange],
  )

  function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    setDragOver(false)
    handleFile(e.dataTransfer.files[0])
  }

  function handleRemove() {
    onChange(null)
    if (inputRef.current) inputRef.current.value = ''
  }

  if (value) {
    const ext = typeIcons[value.type] ?? value.name.split('.').pop()?.toUpperCase() ?? 'FILE'
    return (
      <div className="flex items-center gap-3 rounded-xl border border-border bg-white/[0.015] px-4 py-3">
        <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-accent/10 text-[0.625rem] font-bold text-accent">
          {ext}
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium">{value.name}</p>
          <p className="text-[0.625rem] text-text-muted">{formatBytes(value.size)}</p>
        </div>
        <button
          type="button"
          onClick={handleRemove}
          className="flex-shrink-0 rounded-md p-1 text-text-muted hover:bg-negative/10 hover:text-negative transition-colors"
          title="Remove file"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    )
  }

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
      />
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault()
          setDragOver(true)
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        className={`flex cursor-pointer items-center gap-3 rounded-xl border-2 border-dashed px-4 py-4 transition-colors ${
          dragOver
            ? 'border-accent/40 bg-accent/5'
            : 'border-border hover:border-border-hover hover:bg-white/[0.015]'
        }`}
      >
        <svg className="h-5 w-5 flex-shrink-0 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m6.75 12l-3-3m0 0l-3 3m3-3v6m-1.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
        </svg>
        <div>
          <p className="text-xs font-medium text-text-secondary">{label}</p>
          {hint && <p className="text-[0.625rem] text-text-muted">{hint}</p>}
        </div>
      </div>
    </div>
  )
}
