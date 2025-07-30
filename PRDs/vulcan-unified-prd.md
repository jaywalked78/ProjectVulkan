# Project Vulcan: Unified Product Requirements Document
## Voice-Enabled Flashcard Study Application

### Executive Summary

Project Vulcan is a voice-interactive flashcard study tool designed to quiz users in a hands-free, auditory manner. Inspired by the Vulcan learning booths in Star Trek, the application will read questions aloud and evaluate user answers in real-time. The project follows a phased approach: starting with a web-based MVP, porting to mobile via Capacitor, then adding voice features using native device capabilities.

### Table of Contents
1. [Project Overview](#project-overview)
2. [Phase 1: Web MVP Requirements](#phase-1-web-mvp-requirements)
3. [Phase 2: Mobile Port Strategy](#phase-2-mobile-port-strategy)
4. [Phase 3: Voice Integration](#phase-3-voice-integration)
5. [Phase 4: Backend & Scaling](#phase-4-backend--scaling)
6. [Technical Architecture](#technical-architecture)
7. [Implementation Timeline](#implementation-timeline)

---

## Project Overview

### Vision Statement
Create a hands-free, voice-driven study tool that simulates an interactive Q&A session, enabling active recall practice through auditory learning.

### Core Objectives
1. **Active Recall Learning**: Interactive Q&A with immediate feedback
2. **Simple User Experience**: Clean, intuitive interface with minimal setup
3. **Multimodal Interaction**: Text input evolving to voice I/O
4. **Custom Study Content**: CSV upload for personalized flashcard sets
5. **Smart Progress Tracking**: Prioritize questions based on performance
6. **Future Gamification**: Points system foundation for engagement

### Target Users
- Primary: Individual learner (app creator) for personal study
- Secondary: Students and self-learners using flashcards for memorization
- Future: Broader audience via app stores

---

## Phase 1: Web MVP Requirements

### User Journey

1. **Landing Page**
   - Clean, minimalist interface
   - Primary CTA: "Upload Study Deck (CSV)"
   
2. **Data Upload**
   - File picker for CSV selection
   - Automatic parsing and validation
   
3. **Pre-Quiz Setup**
   - Display "Start Quiz" button
   - Show deck name and card count
   
4. **Quiz Flow**
   - Display one question at a time
   - Text input field for answers
   - Submit via Enter key or button
   
5. **Feedback Loop**
   - Immediate validation (case-insensitive, trimmed)
   - Visual feedback: Green for correct, Red for incorrect
   - Show correct answer if wrong
   - Auto-advance after 2-3 seconds
   
6. **Session Management**
   - In-memory state (no persistence)
   - Session ends on tab close/refresh

### Functional Requirements

#### FR-1: CSV Upload & Parsing
- **Input**: Two-column CSV (Question, Answer)
- **Parsing**: Handle optional header row
- **Format**: Support basic CSV without complex escaping
- **Error Handling**: Display clear error messages for invalid files

#### FR-2: Quiz Engine
- **State Management**: Track current question, user progress, incorrect counts
- **Question Selection**: Hybrid algorithm (see Learning Engine below)
- **Answer Validation**: Case-insensitive, whitespace-trimmed exact match
- **Session Scope**: All data stored in browser memory

#### FR-3: User Interface
- **Components**:
  - Upload component with drag-and-drop support
  - Quiz card displaying current question
  - Answer input with submit button
  - Feedback banner for correct/incorrect
  - Progress indicator (Question X of Y)
  - Score display (future-ready)
  
#### FR-4: No Authentication
- Fully anonymous experience
- No user accounts or data persistence

### Learning Engine - MVP Algorithm

#### Data Structure
```javascript
{
  question: string,
  answer: string,
  incorrect_count: number, // Initialized to 0
  last_shown_turn: number  // Prevents immediate repeats
}
```

#### Selection Algorithm
1. **Standard Turns** (e.g., turns 1, 2, 4, 5):
   - Select random card not shown in last 2 turns
   - Ensures variety and prevents repetition
   
2. **Review Turns** (every 3rd turn):
   - Find card(s) with highest incorrect_count
   - If tie, randomly select from highest
   - Reinforces difficult material

3. **Tracking**:
   - Increment incorrect_count on wrong answers
   - Track last_shown_turn to prevent repeats

### UI/UX Specifications

#### Visual Design
- **Framework**: Tailwind CSS utility classes
- **Theme**: Clean, minimal, focus on content
- **Colors**: 
  - Primary: Blue-600 for actions
  - Success: Green-500 for correct
  - Error: Red-500 for incorrect
  - Background: Gray-50/White
  
#### Responsive Design
- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px)
- Touch-friendly button sizes (min 44px)

#### Accessibility
- Semantic HTML structure
- ARIA labels for screen readers
- Keyboard navigation support
- High contrast text

---

## Phase 2: Mobile Port Strategy

### Technology Decision: Capacitor

Based on analysis, **Capacitor** is the recommended framework for mobile porting.

#### Key Advantages
1. **100% Code Reuse**: Entire web UI preserved
2. **Faster Time-to-Market**: Configuration vs. rewrite
3. **Native API Access**: Full access via plugin system
4. **Single Codebase**: True write-once, deploy everywhere
5. **Web Developer Friendly**: Familiar tools and debugging

### Implementation Steps

1. **Prepare Web App**
   ```bash
   npm run build  # Ensure production build works
   ```

2. **Install Capacitor**
   ```bash
   npm install @capacitor/core @capacitor/cli
   ```

3. **Initialize Project**
   ```bash
   npx cap init "Project Vulcan" "com.projectvulcan.app" --web-dir=build
   ```

4. **Add Platforms**
   ```bash
   npx cap add ios
   npx cap add android
   ```

5. **Sync and Configure**
   ```bash
   npx cap sync
   npx cap open ios     # Configure in Xcode
   npx cap open android # Configure in Android Studio
   ```

6. **Native Configuration**
   - App icons and splash screens
   - Info.plist permissions (iOS)
   - AndroidManifest.xml permissions
   - App Store/Play Store metadata

---

## Phase 3: Voice Integration

### Text-to-Speech (TTS) Implementation

#### Web MVP (Phase 1)
```javascript
// Using Web Speech API
const utterance = new SpeechSynthesisUtterance(questionText);
utterance.rate = 1.0;
utterance.lang = 'en-US';
window.speechSynthesis.speak(utterance);
```

#### Mobile Enhancement (Phase 3)
**Recommended Plugin**: `@capawesome-team/capacitor-speech-synthesis`

```bash
npm install @capawesome-team/capacitor-speech-synthesis
npx cap sync
```

**Implementation**:
```javascript
import { SpeechSynthesis } from '@capawesome-team/capacitor-speech-synthesis';

async function speakQuestion(text) {
  await SpeechSynthesis.speak({
    text: text,
    lang: 'en-US',
    rate: 1.0,
    pitch: 1.0
  });
}
```

### Speech-to-Text (STT) Implementation

#### Initial Approach
- Text input with device keyboard dictation
- Users can use built-in voice typing

#### Full Implementation
**Recommended Plugin**: `@capacitor-community/speech-recognition`

```bash
npm install @capacitor-community/speech-recognition
```

**Permissions Setup**:
- iOS: Add to Info.plist
  - `NSSpeechRecognitionUsageDescription`
  - `NSMicrophoneUsageDescription`
- Android: Add to AndroidManifest.xml
  - `RECORD_AUDIO` permission

**Implementation**:
```javascript
import { SpeechRecognition } from '@capacitor-community/speech-recognition';

async function startListening() {
  // Request permissions
  await SpeechRecognition.requestPermissions();
  
  // Start recognition
  const result = await SpeechRecognition.start({
    language: 'en-US',
    partialResults: true,
    popup: false
  });
  
  // Handle results
  SpeechRecognition.addListener('partialResults', (data) => {
    updateAnswerField(data.matches[0]);
  });
}
```

### Voice UX Flow
1. Question appears and is automatically spoken
2. Microphone button activates for voice answer
3. Real-time transcription shows in answer field
4. User can edit transcription or submit
5. Voice feedback for correct/incorrect

---

## Phase 4: Backend & Scaling

### Database Schema (PostgreSQL)

```sql
-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  hashed_password VARCHAR(255) NOT NULL,
  points INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Decks table
CREATE TABLE decks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  is_public BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Cards table
CREATE TABLE cards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  deck_id UUID REFERENCES decks(id) ON DELETE CASCADE,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- User progress tracking
CREATE TABLE user_card_progress (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  card_id UUID REFERENCES cards(id) ON DELETE CASCADE,
  incorrect_count INTEGER DEFAULT 0,
  correct_in_a_row INTEGER DEFAULT 0,
  last_reviewed_at TIMESTAMPTZ,
  next_review_at TIMESTAMPTZ,
  UNIQUE(user_id, card_id)
);

-- Achievements table
CREATE TABLE achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  points_threshold INTEGER NOT NULL,
  ui_unlock_key VARCHAR(100)
);

-- User achievements junction
CREATE TABLE user_achievements (
  user_id UUID REFERENCES users(id),
  achievement_id UUID REFERENCES achievements(id),
  earned_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (user_id, achievement_id)
);
```

### API Endpoints

```
POST   /api/auth/register
POST   /api/auth/login
GET    /api/auth/logout

GET    /api/decks          # List user's decks
POST   /api/decks          # Create new deck
PUT    /api/decks/:id      # Update deck
DELETE /api/decks/:id      # Delete deck

GET    /api/decks/:id/cards      # Get cards in deck
POST   /api/decks/:id/cards      # Add card to deck
PUT    /api/cards/:id            # Update card
DELETE /api/cards/:id            # Delete card

POST   /api/quiz/start           # Start quiz session
POST   /api/quiz/answer          # Submit answer
GET    /api/quiz/progress        # Get user progress

GET    /api/user/achievements    # Get user achievements
GET    /api/user/stats          # Get user statistics
```

### Gamification System

#### Points System
- Correct answer: +5 points
- Incorrect answer: -1 point
- Streak bonuses: +1 per consecutive correct (max +10)

#### Achievement Tiers
1. **Novice** (0-100 points): Default theme
2. **Apprentice** (101-500 points): Blue theme unlock
3. **Scholar** (501-2000 points): Dark mode unlock
4. **Master** (2001-5000 points): Custom colors
5. **Grandmaster** (5000+ points): All themes + badges

---

## Technical Architecture

### Frontend Stack

```
React 18.x
├── Build: Vite (recommended) or Create React App
├── Styling: Tailwind CSS 3.x
├── State: Zustand 4.x
├── Routing: React Router 6.x (future)
├── HTTP: Axios or native fetch
└── Testing: Vitest + React Testing Library
```

### Recommended Project Structure

```
src/
├── assets/                 # Static files
│   └── icons/
├── components/
│   ├── ui/                # Reusable UI components
│   │   ├── Button/
│   │   ├── Input/
│   │   └── Card/
│   └── layout/            # Layout components
│       └── PageWrapper/
├── features/              # Feature modules
│   ├── quiz/
│   │   ├── components/
│   │   │   ├── QuizCard.tsx
│   │   │   ├── AnswerInput.tsx
│   │   │   └── FeedbackBanner.tsx
│   │   ├── hooks/
│   │   │   └── useQuizEngine.ts
│   │   └── QuizView.tsx
│   ├── deck-upload/
│   │   ├── components/
│   │   │   └── FileDropzone.tsx
│   │   └── DeckUpload.tsx
│   └── home/
│       └── HomeView.tsx
├── lib/                   # Utilities
│   ├── csv-parser.ts
│   └── speech.ts
├── store/                 # Zustand stores
│   └── quizStore.ts
├── types/                 # TypeScript types
│   └── index.ts
├── App.tsx
└── main.tsx
```

### Key Dependencies

```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "zustand": "^4.4.0",
    "papaparse": "^5.4.0",
    "@capacitor/core": "^5.0.0",
    "@capacitor/cli": "^5.0.0"
  },
  "devDependencies": {
    "vite": "^5.0.0",
    "typescript": "^5.0.0",
    "tailwindcss": "^3.4.0",
    "autoprefixer": "^10.4.0",
    "postcss": "^8.4.0"
  }
}
```

### State Management Schema

```typescript
interface QuizState {
  // Deck data
  deck: Card[];
  currentIndex: number;
  
  // Session data
  sessionActive: boolean;
  questionsAnswered: number;
  correctAnswers: number;
  incorrectAnswers: number;
  
  // Current question
  currentQuestion: Card | null;
  userAnswer: string;
  isCorrect: boolean | null;
  showingFeedback: boolean;
  
  // Actions
  loadDeck: (cards: Card[]) => void;
  startQuiz: () => void;
  submitAnswer: (answer: string) => void;
  nextQuestion: () => void;
  resetQuiz: () => void;
}
```

---

## Implementation Timeline

### Sprint 1-2: Web MVP (2 weeks)
**Week 1:**
- Project setup (React, Vite, Tailwind, Zustand)
- CSV upload and parsing with PapaParse
- Basic UI components (upload, quiz card, input)
- Core quiz loop implementation

**Week 2:**
- Learning algorithm with incorrect_count tracking
- Feedback system and UI polish
- Responsive design testing
- Deploy to Vercel/Netlify

### Sprint 3: Mobile Port (1 week)
- Capacitor integration
- iOS/Android project generation
- Native configuration (icons, splash, permissions)
- Device testing and deployment prep

### Sprint 4-5: Voice Features (2 weeks)
**Week 1:**
- TTS plugin integration
- Automatic question reading
- Voice UI indicators

**Week 2:**
- STT plugin integration
- Microphone permissions
- Voice answer capture
- Fallback text input

### Sprint 6-8: Backend & Scaling (3 weeks)
**Week 1:**
- PostgreSQL database setup
- API development (Node.js/Express or Supabase)
- Authentication system

**Week 2:**
- Deck management endpoints
- Progress tracking persistence
- Client-side API integration

**Week 3:**
- Points and achievements
- UI themes system
- Performance optimization

---

## Success Metrics

### MVP Metrics
- CSV upload success rate > 95%
- Question display time < 100ms
- Answer validation accuracy = 100%
- Mobile app launch time < 2 seconds

### User Engagement Metrics
- Average session length > 5 minutes
- Questions answered per session > 20
- Return rate (weekly) > 40%
- Voice input usage > 60% (after implementation)

### Technical Metrics
- Web Lighthouse score > 90
- Mobile app size < 20MB
- API response time < 200ms
- Offline capability for core features

---

## Risk Mitigation

### Technical Risks
1. **Voice Recognition Accuracy**
   - Mitigation: Always provide text input fallback
   - Solution: Clear UI for editing transcriptions

2. **Cross-Platform Compatibility**
   - Mitigation: Thorough testing on multiple devices
   - Solution: Progressive enhancement approach

3. **Performance with Large Decks**
   - Mitigation: Implement pagination/chunking
   - Solution: Optimize data structures and algorithms

### User Experience Risks
1. **Complex Initial Setup**
   - Mitigation: Provide sample CSV template
   - Solution: In-app deck creation (Phase 4)

2. **Voice Privacy Concerns**
   - Mitigation: Clear privacy policy
   - Solution: On-device processing emphasis

---

## Appendix: Implementation Code Samples

### CSV Parser Implementation
```typescript
import Papa from 'papaparse';

export const parseCSV = (file: File): Promise<Card[]> => {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      dynamicTyping: false,
      skipEmptyLines: true,
      complete: (results) => {
        const cards = results.data.map((row: any) => ({
          question: row.Question || row.question || '',
          answer: row.Answer || row.answer || '',
          incorrect_count: 0,
          last_shown_turn: -1
        }));
        resolve(cards);
      },
      error: (error) => reject(error)
    });
  });
};
```

### Quiz Engine Hook
```typescript
export const useQuizEngine = () => {
  const { 
    deck, 
    currentIndex, 
    submitAnswer,
    nextQuestion 
  } = useQuizStore();
  
  const selectNextQuestion = () => {
    const turn = useQuizStore.getState().questionsAnswered;
    const isReviewTurn = turn % 3 === 0;
    
    if (isReviewTurn) {
      // Find highest incorrect_count
      const maxIncorrect = Math.max(...deck.map(c => c.incorrect_count));
      const difficultCards = deck.filter(c => c.incorrect_count === maxIncorrect);
      const selected = difficultCards[Math.floor(Math.random() * difficultCards.length)];
      return selected;
    } else {
      // Random selection avoiding recent
      const available = deck.filter(c => turn - c.last_shown_turn > 2);
      return available[Math.floor(Math.random() * available.length)];
    }
  };
  
  return { selectNextQuestion, submitAnswer, nextQuestion };
};
```

---

This PRD provides a complete blueprint for implementing Project Vulcan from MVP through full production deployment. Each phase builds upon the previous, ensuring continuous delivery of value while maintaining code quality and user experience.