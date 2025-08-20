'use client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Star, Zap, Trophy, Crown, Sparkles, Heart } from 'lucide-react';
import { useState, useEffect } from 'react';

interface AnimatedButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'default' | 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  disabled?: boolean;
  badge?: {
    text: string;
    type: 'success' | 'warning' | 'info' | 'achievement';
  };
  gamification?: {
    showSparkle?: boolean;
    bounceOnHover?: boolean;
    pulseOnLoad?: boolean;
    showProgress?: boolean;
    achievementLevel?: 1 | 2 | 3 | 4 | 5;
  };
  accessibilityProps?: {
    'aria-label'?: string;
    'aria-describedby'?: string;
    role?: string;
  };
}

const ACHIEVEMENT_ICONS = {
  1: Star,
  2: Zap,
  3: Trophy,
  4: Crown,
  5: Sparkles
};

const ACHIEVEMENT_COLORS = {
  1: 'from-blue-500 to-cyan-500',
  2: 'from-green-500 to-teal-500',
  3: 'from-yellow-500 to-orange-500',
  4: 'from-purple-500 to-pink-500',
  5: 'from-pink-500 to-red-500'
};

export function AnimatedButton({
  children,
  onClick,
  variant = 'default',
  size = 'md',
  className,
  disabled = false,
  badge,
  gamification,
  accessibilityProps,
  ...props
}: AnimatedButtonProps) {
  const [isClicked, setIsClicked] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (gamification?.pulseOnLoad) {
      setTimeout(() => setShowSparkle(true), 500);
      setTimeout(() => setShowSparkle(false), 2000);
    }
  }, [gamification?.pulseOnLoad]);

  const handleClick = () => {
    if (disabled) return;
    
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 200);

    if (gamification?.showSparkle) {
      setShowSparkle(true);
      setTimeout(() => setShowSparkle(false), 1000);
    }

    onClick?.();
  };

  const getVariantClasses = () => {
    switch (variant) {
      case 'primary':
        return 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 shadow-lg';
      case 'secondary':
        return 'bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white border-0';
      default:
        return '';
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'px-3 py-1.5 text-sm';
      case 'lg':
        return 'px-8 py-3 text-lg';
      default:
        return 'px-6 py-2.5';
    }
  };

  const AchievementIcon = gamification?.achievementLevel ? ACHIEVEMENT_ICONS[gamification.achievementLevel] : null;
  const achievementGradient = gamification?.achievementLevel ? ACHIEVEMENT_COLORS[gamification.achievementLevel] : '';

  return (
    <div className="relative inline-block">
      {/* Sparkle Animation */}
      {showSparkle && mounted && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 animate-ping">
            <Sparkles className="w-4 h-4 text-yellow-400" />
          </div>
          <div className="absolute top-0 right-0 animate-ping delay-150">
            <Star className="w-3 h-3 text-pink-400" />
          </div>
          <div className="absolute bottom-0 left-1/2 animate-ping delay-300">
            <Heart className="w-3 h-3 text-red-400" />
          </div>
        </div>
      )}

      <Button
        onClick={handleClick}
        disabled={disabled}
        className={cn(
          'relative overflow-hidden transition-all duration-200',
          'focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50',
          // Gamification effects
          gamification?.bounceOnHover && 'hover:scale-105 active:scale-95',
          gamification?.pulseOnLoad && 'animate-pulse',
          // Click animation
          isClicked && 'transform scale-95',
          // Custom variant styling
          getVariantClasses(),
          getSizeClasses(),
          // Achievement styling
          gamification?.achievementLevel && `bg-gradient-to-r ${achievementGradient}`,
          className
        )}
        {...accessibilityProps}
        {...props}
      >
        {/* Achievement icon */}
        {AchievementIcon && (
          <AchievementIcon className="w-4 h-4 mr-2" />
        )}
        
        {children}

        {/* Hover effect overlay */}
        <div className="absolute inset-0 bg-white opacity-0 hover:opacity-10 transition-opacity duration-200" />

        {/* Progress indicator */}
        {gamification?.showProgress && (
          <div className="absolute bottom-0 left-0 h-1 bg-white bg-opacity-30 w-full">
            <div 
              className="h-full bg-white transition-all duration-500 ease-out"
              style={{ width: `${Math.random() * 100}%` }}
            />
          </div>
        )}
      </Button>

      {/* Badge overlay */}
      {badge && (
        <Badge 
          className={cn(
            'absolute -top-2 -right-2 text-xs px-2 py-1',
            badge.type === 'success' && 'bg-green-500 text-white',
            badge.type === 'warning' && 'bg-yellow-500 text-white',
            badge.type === 'info' && 'bg-blue-500 text-white',
            badge.type === 'achievement' && 'bg-purple-500 text-white animate-bounce'
          )}
        >
          {badge.text}
        </Badge>
      )}

      {/* Reduced motion support */}
      <style jsx>{`
        @media (prefers-reduced-motion: reduce) {
          .animate-ping,
          .animate-pulse,
          .animate-bounce {
            animation: none !important;
          }
          
          .hover\\:scale-105:hover {
            transform: none !important;
          }
        }
      `}</style>
    </div>
  );
}