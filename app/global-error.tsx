'use client'

import { useEffect } from 'react'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the critical error
    console.error('Global application error:', error)
    
    // Track critical error in analytics if available
    if (typeof window !== 'undefined' && (window as any).zazeAnalytics) {
      (window as any).zazeAnalytics.trackError('global_error', error.message)
    }
  }, [error])

  return (
    <html>
      <body>
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
          fontFamily: 'system-ui, sans-serif',
          background: 'linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)'
        }}>
          <div style={{
            textAlign: 'center',
            maxWidth: '500px',
            padding: '40px',
            backgroundColor: 'white',
            borderRadius: '16px',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
          }}>
            {/* Error Icon */}
            <div style={{
              width: '80px',
              height: '80px',
              margin: '0 auto 24px',
              backgroundColor: '#ef4444',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '36px'
            }}>
              ⚠️
            </div>

            <h1 style={{
              fontSize: '48px',
              fontWeight: 'bold',
              color: '#dc2626',
              margin: '0 0 16px'
            }}>
              Critical Error
            </h1>
            
            <h2 style={{
              fontSize: '24px',
              fontWeight: '600',
              color: '#374151',
              margin: '0 0 16px'
            }}>
              Application Failure
            </h2>
            
            <p style={{
              color: '#6b7280',
              lineHeight: '1.6',
              margin: '0 0 32px'
            }}>
              We're experiencing a critical system error. Our team has been automatically notified 
              and is working to resolve this issue as quickly as possible.
            </p>

            {/* Action Buttons */}
            <div style={{ marginBottom: '32px' }}>
              <button
                onClick={reset}
                style={{
                  backgroundColor: '#dc2626',
                  color: 'white',
                  border: 'none',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  marginRight: '12px',
                  marginBottom: '12px'
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#b91c1c'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#dc2626'}
              >
                🔄 Try Again
              </button>
              
              <button
                onClick={() => window.location.href = '/'}
                style={{
                  backgroundColor: 'transparent',
                  color: '#dc2626',
                  border: '2px solid #dc2626',
                  padding: '10px 24px',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  marginBottom: '12px'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = '#dc2626'
                  e.currentTarget.style.color = 'white'
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent'
                  e.currentTarget.style.color = '#dc2626'
                }}
              >
                🏠 Go Home
              </button>
            </div>

            {/* Error ID */}
            {error.digest && (
              <div style={{
                padding: '16px',
                backgroundColor: '#f3f4f6',
                borderRadius: '8px',
                marginBottom: '24px'
              }}>
                <p style={{
                  fontSize: '14px',
                  color: '#6b7280',
                  margin: 0
                }}>
                  Error ID: <code>{error.digest}</code>
                </p>
              </div>
            )}

            {/* Contact Information */}
            <div style={{
              paddingTop: '24px',
              borderTop: '1px solid #e5e7eb'
            }}>
              <p style={{
                fontSize: '14px',
                color: '#9ca3af',
                margin: 0
              }}>
                If this problem persists, please contact{' '}
                <button
                  onClick={() => window.location.href = '/contact'}
                  style={{ 
                    color: '#dc2626', 
                    textDecoration: 'underline',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 0,
                    font: 'inherit'
                  }}
                >
                  our support team
                </button>
              </p>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}