import { type ButtonHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'
import { useGamificationStore } from '@/store/gamificationStore'
import { getTierButtonClasses } from '@/lib/tier-classes'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'tier' | 'tier-outline'
  size?: 'sm' | 'md' | 'lg'
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    const { getCurrentTier } = useGamificationStore()
    const currentTier = getCurrentTier()
    
    const variants = {
      primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
      secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500',
      ghost: 'bg-transparent hover:bg-gray-100 focus:ring-gray-500',
      danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
      tier: getTierButtonClasses(currentTier, 'solid'),
      'tier-outline': getTierButtonClasses(currentTier, 'outline'),
    }

    const sizes = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg',
    }

    const baseClassName = cn(
      'inline-flex items-center justify-center rounded-md font-medium transition-colors',
      'focus:outline-none focus:ring-2 focus:ring-offset-2',
      'disabled:opacity-50 disabled:cursor-not-allowed',
      variants[variant],
      sizes[size],
      className
    )

    // Always render as button for now to fix TypeScript issues
    return (
      <button
        ref={ref}
        className={baseClassName}
        {...props}
      />
    )
  }
)