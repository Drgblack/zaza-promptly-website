"use client"

import { useState, useTransition } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useLocale } from 'next-intl'
import { 
  Select,
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Globe, Check, ChevronDown } from 'lucide-react'
import { locales, localeNames, localeFlags, type Locale } from '@/i18n'

interface LanguageSwitcherProps {
  variant?: 'dropdown' | 'select' | 'buttons'
  size?: 'sm' | 'default' | 'lg'
  showFlag?: boolean
  showText?: boolean
  className?: string
}

export function LanguageSwitcher({ 
  variant = 'dropdown',
  size = 'default',
  showFlag = true,
  showText = true,
  className = ''
}: LanguageSwitcherProps) {
  const router = useRouter()
  const pathname = usePathname()
  const currentLocale = useLocale() as Locale
  const [isPending, startTransition] = useTransition()

  const handleLocaleChange = (newLocale: Locale) => {
    if (newLocale === currentLocale) return

    startTransition(() => {
      // Remove current locale from pathname if it exists
      const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}/, '') || '/'
      
      // Add new locale prefix unless it's the default locale (en)
      const newPath = newLocale === 'en' 
        ? pathWithoutLocale 
        : `/${newLocale}${pathWithoutLocale}`
      
      router.push(newPath)
    })
  }

  const sizeClasses = {
    sm: 'h-8 text-sm px-2',
    default: 'h-10 text-sm px-3',
    lg: 'h-12 text-base px-4'
  }

  if (variant === 'dropdown') {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="outline" 
            size={size}
            className={`${sizeClasses[size]} ${className} ${isPending ? 'opacity-50' : ''}`}
            disabled={isPending}
          >
            {showFlag && (
              <span className="mr-2 text-base">
                {localeFlags[currentLocale]}
              </span>
            )}
            {showText && (
              <span className="hidden sm:inline">
                {localeNames[currentLocale]}
              </span>
            )}
            <Globe className={`w-4 h-4 ${showText ? 'ml-2 sm:hidden' : ''}`} />
            <ChevronDown className="w-3 h-3 ml-1 opacity-50" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="min-w-[150px]">
          {locales.map((locale) => (
            <DropdownMenuItem
              key={locale}
              onClick={() => handleLocaleChange(locale)}
              className="flex items-center justify-between cursor-pointer"
            >
              <div className="flex items-center">
                <span className="mr-3 text-base">
                  {localeFlags[locale]}
                </span>
                <span>{localeNames[locale]}</span>
              </div>
              {locale === currentLocale && (
                <Check className="w-4 h-4 text-green-600" />
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  if (variant === 'select') {
    return (
      <Select
        value={currentLocale}
        onValueChange={(value) => handleLocaleChange(value as Locale)}
        disabled={isPending}
      >
        <SelectTrigger className={`${sizeClasses[size]} ${className} w-auto min-w-[120px]`}>
          <div className="flex items-center">
            {showFlag && (
              <span className="mr-2 text-base">
                {localeFlags[currentLocale]}
              </span>
            )}
            <SelectValue />
          </div>
        </SelectTrigger>
        <SelectContent>
          {locales.map((locale) => (
            <SelectItem key={locale} value={locale}>
              <div className="flex items-center">
                <span className="mr-3 text-base">
                  {localeFlags[locale]}
                </span>
                <span>{localeNames[locale]}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    )
  }

  if (variant === 'buttons') {
    return (
      <div className={`flex items-center space-x-1 ${className}`}>
        {locales.map((locale) => (
          <Button
            key={locale}
            variant={locale === currentLocale ? 'default' : 'ghost'}
            size={size}
            onClick={() => handleLocaleChange(locale)}
            disabled={isPending}
            className={`${sizeClasses[size]} ${
              locale === currentLocale 
                ? 'bg-primary text-primary-foreground' 
                : 'hover:bg-muted'
            }`}
          >
            {showFlag && (
              <span className={`text-base ${showText ? 'mr-1' : ''}`}>
                {localeFlags[locale]}
              </span>
            )}
            {showText && (
              <span className="hidden sm:inline">
                {locale.toUpperCase()}
              </span>
            )}
          </Button>
        ))}
      </div>
    )
  }

  return null
}

// Compact version for mobile menus
export function MobileLanguageSwitcher({ className = '' }: { className?: string }) {
  return (
    <LanguageSwitcher
      variant="dropdown"
      size="sm"
      showText={false}
      className={`${className}`}
    />
  )
}

// Full version for desktop headers
export function DesktopLanguageSwitcher({ className = '' }: { className?: string }) {
  return (
    <LanguageSwitcher
      variant="dropdown"
      size="default"
      showFlag={true}
      showText={true}
      className={`${className}`}
    />
  )
}

// Button grid for settings pages
export function LanguageButtonGrid({ className = '' }: { className?: string }) {
  return (
    <div className={`${className}`}>
      <h3 className="text-sm font-medium text-gray-700 mb-3">Language / Sprache / Langue</h3>
      <LanguageSwitcher
        variant="buttons"
        size="default"
        showFlag={true}
        showText={true}
        className="flex-wrap"
      />
    </div>
  )
}