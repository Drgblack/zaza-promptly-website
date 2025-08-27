'use client'
import Link, { LinkProps } from 'next/link'
import { useParams } from 'next/navigation'

export default function Lnk(props: LinkProps & { href: string; children: React.ReactNode; className?: string }) {
  const { locale } = useParams() as { locale?: string }
  const href = props.href.startsWith('/') ? `/${locale ?? 'en'}${props.href}` : props.href
  return <Link {...props} href={href} />
}