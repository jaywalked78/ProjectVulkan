import { type SavedDeck } from '@/types'
import { generateId } from './utils'

const STORAGE_KEY = 'vulcan-saved-decks'

export interface DeckStorageUtils {
  getSavedDecks: () => SavedDeck[]
  saveDeck: (name: string, fileName: string, cards: SavedDeck['cards']) => SavedDeck
  deleteDeck: (deckId: string) => void
  updateDeckLastUsed: (deckId: string) => void
  getDeckById: (deckId: string) => SavedDeck | null
  saveDecksToStorage: (decks: SavedDeck[]) => void
}

export const deckStorage: DeckStorageUtils = {
  getSavedDecks(): SavedDeck[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (!stored) return []
      
      const decks = JSON.parse(stored) as SavedDeck[]
      // Sort by last used, most recent first
      return decks.sort((a, b) => new Date(b.lastUsed).getTime() - new Date(a.lastUsed).getTime())
    } catch (error) {
      console.error('Failed to load saved decks:', error)
      return []
    }
  },

  saveDeck(name: string, fileName: string, cards: SavedDeck['cards']): SavedDeck {
    const existingDecks = this.getSavedDecks()
    
    // Check if deck with same name already exists
    const existingDeck = existingDecks.find(deck => deck.name === name)
    if (existingDeck) {
      // Update existing deck
      existingDeck.cards = cards
      existingDeck.fileName = fileName
      existingDeck.lastUsed = new Date().toISOString()
      
      this.saveDecksToStorage(existingDecks)
      return existingDeck
    }
    
    // Create new deck
    const newDeck: SavedDeck = {
      id: generateId(),
      name,
      fileName,
      cards,
      createdAt: new Date().toISOString(),
      lastUsed: new Date().toISOString()
    }
    
    const updatedDecks = [newDeck, ...existingDecks]
    // Keep only the 10 most recent decks to avoid localStorage bloat
    const trimmedDecks = updatedDecks.slice(0, 10)
    
    this.saveDecksToStorage(trimmedDecks)
    return newDeck
  },

  deleteDeck(deckId: string): void {
    const existingDecks = this.getSavedDecks()
    const filteredDecks = existingDecks.filter(deck => deck.id !== deckId)
    this.saveDecksToStorage(filteredDecks)
  },

  updateDeckLastUsed(deckId: string): void {
    const existingDecks = this.getSavedDecks()
    const deck = existingDecks.find(d => d.id === deckId)
    
    if (deck) {
      deck.lastUsed = new Date().toISOString()
      this.saveDecksToStorage(existingDecks)
    }
  },

  getDeckById(deckId: string): SavedDeck | null {
    const decks = this.getSavedDecks()
    return decks.find(deck => deck.id === deckId) || null
  },

  saveDecksToStorage(decks: SavedDeck[]): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(decks))
    } catch (error) {
      console.error('Failed to save decks to localStorage:', error)
    }
  }
}

// Helper function to generate a deck name from filename
export function generateDeckName(fileName: string): string {
  // Remove file extension and clean up the name
  const nameWithoutExt = fileName.replace(/\.csv$/i, '')
  
  // Replace underscores and hyphens with spaces, capitalize words
  return nameWithoutExt
    .replace(/[_-]/g, ' ')
    .replace(/\b\w/g, letter => letter.toUpperCase())
    .trim()
}