import type { Achievement, Tier, Theme } from '@/types/gamification'

export const ACHIEVEMENTS: Achievement[] = [
  // Points Milestones
  {
    id: 'first-steps',
    name: 'First Steps',
    description: 'Earn your first 50 points',
    emoji: '👟',
    category: 'points',
    requirement: 50
  },
  {
    id: 'rising-star',
    name: 'Rising Star',
    description: 'Earn 250 points',
    emoji: '⭐',
    category: 'points',
    requirement: 250
  },
  {
    id: 'knowledge-seeker',
    name: 'Knowledge Seeker',
    description: 'Earn 1,000 points',
    emoji: '📚',
    category: 'points',
    requirement: 1000
  },
  {
    id: 'scholar',
    name: 'Scholar',
    description: 'Earn 5,000 points',
    emoji: '🎓',
    category: 'points',
    requirement: 5000
  },
  {
    id: 'master',
    name: 'Master',
    description: 'Earn 10,000 points',
    emoji: '🏆',
    category: 'points',
    requirement: 10000
  },
  {
    id: 'grandmaster',
    name: 'Grandmaster',
    description: 'Earn 25,000 points',
    emoji: '👑',
    category: 'points',
    requirement: 25000
  },
  
  // Streak Achievements
  {
    id: 'hot-streak',
    name: 'Hot Streak',
    description: '5 correct answers in a row',
    emoji: '🔥',
    category: 'streak',
    requirement: 5
  },
  {
    id: 'on-fire',
    name: 'On Fire',
    description: '10 correct answers in a row',
    emoji: '🔥',
    category: 'streak',
    requirement: 10
  },
  {
    id: 'unstoppable',
    name: 'Unstoppable',
    description: '25 correct answers in a row',
    emoji: '⚡',
    category: 'streak',
    requirement: 25
  },
  {
    id: 'legendary',
    name: 'Legendary',
    description: '50 correct answers in a row',
    emoji: '🌟',
    category: 'streak',
    requirement: 50
  },
  
  // Session Achievements
  {
    id: 'perfect-10',
    name: 'Perfect 10',
    description: 'Complete 10 questions with 100% accuracy',
    emoji: '💯',
    category: 'session',
    requirement: 10
  },
  {
    id: 'marathon',
    name: 'Marathon',
    description: 'Answer 50 questions in one session',
    emoji: '🏃',
    category: 'session',
    requirement: 50
  },
  {
    id: 'speed-demon',
    name: 'Speed Demon',
    description: '10 correct answers under 5 seconds each',
    emoji: '⚡',
    category: 'session',
    requirement: 10
  },
  {
    id: 'comeback-kid',
    name: 'Comeback Kid',
    description: 'Recover from 3 wrong to 5 right in a row',
    emoji: '💪',
    category: 'session',
    requirement: 5
  },
  
  // Special Achievements
  {
    id: 'night-owl',
    name: 'Night Owl',
    description: 'Study after midnight',
    emoji: '🦉',
    category: 'special',
    requirement: 0
  },
  {
    id: 'early-bird',
    name: 'Early Bird',
    description: 'Study before 6 AM',
    emoji: '🐦',
    category: 'special',
    requirement: 6
  },
  {
    id: 'dedicated',
    name: 'Dedicated',
    description: 'Study 7 days in a row',
    emoji: '📅',
    category: 'special',
    requirement: 7
  },
  {
    id: 'completionist',
    name: 'Completionist',
    description: 'Finish entire deck perfectly',
    emoji: '✅',
    category: 'special',
    requirement: 100
  }
]

