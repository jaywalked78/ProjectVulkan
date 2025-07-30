export interface Card {
  id: string
  question: string
  answer: string
  originalQuestionNumber: number
  incorrectCount: number
  lastShownTurn: number
  nextReviewTurn?: number
  hasBeenAnsweredCorrectly: boolean
  answeredInCurrentCycle: boolean // For infinite mode cycling
}

export interface SavedDeck {
  id: string
  name: string
  fileName: string
  cards: Omit<Card, 'id' | 'originalQuestionNumber' | 'incorrectCount' | 'lastShownTurn' | 'nextReviewTurn' | 'hasBeenAnsweredCorrectly' | 'answeredInCurrentCycle'>[]
  createdAt: string
  lastUsed: string
}

export interface QuizState {
  // Deck management
  deck: Card[]
  originalDeck: Card[] // For reset functionality
  currentDeckName: string | null
  savedDecks: SavedDeck[]
  quizMode: 'infinite' | 'single-cycle'
  
  // Session state
  isQuizActive: boolean
  currentCard: Card | null
  currentCardIndex: number
  
  // Progress tracking
  totalQuestions: number
  questionsAnswered: number
  uniqueQuestionsAnswered: number
  correctAnswers: number
  incorrectAnswers: number
  currentTurn: number
  
  // Answer state
  userAnswer: string
  isShowingFeedback: boolean
  lastAnswerCorrect: boolean | null
  
  // UI state
  isLoading: boolean
  error: string | null
}

export interface QuizActions {
  // Deck management
  loadDeck: (cards: Omit<Card, 'id' | 'originalQuestionNumber' | 'incorrectCount' | 'lastShownTurn' | 'nextReviewTurn' | 'hasBeenAnsweredCorrectly' | 'answeredInCurrentCycle'>[], fileName?: string) => void
  loadSavedDeck: (deckId: string) => void
  deleteSavedDeck: (deckId: string) => void
  clearDeck: () => void
  setQuizMode: (mode: 'infinite' | 'single-cycle') => void
  
  // Quiz control
  startQuiz: () => void
  endQuiz: () => void
  resetQuiz: () => void
  
  // Answer handling
  setUserAnswer: (answer: string) => void
  submitAnswer: () => void
  nextQuestion: () => void
  
  // Utility
  setError: (error: string | null) => void
  clearError: () => void
}