import { useState } from 'react'
import { useGamificationStore } from '@/store/gamificationStore'
import { ACHIEVEMENTS } from '@/lib/gamification-data'
import { getTierTheme } from '@/lib/theme-utils'

interface AchievementGalleryProps {
  isOpen: boolean
  onClose: () => void
}

export function AchievementGallery({ isOpen, onClose }: AchievementGalleryProps) {
  const { unlockedAchievements, getCurrentTier } = useGamificationStore()
  const [clickedAchievement, setClickedAchievement] = useState<string | null>(null)
  const currentTier = getCurrentTier()  // Use getCurrentTier() for testing mode support
  const tierTheme = getTierTheme(currentTier)

  if (!isOpen) return null

  const isUnlocked = (achievementId: string) => 
    unlockedAchievements.some(a => a.id === achievementId)

  const handleAchievementClick = (achievementId: string) => {
    setClickedAchievement(achievementId)
    setTimeout(() => setClickedAchievement(null), 300)
  }

  const getCategoryAchievements = (category: string) =>
    ACHIEVEMENTS.filter(a => a.category === category)

  const categories = [
    { id: 'points', name: 'Points Milestones', icon: '🏆' },
    { id: 'streak', name: 'Streak Masters', icon: '🔥' },
    { id: 'session', name: 'Session Heroes', icon: '⚡' },
    { id: 'special', name: 'Special Awards', icon: '🌟' }
  ]

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className={`${tierTheme.background} ${tierTheme.card} border-2 ${tierTheme.border} rounded-xl max-w-4xl w-full max-h-[90vh] shadow-2xl flex flex-col`}>
        {/* Header */}
        <div className={`${tierTheme.background} ${tierTheme.card} border-b p-6 flex justify-between items-center rounded-t-xl flex-shrink-0`}>
          <div>
            <h2 className={`text-2xl font-bold ${tierTheme.text}`}>Achievement Gallery</h2>
            <p className={`text-sm ${tierTheme.text} opacity-70`}>
              {unlockedAchievements.length} of {ACHIEVEMENTS.length} unlocked
            </p>
          </div>
          <button
            onClick={onClose}
            className={`text-2xl ${tierTheme.text} hover:opacity-70 transition-opacity`}
          >
            ✕
          </button>
        </div>

        {/* Achievement Categories - Scrollable */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          {categories.map(category => (
            <div key={category.id}>
              <h3 className={`text-lg font-semibold ${tierTheme.text} mb-4 flex items-center gap-2`}>
                <span className="text-xl">{category.icon}</span>
                {category.name}
              </h3>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {getCategoryAchievements(category.id).map(achievement => {
                  const unlocked = isUnlocked(achievement.id)
                  const isClicked = clickedAchievement === achievement.id
                  
                  return (
                    <div
                      key={achievement.id}
                      onClick={() => handleAchievementClick(achievement.id)}
                      className={`
                        relative p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 group
                        ${unlocked 
                          ? `${tierTheme.card} ${tierTheme.border} hover:${tierTheme.shadow} hover:scale-105` 
                          : 'bg-gray-100 border-gray-300 opacity-30'
                        }
                        ${isClicked ? 'scale-95' : ''}
                      `}
                    >
                      
                      {/* Achievement Content */}
                      <div className="relative z-10 text-center">
                        {/* Icon */}
                        <div className={`
                          relative mb-2 text-3xl transition-transform duration-300
                          ${unlocked ? 'group-hover:scale-110' : ''}
                          ${isClicked ? 'scale-95' : ''}
                        `}>
                          {unlocked ? achievement.emoji : '🔒'}
                        </div>
                        
                        {/* Achievement Info */}
                        {unlocked ? (
                          <div>
                            <h4 className={`font-semibold ${tierTheme.text} text-sm mb-1`}>
                              {achievement.name}
                            </h4>
                            <p className={`text-xs ${tierTheme.text} opacity-70`}>
                              {achievement.description}
                            </p>
                          </div>
                        ) : (
                          <div>
                            <h4 className="font-semibold text-gray-500 text-sm mb-1">
                              Locked
                            </h4>
                            <p className="text-xs text-gray-400">
                              Keep playing to unlock!
                            </p>
                          </div>
                        )}
                      </div>
                      
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Footer Stats */}
        <div className={`${tierTheme.background} ${tierTheme.card} border-t p-4 rounded-b-xl flex-shrink-0`}>
          <div className="flex justify-center">
            <div className={`text-sm ${tierTheme.text} opacity-70 text-center`}>
              Progress: {Math.round((unlockedAchievements.length / ACHIEVEMENTS.length) * 100)}% Complete
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}