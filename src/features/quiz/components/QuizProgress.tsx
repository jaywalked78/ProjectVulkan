import { Progress } from '@/components/ui/Progress'

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
  const progressPercentage = totalQuestions > 0 ? (uniqueQuestionsAnswered / totalQuestions) * 100 : 0
  const accuracy = questionsAnswered > 0 ? (correctAnswers / questionsAnswered) * 100 : 0

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center text-sm text-gray-600">
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
          <span className="text-gray-600">Correct: {correctAnswers}</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <span className="text-gray-600">Incorrect: {incorrectAnswers}</span>
        </div>
      </div>
    </div>
  )
}