import type { Tier } from '@/types/gamification'

interface BackgroundRendererProps {
  tier: Tier
  className?: string
}

export function BackgroundRenderer({ tier, className = '' }: BackgroundRendererProps) {
  const getBackgroundClass = (tierId: string): string => {
    switch (tierId) {
      case 'bronze':
        return 'bg-gradient-to-br from-amber-900/20 via-orange-900/30 to-yellow-900/20 animate-bronze-dither'
      case 'silver':
        return 'bg-gradient-to-br from-slate-900/30 via-gray-800/40 to-slate-900/30 animate-silver-silk'
      case 'gold':
        return 'bg-gradient-to-br from-yellow-900/30 via-amber-800/40 to-orange-900/30 animate-gold-beams'
      case 'platinum':
        return 'bg-gradient-to-br from-teal-900/30 via-emerald-800/40 to-cyan-900/30 animate-platinum-iridescence'
      case 'diamond':
        return 'bg-gradient-to-br from-cyan-900/30 via-blue-800/40 to-indigo-900/30 animate-diamond-ripple'
      case 'legendary':
        return 'bg-gradient-to-br from-purple-900/30 via-pink-800/40 to-red-900/30 animate-legendary-hyperspeed'
      default:
        return 'bg-gradient-to-br from-gray-900/30 via-gray-800/40 to-gray-900/30'
    }
  }

  const getEffectsForTier = (tierId: string) => {
    const effects = []
    
    // Add shimmer effect for higher tiers
    if (['gold', 'platinum', 'diamond', 'legendary'].includes(tierId)) {
      effects.push(
        <div key="shimmer" className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
        </div>
      )
    }

    // Add pulse effect for premium tiers
    if (['diamond', 'legendary'].includes(tierId)) {
      effects.push(
        <div key="pulse" className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-radial from-white/20 via-transparent to-transparent animate-pulse-slow" />
        </div>
      )
    }

    // Add spinning effect for legendary
    if (tierId === 'legendary') {
      effects.push(
        <div key="spin" className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-gradient-conic from-purple-500/20 via-pink-500/20 via-red-500/20 to-purple-500/20 animate-spin-slow" />
        </div>
      )
    }

    return effects
  }

  return (
    <div className={`fixed inset-0 z-0 ${className}`}>
      <div className={`absolute inset-0 ${getBackgroundClass(tier.id)}`}>
        {getEffectsForTier(tier.id)}
      </div>
    </div>
  )
}