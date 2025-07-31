import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Alert } from '@/components/ui/Alert'
import { Select } from '@/components/ui/Select'
import { useQuizStore } from '@/store/quizStore'
import { useGamificationStore } from '@/store/gamificationStore'
import { parseCSVFile } from '@/lib/csv-parser'
import { TierBadge, AchievementGallery } from '@/components/gamification'
import { getTierTheme, getTierSpecialEffects } from '@/lib/theme-utils'
import { TIERS } from '@/lib/gamification-data'
import { BackgroundRenderer } from '@/components/backgrounds/BackgroundRenderer'

export function HomeView() {
  const [isDeckLoaded, setIsDeckLoaded] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const [selectedDeckId, setSelectedDeckId] = useState('')
  const [showAchievements, setShowAchievements] = useState(false)
  
  const { 
    loadDeck, 
    loadSavedDeck, 
    deleteSavedDeck, 
    startQuiz, 
    totalQuestions, 
    clearDeck, 
    quizMode, 
    setQuizMode, 
    savedDecks, 
    currentDeckName 
  } = useQuizStore()

  const {
    totalPoints,
    currentTier,
    bestStreak,
    totalCorrectAnswers,
    totalQuestionsAnswered,
    recentAchievements,
    loadGamificationProgress,
    setTestingTier
  } = useGamificationStore()

  useEffect(() => {
    loadGamificationProgress()
  }, [loadGamificationProgress])

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setIsProcessing(true)
    setUploadError(null)

    const result = await parseCSVFile(file)
    
    if (result.success && result.data) {
      loadDeck(result.data, file.name)
      setIsDeckLoaded(true)
      setSelectedDeckId('') // Clear selection when uploading new deck
    } else {
      setUploadError(result.error || 'Failed to parse CSV file')
    }
    
    setIsProcessing(false)
    // Clear the input so the same file can be selected again
    event.target.value = ''
  }

  const handleSavedDeckSelect = (deckId: string) => {
    if (!deckId) return
    
    setUploadError(null)
    loadSavedDeck(deckId)
    setSelectedDeckId(deckId)
    setIsDeckLoaded(true)
  }

  const handleDeleteSavedDeck = (deckId: string, event: React.MouseEvent) => {
    event.stopPropagation()
    deleteSavedDeck(deckId)
    if (selectedDeckId === deckId) {
      setSelectedDeckId('')
      setIsDeckLoaded(false)
    }
  }

  const handleStartQuiz = () => {
    startQuiz()
  }

  const handleClearDeck = () => {
    clearDeck()
    setIsDeckLoaded(false)
    setUploadError(null)
    setSelectedDeckId('')
  }

  const accuracy = totalQuestionsAnswered > 0 
    ? Math.round((totalCorrectAnswers / totalQuestionsAnswered) * 100) 
    : 0

  const tierTheme = getTierTheme(currentTier)
  const tierEffects = getTierSpecialEffects(currentTier)
  
  // Testing function to manually set tier
  const handleTierChange = (tierId: string) => {
    const selectedTier = TIERS.find(t => t.id === tierId)
    if (selectedTier) {
      // Use the testing tier functionality to persist across navigation
      setTestingTier(selectedTier)
    }
  }

  return (
    <div className={`min-h-screen ${tierTheme.background} relative`}>
      {/* Progressive Enhanced Background */}
      <BackgroundRenderer tier={currentTier} />
      {/* Testing: Tier Selector */}
      <div className="absolute bottom-4 right-4 z-40 max-w-xs">
        <div className={`${tierTheme.card} rounded-lg shadow-xl ${tierTheme.border} border-2 p-3 inline-block`}>
          <label className={`block text-xs ${tierTheme.text} opacity-70 mb-1`}>
            Testing: Select Tier
          </label>
          <select
            value={currentTier.id}
            onChange={(e) => handleTierChange(e.target.value)}
            className={`
              text-sm px-2 py-1 rounded border ${tierTheme.border} 
              ${tierTheme.background} ${tierTheme.text}
              focus:outline-none focus:ring-2 focus:ring-opacity-50
            `}
          >
            {TIERS.map(tier => (
              <option key={tier.id} value={tier.id}>
                {tier.emoji} {tier.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      {/* Tier Badge */}
      <div className="absolute top-4 left-4 z-40 max-w-sm">
        <div className={`${tierTheme.card} rounded-full shadow-xl ${tierTheme.border} border-2 p-3 flex items-center gap-3 inline-flex ${tierEffects.cardHover}`}>
          <TierBadge tier={currentTier} points={totalPoints} compact={true} />
          <div>
            <p className={`text-xs ${tierTheme.accent} opacity-75`}>Current Tier</p>
            <p className={`font-bold ${tierTheme.text}`}>{currentTier.name}</p>
          </div>
          <button
            onClick={() => setShowAchievements(true)}
            className={`
              ml-2 px-2 py-1 rounded-md text-xs font-medium transition-all duration-300
              ${tierTheme.text} hover:${tierTheme.card}
              border ${tierTheme.border} hover:scale-105 hover:shadow-lg
              group relative overflow-hidden
            `}
          >
            <span className="relative z-10">🏆</span>
            <div className={`
              absolute inset-0 bg-gradient-to-r ${tierTheme.gradient} opacity-0 
              group-hover:opacity-20 transition-opacity duration-300
            `} />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex items-center justify-center min-h-screen p-4 relative z-10">
        <div className="max-w-md w-full">
          {/* Enhanced Card with tier-specific gradient border */}
          <div className="relative">
            <div className={`absolute inset-0 bg-gradient-to-r ${tierTheme.gradient} rounded-2xl blur-xl opacity-30`}></div>
            <Card variant="elevated" className={`relative ${tierTheme.card} rounded-2xl shadow-2xl ${tierTheme.border} border-2 ${tierEffects.cardHover}`}>
              <div className="text-center space-y-6">
                <div>
                  <h1 className={`text-3xl font-bold ${tierTheme.text}`}>Project Vulcan</h1>
                  <p className={`${tierTheme.accent} mt-2 opacity-80`}>
                    Voice-enabled flashcard study tool
                  </p>
                </div>

                {/* Stats Summary with tier colors */}
                <div className="mb-6 grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <p className={`text-3xl font-bold bg-gradient-to-r ${tierTheme.gradient} bg-clip-text text-transparent`}>
                      {totalPoints.toLocaleString()}
                    </p>
                    <p className={`text-xs ${tierTheme.accent} opacity-75`}>Total Points</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-green-600">{accuracy}%</p>
                    <p className={`text-xs ${tierTheme.accent} opacity-75`}>Accuracy</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-orange-600">{bestStreak}</p>
                    <p className={`text-xs ${tierTheme.accent} opacity-75`}>Best Streak</p>
                  </div>
                </div>

          {uploadError && (
            <Alert variant="error">
              {uploadError}
            </Alert>
          )}

          {!isDeckLoaded ? (
            <div className="space-y-4">
              {/* Saved Decks Section */}
              {savedDecks.length > 0 && (
                <div className="space-y-3">
                  <h3 className={`text-sm font-medium ${tierTheme.text}`}>Previously Used Decks</h3>
                  <div className="space-y-2">
                    <Select
                      value={selectedDeckId}
                      onChange={(e) => setSelectedDeckId(e.target.value)}
                      disabled={isProcessing}
                    >
                      <option value="">Select a saved deck...</option>
                      {savedDecks.map((deck) => (
                        <option key={deck.id} value={deck.id}>
                          {deck.name} ({deck.cards.length} questions)
                        </option>
                      ))}
                    </Select>
                    
                    {selectedDeckId && (
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleSavedDeckSelect(selectedDeckId)}
                          disabled={!selectedDeckId}
                          className={`
                            flex-1 px-4 py-2 rounded-md font-medium text-white text-sm
                            bg-gradient-to-r ${tierTheme.gradient} 
                            hover:shadow-lg hover:scale-105 
                            disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
                            transition-all duration-300 relative overflow-hidden group
                          `}
                        >
                          <span className="relative z-10">Load Selected Deck</span>
                          <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                        </button>
                        <Button
                          variant="danger"
                          onClick={(e) => handleDeleteSavedDeck(selectedDeckId, e)}
                          size="md"
                        >
                          Delete
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              )}
              
              {/* Upload New Deck Section */}
              <div className="space-y-3">
                {savedDecks.length > 0 && (
                  <div className="flex items-center">
                    <div className="flex-1 border-t border-gray-300"></div>
                    <span className="px-3 text-sm text-gray-500">or</span>
                    <div className="flex-1 border-t border-gray-300"></div>
                  </div>
                )}
                
                <div>
                  <input
                    type="file"
                    accept=".csv"
                    onChange={handleFileSelect}
                    disabled={isProcessing}
                    className="hidden"
                    id="csv-upload"
                  />
                  <label htmlFor="csv-upload">
                    <span
                      className={`
                        w-full px-6 py-3 rounded-md font-medium text-white cursor-pointer
                        bg-gradient-to-r ${tierTheme.gradient} 
                        hover:shadow-lg hover:scale-105 
                        ${isProcessing ? 'opacity-50 cursor-not-allowed hover:scale-100' : ''}
                        transition-all duration-300 relative overflow-hidden group
                        flex items-center justify-center text-base
                      `}
                    >
                      <span className="relative z-10">
                        {isProcessing ? 'Processing...' : 'Upload New Study Deck (CSV)'}
                      </span>
                      <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                    </span>
                  </label>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <Alert variant="success">
                {currentDeckName ? (
                  <>Deck "{currentDeckName}" loaded successfully! {totalQuestions} questions ready.</>
                ) : (
                  <>Deck loaded successfully! {totalQuestions} questions ready.</>
                )}
              </Alert>
              
              {/* Quiz Mode Selection */}
              <div className="space-y-3">
                <h3 className={`text-sm font-medium ${tierTheme.text}`}>Quiz Mode</h3>
                <div className="space-y-2">
                  <label className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="quizMode"
                      value="single-cycle"
                      checked={quizMode === 'single-cycle'}
                      onChange={(e) => setQuizMode(e.target.value as 'single-cycle')}
                      className="w-4 h-4 text-blue-600"
                    />
                    <div className="flex-1">
                      <div className={`text-sm font-medium ${tierTheme.text}`}>Single Cycle</div>
                      <div className={`text-xs ${tierTheme.text} opacity-70`}>Go through each question once, then end</div>
                    </div>
                  </label>
                  <label className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="quizMode"
                      value="infinite"
                      checked={quizMode === 'infinite'}
                      onChange={(e) => setQuizMode(e.target.value as 'infinite')}
                      className="w-4 h-4 text-blue-600"
                    />
                    <div className="flex-1">
                      <div className={`text-sm font-medium ${tierTheme.text}`}>Infinite Practice</div>
                      <div className={`text-xs ${tierTheme.text} opacity-70`}>Keep practicing until stopped, repeat difficult questions</div>
                    </div>
                  </label>
                </div>
              </div>
              
              <div className="space-y-3">
                <button
                  onClick={handleStartQuiz}
                  className={`
                    w-full px-6 py-4 rounded-md font-medium text-white text-lg
                    bg-gradient-to-r ${tierTheme.gradient} 
                    hover:shadow-lg hover:scale-105 
                    transition-all duration-300 relative overflow-hidden group
                  `}
                >
                  <span className="relative z-10">
                    Start {quizMode === 'single-cycle' ? 'Single Cycle' : 'Infinite'} Quiz
                  </span>
                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                </button>
                
                <Button 
                  variant="secondary"
                  onClick={handleClearDeck}
                  size="md"
                  className="w-full"
                >
                  Load Different Deck
                </Button>
              </div>
            </div>
          )}

                <div className={`text-sm ${tierTheme.text} opacity-70`}>
                  <p>Upload a CSV file with two columns:</p>
                  <p className="font-mono text-xs mt-1">Question, Answer</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Quick Achievements Preview */}
          {recentAchievements.length > 0 && (
            <div className="mt-6 bg-white rounded-xl shadow-lg p-4">
              <h3 className="font-semibold text-gray-700 mb-3">Recent Achievements</h3>
              <div className="flex gap-2 overflow-x-auto pb-2">
                {recentAchievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-yellow-100 to-orange-100 rounded-lg flex items-center justify-center shadow-md hover:scale-110 transition-transform cursor-pointer"
                    title={achievement.name}
                  >
                    <span className="text-2xl">{achievement.emoji}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Achievement Gallery Modal */}
      <AchievementGallery 
        isOpen={showAchievements}
        onClose={() => setShowAchievements(false)}
      />
    </div>
  )
}