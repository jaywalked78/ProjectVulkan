import { useEffect, useState } from 'react'
import { useGamificationStore } from '@/store/gamificationStore'
import { getStreakMultiplier } from '@/lib/gamification-data'
import { getTierTheme, getTierSpecialEffects } from '@/lib/theme-utils'

export function PointsDisplay() {
  const { totalPoints, sessionPoints, currentStreak, getCurrentTier } = useGamificationStore()
  const [pointsChange, setPointsChange] = useState<number | null>(null)
  const [previousPoints, setPreviousPoints] = useState(totalPoints)

  const currentTier = getCurrentTier()  // Use getCurrentTier() for testing mode support
  const tierTheme = getTierTheme(currentTier)
  const tierEffects = getTierSpecialEffects(currentTier)

  useEffect(() => {
    if (totalPoints !== previousPoints) {
      const change = totalPoints - previousPoints
      setPointsChange(change)
      setPreviousPoints(totalPoints)

      // Clear the change indicator after animation
      const timer = setTimeout(() => {
        setPointsChange(null)
      }, 2000)

      return () => clearTimeout(timer)
    }
  }, [totalPoints, previousPoints])

  const multiplier = getStreakMultiplier(currentStreak)

  return (
    <div className="flex justify-center mb-4">
      <div className={`${tierTheme.card} rounded-2xl shadow-xl ${tierTheme.shadow} p-4 min-w-[200px] border-2 ${tierTheme.border} ${tierEffects.cardHover}`}>
        <div className="flex items-center justify-between">
          <span className={`text-sm font-medium ${tierTheme.accent}`}>Total Points</span>
          <div className="flex items-center gap-2">
            <span className={`text-2xl font-bold bg-gradient-to-r ${tierTheme.gradient} bg-clip-text text-transparent`}>
              {totalPoints.toLocaleString()}
            </span>
            {pointsChange !== null && (
              <span 
                className={`text-sm font-bold animate-slide-up ${
                  pointsChange > 0 ? 'text-green-500' : 'text-red-500'
                }`}
              >
                {pointsChange > 0 ? '+' : ''}{pointsChange}
              </span>
            )}
          </div>
        </div>
        
        {currentStreak > 2 && (
          <div className="mt-2 flex items-center gap-2">
            <div className="text-orange-500 animate-pulse">🔥</div>
            <span className={`text-sm font-medium ${tierTheme.text}`}>
              {currentStreak} streak! ({multiplier}x)
            </span>
          </div>
        )}
        
        {sessionPoints > 0 && (
          <div className={`mt-2 pt-2 border-t ${tierTheme.border}`}>
            <div className="flex items-center justify-between">
              <span className={`text-xs ${tierTheme.accent} opacity-75`}>Session</span>
              <span className="text-sm font-semibold text-green-600">
                +{sessionPoints}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}