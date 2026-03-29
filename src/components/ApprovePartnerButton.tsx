'use client'

import { useCallback, useState } from 'react'
import { useDocumentInfo } from '@payloadcms/ui'

export function ApproveButton() {
  const { id } = useDocumentInfo()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleApprove = useCallback(async () => {
    if (!id) {
      setError('No submission ID found')
      return
    }

    if (!window.confirm('Are you sure you want to approve this partner submission?')) {
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/partners/approve', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ submissionId: id }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Failed to approve submission')
      }

      alert('Partner approved and added to the partners list!')
      // Reload page to reflect changes
      window.location.reload()
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to approve submission'
      setError(message)
      alert(`Error: ${message}`)
    } finally {
      setIsLoading(false)
    }
  }, [id])

  return (
    <div>
      <button
        onClick={handleApprove}
        disabled={isLoading}
        style={{
          padding: '0.5rem 1rem',
          backgroundColor: '#10b981',
          color: 'white',
          border: 'none',
          borderRadius: '0.25rem',
          cursor: isLoading ? 'not-allowed' : 'pointer',
          fontSize: '0.875rem',
          fontWeight: 500,
          opacity: isLoading ? 0.6 : 1,
        }}
      >
        {isLoading ? 'Approving...' : 'Approve Partner'}
      </button>
      {error && (
        <div style={{ color: '#dc2626', marginTop: '0.5rem', fontSize: '0.875rem' }}>
          {error}
        </div>
      )}
    </div>
  )
}
