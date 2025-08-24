import { ButtonHTMLAttributes, forwardRef } from 'react'

const getButtonClasses = (variant: 'primary' | 'secondary' | 'outline' = 'primary', size: 'sm' | 'md' | 'lg' = 'md') => {
  const base = 'inline-flex items-center justify-center rounded-lg font-semibold transition-all duration-[120ms] ease-out focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]'
  
  const variants = {
    primary: 'bg-brand-600 hover:bg-brand-700 text-white shadow-card focus:ring-brand-500/50 focus:ring-offset-slate-900 animate-focus-ring',
    secondary: 'border border-slate-600/60 hover:border-slate-400/60 bg-transparent text-slate-300 hover:text-white focus:ring-slate-500/50 focus:ring-offset-slate-900 animate-focus-ring',
    outline: 'border-2 border-brand-600 text-brand-600 hover:bg-brand-50 dark:hover:bg-brand-900/20 focus:ring-brand-500/50 focus:ring-offset-slate-900 animate-focus-ring',
  }
  
  const sizes = {
    sm: 'h-9 px-4 text-sm',
    md: 'h-11 px-6 text-base',
    lg: 'h-12 px-8 text-lg',
  }
  
  return `${base} ${variants[variant]} ${sizes[size]}`
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  asChild?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'primary', size = 'md', asChild, children, ...props }, ref) => {
    const classes = `${getButtonClasses(variant, size)} ${className}`
    
    if (asChild) {
      // Return the child element with button classes
      return children as React.ReactElement
    }
    
    return (
      <button
        className={classes}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    )
  }
)
Button.displayName = 'Button'

export { Button }
