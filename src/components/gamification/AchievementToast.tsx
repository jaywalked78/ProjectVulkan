import { useEffect } from 'react'
import { X } from 'lucide-react'
import type { Achievement } from '@/types/gamification'

interface AchievementToastProps {
  achievement: Achievement
  onDismiss: () => void
}

export function AchievementToast({ achievement, onDismiss }: AchievementToastProps) {
  useEffect(() => {
    const timer = setTimeout(onDismiss, 5000)
    return () => clearTimeout(timer)
  }, [onDismiss])

  return (
    <div className="fixed top-20 right-4 z-50">
      <div className="relative animate-slide-in-right">
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 blur-xl opacity-50"></div>
        
        {/* Main container */}
        <div className="relative bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 p-1 rounded-2xl">
          <div className="bg-gray-900 rounded-xl p-6">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="absolute inset-0 bg-white rounded-full animate-ping"></div>
                <div className="relative text-5xl animate-bounce-slow">
                  {achievement.emoji}
                </div>
              </div>
              
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-1">
                  Achievement Unlocked!
                </h3>
                <p className="text-lg text-yellow-300 font-medium">
                  {achievement.name}
                </p>
                <p className="text-sm text-gray-300 mt-1">
                  {achievement.description}
                </p>
              </div>
              
              <button
                onClick={onDismiss}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {/* Progress bar */}
            <div className="mt-4 h-2 bg-gray-700 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 animate-fill-progress"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}