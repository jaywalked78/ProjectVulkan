import type { Tier } from '@/types/gamification'
import { getNextTier } from '@/lib/gamification-data'

interface TierBadgeProps {
  tier: Tier
  points: number
  compact?: boolean
}

export function TierBadge({ tier, points, compact = false }: TierBadgeProps) {
  const nextTier = getNextTier(tier)
  const progress = nextTier 
    ? ((points - tier.minPoints) / (nextTier.minPoints - tier.minPoints)) * 100
    : 100

  if (compact) {
    return (
      <div className="relative group cursor-pointer">
        <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${tier.gradient} flex items-center justify-center shadow-lg transform transition-transform group-hover:scale-110`}>
          <span className="text-2xl">{tier.emoji}</span>
        </div>
        
        {/* Tooltip */}
        <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          <div className="bg-gray-900 text-white text-xs rounded-lg px-3 py-2 whitespace-nowrap">
            <p className="font-bold">{tier.name}</p>
            <p>{points.toLocaleString()} points</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 max-w-sm">
      <div className="flex items-center gap-4 mb-4">
        <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${tier.gradient} flex items-center justify-center shadow-lg`}>
          <span className="text-4xl">{tier.emoji}</span>
        </div>
        <div>
          <h3 className="text-2xl font-bold text-gray-800">{tier.name}</h3>
          <p className="text-sm text-gray-600">{points.toLocaleString()} points</p>
        </div>
      </div>
      
      {nextTier && (
        <div>
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>Progress to {nextTier.name}</span>
            <span>{Math.floor(progress)}%</span>
          </div>
          <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
            <div
              className={`h-full bg-gradient-to-r ${tier.gradient} transition-all duration-500`}
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">
            {(nextTier.minPoints - points).toLocaleString()} points to go
          </p>
        </div>
      )}
      
      {tier.perks.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <h4 className="text-sm font-semibold text-gray-700 mb-2">Perks</h4>
          <ul className="text-xs text-gray-600 space-y-1">
            {tier.perks.map((perk, index) => (
              <li key={index} className="flex items-center gap-1">
                <span className="text-green-500">✓</span>
                {perk}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}