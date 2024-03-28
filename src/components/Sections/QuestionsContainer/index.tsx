'use client'
import { useContext, useEffect, useState } from 'react'
import { Button, ResourcesContainer, TopicsContext } from '../..'
import { Question } from './Question'

const getClosestUnansweredQuestion = (questions: any[]) => {
  let position = 0;
  const question = questions.find((question, index) => {
    position = index;
    return !question.answer;
  });

  return {
    position,
    data: question,
  };
};

export const QuestionsContainer = () => {
  const {
    currentTopic,
    saveQuestionAnswer,
    completeQuestionnaire,
    resetQuestionnaire,
    manualQuestionnaire,
    switchManualQuestionnaire,
  } = useContext(TopicsContext);
  const [currentQuestion, setCurrentQuestion] = useState(
    getClosestUnansweredQuestion(currentTopic?.questions || [])
  );
  const [finishedQuestionnaire, setFinishedQuestionnaire] = useState(false);

  const saveAnswer = (questionId: string, answer: 'A' | 'B' | 'C') => {
    saveQuestionAnswer!(currentTopic!, questionId, answer);
  };

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
    setCurrentQuestion((prevQuestion) => ({
      position: prevQuestion.position + 1,
      data: currentTopic?.questions?.[prevQuestion.position + 1],
    }));
  };

  const previousQuestion = () => {
    setCurrentQuestion((prevQuestion) => ({
      position: prevQuestion.position - 1,
      data: currentTopic?.questions?.[prevQuestion.position - 1],
    }));
  };


  useEffect(() => {
    const unansweredQuestions = currentTopic && currentTopic.questions && currentTopic.questions.length && currentTopic.questions.some((question) => !question.answer);    setFinishedQuestionnaire(!unansweredQuestions);
    setCurrentQuestion(getClosestUnansweredQuestion(currentTopic?.questions || []));
  }, [currentTopic]);

  const renderResults = () => (
    <div className="flex mt-6">
      <div className="flex w-6/12 flex-col p-4">
        <p className="text-xl">Results:</p>
        {currentTopic?.questions?.map((question, index) => (
          <p
            key={index}
            className={`mt-4 text-lg rounded ${getQuestionBg(
              question.answer,
              question.options
            )} p-2`}
          >
            {index + 1} {question.question} <br />
            <strong>{getAnswerExplanation(question)}</strong>
          </p>
        ))}
      </div>
      <div className="flex w-6/12 p-4 flex-col items-center">
        <p className="text-xl">
          {
            currentTopic?.questions?.filter(
              (question: any) =>
                question.options.find(
                  (option: any) => option.label === question.answer
                )?.points > 0
            ).length
          } of {currentTopic?.questions?.length} questions answered correctly
        </p>
        <p className="mt-6 text-lg font-bold">Do you want to try again?</p>
        {renderTryAgainSection()}
        <ResourcesContainer
          resources={currentTopic?.resources}
          title="Do you want to learn more? Take a look to these links"
        />
      </div>
    </div>
  );

  const renderTryAgainSection = () => (
    <div className="flex justify-evenly mt-6 w-full">
      <Button
        classes="max-w-[150px]"
        type="primary"
        onClick={() => {
          resetQuestionnaire!(currentTopic!);
          setFinishedQuestionnaire(false);
        }}
      >
        YES
      </Button>
      <Button
        classes="max-w-[150px]"
        type="secondary"
        onClick={() => {
          manualQuestionnaire && switchManualQuestionnaire!();
          completeQuestionnaire!();
        }}
      >
        NO
      </Button>
    </div>
  );

  const renderQuestions = () => (
    <>
      <div className="flex justify-between mt-6">
        <p>
          Question {currentQuestion.position + 1} of {currentTopic?.questions?.length}
        </p>
        <div className="flex justify-between w-[250px]">
          <Button
            disabled={currentQuestion.position === 0}
            classes="max-w-[100px] h-[24px]"
            type="primary"
            onClick={previousQuestion}
          >
            Previous
          </Button>
          <Button
            disabled={currentQuestion.position === (currentTopic?.questions?.length ?? 0) - 1}
            classes="max-w-[100px] h-[24px]"
            type="primary"
            onClick={nextQuestion}
          >
            Next
          </Button>
        </div>
      </div>
      <Question question={currentQuestion} saveAnswer={saveAnswer} />
    </>
  );

  return (
    <div className="flex flex-col">
      {finishedQuestionnaire || currentTopic?.isCompleted ? renderResults() : renderQuestions()}
    </div>
  )
}
