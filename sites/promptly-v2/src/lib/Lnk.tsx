'use client'
import Link, { LinkProps } from 'next/link'
import { useParams } from 'next/navigation'
import React from 'react'

export default function Lnk({ href, ...props }: LinkProps & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const { locale } = useParams() as { locale: string }
  
  // Handle both string and object href types
  let path: string = '/'
  if (typeof href === 'string') {
    path = href
  } else if (href && typeof href === 'object' && 'pathname' in href) {
    path = (href as { pathname: string }).pathname || '/'
  }
  
  const prefixed = path.startsWith('/') ? `/${locale}${path}` : path
  return <Link href={prefixed} {...props} />
}