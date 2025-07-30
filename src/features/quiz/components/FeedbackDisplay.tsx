import { useEffect, useState, lazy, Suspense } from 'react'
import { useGamificationStore } from '@/store/gamificationStore'
import { getStreakMultiplier, POINTS } from '@/lib/gamification-data'
import { getTierTheme } from '@/lib/theme-utils'

// Lazy load the Particles component (uses OGL - heavy dependency)
const Particles = lazy(() => import('@/components/Particles'))

interface FeedbackDisplayProps {
  isCorrect: boolean
  correctAnswer: string
  userAnswer?: string
}

export function FeedbackDisplay({ isCorrect, correctAnswer, userAnswer }: FeedbackDisplayProps) {
  const { currentStreak, getCurrentTier } = useGamificationStore()
  const [showParticles, setShowParticles] = useState(false)
  const [pointsEarned, setPointsEarned] = useState(0)
  const [particleParams, setParticleParams] = useState({
    count: 200,
    speed: 0.25,
    baseSize: 100,
    disableRotation: false
  })
  
  const currentTier = getCurrentTier()
  const tierTheme = getTierTheme(currentTier)

  useEffect(() => {
    if (isCorrect) {
      // Calculate points earned
      const multiplier = getStreakMultiplier(currentStreak)
      const points = Math.floor(POINTS.CORRECT_ANSWER * multiplier)
      setPointsEarned(points)

      // Randomize particle parameters for each correct answer
      const randomParams = {
        count: Math.floor(Math.random() * 301) + 200, // 200-500
        speed: Math.random() * 1.75 + 0.25, // 0.25-2.0
        baseSize: Math.floor(Math.random() * 201) + 100, // 100-300
        disableRotation: Math.random() < 0.5 // Random true/false
      }
      setParticleParams(randomParams)

      // Show particle effects
      setShowParticles(true)

      // Hide particles after animation duration (matches quiz auto-advance timing)
      setTimeout(() => setShowParticles(false), 2500)
    }
  }, [isCorrect, currentStreak])

  if (isCorrect) {
    return (
      <div className="space-y-4">
        <div className="relative">
          {/* Glassmorphic feedback card background - z-10 */}
          <div className={`relative z-10 ${tierTheme.card} border-2 border-green-500/50 rounded-xl p-6 shadow-lg animate-scale-in`}>
            {/* OGL Particle effect - matches card size exactly - z-20 */}
            {showParticles && (
              <div className="absolute inset-0 pointer-events-none z-20 rounded-xl overflow-hidden">
                <Suspense fallback={<div className="w-full h-full" />}>
                  <Particles
                    tier={currentTier}
                    particleCount={particleParams.count}
                    particleSpread={5}
                    speed={particleParams.speed}
                    alphaParticles={true}
                    particleBaseSize={particleParams.baseSize}
                    sizeRandomness={1.0}
                    cameraDistance={12}
                    disableRotation={particleParams.disableRotation}
                    className="opacity-70"
                  />
                </Suspense>
              </div>
            )}
            
            {/* Text content - highest z-index - z-30 */}
            <div className="relative z-30 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="text-3xl animate-spin-slow">✨</div>
                <div>
                  <h3 className="text-xl font-bold text-green-400">Correct!</h3>
                  <p className="text-sm text-green-300">+{pointsEarned} points</p>
                </div>
              </div>
              {currentStreak > 1 && (
                <div className={`${tierTheme.card} ${tierTheme.accent} px-3 py-1 rounded-full text-sm font-medium animate-pulse border ${tierTheme.border}`}>
                  🔥 {currentStreak} streak!
                </div>
              )}
            </div>
          </div>
        </div>
        
        <p className={`text-sm ${tierTheme.text} opacity-60 text-center`}>
          Moving to next question...
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4 animate-scale-in">
      <div className={`${tierTheme.card} border-2 border-red-500/50 rounded-xl p-6 shadow-lg`}>
        <div className="text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="text-3xl">❌</div>
            <h3 className="text-xl font-bold text-red-400">Incorrect</h3>
          </div>
          
          <div className="space-y-2">
            <p className="text-sm text-red-300">
              <strong>Correct answer:</strong> {correctAnswer}
            </p>
            {userAnswer && (
              <p className="text-sm text-red-300 opacity-75">
                <strong>Your answer:</strong> {userAnswer}
              </p>
            )}
          </div>
        </div>
      </div>
      
      <p className={`text-sm ${tierTheme.text} opacity-60 text-center`}>
        Moving to next question...
      </p>
    </div>
  )
}