export const TIERS: Tier[] = [
  {
    id: 'bronze',
    name: 'Bronze Scholar',
    minPoints: 0,
    maxPoints: 500,
    theme: 'bronze',
    perks: ['Basic stats tracking', 'Simple animations'],
    gradient: 'from-amber-600 to-amber-800',
    emoji: '🥉'
  },
  {
    id: 'silver',
    name: 'Silver Apprentice',
    minPoints: 501,
    maxPoints: 2000,
    theme: 'silver',
    perks: ['Ocean Blue theme', 'Enhanced statistics', 'Streak indicators'],
    gradient: 'from-slate-400 to-slate-600',
    emoji: '🥈'
  },
  {
    id: 'gold',
    name: 'Gold Scholar',
    minPoints: 2001,
    maxPoints: 8000,
    theme: 'gold',
    perks: ['Golden theme', 'Session history', 'Particle effects', 'Achievement previews'],
    gradient: 'from-yellow-400 to-yellow-600',
    emoji: '🥇'
  },
  {
    id: 'platinum',
    name: 'Platinum Expert',
    minPoints: 8001,
    maxPoints: 25000,
    theme: 'platinum',
    perks: ['Platinum theme', 'Advanced statistics', 'Premium animations', 'Custom backgrounds'],
    gradient: 'from-slate-300 to-slate-500',
    emoji: '💎'
  },
  {
    id: 'diamond',
    name: 'Diamond Master',
    minPoints: 25001,
    maxPoints: 75000,
    theme: 'diamond',
    perks: ['Diamond theme', 'Epic celebrations', 'All visual effects', 'Prestige badges'],
    gradient: 'from-cyan-400 to-blue-600',
    emoji: '💍'
  },
  {
    id: 'legendary',
    name: 'Legendary Grandmaster',
    minPoints: 75001,
    theme: 'legendary',
    perks: ['Legendary theme', 'Rainbow effects', 'All features unlocked', 'Exclusive animations'],
    gradient: 'from-purple-400 via-pink-500 to-red-500',
    emoji: '🌟'
  }
]

export const THEMES: Record<string, Theme> = {
  bronze: {
    id: 'bronze',
    name: 'Bronze Scholar',
    primary: 'amber',
    background: 'amber-50',
    card: 'amber-100',
    text: 'amber-900'
  },
  silver: {
    id: 'silver',
    name: 'Silver Apprentice',
    primary: 'slate',
    background: 'slate-50',
    card: 'slate-100',
    text: 'slate-900'
  },
  gold: {
    id: 'gold',
    name: 'Gold Scholar',
    primary: 'yellow',
    background: 'yellow-50',
    card: 'yellow-100',
    text: 'yellow-900'
  },
  platinum: {
    id: 'platinum',
    name: 'Platinum Expert',
    primary: 'gray',
    background: 'gray-50',
    card: 'gray-100',
    text: 'gray-900'
  },
  diamond: {
    id: 'diamond',
    name: 'Diamond Master',
    primary: 'cyan',
    background: 'cyan-50',
    card: 'cyan-100',
    text: 'cyan-900'
  },
  legendary: {
    id: 'legendary',
    name: 'Legendary Grandmaster',
    primary: 'purple',
    background: 'purple-50',
    card: 'purple-100',
    text: 'purple-900'
  }
}

// Points configuration
export const POINTS = {
  CORRECT_ANSWER: 5,
  INCORRECT_ANSWER: -1,
  SKIP_QUESTION: 0,
  SPEED_BONUS: 2,
  PERFECT_SESSION_BONUS: 50,
  DAILY_STREAK_MULTIPLIER: 10
}

// Streak multipliers - more balanced progression
export const STREAK_MULTIPLIERS = [
  { minStreak: 50, multiplier: 4 },
  { minStreak: 20, multiplier: 3 },
  { minStreak: 10, multiplier: 2 },
  { minStreak: 5, multiplier: 1.5 }
]

// Timing constants
export const SPEED_THRESHOLD_MS = 5000 // 5 seconds for speed bonus

export function getStreakMultiplier(streak: number): number {
  for (const { minStreak, multiplier } of STREAK_MULTIPLIERS) {
    if (streak >= minStreak) {
      return multiplier
    }
  }
  return 1
}

export function getTierByPoints(points: number): Tier {
  for (let i = TIERS.length - 1; i >= 0; i--) {
    if (points >= TIERS[i].minPoints) {
      return TIERS[i]
    }
  }
  return TIERS[0]
}

export function getNextTier(currentTier: Tier): Tier | null {
  const currentIndex = TIERS.findIndex(t => t.id === currentTier.id)
  if (currentIndex < TIERS.length - 1) {
    return TIERS[currentIndex + 1]
  }
  return null
}