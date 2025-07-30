import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { type QuizState, type QuizActions, type Card } from '@/types'
import { generateId, shuffleArray } from '@/lib/utils'
import { deckStorage, generateDeckName } from '@/lib/deck-storage'
import { useGamificationStore } from './gamificationStore'
import { POINTS, getStreakMultiplier } from '@/lib/gamification-data'

const MIN_TURNS_BEFORE_REPEAT = 2
const MIN_REVIEW_DELAY = 3
const MAX_REVIEW_DELAY = 10

interface QuizStore extends QuizState, QuizActions {}

export const useQuizStore = create<QuizStore>()(
  devtools(
    (set, get) => ({
      // Initial state
      deck: [],
      originalDeck: [],
      currentDeckName: null,
      savedDecks: deckStorage.getSavedDecks(),
      quizMode: 'infinite',
      isQuizActive: false,
      currentCard: null,
      currentCardIndex: -1,
      totalQuestions: 0,
      questionsAnswered: 0,
      uniqueQuestionsAnswered: 0,
      correctAnswers: 0,
      incorrectAnswers: 0,
      currentTurn: 0,
      userAnswer: '',
      isShowingFeedback: false,
      lastAnswerCorrect: null,
      isLoading: false,
      error: null,

      // Actions
      loadDeck: (cards, fileName) => {
        const deck = cards.map((card, index) => ({
          ...card,
          id: generateId(),
          originalQuestionNumber: index + 1,
          incorrectCount: 0,
          lastShownTurn: -MIN_TURNS_BEFORE_REPEAT - 1,
          nextReviewTurn: undefined,
          hasBeenAnsweredCorrectly: false,
          answeredInCurrentCycle: false,
        }))

        let deckName: string | null = null
        
        // Save deck to localStorage if fileName is provided
        if (fileName) {
          deckName = generateDeckName(fileName)
          deckStorage.saveDeck(deckName, fileName, cards)
        }

        set({
          deck: shuffleArray([...deck]),
          originalDeck: deck,
          currentDeckName: deckName,
          savedDecks: deckStorage.getSavedDecks(),
          totalQuestions: deck.length,
          isQuizActive: false,
          currentCard: null,
          currentCardIndex: -1,
          questionsAnswered: 0,
          uniqueQuestionsAnswered: 0,
          correctAnswers: 0,
          incorrectAnswers: 0,
          currentTurn: 0,
          userAnswer: '',
          isShowingFeedback: false,
          lastAnswerCorrect: null,
          error: null,
        })
      },

      loadSavedDeck: (deckId) => {
        const savedDeck = deckStorage.getDeckById(deckId)
        if (!savedDeck) {
          set({ error: 'Saved deck not found' })
          return
        }

        // Update last used timestamp
        deckStorage.updateDeckLastUsed(deckId)

        const deck = savedDeck.cards.map((card, index) => ({
          ...card,
          id: generateId(),
          originalQuestionNumber: index + 1,
          incorrectCount: 0,
          lastShownTurn: -MIN_TURNS_BEFORE_REPEAT - 1,
          nextReviewTurn: undefined,
          hasBeenAnsweredCorrectly: false,
          answeredInCurrentCycle: false,
        }))

        set({
          deck: shuffleArray([...deck]),
          originalDeck: deck,
          currentDeckName: savedDeck.name,
          savedDecks: deckStorage.getSavedDecks(),
          totalQuestions: deck.length,
          isQuizActive: false,
          currentCard: null,
          currentCardIndex: -1,
          questionsAnswered: 0,
          uniqueQuestionsAnswered: 0,
          correctAnswers: 0,
          incorrectAnswers: 0,
          currentTurn: 0,
          userAnswer: '',
          isShowingFeedback: false,
          lastAnswerCorrect: null,
          error: null,
        })
      },

      deleteSavedDeck: (deckId) => {
        deckStorage.deleteDeck(deckId)
        set({
          savedDecks: deckStorage.getSavedDecks()
        })
      },

      clearDeck: () => {
        set({
          deck: [],
          originalDeck: [],
          currentDeckName: null,
          totalQuestions: 0,
          isQuizActive: false,
          currentCard: null,
          currentCardIndex: -1,
          questionsAnswered: 0,
          uniqueQuestionsAnswered: 0,
          correctAnswers: 0,
          incorrectAnswers: 0,
          currentTurn: 0,
          userAnswer: '',
          isShowingFeedback: false,
          lastAnswerCorrect: null,
        })
      },

      setQuizMode: (mode) => {
        set({ quizMode: mode })
      },

      startQuiz: () => {
        const { deck } = get()
        if (deck.length === 0) {
          set({ error: 'No deck loaded' })
          return
        }

        // Initialize gamification for new session
        const gamificationStore = useGamificationStore.getState()
        gamificationStore.updateDailyStreak()
        gamificationStore.loadGamificationProgress()
        
        // Reset session stats
        gamificationStore.resetSessionStats()

        const firstCard = selectNextCard(deck, 0)
        // Mark the first card as shown
        const updatedDeck = deck.map(card => 
          card.id === firstCard.id 
            ? { ...card, lastShownTurn: 0 }
            : card
        )
        set({
          deck: updatedDeck,
          isQuizActive: true,
          currentCard: firstCard,
          currentCardIndex: 0,
          questionsAnswered: 0,
          uniqueQuestionsAnswered: 0,
          correctAnswers: 0,
          incorrectAnswers: 0,
          currentTurn: 0,
          userAnswer: '',
          isShowingFeedback: false,
          lastAnswerCorrect: null,
          error: null,
        })

        // Start response timer for first question
        gamificationStore.startResponseTimer()
      },

      submitAnswer: () => {
        const { currentCard, userAnswer, deck, currentTurn, uniqueQuestionsAnswered, questionsAnswered, quizMode, incorrectAnswers } = get()
        if (!currentCard || !userAnswer.trim()) return

        const isCorrect = normalizeAnswer(userAnswer) === normalizeAnswer(currentCard.answer)
        const wasFirstTimeAnswered = !currentCard.hasBeenAnsweredCorrectly
        
        // Update gamification
        const gamificationStore = useGamificationStore.getState()
        gamificationStore.updateStats(isCorrect)
        
        if (isCorrect) {
          // Update streak
          const newStreak = gamificationStore.currentStreak + 1
          useGamificationStore.setState({ 
            currentStreak: newStreak,
            bestStreak: Math.max(newStreak, gamificationStore.bestStreak)
          })
          
          // Calculate points with streak multiplier
          const multiplier = getStreakMultiplier(newStreak)
          const basePoints = POINTS.CORRECT_ANSWER
          const totalPoints = Math.floor(basePoints * multiplier)
          
          gamificationStore.addPoints(
            totalPoints, 
            newStreak >= 3 ? 'streak' : 'correct',
            newStreak >= 3 ? `${newStreak} streak!` : undefined
          )
        } else {
          // Reset streak and deduct point
          useGamificationStore.setState({ currentStreak: 0 })
          gamificationStore.addPoints(POINTS.INCORRECT_ANSWER, 'incorrect')
        }
        
        // Check for achievements
        gamificationStore.checkAchievements()
        
        // Check for perfect session bonus
        if (quizMode === 'single-cycle' && questionsAnswered >= 9 && incorrectAnswers === 0 && isCorrect) {
          gamificationStore.addPoints(POINTS.PERFECT_SESSION_BONUS, 'bonus', 'Perfect session!')
        }
        
        // Update card statistics
        let updatedDeck = deck.map(card => {
          if (card.id === currentCard.id) {
            const updatedCard = {
              ...card,
              incorrectCount: isCorrect ? card.incorrectCount : card.incorrectCount + 1,
              lastShownTurn: currentTurn,
              hasBeenAnsweredCorrectly: isCorrect || card.hasBeenAnsweredCorrectly,
              answeredInCurrentCycle: isCorrect || card.answeredInCurrentCycle,
            }

            // If answered incorrectly, schedule for review after random delay
            if (!isCorrect) {
              const reviewDelay = Math.floor(Math.random() * (MAX_REVIEW_DELAY - MIN_REVIEW_DELAY + 1)) + MIN_REVIEW_DELAY
              updatedCard.nextReviewTurn = currentTurn + reviewDelay
            }

            return updatedCard
          }
          return card
        })

        // For infinite mode: Check if all questions have been answered in current cycle
        if (quizMode === 'infinite') {
          const allAnsweredInCycle = updatedDeck.every(card => card.answeredInCurrentCycle)
          if (allAnsweredInCycle) {
            // Reset cycle and reshuffle deck
            updatedDeck = shuffleArray(updatedDeck.map(card => ({
              ...card,
              answeredInCurrentCycle: false
            })))
          }
        }

        const newUniqueQuestionsAnswered = wasFirstTimeAnswered && isCorrect 
          ? uniqueQuestionsAnswered + 1 
          : uniqueQuestionsAnswered

        set({
          deck: updatedDeck,
          lastAnswerCorrect: isCorrect,
          isShowingFeedback: true,
          correctAnswers: isCorrect ? get().correctAnswers + 1 : get().correctAnswers,
          incorrectAnswers: !isCorrect ? get().incorrectAnswers + 1 : get().incorrectAnswers,
          questionsAnswered: get().questionsAnswered + 1,
          uniqueQuestionsAnswered: newUniqueQuestionsAnswered,
        })

        // Auto-advance after feedback
        setTimeout(() => {
          get().nextQuestion()
        }, 2500)
      },

      nextQuestion: () => {
        const { deck, currentTurn, quizMode } = get()
        
        // Check if quiz should end for single-cycle mode
        if (quizMode === 'single-cycle') {
          const allAnsweredCorrectly = deck.every(card => card.hasBeenAnsweredCorrectly)
          if (allAnsweredCorrectly) {
            set({ isQuizActive: false })
            return
          }
        }

        const nextTurn = currentTurn + 1
        const nextCard = selectNextCard(deck, nextTurn)

        set({
          currentCard: nextCard,
          currentTurn: nextTurn,
          userAnswer: '',
          isShowingFeedback: false,
          lastAnswerCorrect: null,
        })
        
        // Start response timer for next question
        useGamificationStore.getState().startResponseTimer()
      },

      setUserAnswer: (answer) => set({ userAnswer: answer }),
      
      endQuiz: () => set({ isQuizActive: false }),
      
      resetQuiz: () => {
        const { originalDeck } = get()
        const resetDeck = originalDeck.map((card, index) => ({
          ...card,
          originalQuestionNumber: index + 1,
          incorrectCount: 0,
          lastShownTurn: -MIN_TURNS_BEFORE_REPEAT - 1,
          nextReviewTurn: undefined,
          hasBeenAnsweredCorrectly: false,
          answeredInCurrentCycle: false,
        }))
        
        set({
          deck: shuffleArray([...resetDeck]),
          isQuizActive: false,
          currentCard: null,
          currentCardIndex: -1,
          questionsAnswered: 0,
          uniqueQuestionsAnswered: 0,
          correctAnswers: 0,
          incorrectAnswers: 0,
          currentTurn: 0,
          userAnswer: '',
          isShowingFeedback: false,
          lastAnswerCorrect: null,
        })
      },

      setError: (error) => set({ error }),
      clearError: () => set({ error: null }),
    }),
    {
      name: 'quiz-store',
    }
  )
)

