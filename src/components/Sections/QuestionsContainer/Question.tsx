import React, { useState, useEffect } from 'react';
import { Button } from '@/components';

interface Option {
  label: string;
  description: string;
  points: number;
  explanation: string;
}

interface QuestionProps {
  question: { position: number; data: any };
  saveAnswer: (questionId: string, answer: 'A' | 'B' | 'C') => void;
}

const getOptionBg = (answer: string | undefined, selectedOption: Option) => {
  if (!answer) return 'bg-option';
  if (answer === selectedOption.label) {
    return selectedOption.points > 0 ? 'bg-correct' : 'bg-wrong';
  }
  return 'bg-option';
};

export const Question = ({ question, saveAnswer }: QuestionProps) => {
  const [confirmAnswer, setConfirmAnswer] = useState<string | null>(null);

  useEffect(() => {
    setConfirmAnswer(question?.data?.id);
  }, [question]);

  const handleOptionClick = (option: Option) => {
    if (!question.data.answer) {
      setConfirmAnswer(`${question?.data?.id}_${option.label}`);
    }
  };

  const handleConfirmClick = (option: Option, e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    saveAnswer(question.data.id, option.label);
  };

  return (
    <div className="flex flex-col mt-8">
      <p className="text-xl">{question?.position + 1}) {question?.data?.question}</p>
      <p className="mt-4">{question?.data?.description}</p>

      <ul className="mt-4 pl-6">
        {question?.data?.options?.map((option: Option, index: number) => (
          <li
            key={index}
            className={`mt-4 max-w-[60%] select-none ${getOptionBg(question.data.answer, option)} p-2 rounded cursor-pointer flex justify-between items-center`}
            onClick={() => handleOptionClick(option)}
          >
            <span>
              <p>{option.label}) {option.description}</p>
              {question.data.answer === option.label && (
                <p className="mt-6">{option.explanation}</p>
              )}
            </span>
            {!question?.data?.answer && confirmAnswer === `${question?.data?.id}_${option.label}` && (
              <Button
                classes="max-w-[100px] h-[24px]"
                type="primary"
                onClick={(e) => handleConfirmClick(option, e)}
              >
                Confirm
              </Button>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
