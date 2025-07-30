import { Alert } from '@/components/ui/Alert'

interface FeedbackDisplayProps {
  isCorrect: boolean
  correctAnswer: string
  userAnswer?: string
}

export function FeedbackDisplay({ isCorrect, correctAnswer, userAnswer }: FeedbackDisplayProps) {
  return (
    <div className="space-y-4 animate-slide-up">
      <Alert variant={isCorrect ? 'success' : 'error'}>
        <div className="text-center">
          <div className="text-lg font-semibold mb-2">
            {isCorrect ? '✓ Correct!' : '✗ Incorrect'}
          </div>
          
          {!isCorrect && (
            <div className="space-y-1">
              <p className="text-sm">
                <strong>Correct answer:</strong> {correctAnswer}
              </p>
              {userAnswer && (
                <p className="text-sm opacity-75">
                  <strong>Your answer:</strong> {userAnswer}
                </p>
              )}
            </div>
          )}
        </div>
      </Alert>
      
      <p className="text-sm text-gray-500 text-center">
        Moving to next question...
      </p>
    </div>
  )
}