'use client'
import { useContext, useEffect, useState } from 'react'
import { Button, ResourcesContainer, TopicsContext } from '../..'
import { Question } from './Question'

const getClosestUnansweredQuestion = (questions: any[]) => {
  let position = 0
  const question = questions.find((question, index) => {
    position = index
    return !question.answer
  })

  return {
    position,
    data: question,
  }
}

export const QuestionsContainer = () => {
  const {
    currentTopic,
    saveQuestionAnswer,
    completeQuestionnaire,
    resetQuestionnaire,
    manualQuestionnaire,
    switchManualQuestionnaire,
  } = useContext(TopicsContext)
  const { questions = [] } = currentTopic!
  const [currentQuestion, setCurrentQuestion] = useState(
    getClosestUnansweredQuestion(questions)
  )
  const [finishedQuestionnaire, setFinishedQuestionnaire] = useState(false)

  const saveAnswer = (questionId: string, answer: 'A' | 'B' | 'C') => {
    saveQuestionAnswer!(currentTopic!, questionId, answer)
  }

  const getQuestionBg = (answer: string, options: any) => {
    const selectedOption = options.find((option: any) => option.label === answer)

    return selectedOption.points > 0 ? 'bg-correct' : 'bg-wrong'
  }

  const getAnswerExplanation = (question: any) => {
    const option = question?.options?.find(
      (option: any) => option.label === question.answer
    )

    return option?.explanation || ''
  }

  const nextQuestion = () => {
    setCurrentQuestion({
      position: currentQuestion.position + 1,
      data: questions[currentQuestion.position + 1],
    })
  }

  const previousQuestion = () => {
    setCurrentQuestion({
      position: currentQuestion.position - 1,
      data: questions[currentQuestion.position - 1],
    })
  }

  useEffect(() => {
    if (!questions.some((question) => !question.answer)) {
      setFinishedQuestionnaire(true)
    } else {
      setCurrentQuestion(getClosestUnansweredQuestion(questions))
    }
  }, [questions])

  return (
    <div className="flex flex-col">
      {finishedQuestionnaire || currentTopic?.isCompleted ? (
        <div className="flex mt-6">
          <div className="flex w-6/12 flex-col p-4">
            <p className="text-xl">Results:</p>
            {questions.map((question, index) => (
              <p
                key={index}
                className={`mt-4 text-lg rounded ${getQuestionBg(
                  question.answer,
                  question.options
                )} p-2`}
              >
                {index + 1}
                {') '}
                {question.question}
                <br />
                <strong>{getAnswerExplanation(question)}</strong>
              </p>
            ))}
          </div>
          <div className="flex w-6/12 p-4 flex-col items-center">
            <p className="text-xl">
              {
                questions.filter(
                  (question: any) =>
                    question.options.find(
                      (option: any) => option.label === question.answer
                    )?.points > 0
                ).length
              }{' '}
              of {questions.length} questions answered correctly
            </p>
            <p className="mt-6 text-lg font-bold">Do you want to try again?</p>

            <div className="flex justify-evenly mt-6 w-full">
              <Button
                classes="max-w-[150px]"
                type="primary"
                onClick={() => {
                  resetQuestionnaire!(currentTopic!)
                  setFinishedQuestionnaire(false)
                }}
              >
                YES
              </Button>
              <Button
                classes="max-w-[150px]"
                type="secondary"
                onClick={() => {
                  manualQuestionnaire && switchManualQuestionnaire!()
                  completeQuestionnaire!()
                }}
              >
                NO
              </Button>
            </div>

            <ResourcesContainer
              resources={currentTopic?.resources}
              title="Do you want to learn more? Take a look to these links"
            />
          </div>
        </div>
      ) : (
        <>
          <div className="flex justify-between mt-6">
            <p>
              Question {currentQuestion.position + 1} of {questions.length}
            </p>

            <div className="flex justify-between w-[250px]">
              <Button
                disabled={currentQuestion.position === 0}
                classes="max-w-[100px] h-[24px]"
                type="primary"
                onClick={() => {
                  previousQuestion()
                }}
              >
                Previous
              </Button>
              <Button
                disabled={currentQuestion.position === questions.length - 1}
                classes="max-w-[100px] h-[24px]"
                type="primary"
                onClick={() => {
                  nextQuestion()
                }}
              >
                Next
              </Button>
            </div>
          </div>

          <Question question={currentQuestion} saveAnswer={saveAnswer} />
        </>
      )}
    </div>
  )
}
