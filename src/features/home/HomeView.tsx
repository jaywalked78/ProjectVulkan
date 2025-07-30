import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Alert } from '@/components/ui/Alert'
import { Select } from '@/components/ui/Select'
import { useQuizStore } from '@/store/quizStore'
import { parseCSVFile } from '@/lib/csv-parser'

export function HomeView() {
  const [isDeckLoaded, setIsDeckLoaded] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const [selectedDeckId, setSelectedDeckId] = useState('')
  
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

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card variant="elevated" className="max-w-md w-full">
        <div className="text-center space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Project Vulcan</h1>
            <p className="text-gray-600 mt-2">
              Voice-enabled flashcard study tool
            </p>
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
                  <h3 className="text-sm font-medium text-gray-700">Previously Used Decks</h3>
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
                        <Button
                          onClick={() => handleSavedDeckSelect(selectedDeckId)}
                          size="md"
                          className="flex-1"
                          disabled={!selectedDeckId}
                        >
                          Load Selected Deck
                        </Button>
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
                    <Button 
                      as="span"
                      size="lg"
                      className="w-full cursor-pointer"
                      disabled={isProcessing}
                    >
                      {isProcessing ? 'Processing...' : 'Upload New Study Deck (CSV)'}
                    </Button>
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
                <h3 className="text-sm font-medium text-gray-700">Quiz Mode</h3>
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
                      <div className="text-sm font-medium text-gray-900">Single Cycle</div>
                      <div className="text-xs text-gray-500">Go through each question once, then end</div>
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
                      <div className="text-sm font-medium text-gray-900">Infinite Practice</div>
                      <div className="text-xs text-gray-500">Keep practicing until stopped, repeat difficult questions</div>
                    </div>
                  </label>
                </div>
              </div>
              
              <div className="space-y-3">
                <Button 
                  onClick={handleStartQuiz}
                  size="lg"
                  className="w-full"
                >
                  Start {quizMode === 'single-cycle' ? 'Single Cycle' : 'Infinite'} Quiz
                </Button>
                
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

          <div className="text-sm text-gray-500">
            <p>Upload a CSV file with two columns:</p>
            <p className="font-mono text-xs mt-1">Question, Answer</p>
          </div>
        </div>
      </Card>
    </div>
  )
}