import { type HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'
import { useGamificationStore } from '@/store/gamificationStore'
import { getTierTheme } from '@/lib/theme-utils'

interface ProgressProps extends HTMLAttributes<HTMLDivElement> {
  value: number
  max?: number
}

export function Progress({ className, value, max = 100, ...props }: ProgressProps) {
  const { getCurrentTier } = useGamificationStore()
  const currentTier = getCurrentTier()
  const tierTheme = getTierTheme(currentTier)
  
  const percentage = Math.min(Math.max(0, (value / max) * 100), 100)

  return (
    <div
      className={cn('relative h-4 w-full overflow-hidden rounded-full bg-gray-200/20', className)}
      {...props}
    >
      <div
        className={`h-full ${tierTheme.primary} transition-all duration-300 ease-in-out`}
        style={{ width: `${percentage}%` }}
      />
    </div>
  )
}