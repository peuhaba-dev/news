'use client'

import { useEffect } from 'react'

/**
 * Global error boundary — catches errors in the root layout itself.
 * Must render its own <html> and <body> tags.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('[GlobalError]', error)
  }, [error])

  return (
    <html lang="id">
      <body
        style={{
          margin: 0,
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          backgroundColor: '#f9fafb',
          textAlign: 'center',
          padding: '1.25rem',
        }}
      >
        <div>
          <div style={{ fontSize: '64px', marginBottom: '16px' }}>🚨</div>
          <h1 style={{ fontSize: '24px', fontWeight: 700, color: '#111', marginBottom: '8px' }}>
            Kesalahan Sistem
          </h1>
          <p style={{ fontSize: '14px', color: '#6b7280', maxWidth: '400px', margin: '0 auto 24px', lineHeight: 1.6 }}>
            Terjadi kesalahan kritis pada aplikasi. Tim kami telah diberitahu.
            Silakan muat ulang halaman.
          </p>
          {error.digest && (
            <p style={{ fontSize: '11px', color: '#9ca3af', fontFamily: 'monospace', marginBottom: '16px' }}>
              Digest: {error.digest}
            </p>
          )}
          <button
            onClick={reset}
            style={{
              backgroundColor: '#00703C',
              color: '#fff',
              border: 'none',
              padding: '10px 24px',
              borderRadius: '6px',
              fontSize: '14px',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Muat Ulang
          </button>
        </div>
      </body>
    </html>
  )
}
