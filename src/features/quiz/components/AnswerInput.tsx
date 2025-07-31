import { useState, useEffect } from 'react'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { useQuizStore } from '@/store/quizStore'
import { useGamificationStore } from '@/store/gamificationStore'
import { getTierTheme } from '@/lib/theme-utils'

export function AnswerInput() {
  const { userAnswer, setUserAnswer, submitAnswer } = useQuizStore()
  const { getCurrentTier } = useGamificationStore()
  const [localAnswer, setLocalAnswer] = useState('')
  
  const currentTier = getCurrentTier()
  const tierTheme = getTierTheme(currentTier)
  
  // Get tier-specific focus colors
  const getTierFocusClasses = () => {
    switch (currentTier.id) {
      case 'bronze':
        return 'focus:border-amber-400 focus:ring-amber-400/50'
      case 'silver':
        return 'focus:border-slate-400 focus:ring-slate-400/50'
      case 'gold':
        return 'focus:border-yellow-400 focus:ring-yellow-400/50'
      case 'platinum':
        return 'focus:border-teal-400 focus:ring-teal-400/50'
      case 'diamond':
        return 'focus:border-cyan-400 focus:ring-cyan-400/50'
      case 'legendary':
        return 'focus:border-purple-400 focus:ring-purple-400/50'
      default:
        return 'focus:border-blue-400 focus:ring-blue-400/50'
    }
  }

  useEffect(() => {
    setLocalAnswer(userAnswer)
  }, [userAnswer])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (localAnswer.trim()) {
      setUserAnswer(localAnswer)
      submitAnswer()
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && localAnswer.trim()) {
      handleSubmit(e)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Input
          id="answer-input"
          type="text"
          placeholder="Type your answer here..."
          value={localAnswer}
          onChange={(e) => setLocalAnswer(e.target.value)}
          onKeyDown={handleKeyDown}
          className={`text-lg p-4 text-center ${localAnswer.trim() ? 'bg-black/90' : tierTheme.card} ${tierTheme.text} border-2 ${tierTheme.border} ${getTierFocusClasses()} focus:ring-2`}
          autoComplete="off"
          autoFocus
        />
      </div>
      
      <div className="flex justify-center">
        <Button
          type="submit"
          size="lg"
          className={`${tierTheme.primary} text-dark-grey hover:opacity-90 disabled:opacity-50 px-8 py-3`}
          disabled={!localAnswer.trim()}
        >
          Submit Answer
        </Button>
      </div>
      
      <div className="flex justify-center">
        <div className={`${tierTheme.card} rounded-lg px-4 py-2 border ${tierTheme.border}`}>
          <p className={`text-sm ${tierTheme.text} opacity-60`}>
            Press Enter to submit
          </p>
        </div>
      </div>
    </form>
  )
}