// Helper functions
function selectNextCard(deck: Card[], turn: number): Card {
  // First priority: cards scheduled for review
  const cardsForReview = deck.filter(c => 
    c.nextReviewTurn !== undefined && turn >= c.nextReviewTurn
  )
  
  if (cardsForReview.length > 0) {
    // Sort by original question number to maintain order when possible
    cardsForReview.sort((a, b) => a.originalQuestionNumber - b.originalQuestionNumber)
    return cardsForReview[0]
  }

  // Second priority: cards not yet answered in current cycle (for infinite mode)
  const unansweredInCycle = deck.filter(c => 
    !c.answeredInCurrentCycle && 
    turn - c.lastShownTurn > MIN_TURNS_BEFORE_REPEAT
  )
  
  if (unansweredInCycle.length > 0) {
    // Return random card from unanswered in cycle to maintain randomness
    return unansweredInCycle[Math.floor(Math.random() * unansweredInCycle.length)]
  }

  // Third priority: cards that haven't been answered correctly yet (in original order)
  const unansweredCards = deck.filter(c => 
    !c.hasBeenAnsweredCorrectly && 
    turn - c.lastShownTurn > MIN_TURNS_BEFORE_REPEAT
  )
  
  if (unansweredCards.length > 0) {
    // Sort by original question number to maintain sequential order
    unansweredCards.sort((a, b) => a.originalQuestionNumber - b.originalQuestionNumber)
    return unansweredCards[0]
  }

  // Fourth priority: any available cards (in original order)
  const availableCards = deck.filter(c => turn - c.lastShownTurn > MIN_TURNS_BEFORE_REPEAT)
  if (availableCards.length > 0) {
    availableCards.sort((a, b) => a.originalQuestionNumber - b.originalQuestionNumber)
    return availableCards[0]
  }

  // Fallback: pick first card by original number
  const sortedDeck = [...deck].sort((a, b) => a.originalQuestionNumber - b.originalQuestionNumber)
  return sortedDeck[0]
}

function normalizeAnswer(answer: string): string {
  return answer.trim().toLowerCase().replace(/[^a-z0-9]/g, '')
}