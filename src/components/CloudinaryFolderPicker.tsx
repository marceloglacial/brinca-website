'use client'

import { useEffect, useState } from 'react'

type Props = {
  value?: string | null
  onChange?: (v: string) => void
  path?: string
}

export default function CloudinaryFolderPicker({ value, onChange }: Props) {
  const [folders, setFolders] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchFolders = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/cloudinary-folders')
      if (!res.ok) {
        const text = await res.text()
        throw new Error(text || 'Failed to fetch folders')
      }
      const data = await res.json()
      const list: string[] = data.folders || []
      setFolders(list)
    } catch (e: any) {
      setError(e?.message || String(e))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchFolders()
  }, [])

  return (
    <div className="cloudinary-folder-picker">
      <label htmlFor="cloudinary-select">Cloudinary Gallery Folder</label>

      {error && <div className="error">{error}</div>}

      <div className="folders-container">
        {folders.length === 0 ? (
          <div className="empty-state">No folders found</div>
        ) : (
          <select
            id="cloudinary-select"
            value={value || ''}
            onChange={(e) => onChange?.(e.target.value)}
            className="folders-select"
            disabled={loading}
          >
            <option value="">-- Select a folder --</option>
            {folders.map((f) => (
              <option key={f} value={f}>
                {f}
              </option>
            ))}
          </select>
        )}
      </div>

      {value && (
        <div className="selected-value">
          Selected: <strong>{value}</strong>
        </div>
      )}
    </div>
  )
}
