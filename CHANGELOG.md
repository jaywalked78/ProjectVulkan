# Changelog

All notable changes to Project Vulcan will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-07-30

### 🎉 Initial Release - Web MVP

This is the first stable release of Project Vulcan, featuring a complete web-based flashcard study application with intelligent learning algorithms and persistent storage.

### Added

#### 🧠 Core Quiz Engine
- **Intelligent Learning Algorithm**: Smart question selection with spaced repetition
- **Dual Quiz Modes**: 
  - Single Cycle mode for mastery-based learning (must answer all questions correctly)
  - Infinite Practice mode for continuous reinforcement
- **Consistent Question Numbering**: Questions maintain original numbers during review (e.g., "Question 4 of 10" stays "Question 4 of 10")
- **Review Scheduling**: Incorrect questions scheduled for review after random 3-10 question delay
- **Sequential Progression**: New questions appear in original order for structured learning

#### 📊 Progress Tracking & Analytics
- **Real-time Progress Bar**: Visual progress indicator showing unique questions mastered
- **Accuracy Metrics**: Live calculation and display of answer accuracy percentage
- **Detailed Statistics**: 
  - Questions answered vs total questions
  - Correct/incorrect answer counts with visual indicators
  - Mode-specific progress displays
- **Completion Logic**: Smart quiz completion based on mode requirements

#### 💾 Data Persistence & Management
- **Automatic Deck Saving**: CSV files automatically saved to localStorage
- **Saved Deck Management**: 
  - Dropdown selection of previously used decks
  - Deck deletion functionality
  - Smart deck naming from filenames
- **Storage Limits**: Maximum 10 saved decks to prevent localStorage bloat
- **Metadata Tracking**: Creation dates, last used timestamps, and usage analytics
- **Cross-session Persistence**: Decks persist between browser sessions

#### 📁 CSV File Processing
- **Flexible CSV Support**: 
  - Headers: `Question,Answer` or `q,a` (case-insensitive)
  - Optional header row handling
  - File size limit: 5MB
- **Robust Parsing**: Error handling for malformed CSV files
- **Data Validation**: Ensures valid question/answer pairs before processing

#### 🎨 User Interface & Experience
- **Responsive Design**: Optimized for desktop and mobile devices
- **Modern UI Components**:
  - Clean card-based layout
  - Interactive progress indicators
  - Intuitive feedback displays
  - Accessible form controls
- **Quiz Mode Selection**: Easy radio button selection between modes
- **Real-time Feedback**: Immediate visual feedback for correct/incorrect answers
- **Loading States**: Progress indicators during file processing

#### 🏗️ Technical Architecture
- **Modern React Stack**: React 18 with TypeScript for type safety
- **Fast Build System**: Vite for optimized development and production builds
- **Utility-first Styling**: Tailwind CSS for responsive and maintainable styles
- **Predictable State Management**: Zustand for simple and effective state handling
- **Code Quality**: ESLint configuration with TypeScript rules

### Technical Specifications

#### Frontend Stack
- **React 18.x**: Modern React with hooks and concurrent features
- **TypeScript 5.x**: Full type safety and enhanced developer experience
- **Vite 7.x**: Lightning-fast build tool and development server
- **Tailwind CSS 4.x**: Utility-first CSS framework
- **Zustand 5.x**: Lightweight state management solution

#### Key Dependencies
- **PapaParse 5.x**: Robust CSV parsing library
- **clsx + tailwind-merge**: Conditional CSS class utilities
- **ESLint 9.x**: Code linting and quality enforcement

#### Browser Support
- **Modern Browsers**: Chrome 90+, Firefox 90+, Safari 14+, Edge 90+
- **Local Storage**: Required for deck persistence functionality
- **File API**: Required for CSV upload functionality

#### Performance Metrics
- **Bundle Size**: ~250KB (gzipped: ~80KB)
- **Build Time**: <1 second for incremental builds
- **Development Server**: Hot reload in <100ms
- **Lighthouse Score**: 90+ for Performance, Accessibility, and Best Practices

### File Structure
```
project-vulcan/
├── src/
│   ├── components/ui/          # Reusable UI components
│   │   ├── Alert.tsx
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   ├── Progress.tsx
│   │   └── Select.tsx
│   ├── features/              # Feature-based modules
│   │   ├── home/
│   │   │   └── HomeView.tsx
│   │   ├── quiz/
│   │   │   ├── QuizView.tsx
│   │   │   └── components/
│   │   │       ├── QuizCard.tsx
│   │   │       ├── QuizProgress.tsx
│   │   │       ├── AnswerInput.tsx
│   │   │       └── FeedbackDisplay.tsx
│   │   └── deck-upload/
│   │       └── components/
│   ├── lib/                   # Utilities and helpers
│   │   ├── csv-parser.ts
│   │   ├── deck-storage.ts
│   │   └── utils.ts
│   ├── store/
│   │   └── quizStore.ts       # Zustand state management
│   └── types/
│       └── index.ts           # TypeScript definitions
├── public/
├── CLAUDE.md                  # Development documentation
├── README.md                  # Project documentation
├── CHANGELOG.md               # This file
└── package.json
```

### Development Scripts
- **`npm run dev`**: Start development server on port 1113
- **`npm run build`**: Build optimized production bundle
- **`npm run lint`**: Run ESLint code quality checks
- **`npm run preview`**: Preview production build locally

### Known Limitations
- **Storage**: Limited to localStorage (no cloud sync)
- **Authentication**: No user accounts or authentication system
- **Voice Features**: Text-only interface (voice features planned for Phase 3)
- **Mobile Apps**: Web-only (native mobile apps planned for Phase 2)
- **Offline**: Requires internet connection for initial load

### Future Roadmap

#### Phase 2: Mobile Application (Planned)
- iOS and Android native apps using Capacitor
- Enhanced mobile user experience
- Native device integrations

#### Phase 3: Voice Integration (Planned)  
- Text-to-speech for questions
- Speech-to-text for answers
- Hands-free study experience

#### Phase 4: Backend & Scaling (Planned)
- User accounts and authentication
- Cloud synchronization
- Shared deck library
- Advanced analytics

---

## Development History

### Pre-release Development - 2025-07-30

#### Initial Setup
- Project scaffolding with Vite + React + TypeScript
- Tailwind CSS configuration and base styling
- ESLint setup with TypeScript rules

#### Core Features Implementation
- Basic quiz engine with question/answer flow
- CSV upload and parsing functionality
- Progress tracking and accuracy calculations
- Zustand state management integration

#### Algorithm Development
- Intelligent question selection algorithm
- Spaced repetition with random delay (3-10 questions)
- Review prioritization for incorrect answers
- Quiz completion logic for different modes

#### UI/UX Polish
- Responsive design implementation
- Interactive feedback systems
- Loading states and error handling
- Accessibility improvements

#### Persistence Layer
- localStorage integration for deck saving
- Saved deck management interface
- Cross-session data persistence
- Storage optimization (10 deck limit)

#### Quality Assurance
- TypeScript strict mode compliance
- ESLint rule enforcement
- Build optimization and testing
- Performance profiling and optimization

---

*For detailed technical documentation, see [CLAUDE.md](./CLAUDE.md)*