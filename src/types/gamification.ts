export interface PointEvent {
  timestamp: number
  points: number
  reason: 'correct' | 'incorrect' | 'streak' | 'bonus' | 'achievement'
  details?: string
}

export interface Achievement {
  id: string
  name: string
  description: string
  emoji: string
  category: 'points' | 'streak' | 'session' | 'special'
  requirement: number
  unlockedAt?: number
}

export interface Tier {
  id: string
  name: string
  minPoints: number
  maxPoints?: number
  theme: string
  perks: string[]
  gradient: string
  emoji: string
}

export interface Theme {
  id: string
  name: string
  primary: string
  background: string
  card: string
  text: string
}

export interface GamificationState {
  // Points
  totalPoints: number
  sessionPoints: number
  pointsHistory: PointEvent[]
  
  // Streaks
  currentStreak: number
  bestStreak: number
  dailyStreak: number
  lastStudyDate: string | null
  
  // Achievements
  unlockedAchievements: Achievement[]
  achievementProgress: Record<string, number>
  recentAchievements: Achievement[]
  
  // Tier
  currentTier: Tier
  nextTierProgress: number
  
  // Testing Mode
  isTestingMode: boolean
  testingTier: Tier | null
  
  // Stats
  totalQuestionsAnswered: number
  totalCorrectAnswers: number
  sessionQuestionsAnswered: number
  averageResponseTime: number
  fastestResponseTime: number
  responseStartTime: number | null
  
  // UI State
  showAchievementToast: boolean
  currentAchievementToast: Achievement | null
  activeTheme: Theme
  unlockedThemes: string[]
}

export interface GamificationActions {
  // Points
  addPoints: (points: number, reason: PointEvent['reason'], details?: string) => void
  calculateStreakMultiplier: () => number
  
  // Achievements
  checkAchievements: () => void
  unlockAchievement: (achievementId: string) => void
  dismissAchievementToast: () => void
  
  // Tier
  checkTierProgress: () => void
  unlockTheme: (themeId: string) => void
  setActiveTheme: (themeId: string) => void
  
  // Testing Mode
  setTestingTier: (tier: Tier | null) => void
  clearTestingMode: () => void
  getCurrentTier: () => Tier
  
  // Stats
  startResponseTimer: () => void
  updateStats: (isCorrect: boolean) => void
  updateDailyStreak: () => void
  resetSessionStats: () => void
  
  // Persistence
  saveGamificationProgress: () => void
  loadGamificationProgress: () => void
  resetGamificationData: () => void
}