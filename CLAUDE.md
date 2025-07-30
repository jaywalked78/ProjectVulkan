# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Project Vulcan is a voice-enabled flashcard study application built with React + TypeScript + Vite. The app allows users to upload CSV files containing question/answer pairs and quiz themselves with an intelligent learning algorithm that prioritizes difficult questions.

## Key Commands

### Development
- `npm run dev` - Start development server (runs on port 1113)
- `npm run build` - Build for production (TypeScript compilation + Vite build)
- `npm run lint` - Run ESLint on all TypeScript/TSX files
- `npm run preview` - Preview production build locally

### Testing
No test framework is currently configured. Check with the user before adding tests.

## Architecture Overview

### State Management
- **Zustand** store in `src/store/quizStore.ts` manages all quiz state
- Key state includes: deck, currentCard, progress tracking, answer validation
- No external persistence - all state is in-memory during sessions

### Key Components Structure
```
src/
├── features/           # Feature-based organization
│   ├── quiz/          # Core quiz functionality
│   ├── deck-upload/   # CSV upload and parsing
│   └── home/          # Landing page
├── components/ui/     # Reusable UI components
├── store/             # Zustand state management
├── lib/               # Utilities (CSV parsing, utils)
└── types/             # TypeScript definitions
```

### Import Aliases
Configured in `vite.config.ts`:
- `@/` → `./src/`
- `@components/` → `./src/components/`
- `@features/` → `./src/features/`
- `@lib/` → `./src/lib/`
- `@store/` → `./src/store/`
- `@types/` → `./src/types/`

## Learning Algorithm

The quiz engine implements an intelligent review system:
- **Review priority**: Cards scheduled for review (after random 3-10 question delay when answered incorrectly)
- **Sequential order**: New questions appear in original order, reviews maintain original question numbers
- **Completion logic**: Single-cycle mode requires ALL questions answered correctly before ending
- Cards track `originalQuestionNumber`, `incorrectCount`, `lastShownTurn`, `nextReviewTurn`, and `hasBeenAnsweredCorrectly`

## Quiz Modes

Two quiz modes with different completion logic:
- **Single Cycle**: Must answer all questions correctly. Incorrect questions loop back maintaining original numbers (e.g., "Question 4 of 10" returns as "Question 4 of 10")
- **Infinite Practice**: Continue indefinitely, focusing on missed questions with total attempt tracking

## Progress Tracking

Progress shows unique questions answered vs. total questions:
- `uniqueQuestionsAnswered`: Number of questions answered correctly at least once
- `questionsAnswered`: Total number of questions attempted
- Progress bar and display adapt based on quiz mode

## Deck Persistence

Uploaded CSV files are automatically saved to localStorage for future use:
- **Auto-save**: CSV files are saved with generated names based on filename
- **Deck management**: Users can select from previously used decks or upload new ones
- **Storage limit**: Maximum 10 saved decks to prevent localStorage bloat
- **Deck metadata**: Tracks name, filename, creation date, and last used timestamp

### Storage Structure
- Key: `vulcan-saved-decks`
- Format: Array of `SavedDeck` objects with id, name, fileName, cards, timestamps
- Utility functions in `src/lib/deck-storage.ts` handle all persistence operations

## CSV Format Requirements

Expected CSV structure:
- Two columns: "Question" and "Answer" (case-insensitive, supports variations like "q"/"a")
- Headers optional
- File size limit: 5MB
- Parsing handled by PapaParse library

## Technology Stack

### Core
- **React 18** with TypeScript
- **Vite** for build tooling
- **Tailwind CSS** for styling
- **Zustand** for state management

### Key Dependencies
- `papaparse` - CSV parsing
- `clsx` + `tailwind-merge` - Conditional CSS classes
- No routing library (single page app)
- No test framework currently configured

## Development Notes

### Code Style
- Uses ESLint with TypeScript configuration
- Tailwind utility classes for styling
- Functional components with hooks
- No class components

### Future Phases
This is Phase 1 (Web MVP). Planned phases include:
- Phase 2: Mobile port via Capacitor
- Phase 3: Voice integration (TTS/STT)
- Phase 4: Backend with user accounts and persistence

## File Locations

### Key Files
- `src/store/quizStore.ts` - Central state management
- `src/lib/csv-parser.ts` - CSV parsing logic
- `src/types/index.ts` - TypeScript type definitions
- `PRDs/vulcan-unified-prd.md` - Complete product requirements

### Configuration
- `vite.config.ts` - Build configuration with aliases
- `eslint.config.js` - Linting rules
- `tailwind.config.js` - Styling configuration (if present)