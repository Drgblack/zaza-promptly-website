'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function LinkDiagnostic() {
  const router = useRouter()
  const [diagnostics, setDiagnostics] = useState({
    routerExists: false,
    canPush: false,
    linkClicked: false,
    jsLoaded: false
  })

  useEffect(() => {
    const results = {
      routerExists: !!router,
      canPush: typeof router?.push === 'function',
      linkClicked: false,
      jsLoaded: true
    }
    setDiagnostics(results)
    console.log('[Link Diagnostic]', results)
  }, [router])

  const handleTestClick = (e: React.MouseEvent) => {
    e.preventDefault()
    console.log('[Link Diagnostic] Test link clicked')
    setDiagnostics(prev => ({ ...prev, linkClicked: true }))
    
    try {
      router.push('/blog')
      console.log('[Link Diagnostic] router.push executed')
    } catch (error) {
      console.error('[Link Diagnostic] router.push failed:', error)
    }
  }

  const handleNativeClick = () => {
    console.log('[Link Diagnostic] Native navigation test')
    window.location.href = '/blog'
  }

  return (
    <div style={{
      position: 'fixed',
      bottom: '100px',
      right: '20px',
      background: '#1a1a1a',
      color: '#fff',
      padding: '15px',
      borderRadius: '8px',
      fontSize: '12px',
      zIndex: 9999,
      maxWidth: '250px',
      border: '1px solid #333'
    }}>
      <div style={{ fontWeight: 'bold', marginBottom: '10px' }}>Link Diagnostic</div>
      <div>Router exists: {diagnostics.routerExists ? '✅' : '❌'}</div>
      <div>Can push: {diagnostics.canPush ? '✅' : '❌'}</div>
      <div>JS loaded: {diagnostics.jsLoaded ? '✅' : '❌'}</div>
      <div>Test clicked: {diagnostics.linkClicked ? '✅' : '❌'}</div>
      
      <div style={{ marginTop: '10px' }}>
        <Link href="/blog" onClick={handleTestClick} style={{ 
          color: '#60a5fa', 
          textDecoration: 'underline',
          display: 'block',
          marginBottom: '5px'
        }}>
          Test Next Link
        </Link>
        <button 
          onClick={handleNativeClick}
          style={{ 
            background: '#374151', 
            color: '#fff', 
            border: 'none', 
            padding: '4px 8px',
            borderRadius: '4px',
            fontSize: '11px'
          }}
        >
          Native Nav Test
        </button>
      </div>
    </div>
  )
}