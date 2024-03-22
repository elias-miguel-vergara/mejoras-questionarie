import { Button } from '@/components'
import { useState, useEffect } from 'react'
interface QuestionProps {
  question: { position: number; data: any }
  saveAnswer: (questionId: string, answer: 'A' | 'B' | 'C') => void
}

export const Question = ({ question, saveAnswer }: QuestionProps) => {
  const [confirmAnswer, setConfirmAnswer] = useState(question?.data?.id)

  const getOptionBg = (answer: string, option: any) => {
    return answer
      ? answer === option.label
        ? option.points > 0
          ? 'bg-correct'
          : 'bg-wrong'
        : 'bg-option'
      : 'bg-option'
  }

  useEffect(() => {
    setConfirmAnswer(question?.data?.id)
  }, [question])

  return (
    <div className="flex flex-col mt-8">
      <p className="text-xl">
        {question?.position + 1}
        {') '}
        {question?.data?.question}
      </p>
      <p className="mt-4">{question?.data?.description}</p>

      <ul className="mt-4 pl-6">
        {' '}
        {question?.data?.options?.map((option: any, index: number) => {
          return (
            <li
              key={index}
              className={`mt-4 max-w-[60%] select-none ${getOptionBg(
                question.data.answer,
                option
              )} p-2 rounded cursor-pointer flex justify-between items-center`}
              onClick={
                !question.data.answer
                  ? () => {
                      setConfirmAnswer(`${question?.data?.id}_${option.label}`)
                    }
                  : undefined
              }
            >
              <span>
                <p>
                  {option.label}
                  {') '}
                  {option.description}
                </p>
                {question.data.answer && question.data.answer === option.label && (
                  <p className="mt-6">{option.explanation}</p>
                )}
              </span>
              {!question?.data?.answer &&
                confirmAnswer === `${question?.data?.id}_${option.label}` && (
                  <Button
                    classes="max-w-[100px] h-[24px]"
                    type="primary"
                    onClick={(e) => {
                      e.stopPropagation()
                      saveAnswer(question.data.id, option.label)
                    }}
                  >
                    Confirm
                  </Button>
                )}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
