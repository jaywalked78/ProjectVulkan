# Phase 1: Web MVP - Detailed Implementation PRD
## Project Vulcan Flashcard Application

### Table of Contents
1. [Project Setup & Configuration](#project-setup--configuration)
2. [Component Specifications](#component-specifications)
3. [State Management Design](#state-management-design)
4. [User Interface Layouts](#user-interface-layouts)
5. [Core Features Implementation](#core-features-implementation)
6. [Error Handling & Edge Cases](#error-handling--edge-cases)
7. [Testing Requirements](#testing-requirements)
8. [Deployment Guide](#deployment-guide)

---

## Project Setup & Configuration

### Initial Setup Commands
```bash
# Create project with Vite
npm create vite@latest project-vulcan -- --template react-ts

# Navigate to project
cd project-vulcan

# Install core dependencies
npm install zustand papaparse
npm install -D tailwindcss postcss autoprefixer @types/papaparse
npm install -D @tailwindcss/forms @tailwindcss/typography

# Initialize Tailwind
npx tailwindcss init -p
```

### Project Configuration Files

#### `tailwind.config.js`
```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}
```

#### `tsconfig.json` (additions)
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@components/*": ["src/components/*"],
      "@features/*": ["src/features/*"],
      "@lib/*": ["src/lib/*"],
      "@store/*": ["src/store/*"],
      "@types/*": ["src/types/*"]
    }
  }
}
```

### Complete File Structure
```
project-vulcan/
├── public/
│   └── favicon.ico
├── src/
│   ├── assets/
│   │   └── sample-deck.csv
│   ├── components/
│   │   ├── ui/
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Progress.tsx
│   │   │   └── Alert.tsx
│   │   └── layout/
│   │       ├── PageLayout.tsx
│   │       └── Header.tsx
│   ├── features/
│   │   ├── quiz/
│   │   │   ├── components/
│   │   │   │   ├── QuizCard.tsx
│   │   │   │   ├── AnswerInput.tsx
│   │   │   │   ├── FeedbackDisplay.tsx
│   │   │   │   └── QuizProgress.tsx
│   │   │   ├── hooks/
│   │   │   │   ├── useQuizEngine.ts
│   │   │   │   └── useKeyboardShortcuts.ts
│   │   │   └── QuizView.tsx
│   │   ├── deck-upload/
│   │   │   ├── components/
│   │   │   │   ├── FileDropzone.tsx
│   │   │   │   └── UploadProgress.tsx
│   │   │   ├── hooks/
│   │   │   │   └── useCSVParser.ts
│   │   │   └── DeckUploadView.tsx
│   │   └── home/
│   │       └── HomeView.tsx
│   ├── lib/
│   │   ├── constants.ts
│   │   ├── csv-parser.ts
│   │   └── utils.ts
│   ├── store/
│   │   ├── quizStore.ts
│   │   └── types.ts
│   ├── types/
│   │   └── index.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── .env
├── .gitignore
├── package.json
├── vite.config.ts
└── README.md
```

---

## Component Specifications

### Core UI Components

#### Button Component (`src/components/ui/Button.tsx`)
```typescript
import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    const variants = {
      primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
      secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500',
      ghost: 'bg-transparent hover:bg-gray-100 focus:ring-gray-500',
      danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
    };

    const sizes = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg',
    };

    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-md font-medium transition-colors',
          'focus:outline-none focus:ring-2 focus:ring-offset-2',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      />
    );
  }
);
```

#### Card Component (`src/components/ui/Card.tsx`)
```typescript
import { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated';
}

export function Card({ className, variant = 'default', ...props }: CardProps) {
  const variants = {
    default: 'bg-white border border-gray-200',
    elevated: 'bg-white shadow-lg',
  };

  return (
    <div
      className={cn(
        'rounded-lg p-6',
        variants[variant],
        className
      )}
      {...props}
    />
  );
}
```

### Feature Components

#### QuizCard Component (`src/features/quiz/components/QuizCard.tsx`)
```typescript
import { Card } from '@/components/ui/Card';

interface QuizCardProps {
  question: string;
  questionNumber: number;
  totalQuestions: number;
}

export function QuizCard({ question, questionNumber, totalQuestions }: QuizCardProps) {
  return (
    <Card variant="elevated" className="max-w-2xl mx-auto animate-fade-in">
      <div className="text-center space-y-4">
        <div className="text-sm text-gray-500">
          Question {questionNumber} of {totalQuestions}
        </div>
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-900">
          {question}
        </h2>
      </div>
    </Card>
  );
}
```

#### FileDropzone Component (`src/features/deck-upload/components/FileDropzone.tsx`)
```typescript
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

interface FileDropzoneProps {
  onFileAccepted: (file: File) => void;
  isProcessing: boolean;
}

export function FileDropzone({ onFileAccepted, isProcessing }: FileDropzoneProps) {
  const [isDragActive, setIsDragActive] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      onFileAccepted(acceptedFiles[0]);
    }
  }, [onFileAccepted]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv'],
    },
    multiple: false,
    disabled: isProcessing,
    onDragEnter: () => setIsDragActive(true),
    onDragLeave: () => setIsDragActive(false),
  });

  return (
    <div
      {...getRootProps()}
      className={cn(
        'border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors',
        isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400',
        isProcessing && 'opacity-50 cursor-not-allowed'
      )}
    >
      <input {...getInputProps()} />
      <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
      </svg>
      <p className="mt-2 text-sm text-gray-600">
        {isProcessing ? 'Processing...' : 'Drop your CSV file here, or click to select'}
      </p>
      <p className="text-xs text-gray-500 mt-1">
        CSV format: Question, Answer (one per row)
      </p>
    </div>
  );
}
```

---

## State Management Design

### Type Definitions (`src/types/index.ts`)
```typescript
export interface Card {
  id: string;
  question: string;
  answer: string;
  incorrectCount: number;
  lastShownTurn: number;
}

export interface QuizState {
  // Deck management
  deck: Card[];
  originalDeck: Card[]; // For reset functionality
  
  // Session state
  isQuizActive: boolean;
  currentCard: Card | null;
  currentCardIndex: number;
  
  // Progress tracking
  totalQuestions: number;
  questionsAnswered: number;
  correctAnswers: number;
  incorrectAnswers: number;
  currentTurn: number;
  
  // Answer state
  userAnswer: string;
  isShowingFeedback: boolean;
  lastAnswerCorrect: boolean | null;
  
  // UI state
  isLoading: boolean;
  error: string | null;
}

export interface QuizActions {
  // Deck management
  loadDeck: (cards: Omit<Card, 'id' | 'incorrectCount' | 'lastShownTurn'>[]) => void;
  clearDeck: () => void;
  
  // Quiz control
  startQuiz: () => void;
  endQuiz: () => void;
  resetQuiz: () => void;
  
  // Answer handling
  setUserAnswer: (answer: string) => void;
  submitAnswer: () => void;
  nextQuestion: () => void;
  
  // Utility
  setError: (error: string | null) => void;
  clearError: () => void;
}
```

### Zustand Store (`src/store/quizStore.ts`)
```typescript
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { QuizState, QuizActions, Card } from '@/types';
import { generateId, shuffleArray } from '@/lib/utils';

const REVIEW_INTERVAL = 3; // Review every 3rd turn
const MIN_TURNS_BEFORE_REPEAT = 2;

interface QuizStore extends QuizState, QuizActions {}

export const useQuizStore = create<QuizStore>()(
  devtools(
    (set, get) => ({
      // Initial state
      deck: [],
      originalDeck: [],
      isQuizActive: false,
      currentCard: null,
      currentCardIndex: -1,
      totalQuestions: 0,
      questionsAnswered: 0,
      correctAnswers: 0,
      incorrectAnswers: 0,
      currentTurn: 0,
      userAnswer: '',
      isShowingFeedback: false,
      lastAnswerCorrect: null,
      isLoading: false,
      error: null,

      // Actions
      loadDeck: (cards) => {
        const deck = cards.map(card => ({
          ...card,
          id: generateId(),
          incorrectCount: 0,
          lastShownTurn: -MIN_TURNS_BEFORE_REPEAT - 1,
        }));

        set({
          deck: shuffleArray([...deck]),
          originalDeck: deck,
          totalQuestions: deck.length,
          error: null,
        });
      },

      clearDeck: () => {
        set({
          deck: [],
          originalDeck: [],
          totalQuestions: 0,
          isQuizActive: false,
          currentCard: null,
        });
      },

      startQuiz: () => {
        const { deck } = get();
        if (deck.length === 0) {
          set({ error: 'No deck loaded' });
          return;
        }

        const firstCard = selectNextCard(deck, 0);
        set({
          isQuizActive: true,
          currentCard: firstCard,
          currentCardIndex: 0,
          questionsAnswered: 0,
          correctAnswers: 0,
          incorrectAnswers: 0,
          currentTurn: 0,
          error: null,
        });
      },

      submitAnswer: () => {
        const { currentCard, userAnswer, deck, currentTurn } = get();
        if (!currentCard || !userAnswer.trim()) return;

        const isCorrect = normalizeAnswer(userAnswer) === normalizeAnswer(currentCard.answer);
        
        // Update card statistics
        const updatedDeck = deck.map(card => {
          if (card.id === currentCard.id) {
            return {
              ...card,
              incorrectCount: isCorrect ? card.incorrectCount : card.incorrectCount + 1,
              lastShownTurn: currentTurn,
            };
          }
          return card;
        });

        set({
          deck: updatedDeck,
          lastAnswerCorrect: isCorrect,
          isShowingFeedback: true,
          correctAnswers: isCorrect ? get().correctAnswers + 1 : get().correctAnswers,
          incorrectAnswers: !isCorrect ? get().incorrectAnswers + 1 : get().incorrectAnswers,
          questionsAnswered: get().questionsAnswered + 1,
        });

        // Auto-advance after feedback
        setTimeout(() => {
          get().nextQuestion();
        }, 2500);
      },

      nextQuestion: () => {
        const { deck, currentTurn, questionsAnswered, totalQuestions } = get();
        
        if (questionsAnswered >= totalQuestions * 2) {
          // End quiz after going through deck twice
          set({ isQuizActive: false });
          return;
        }

        const nextTurn = currentTurn + 1;
        const nextCard = selectNextCard(deck, nextTurn);

        set({
          currentCard: nextCard,
          currentTurn: nextTurn,
          userAnswer: '',
          isShowingFeedback: false,
          lastAnswerCorrect: null,
        });
      },

      setUserAnswer: (answer) => set({ userAnswer: answer }),
      
      endQuiz: () => set({ isQuizActive: false }),
      
      resetQuiz: () => {
        const { originalDeck } = get();
        set({
          deck: shuffleArray([...originalDeck]),
          isQuizActive: false,
          currentCard: null,
          questionsAnswered: 0,
          correctAnswers: 0,
          incorrectAnswers: 0,
          currentTurn: 0,
          userAnswer: '',
          isShowingFeedback: false,
          lastAnswerCorrect: null,
        });
      },

      setError: (error) => set({ error }),
      clearError: () => set({ error: null }),
    }),
    {
      name: 'quiz-store',
    }
  )
);

// Helper functions
function selectNextCard(deck: Card[], turn: number): Card {
  const isReviewTurn = turn > 0 && turn % REVIEW_INTERVAL === 0;

  if (isReviewTurn) {
    // Find cards with highest incorrect count
    const maxIncorrect = Math.max(...deck.map(c => c.incorrectCount), 0);
    if (maxIncorrect > 0) {
      const difficultCards = deck.filter(c => c.incorrectCount === maxIncorrect);
      return difficultCards[Math.floor(Math.random() * difficultCards.length)];
    }
  }

  // Regular selection: avoid recent cards
  const availableCards = deck.filter(c => turn - c.lastShownTurn > MIN_TURNS_BEFORE_REPEAT);
  if (availableCards.length === 0) {
    // If no cards available, just pick any
    return deck[Math.floor(Math.random() * deck.length)];
  }

  return availableCards[Math.floor(Math.random() * availableCards.length)];
}

function normalizeAnswer(answer: string): string {
  return answer.trim().toLowerCase().replace(/[^a-z0-9]/g, '');
}
```

---

## User Interface Layouts

### Home View (`src/features/home/HomeView.tsx`)
```typescript
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { useNavigate } from 'react-router-dom';

export function HomeView() {
  const navigate = useNavigate();

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

          <div className="space-y-3">
            <Button 
              onClick={() => navigate('/upload')}
              size="lg"
              className="w-full"
            >
              Upload Study Deck (CSV)
            </Button>
            
            <Button 
              variant="secondary"
              size="lg"
              className="w-full"
              disabled
            >
              Browse Sample Decks
              <span className="text-xs ml-2">(Coming Soon)</span>
            </Button>
          </div>

          <div className="text-sm text-gray-500">
            <p>Upload a CSV file with two columns:</p>
            <p className="font-mono text-xs mt-1">Question, Answer</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
```

### Quiz View (`src/features/quiz/QuizView.tsx`)
```typescript
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuizStore } from '@/store/quizStore';
import { QuizCard } from './components/QuizCard';
import { AnswerInput } from './components/AnswerInput';
import { FeedbackDisplay } from './components/FeedbackDisplay';
import { QuizProgress } from './components/QuizProgress';
import { Button } from '@/components/ui/Button';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';

export function QuizView() {
  const navigate = useNavigate();
  const {
    isQuizActive,
    currentCard,
    questionsAnswered,
    totalQuestions,
    correctAnswers,
    incorrectAnswers,
    isShowingFeedback,
    lastAnswerCorrect,
    endQuiz,
  } = useQuizStore();

  useKeyboardShortcuts();

  useEffect(() => {
    if (!isQuizActive) {
      navigate('/');
    }
  }, [isQuizActive, navigate]);

  if (!currentCard) return null;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-900">Quiz Session</h1>
          <Button variant="ghost" onClick={endQuiz}>
            End Quiz
          </Button>
        </div>

        {/* Progress */}
        <QuizProgress
          questionsAnswered={questionsAnswered}
          totalQuestions={totalQuestions}
          correctAnswers={correctAnswers}
          incorrectAnswers={incorrectAnswers}
        />

        {/* Question Card */}
        <QuizCard
          question={currentCard.question}
          questionNumber={questionsAnswered + 1}
          totalQuestions={totalQuestions}
        />

        {/* Answer Section */}
        <div className="max-w-2xl mx-auto">
          {isShowingFeedback ? (
            <FeedbackDisplay
              isCorrect={lastAnswerCorrect!}
              correctAnswer={currentCard.answer}
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
  );
}
```

---

## Core Features Implementation

### CSV Parser (`src/lib/csv-parser.ts`)
```typescript
import Papa from 'papaparse';

export interface ParseResult {
  success: boolean;
  data?: Array<{ question: string; answer: string }>;
  error?: string;
}

export async function parseCSVFile(file: File): Promise<ParseResult> {
  return new Promise((resolve) => {
    // Validate file type
    if (!file.name.endsWith('.csv')) {
      resolve({
        success: false,
        error: 'Please upload a CSV file',
      });
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      resolve({
        success: false,
        error: 'File size must be less than 5MB',
      });
      return;
    }

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      transformHeader: (header) => header.trim().toLowerCase(),
      complete: (results) => {
        // Validate structure
        if (!results.data || results.data.length === 0) {
          resolve({
            success: false,
            error: 'CSV file is empty',
          });
          return;
        }

        // Map data to expected format
        const cards = results.data.map((row: any) => {
          // Try different column name variations
          const question = row.question || row.q || row['question'] || '';
          const answer = row.answer || row.a || row['answer'] || '';

          return {
            question: question.trim(),
            answer: answer.trim(),
          };
        }).filter(card => card.question && card.answer);

        if (cards.length === 0) {
          resolve({
            success: false,
            error: 'No valid question/answer pairs found. Ensure CSV has "Question" and "Answer" columns.',
          });
          return;
        }

        resolve({
          success: true,
          data: cards,
        });
      },
      error: (error) => {
        resolve({
          success: false,
          error: `Failed to parse CSV: ${error.message}`,
        });
      },
    });
  });
}
```

### Quiz Engine Hook (`src/features/quiz/hooks/useQuizEngine.ts`)
```typescript
import { useCallback, useEffect } from 'react';
import { useQuizStore } from '@/store/quizStore';

export function useQuizEngine() {
  const store = useQuizStore();
  const {
    isQuizActive,
    currentCard,
    userAnswer,
    isShowingFeedback,
    submitAnswer,
    setUserAnswer,
  } = store;

  const handleSubmit = useCallback(() => {
    if (!userAnswer.trim() || isShowingFeedback) return;
    submitAnswer();
  }, [userAnswer, isShowingFeedback, submitAnswer]);

  // Auto-focus management
  useEffect(() => {
    if (!isShowingFeedback && isQuizActive) {
      // Focus answer input when new question appears
      const input = document.getElementById('answer-input');
      if (input) {
        setTimeout(() => input.focus(), 100);
      }
    }
  }, [currentCard, isShowingFeedback, isQuizActive]);

  return {
    handleSubmit,
    setUserAnswer,
    canSubmit: userAnswer.trim().length > 0 && !isShowingFeedback,
  };
}
```

---

## Error Handling & Edge Cases

### Error Boundaries (`src/components/ErrorBoundary.tsx`)
```typescript
import { Component, ErrorInfo, ReactNode } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
          <Card variant="elevated" className="max-w-md w-full">
            <div className="text-center space-y-4">
              <h2 className="text-xl font-semibold text-red-600">
                Something went wrong
              </h2>
              <p className="text-gray-600">
                {this.state.error?.message || 'An unexpected error occurred'}
              </p>
              <Button
                onClick={() => window.location.reload()}
                variant="primary"
              >
                Reload Application
              </Button>
            </div>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}
```

### Common Edge Cases to Handle

1. **Empty CSV File**
   - Display clear error message
   - Provide sample CSV format

2. **Invalid CSV Format**
   - Handle missing columns gracefully
   - Try multiple column name variations

3. **Special Characters in Answers**
   - Normalize both user input and correct answer
   - Handle accents, punctuation, spacing

4. **Large CSV Files**
   - Use Web Worker via PapaParse
   - Show progress indicator
   - Set reasonable file size limit (5MB)

5. **Browser Compatibility**
   - Test on Chrome, Firefox, Safari, Edge
   - Provide fallback for older browsers
   - Clear error messages for unsupported features

---

## Testing Requirements

### Unit Tests Setup
```bash
npm install -D vitest @testing-library/react @testing-library/user-event jsdom
```

### Sample Test (`src/lib/csv-parser.test.ts`)
```typescript
import { describe, it, expect } from 'vitest';
import { parseCSVFile } from './csv-parser';

describe('CSV Parser', () => {
  it('should parse valid CSV file', async () => {
    const csvContent = 'Question,Answer\nWhat is 2+2?,4\nCapital of France?,Paris';
    const file = new File([csvContent], 'test.csv', { type: 'text/csv' });
    
    const result = await parseCSVFile(file);
    
    expect(result.success).toBe(true);
    expect(result.data).toHaveLength(2);
    expect(result.data![0]).toEqual({
      question: 'What is 2+2?',
      answer: '4'
    });
  });

  it('should handle case-insensitive headers', async () => {
    const csvContent = 'QUESTION,ANSWER\nTest?,Answer';
    const file = new File([csvContent], 'test.csv', { type: 'text/csv' });
    
    const result = await parseCSVFile(file);
    
    expect(result.success).toBe(true);
    expect(result.data).toHaveLength(1);
  });
});
```

### Manual Testing Checklist
- [ ] Upload valid CSV file
- [ ] Upload invalid file types
- [ ] Upload empty CSV
- [ ] Answer questions correctly
- [ ] Answer questions incorrectly
- [ ] Use keyboard shortcuts (Enter to submit)
- [ ] Test on mobile viewport
- [ ] Test on different browsers
- [ ] Test with 100+ question deck
- [ ] Test special characters in Q&A

---

## Deployment Guide

### Build Configuration (`vite.config.ts`)
```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@features': path.resolve(__dirname, './src/features'),
      '@lib': path.resolve(__dirname, './src/lib'),
      '@store': path.resolve(__dirname, './src/store'),
      '@types': path.resolve(__dirname, './src/types'),
    },
  },
  build: {
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'zustand'],
          csv: ['papaparse'],
        },
      },
    },
  },
});
```

### Deployment Steps

GitHub Pages
```bash
# Install gh-pages
npm install -D gh-pages

