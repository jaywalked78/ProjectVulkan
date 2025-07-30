import { type InputHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'
import { useGamificationStore } from '@/store/gamificationStore'
import { getTierInputClasses } from '@/lib/tier-classes'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  variant?: 'default' | 'tier'
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    const { getCurrentTier } = useGamificationStore()
    const currentTier = getCurrentTier()
    
    const variants = {
      default: 'block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm',
      tier: getTierInputClasses(currentTier),
    }
    
    return (
      <input
        ref={ref}
        className={cn(
          'block w-full rounded-md shadow-sm sm:text-sm transition-colors',
          'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900',
          variants[variant],
          className
        )}
        {...props}
      />
    )
  }
)