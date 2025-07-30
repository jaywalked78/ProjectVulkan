import { Card } from '@/components/ui/Card'

interface QuizCardProps {
  question: string
  questionNumber: number
  totalQuestions: number
  showQuestionNumber?: boolean
}

export function QuizCard({ question, questionNumber, totalQuestions, showQuestionNumber = true }: QuizCardProps) {
  return (
    <Card variant="elevated" className="max-w-2xl mx-auto animate-fade-in">
      <div className="text-center space-y-4">
        {showQuestionNumber && (
          <div className="text-sm text-gray-500">
            Question {questionNumber} of {totalQuestions}
          </div>
        )}
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-900">
          {question}
        </h2>
      </div>
    </Card>
  )
}