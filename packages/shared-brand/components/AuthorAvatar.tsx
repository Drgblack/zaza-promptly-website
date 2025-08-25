'use client';

import React from 'react';
import Image from 'next/image';
import { AuthorAvatarProps, isFounder, getFounderInfo } from '../types/author';

const sizeMap = {
  sm: 32,
  md: 48,
  lg: 64
};

const getSizeInPx = (size: number | 'sm' | 'md' | 'lg'): number => {
  return typeof size === 'number' ? size : sizeMap[size];
};

/**
 * AuthorAvatar component that automatically displays the founder photo
 * for Dr. Greg Blackburn, or fallback initials for other authors.
 */
export function AuthorAvatar({
  name,
  role,
  size = 'md',
  className = '',
  priority = false,
  showName = false,
  showRole = false,
  locale = 'en'
}: AuthorAvatarProps) {
  // Support for localized alt text
  const getAltText = (name: string, locale?: string) => {
    if (isFounder(name)) {
      return locale === 'de' 
        ? 'Dr Greg Blackburn, Gründer von Zaza Technologies'
        : 'Dr Greg Blackburn, Founder of Zaza Technologies';
    }
    return `Avatar for ${name}`;
  };
  const sizeInPx = getSizeInPx(size);
  const isFounderName = isFounder(name);
  
  // Get standard founder info if this is the founder
  const founderInfo = isFounderName ? getFounderInfo() : null;
  const displayName = founderInfo?.name || name;
  const displayRole = founderInfo?.role || role;

  // Generate initials for non-founder avatars
  const getInitials = (name: string): string => {
    return name
      .split(' ')
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const avatarClasses = `rounded-full object-cover ${className}`;

  return (
    <div className={`flex items-center ${showName || showRole ? 'space-x-3' : ''}`}>
      <div className="flex-shrink-0">
        {isFounderName ? (
          <Image
            src="/images/founder.jpg"
            alt={getAltText(displayName, locale)}
            width={sizeInPx}
            height={sizeInPx}
            className={avatarClasses}
            priority={priority}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            sizes={`${sizeInPx}px`}
          />
        ) : (
          <div
            className={`${avatarClasses} bg-gradient-to-br from-purple-100 to-indigo-100 dark:from-purple-900 dark:to-indigo-900 flex items-center justify-center text-purple-600 dark:text-purple-400 font-semibold`}
            style={{ width: sizeInPx, height: sizeInPx }}
            title={displayName}
            aria-label={`Avatar for ${displayName}`}
          >
            <span style={{ fontSize: sizeInPx * 0.4 }}>
              {getInitials(displayName)}
            </span>
          </div>
        )}
      </div>
      
      {(showName || showRole) && (
        <div className="min-w-0 flex-1">
          {showName && (
            <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
              {displayName}
            </p>
          )}
          {showRole && displayRole && (
            <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
              {displayRole}
            </p>
          )}
        </div>
      )}
    </div>
  );
}