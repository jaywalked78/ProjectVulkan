interface StreakIndicatorProps {
  streak: number
  multiplier: number
}

export function StreakIndicator({ streak, multiplier }: StreakIndicatorProps) {
  if (streak < 3) return null

  const getStreakColor = () => {
    if (streak >= 15) return 'from-purple-500 to-pink-500'
    if (streak >= 10) return 'from-red-500 to-orange-500'
    if (streak >= 5) return 'from-orange-500 to-yellow-500'
    return 'from-yellow-500 to-amber-500'
  }

  return (
    <div className={`inline-flex items-center gap-2 bg-gradient-to-r ${getStreakColor()} text-white px-4 py-2 rounded-full shadow-lg`}>
      <div className="relative">
        <span className="text-2xl animate-pulse-slow">🔥</span>
        {streak >= 10 && (
          <span className="absolute -top-1 -right-1 text-xs">✨</span>
        )}
      </div>
      <div>
        <p className="font-bold text-sm">{streak} Streak!</p>
        <p className="text-xs opacity-90">{multiplier}x points</p>
      </div>
    </div>
  )
}