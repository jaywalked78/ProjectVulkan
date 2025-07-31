import type { Tier } from '@/types/gamification'

export interface TierTheme {
  background: string
  card: string
  primary: string
  accent: string
  text: string
  gradient: string
  border: string
  shadow: string
  isDark: boolean
}

export function getTierTheme(tier: Tier): TierTheme {
  switch (tier.id) {
    case 'bronze':
      return {
        background: 'bg-gray-900', // Dark background for dithered effect
        card: 'backdrop-blur-md bg-black/20 border border-amber-500/20',
        primary: 'bg-gradient-to-r from-amber-500 to-orange-500',
        accent: 'text-amber-400',
        text: 'text-amber-200',
        gradient: 'from-amber-400 to-orange-500',
        border: 'border-amber-500/30',
        shadow: 'shadow-amber-500/20',
        isDark: true
      }
    case 'silver':
      return {
        background: 'bg-gray-900',
        card: 'backdrop-blur-md bg-black/30 border border-slate-400/20',
        primary: 'bg-gradient-to-r from-slate-500 to-gray-600',
        accent: 'text-slate-300',
        text: 'text-slate-100',
        gradient: 'from-slate-400 to-gray-500',
        border: 'border-slate-400/30',
        shadow: 'shadow-slate-400/20',
        isDark: true
      }
    case 'gold':
      return {
        background: 'bg-gray-900',
        card: 'backdrop-blur-md bg-black/30 border border-yellow-400/20',
        primary: 'bg-gradient-to-r from-yellow-500 to-amber-600',
        accent: 'text-yellow-300',
        text: 'text-yellow-100',
        gradient: 'from-yellow-400 to-amber-500',
        border: 'border-yellow-400/30',
        shadow: 'shadow-yellow-400/20',
        isDark: true
      }
    case 'platinum':
      return {
        background: 'bg-gray-900',
        card: 'backdrop-blur-md bg-black/30 border border-teal-400/20',
        primary: 'bg-gradient-to-r from-teal-500 to-emerald-600',
        accent: 'text-teal-300',
        text: 'text-teal-100',
        gradient: 'from-teal-400 to-emerald-500',
        border: 'border-teal-400/30',
        shadow: 'shadow-teal-400/20',
        isDark: true
      }
    case 'diamond':
      return {
        background: 'bg-gray-900',
        card: 'backdrop-blur-md bg-black/30 border border-cyan-400/20',
        primary: 'bg-gradient-to-r from-cyan-500 to-blue-600',
        accent: 'text-cyan-300',
        text: 'text-cyan-100',
        gradient: 'from-cyan-400 to-blue-500',
        border: 'border-cyan-400/30',
        shadow: 'shadow-cyan-400/20',
        isDark: true
      }
    case 'legendary':
      return {
        background: 'bg-gray-900',
        card: 'backdrop-blur-md bg-black/30 border border-purple-400/20',
        primary: 'bg-gradient-to-r from-purple-500 via-pink-500 to-red-500',
        accent: 'text-purple-300',
        text: 'text-purple-100',
        gradient: 'from-purple-400 via-pink-500 to-red-500',
        border: 'border-purple-400/30',
        shadow: 'shadow-purple-400/20',
        isDark: true
      }
    default:
      return {
        background: 'bg-gray-900',
        card: 'backdrop-blur-md bg-black/30 border border-gray-400/20',
        primary: 'bg-gradient-to-r from-blue-500 to-purple-600',
        accent: 'text-blue-300',
        text: 'text-gray-100',
        gradient: 'from-blue-400 to-purple-500',
        border: 'border-gray-400/30',
        shadow: 'shadow-gray-400/20',
        isDark: true
      }
  }
}

export function getTierSpecialEffects(tier: Tier): {
  cardHover: string
  buttonHover: string
  progressBar: string
  specialEffects: string[]
} {
  switch (tier.id) {
    case 'bronze':
      return {
        cardHover: 'hover:shadow-lg hover:shadow-amber-200/30 transition-all duration-300',
        buttonHover: 'hover:from-amber-600 hover:to-orange-600',
        progressBar: 'bg-gradient-to-r from-amber-400 to-orange-500',
        specialEffects: ['animate-pulse']
      }
    case 'silver':
      return {
        cardHover: 'hover:shadow-xl hover:shadow-slate-300/40 hover:scale-[1.02] transition-all duration-300',
        buttonHover: 'hover:from-slate-600 hover:to-gray-700',
        progressBar: 'bg-gradient-to-r from-slate-400 to-gray-500',
        specialEffects: ['animate-pulse', 'hover:animate-bounce']
      }
    case 'gold':
      return {
        cardHover: 'hover:shadow-2xl hover:shadow-yellow-300/50 hover:scale-[1.03] transition-all duration-300',
        buttonHover: 'hover:from-yellow-600 hover:to-amber-700',
        progressBar: 'bg-gradient-to-r from-yellow-400 to-amber-500',
        specialEffects: ['animate-pulse', 'hover:animate-bounce', 'animate-shimmer']
      }
    case 'platinum':
      return {
        cardHover: 'hover:shadow-2xl hover:shadow-teal-400/50 hover:scale-[1.03] transition-all duration-300',
        buttonHover: 'hover:from-teal-600 hover:to-emerald-700',
        progressBar: 'bg-gradient-to-r from-teal-400 to-emerald-500',
        specialEffects: ['animate-pulse', 'hover:animate-bounce', 'animate-shimmer']
      }
    case 'diamond':
      return {
        cardHover: 'hover:shadow-2xl hover:shadow-cyan-400/60 hover:scale-[1.03] transition-all duration-300',
        buttonHover: 'hover:from-cyan-600 hover:to-blue-700',
        progressBar: 'bg-gradient-to-r from-cyan-400 to-blue-500',
        specialEffects: ['animate-pulse', 'hover:animate-bounce', 'animate-shimmer', 'animate-scale-in']
      }
    case 'legendary':
      return {
        cardHover: 'hover:shadow-2xl hover:shadow-purple-500/70 hover:scale-[1.03] transition-all duration-300',
        buttonHover: 'hover:from-purple-600 hover:via-pink-600 hover:to-red-600',
        progressBar: 'bg-gradient-to-r from-purple-400 via-pink-500 to-red-500',
        specialEffects: ['animate-pulse', 'hover:animate-bounce', 'animate-shimmer', 'animate-scale-in', 'animate-pulse-slow']
      }
    default:
      return {
        cardHover: 'hover:shadow-lg transition-shadow duration-200',
        buttonHover: 'hover:from-blue-600 hover:to-purple-700',
        progressBar: 'bg-gradient-to-r from-blue-500 to-purple-600',
        specialEffects: []
      }
  }
}