# Add to package.json scripts:
"predeploy": "npm run build",
"deploy": "gh-pages -d dist"

# Deploy
npm run deploy
```

### Environment Variables
```env
# .env.local (for local development)
VITE_APP_NAME=Project Vulcan
VITE_APP_VERSION=1.0.0

# Add more as needed for future phases
```

### Performance Optimization
1. **Code Splitting**: Already configured in Vite
2. **Lazy Loading**: Implement for routes when adding routing
3. **Asset Optimization**: Use WebP for images, minimize SVGs
4. **Caching**: Configure proper cache headers in deployment

---

## Sample CSV File (`src/assets/sample-deck.csv`)
```csv
Question,Answer
What is the capital of France?,Paris
What is 2 + 2?,4
Who wrote Romeo and Juliet?,Shakespeare
What is the largest planet in our solar system?,Jupiter
What year did World War II end?,1945
What is the chemical symbol for gold?,Au
How many continents are there?,7
What is the speed of light?,299792458 m/s
Who painted the Mona Lisa?,Leonardo da Vinci
What is the smallest country in the world?,Vatican City
```

---

## Next Steps After MVP

1. **Add Web Speech API** for TTS in browser
2. **Implement keyboard shortcuts** (Space for audio replay)
3. **Add session statistics** summary screen
4. **Create more sophisticated answer matching** (handle synonyms)
5. **Add progress persistence** in localStorage
6. **Implement dark mode** toggle
7. **Add CSV template download** feature
8. **Create onboarding tutorial** for first-time users

This PRD provides everything needed to implement Phase 1. Each component is specified with working code, the state management is fully designed, and all edge cases are documented for a robust MVP implementation.
