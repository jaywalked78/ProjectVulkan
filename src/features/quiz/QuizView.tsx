import { useEffect } from 'react'
import { useQuizStore } from '@/store/quizStore'
import { QuizCard } from './components/QuizCard'
import { AnswerInput } from './components/AnswerInput'
import { FeedbackDisplay } from './components/FeedbackDisplay'
import { QuizProgress } from './components/QuizProgress'
import { Button } from '@/components/ui/Button'

interface QuizViewProps {
  onEndQuiz: () => void
}

export function QuizView({ onEndQuiz }: QuizViewProps) {
  const {
    isQuizActive,
    currentCard,
    questionsAnswered,
    uniqueQuestionsAnswered,
    totalQuestions,
    correctAnswers,
    incorrectAnswers,
    isShowingFeedback,
    lastAnswerCorrect,
    userAnswer,
    quizMode,
    endQuiz,
  } = useQuizStore()

  useEffect(() => {
    if (!isQuizActive) {
      onEndQuiz()
    }
  }, [isQuizActive, onEndQuiz])

  if (!currentCard) return null

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-900">Quiz Session</h1>
          <Button variant="ghost" onClick={() => { endQuiz(); onEndQuiz(); }}>
            End Quiz
          </Button>
        </div>

        {/* Progress */}
        <QuizProgress
          questionsAnswered={questionsAnswered}
          uniqueQuestionsAnswered={uniqueQuestionsAnswered}
          totalQuestions={totalQuestions}
          correctAnswers={correctAnswers}
          incorrectAnswers={incorrectAnswers}
          quizMode={quizMode}
        />

        {/* Question Card */}
        <QuizCard
          question={currentCard.question}
          questionNumber={currentCard.originalQuestionNumber}
          totalQuestions={totalQuestions}
        />

        {/* Answer Section */}
        <div className="max-w-2xl mx-auto">
          {isShowingFeedback ? (
            <FeedbackDisplay
              isCorrect={lastAnswerCorrect!}
              correctAnswer={currentCard.answer}
              userAnswer={userAnswer}
            />
          ) : (
            <AnswerInput />
          )}
        </div>

        {/* Stats */}
        <div className="text-center text-sm text-gray-500">
          <p>Correct: {correctAnswers} | Incorrect: {incorrectAnswers}</p>
        </div>
      </div>
    </div>
  )
}