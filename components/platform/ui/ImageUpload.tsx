'use client'

import { useRef, useState, useCallback } from 'react'

interface ImageUploadProps {
  value: string | null
  onChange: (dataUrl: string | null, file: File | null) => void
  label: string
  hint?: string
  aspectRatio?: string
  className?: string
}

export function ImageUpload({
  value,
  onChange,
  label,
  hint,
  aspectRatio = '16/9',
  className = '',
}: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [dragOver, setDragOver] = useState(false)

  const handleFile = useCallback(
    (file: File | null) => {
      if (!file) return
      if (!file.type.startsWith('image/')) return
      const reader = new FileReader()
      reader.onload = () => {
        onChange(reader.result as string, file)
      }
      reader.readAsDataURL(file)
    },
    [onChange],
  )

  function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    setDragOver(false)
    const file = e.dataTransfer.files[0]
    handleFile(file)
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null
    handleFile(file)
  }

  function handleRemove(e: React.MouseEvent) {
    e.stopPropagation()
    onChange(null, null)
    if (inputRef.current) inputRef.current.value = ''
  }

  return (
    <div className={className}>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleChange}
      />

      {value ? (
        /* Preview state */
        <div className="group relative overflow-hidden rounded-xl border border-border">
          <img
            src={value}
            alt={label}
            className="w-full object-cover"
            style={{ aspectRatio }}
          />
          <div className="absolute inset-0 flex items-center justify-center gap-2 bg-surface/70 opacity-0 transition-opacity group-hover:opacity-100">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="rounded-lg bg-white/10 px-3 py-1.5 text-xs font-medium text-text-primary backdrop-blur-sm transition-colors hover:bg-white/20"
            >
              Replace
            </button>
            <button
              type="button"
              onClick={handleRemove}
              className="rounded-lg bg-negative/20 px-3 py-1.5 text-xs font-medium text-negative backdrop-blur-sm transition-colors hover:bg-negative/30"
            >
              Remove
            </button>
          </div>
        </div>
      ) : (
        /* Drop zone */
        <div
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault()
            setDragOver(true)
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          className={`flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed transition-colors ${
            dragOver
              ? 'border-accent/40 bg-accent/5'
              : 'border-border hover:border-border-hover hover:bg-white/[0.015]'
          }`}
          style={{ aspectRatio }}
        >
          <svg className="mb-2 h-6 w-6 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
          </svg>
          <p className="text-xs font-medium text-text-secondary">{label}</p>
          {hint && <p className="mt-0.5 text-[0.625rem] text-text-muted">{hint}</p>}
          <p className="mt-1.5 text-[0.625rem] text-text-muted">
            Drag & drop or <span className="text-accent">browse</span>
          </p>
        </div>
      )}
    </div>
  )
}
