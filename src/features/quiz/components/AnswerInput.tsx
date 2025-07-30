import { useState, useEffect } from 'react'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { useQuizStore } from '@/store/quizStore'

export function AnswerInput() {
  const { userAnswer, setUserAnswer, submitAnswer } = useQuizStore()
  const [localAnswer, setLocalAnswer] = useState('')

  useEffect(() => {
    setLocalAnswer(userAnswer)
  }, [userAnswer])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (localAnswer.trim()) {
      setUserAnswer(localAnswer)
      submitAnswer()
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && localAnswer.trim()) {
      handleSubmit(e)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Input
          id="answer-input"
          type="text"
          placeholder="Type your answer here..."
          value={localAnswer}
          onChange={(e) => setLocalAnswer(e.target.value)}
          onKeyDown={handleKeyDown}
          className="text-lg p-4 text-center"
          autoComplete="off"
          autoFocus
        />
      </div>
      
      <Button
        type="submit"
        size="lg"
        className="w-full"
        disabled={!localAnswer.trim()}
      >
        Submit Answer
      </Button>
      
      <p className="text-sm text-gray-500 text-center">
        Press Enter to submit
      </p>
    </form>
  )
}