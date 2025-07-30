import { create } from 'zustand'
import { devtools, subscribeWithSelector } from 'zustand/middleware'
import type { 
  GamificationState, 
  GamificationActions, 
  PointEvent,
  Achievement 
} from '@/types/gamification'
import { 
  ACHIEVEMENTS, 
  TIERS, 
  THEMES, 
  POINTS,
  getStreakMultiplier,
  getTierByPoints,
  SPEED_THRESHOLD_MS
} from '@/lib/gamification-data'

interface GamificationStore extends GamificationState, GamificationActions {}

const STORAGE_KEY = 'vulcan-gamification-progress'

const initialState: GamificationState = {
  // Points
  totalPoints: 0,
  sessionPoints: 0,
  pointsHistory: [],
  
  // Streaks
  currentStreak: 0,
  bestStreak: 0,
  dailyStreak: 0,
  lastStudyDate: null,
  
  // Achievements
  unlockedAchievements: [],
  achievementProgress: {},
  recentAchievements: [],
  
  // Tier
  currentTier: TIERS[0],
  nextTierProgress: 0,
  
  // Testing Mode
  isTestingMode: false,
  testingTier: null,
  
  // Stats
  totalQuestionsAnswered: 0,
  totalCorrectAnswers: 0,
  sessionQuestionsAnswered: 0,
  averageResponseTime: 0,
  fastestResponseTime: Number.MAX_SAFE_INTEGER,
  responseStartTime: null,
  
  // UI State
  showAchievementToast: false,
  currentAchievementToast: null,
  activeTheme: THEMES.bronze,
  unlockedThemes: ['bronze']
}

