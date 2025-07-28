import React from 'react'
import { Header, HeaderProps } from './Header'
import { Footer, FooterProps } from './Footer'

/**
 * Zaza Shared Layout Component
 * 
 * Combines Header and Footer components for consistent layout across all Zaza applications.
 * Provides a unified structure with customizable header and footer options.
 */

interface LayoutProps extends HeaderProps, FooterProps {
  children: React.ReactNode
  className?: string
}

export function Layout({ 
  children, 
  className,
  // Header props
  currentProduct,
  showSearch,
  showUserMenu,
  transparent,
  // Footer props
  showNewsletter,
  showSocial,
  ...props 
}: LayoutProps) {
  return (
    <div className={className}>
      <Header
        currentProduct={currentProduct}
        showSearch={showSearch}
        showUserMenu={showUserMenu}
        transparent={transparent}
      />
      <main>
        {children}
      </main>
      <Footer
        currentProduct={currentProduct}
        showNewsletter={showNewsletter}
        showSocial={showSocial}
      />
    </div>
  )
} 