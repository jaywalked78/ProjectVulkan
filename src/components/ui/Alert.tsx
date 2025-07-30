import { type HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'success' | 'error' | 'warning' | 'info'
}

export function Alert({ className, variant = 'info', children, ...props }: AlertProps) {
  const variants = {
    success: 'bg-green-50 text-green-800 border-green-200',
    error: 'bg-red-50 text-red-800 border-red-200',
    warning: 'bg-yellow-50 text-yellow-800 border-yellow-200',
    info: 'bg-blue-50 text-blue-800 border-blue-200',
  }

  return (
    <div
      className={cn(
        'rounded-md border p-4',
        variants[variant],
        className
      )}
      role="alert"
      {...props}
    >
      {children}
    </div>
  )
}