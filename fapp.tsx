import { useState } from 'react'
import { Button } from "/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "/components/ui/card"
import { Input } from "/components/ui/input"
import { Label } from "/components/ui/label"
import { Textarea } from "/components/ui/textarea"

export default function LlamaFlashcardApp() {
  const [flashcards, setFlashcards] = useState([
    { question: "What is the scientific name of a llama?", answer: "Lama glama" },
    { question: "Where do llamas originate from?", answer: "South America" },
    { question: "What is the average lifespan of a llama?", answer: "15-25 years" },
  ])
  const [currentFlashcardIndex, setCurrentFlashcardIndex] = useState(0)
  const [showAnswer, setShowAnswer] = useState(false)
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')
  const [correctAnswers, setCorrectAnswers] = useState(0)
  const [totalAttempts, setTotalAttempts] = useState(0)

  const currentFlashcard = flashcards[currentFlashcardIndex]

  const handleRevealAnswer = () => {
    setShowAnswer(true)
  }

  const handleNextFlashcard = () => {
    setCurrentFlashcardIndex((prevIndex) => (prevIndex + 1) % flashcards.length)
    setShowAnswer(false)
  }

  const handleAddFlashcard = () => {
    if (question && answer) {
      setFlashcards([...flashcards, { question, answer }])
      setQuestion('')
      setAnswer('')
    }
  }

  const handleCorrectAnswer = () => {
    setCorrectAnswers(correctAnswers + 1)
    setTotalAttempts(totalAttempts + 1)
    handleNextFlashcard()
  }

  const handleIncorrectAnswer = () => {
    setTotalAttempts(totalAttempts + 1)
    handleNextFlashcard()
  }

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-3xl">
        <Card className="mb-4">
          <CardHeader>
            <CardTitle>Llama Flashcard App</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <h2 className="text-xl font-bold mb-2">{showAnswer ? currentFlashcard.answer : currentFlashcard.question}</h2>
              {!showAnswer && (
                <Button onClick={handleRevealAnswer} className="mt-2">
                  Reveal Answer
                </Button>
              )}
              {showAnswer && (
                <div className="mt-2">
                  <Button onClick={handleCorrectAnswer} variant="success" className="mr-2">
                    Correct
                  </Button>
                  <Button onClick={handleIncorrectAnswer} variant="destructive">
                    Incorrect
                  </Button>
                </div>
              )}
            </div>
            <Button onClick={handleNextFlashcard} variant="outline" className="mt-2">
              Next Flashcard
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Add a Flashcard</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <Label htmlFor="question" className="block text-sm font-medium leading-6 text-gray-900">
                Question
              </Label>
              <Input
                id="question"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                className="mt-2"
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="answer" className="block text-sm font-medium leading-6 text-gray-900">
                Answer
              </Label>
              <Textarea
                id="answer"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                className="mt-2"
              />
            </div>
            <Button onClick={handleAddFlashcard} variant="secondary">
              Add Flashcard
            </Button>
          </CardContent>
        </Card>

        <Card className="mt-4">
          <CardHeader>
            <CardTitle>Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg">
              Correct Answers: {correctAnswers} / {totalAttempts}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
