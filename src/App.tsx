import { useState } from 'react'
import { useQuizStore } from '@/store/quizStore'
import { HomeView } from '@/features/home/HomeView'
import { QuizView } from '@/features/quiz/QuizView'

function App() {
  const { isQuizActive } = useQuizStore()
  const [currentView, setCurrentView] = useState<'home' | 'quiz'>('home')


  const handleQuizEnd = () => {
    setCurrentView('home')
  }

  // Listen to quiz state changes
  if (isQuizActive && currentView !== 'quiz') {
    setCurrentView('quiz')
  }

  return (
    <div className="App">
      {currentView === 'home' ? (
        <HomeView />
      ) : (
        <QuizView onEndQuiz={handleQuizEnd} />
      )}
    </div>
  )
}

export default App