export const useGamificationStore = create<GamificationStore>()(
  subscribeWithSelector(
    devtools(
      (set, get) => ({
        ...initialState,

        // Points Actions
        addPoints: (points, reason, details) => {
          const state = get()
          const event: PointEvent = {
            timestamp: Date.now(),
            points,
            reason,
            details
          }

          set({
            totalPoints: Math.max(0, state.totalPoints + points),
            sessionPoints: state.sessionPoints + (points > 0 ? points : 0),
            pointsHistory: [...state.pointsHistory, event]
          })

          // Check for tier progress
          get().checkTierProgress()
        },

        calculateStreakMultiplier: () => {
          return getStreakMultiplier(get().currentStreak)
        },

        // Achievement Actions
        checkAchievements: () => {
          const state = get()
          const newlyUnlocked: Achievement[] = []

          ACHIEVEMENTS.forEach(achievement => {
            // Skip if already unlocked
            if (state.unlockedAchievements.some(a => a.id === achievement.id)) {
              return
            }

            let shouldUnlock = false

            switch (achievement.category) {
              case 'points':
                shouldUnlock = state.totalPoints >= achievement.requirement
                break

              case 'streak':
                shouldUnlock = state.currentStreak >= achievement.requirement
                break

              case 'session':
                if (achievement.id === 'perfect-10') {
                  const last10 = state.pointsHistory.slice(-10)
                  shouldUnlock = last10.length >= 10 && 
                    last10.every(e => e.reason === 'correct' || e.reason === 'streak')
                } else if (achievement.id === 'marathon') {
                  shouldUnlock = state.sessionQuestionsAnswered >= achievement.requirement
                } else if (achievement.id === 'speed-demon') {
                  const recentSpeedy = state.pointsHistory
                    .filter(e => e.details?.includes('speed'))
                    .length
                  shouldUnlock = recentSpeedy >= achievement.requirement
                }
                break

              case 'special':
                if (achievement.id === 'night-owl') {
                  const hour = new Date().getHours()
                  shouldUnlock = hour >= 0 && hour < 6
                } else if (achievement.id === 'early-bird') {
                  const hour = new Date().getHours()
                  shouldUnlock = hour >= 4 && hour < 6
                } else if (achievement.id === 'dedicated') {
                  shouldUnlock = state.dailyStreak >= achievement.requirement
                }
                break
            }

            if (shouldUnlock) {
              newlyUnlocked.push({
                ...achievement,
                unlockedAt: Date.now()
              })
            }
          })

          if (newlyUnlocked.length > 0) {
            const firstAchievement = newlyUnlocked[0]
            set({
              unlockedAchievements: [...state.unlockedAchievements, ...newlyUnlocked],
              recentAchievements: [...newlyUnlocked, ...state.recentAchievements].slice(0, 5),
              showAchievementToast: true,
              currentAchievementToast: firstAchievement
            })

            // Add bonus points for achievement
            get().addPoints(25, 'achievement', `Unlocked: ${firstAchievement.name}`)
          }
        },

        unlockAchievement: (achievementId) => {
          const achievement = ACHIEVEMENTS.find(a => a.id === achievementId)
          if (!achievement) return

          const state = get()
          if (state.unlockedAchievements.some(a => a.id === achievementId)) return

          const unlockedAchievement = {
            ...achievement,
            unlockedAt: Date.now()
          }

          set({
            unlockedAchievements: [...state.unlockedAchievements, unlockedAchievement],
            showAchievementToast: true,
            currentAchievementToast: unlockedAchievement
          })
        },

        dismissAchievementToast: () => {
          set({
            showAchievementToast: false,
            currentAchievementToast: null
          })
        },

        // Tier Actions
        checkTierProgress: () => {
          const state = get()
          
          // Skip tier progression when in testing mode
          if (state.isTestingMode) {
            return
          }
          
          const newTier = getTierByPoints(state.totalPoints)
          
          if (newTier.id !== state.currentTier.id) {
            // Unlock new theme
            if (newTier.theme && !state.unlockedThemes.includes(newTier.theme)) {
              get().unlockTheme(newTier.theme)
            }

            set({
              currentTier: newTier
            })
          }

          // Calculate progress to next tier
          const currentTierIndex = TIERS.findIndex(t => t.id === newTier.id)
          if (currentTierIndex < TIERS.length - 1) {
            const nextTier = TIERS[currentTierIndex + 1]
            const progress = ((state.totalPoints - newTier.minPoints) / 
              (nextTier.minPoints - newTier.minPoints)) * 100
            set({ nextTierProgress: Math.min(100, Math.max(0, progress)) })
          } else {
            set({ nextTierProgress: 100 })
          }
        },

        unlockTheme: (themeId) => {
          const state = get()
          if (!state.unlockedThemes.includes(themeId)) {
            set({
              unlockedThemes: [...state.unlockedThemes, themeId]
            })
          }
        },

        setActiveTheme: (themeId) => {
          const theme = THEMES[themeId]
          if (theme && get().unlockedThemes.includes(themeId)) {
            set({ activeTheme: theme })
          }
        },

        // Testing Mode Actions
        setTestingTier: (tier) => {
          set({ 
            isTestingMode: tier !== null,
            testingTier: tier,
            currentTier: tier || getTierByPoints(get().totalPoints)
          })
        },

        clearTestingMode: () => {
          const state = get()
          const actualTier = getTierByPoints(state.totalPoints)
          set({ 
            isTestingMode: false,
            testingTier: null,
            currentTier: actualTier
          })
        },

        getCurrentTier: () => {
          const state = get()
          return state.isTestingMode && state.testingTier 
            ? state.testingTier 
            : getTierByPoints(state.totalPoints)
        },

        // Stats Actions
        startResponseTimer: () => {
          set({ responseStartTime: Date.now() })
        },

        updateStats: (isCorrect) => {
          const state = get()
          const responseTime = state.responseStartTime 
            ? Date.now() - state.responseStartTime 
            : 0

          const newTotalQuestions = state.totalQuestionsAnswered + 1
          const newSessionQuestions = state.sessionQuestionsAnswered + 1
          const newCorrectAnswers = isCorrect 
            ? state.totalCorrectAnswers + 1 
            : state.totalCorrectAnswers

          const newAverageTime = state.averageResponseTime === 0
            ? responseTime
            : (state.averageResponseTime * state.totalQuestionsAnswered + responseTime) / newTotalQuestions

          set({
            totalQuestionsAnswered: newTotalQuestions,
            sessionQuestionsAnswered: newSessionQuestions,
            totalCorrectAnswers: newCorrectAnswers,
            averageResponseTime: newAverageTime,
            fastestResponseTime: isCorrect && responseTime < state.fastestResponseTime 
              ? responseTime 
              : state.fastestResponseTime,
            responseStartTime: null
          })

          // Check for speed bonus
          if (isCorrect && responseTime < SPEED_THRESHOLD_MS) {
            get().addPoints(POINTS.SPEED_BONUS, 'bonus', 'speed')
          }
        },

        updateDailyStreak: () => {
          const state = get()
          const today = new Date().toDateString()
          
          if (state.lastStudyDate !== today) {
            const yesterday = new Date()
            yesterday.setDate(yesterday.getDate() - 1)
            const yesterdayStr = yesterday.toDateString()

            const newStreak = state.lastStudyDate === yesterdayStr 
              ? state.dailyStreak + 1 
              : 1

            set({
              dailyStreak: newStreak,
              lastStudyDate: today
            })

            // Daily streak bonus
            if (newStreak > 1) {
              get().addPoints(
                POINTS.DAILY_STREAK_MULTIPLIER * newStreak, 
                'bonus', 
                `${newStreak} day streak!`
              )
            }
          }
        },

        resetSessionStats: () => {
          set({
            sessionQuestionsAnswered: 0,
            sessionPoints: 0,
            currentStreak: 0
          })
        },

        // Persistence Actions
        saveGamificationProgress: () => {
          try {
            const state = get()
            const dataToSave = {
              totalPoints: state.totalPoints,
              bestStreak: state.bestStreak,
              dailyStreak: state.dailyStreak,
              lastStudyDate: state.lastStudyDate,
              unlockedAchievements: state.unlockedAchievements,
              unlockedThemes: state.unlockedThemes,
              activeTheme: state.activeTheme?.id || 'bronze',
              totalQuestionsAnswered: state.totalQuestionsAnswered,
              totalCorrectAnswers: state.totalCorrectAnswers,
              averageResponseTime: state.averageResponseTime,
              fastestResponseTime: state.fastestResponseTime
            }
            
            localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave))
          } catch (error) {
            console.error('Failed to save gamification progress:', error)
          }
        },

        loadGamificationProgress: () => {
          const saved = localStorage.getItem(STORAGE_KEY)
          if (!saved) return

          try {
            const data = JSON.parse(saved)
            const currentTier = getTierByPoints(data.totalPoints || 0)
            
            const activeThemeId = data.activeTheme || 'bronze'
            const activeTheme = THEMES[activeThemeId] || THEMES.bronze
            
            set({
              totalPoints: data.totalPoints || 0,
              bestStreak: data.bestStreak || 0,
              dailyStreak: data.dailyStreak || 0,
              lastStudyDate: data.lastStudyDate || null,
              unlockedAchievements: data.unlockedAchievements || [],
              unlockedThemes: data.unlockedThemes || ['bronze'],
              activeTheme,
              currentTier,
              totalQuestionsAnswered: data.totalQuestionsAnswered || 0,
              totalCorrectAnswers: data.totalCorrectAnswers || 0,
              averageResponseTime: data.averageResponseTime || 0,
              fastestResponseTime: data.fastestResponseTime || Number.MAX_SAFE_INTEGER
            })

            get().checkTierProgress()
          } catch (error) {
            console.error('Failed to load gamification progress:', error)
            get().resetGamificationData()
          }
        },

        resetGamificationData: () => {
          localStorage.removeItem(STORAGE_KEY)
          set({
            ...initialState
          })
        }
      }),
      {
        name: 'gamification-store'
      }
    )
  )
)

// Auto-save on important state changes (with debouncing)
let saveTimeout: NodeJS.Timeout | null = null
useGamificationStore.subscribe(
  (state) => ({
    totalPoints: state.totalPoints,
    unlockedAchievements: state.unlockedAchievements,
    bestStreak: state.bestStreak,
    activeTheme: state.activeTheme?.id
  }),
  () => {
    // Debounce saves to prevent rapid-fire saves during initialization
    if (saveTimeout) clearTimeout(saveTimeout)
    saveTimeout = setTimeout(() => {
      const state = useGamificationStore.getState()
      if (state.activeTheme) { // Only save if we have a valid theme
        state.saveGamificationProgress()
      }
    }, 100)
  }
)