import { useEffect } from 'react'
import { useQuizStore } from '@/store/quizStore'
import { useGamificationStore } from '@/store/gamificationStore'
import { QuizCard } from './components/QuizCard'
import { AnswerInput } from './components/AnswerInput'
import { FeedbackDisplay } from './components/FeedbackDisplay'
import { QuizProgress } from './components/QuizProgress'
import { Button } from '@/components/ui/Button'
import { PointsDisplay, AchievementToast, StreakIndicator } from '@/components/gamification'
import { getStreakMultiplier } from '@/lib/gamification-data'
import { getTierTheme } from '@/lib/theme-utils'
import { BackgroundRenderer } from '@/components/backgrounds/BackgroundRenderer'

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

  const {
    currentStreak,
    showAchievementToast,
    currentAchievementToast,
    dismissAchievementToast,
    sessionPoints,
    getCurrentTier
  } = useGamificationStore()

  const currentTier = getCurrentTier()
  const tierTheme = getTierTheme(currentTier)
  

  useEffect(() => {
    if (!isQuizActive) {
      onEndQuiz()
    }
  }, [isQuizActive, onEndQuiz])

  if (!currentCard) return null

  return (
    <div className={`min-h-screen ${tierTheme.background} py-8 px-4 relative`}>
      {/* Progressive Enhanced Background */}
      <BackgroundRenderer tier={currentTier} />
      
      {/* Achievement Toast Overlay */}
      {showAchievementToast && currentAchievementToast && (
        <AchievementToast
          achievement={currentAchievementToast}
          onDismiss={dismissAchievementToast}
        />
      )}

      <div className="max-w-4xl mx-auto space-y-6 relative z-10">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className={`text-2xl font-semibold ${tierTheme.accent}`}>Quiz Session</h1>
          <div className="flex items-center gap-4">
            {currentStreak >= 3 && (
              <StreakIndicator 
                streak={currentStreak} 
                multiplier={getStreakMultiplier(currentStreak)} 
              />
            )}
            <Button 
              variant="ghost"
              className={`${tierTheme.accent} hover:bg-white/10 ${tierTheme.card} border ${tierTheme.border} px-4 py-2 rounded-lg`}
              onClick={() => { endQuiz(); onEndQuiz(); }}
            >
              End Quiz
            </Button>
          </div>
        </div>

        {/* Points Display */}
        <PointsDisplay />

        {/* Progress */}
        <div className={`${tierTheme.card} rounded-xl p-4 border-2 ${tierTheme.border}`}>
          <QuizProgress
            questionsAnswered={questionsAnswered}
            uniqueQuestionsAnswered={uniqueQuestionsAnswered}
            totalQuestions={totalQuestions}
            correctAnswers={correctAnswers}
            incorrectAnswers={incorrectAnswers}
            quizMode={quizMode}
          />
        </div>

        {/* Question Card */}
        <QuizCard
          question={currentCard.question}
          questionNumber={currentCard.originalQuestionNumber}
          totalQuestions={totalQuestions}
          showQuestionNumber={quizMode === 'single-cycle'}
        />

        {/* Answer Section */}
        <div className="max-w-2xl mx-auto">
          {isShowingFeedback && lastAnswerCorrect !== null ? (
            <FeedbackDisplay
              isCorrect={lastAnswerCorrect}
              correctAnswer={currentCard.answer}
              userAnswer={userAnswer}
            />
          ) : (
            <AnswerInput />
          )}
        </div>

        {/* Stats */}
        <div className="flex justify-center">
          <div className={`${tierTheme.card} rounded-xl px-6 py-4 border-2 ${tierTheme.border}`}>
            <div className={`text-sm ${tierTheme.text} opacity-70`}>
              <p>
                Correct: {correctAnswers} | Incorrect: {incorrectAnswers}
                {sessionPoints > 0 && (
                  <span className={`ml-4 ${tierTheme.accent} font-semibold`}>
                    Session Points: +{sessionPoints}
                  </span>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}