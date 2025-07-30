# Project Vulcan

> A voice-enabled flashcard study application for effective learning through active recall

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)]()
[![Version](https://img.shields.io/badge/version-1.0.0-blue)]()
[![License](https://img.shields.io/badge/license-MIT-green)]()

## Overview

Project Vulcan is an intelligent flashcard study tool designed to help users master content through active recall and spaced repetition. Inspired by the Vulcan learning booths from Star Trek, the application uses smart algorithms to prioritize difficult questions and ensure comprehensive learning.

### ✨ Key Features

- **🧠 Intelligent Learning Algorithm**: Smart question prioritization with spaced repetition
- **📊 Two Quiz Modes**: Single-cycle mastery mode and infinite practice mode  
- **💾 Automatic Persistence**: Previously uploaded CSV files are saved for easy reuse
- **📈 Progress Tracking**: Real-time progress with accuracy metrics
- **🎯 Consistent Numbering**: Questions maintain original numbers even during review
- **📱 Responsive Design**: Works seamlessly on desktop and mobile devices
- **⚡ Fast Performance**: Built with modern React and optimized for speed

## Features

### 📚 Deck Management
- **CSV Upload**: Simple drag-and-drop or click to upload CSV files
- **Saved Decks**: Automatic saving of uploaded decks to localStorage
- **Deck Selection**: Easy dropdown to choose from previously used decks
- **Deck Deletion**: Remove unwanted saved decks
- **Smart Naming**: Automatic deck naming from filenames

### 🎯 Quiz Modes

#### Single Cycle Mode
- Complete each question in the deck exactly once
- Incorrect questions loop back maintaining original question numbers
- Quiz only ends when ALL questions are answered correctly
- Perfect for mastery-based learning

#### Infinite Practice Mode
- Continue practicing indefinitely until manually stopped
- Focus on difficult questions with intelligent review scheduling
- Track total attempts and unique questions mastered
- Ideal for ongoing reinforcement

### 🧠 Smart Learning Algorithm
- **Review Priority**: Questions answered incorrectly are scheduled for review after 3-10 random questions
- **Sequential Order**: New questions appear in original order for structured learning
- **Question Persistence**: Original question numbers maintained (e.g., "Question 4 of 10" stays "Question 4 of 10")
- **Completion Logic**: Single-cycle ensures 100% mastery before completion

### 📊 Progress Tracking
- **Real-time Metrics**: Live accuracy percentage and question counts
- **Visual Progress Bar**: Shows unique questions mastered vs total questions
- **Detailed Stats**: Correct/incorrect answer tracking with visual indicators
- **Mode-specific Display**: Different progress formats for each quiz mode

### 💾 Data Persistence
- **Local Storage**: Automatic saving of CSV decks to browser localStorage
- **Smart Limits**: Maximum 10 saved decks to prevent storage bloat
- **Metadata Tracking**: Creation dates, last used timestamps, and usage analytics
- **Cross-session**: Decks persist between browser sessions

## Getting Started

### Prerequisites
- Node.js 18+ and npm
- Modern web browser with localStorage support

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd project-vulcan
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:1113`

### Building for Production

```bash
npm run build
npm run preview
```

## Usage

### 📝 Creating Study Decks

Create a CSV file with two columns:
```csv
Question,Answer
What is the capital of France?,Paris
What is 2 + 2?,4
Who wrote Romeo and Juliet?,Shakespeare
```

**Supported formats:**
- Headers: `Question,Answer` or `q,a` (case-insensitive)
- File size: Up to 5MB
- Encoding: UTF-8

### 🎮 Using the Application

1. **Upload or Select Deck**
   - Choose from previously saved decks OR
   - Upload a new CSV file

2. **Choose Quiz Mode**
   - **Single Cycle**: Master each question once
   - **Infinite Practice**: Continuous practice with review

3. **Start Quiz**
   - Questions appear with original numbering
   - Type answers and press Enter or click Submit
   - Receive immediate feedback

4. **Complete Quiz**
   - Single Cycle: Ends when all questions answered correctly
   - Infinite: Continue until manually stopped

### 📊 Understanding Progress

- **Single Cycle**: "Progress: 7 / 10" (unique questions mastered)
- **Infinite**: "Total Attempts: 15 (7/10 unique)" (total attempts with unique progress)
- **Accuracy**: Real-time percentage of correct answers
- **Visual Indicators**: Green for correct, red for incorrect answers

## Technical Details

### 🏗️ Architecture
- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Styling**: Tailwind CSS for responsive design
- **State Management**: Zustand for predictable state updates
- **Storage**: Browser localStorage for deck persistence

### 📁 Project Structure
```
src/
├── components/ui/          # Reusable UI components
├── features/              # Feature-based modules
│   ├── home/             # Landing page and deck selection
│   ├── quiz/             # Quiz functionality
│   └── deck-upload/      # CSV upload handling
├── lib/                  # Utilities and helpers
├── store/                # Zustand state management
└── types/                # TypeScript definitions
```

### 🔧 Key Technologies
- **React 18**: Modern React with hooks and concurrent features
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **Zustand**: Lightweight state management
- **PapaParse**: CSV parsing library
- **Vite**: Next-generation frontend tooling

## Development

### 🛠️ Available Scripts

- `npm run dev` - Start development server (port 1113)
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

### 🎨 Code Style
- ESLint with TypeScript configuration
- Functional components with hooks
- Tailwind utility classes for styling
- No class components or legacy patterns

### 🧪 Testing
- Build verification: `npm run build`
- Linting: `npm run lint`
- Manual testing in development mode

## Roadmap

### Phase 2: Mobile Application
- Port to iOS and Android using Capacitor
- Native app features and optimizations

### Phase 3: Voice Integration
- Text-to-speech for questions
- Speech-to-text for answers
- Hands-free study experience

### Phase 4: Backend & Scaling
- User accounts and cloud synchronization
- Shared deck library
- Advanced analytics and progress tracking

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Inspired by the Vulcan learning booths from Star Trek
- Built with modern web technologies for optimal performance
- Designed with user experience and learning effectiveness in mind

---

**Built with ❤️ for effective learning and knowledge mastery**