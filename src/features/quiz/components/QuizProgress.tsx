import { Progress } from '@/components/ui/Progress'
import { useGamificationStore } from '@/store/gamificationStore'
import { getTierTheme } from '@/lib/theme-utils'

interface QuizProgressProps {
  questionsAnswered: number
  uniqueQuestionsAnswered: number
  totalQuestions: number
  correctAnswers: number
  incorrectAnswers: number
  quizMode: 'infinite' | 'single-cycle'
}

export function QuizProgress({ 
  questionsAnswered,
  uniqueQuestionsAnswered, 
  totalQuestions, 
  correctAnswers, 
  incorrectAnswers,
  quizMode
}: QuizProgressProps) {
  const { getCurrentTier } = useGamificationStore()
  const currentTier = getCurrentTier()
  const tierTheme = getTierTheme(currentTier)
  
  const progressPercentage = totalQuestions > 0 ? (uniqueQuestionsAnswered / totalQuestions) * 100 : 0
  const accuracy = questionsAnswered > 0 ? (correctAnswers / questionsAnswered) * 100 : 0

  return (
    <div className="space-y-3">
      <div className={`flex justify-between items-center text-sm ${tierTheme.text} opacity-80`}>
        <span>
          {quizMode === 'single-cycle' 
            ? `Progress: ${uniqueQuestionsAnswered} / ${totalQuestions}` 
            : `Total Attempts: ${questionsAnswered} (${uniqueQuestionsAnswered}/${totalQuestions} unique)`
          }
        </span>
        <span>Accuracy: {accuracy.toFixed(0)}%</span>
      </div>
      
      <Progress value={progressPercentage} className="h-2" />
      
      <div className="flex justify-center space-x-6 text-sm">
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span className={`${tierTheme.text} opacity-80`}>Correct: {correctAnswers}</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <span className={`${tierTheme.text} opacity-80`}>Incorrect: {incorrectAnswers}</span>
        </div>
      </div>
    </div>
  )
}