import { useContext } from 'react'
import {
  Button,
  QuestionnaireDescription,
  QuestionsContainer,
  TopicsContext,
} from '../..'
import { capitalize } from '@/utils'

export const QuestionnaireContainer = () => {
  const {
    currentTopic,
    startQuestionnaire,
    cancelQuestionnaire,
    switchManualQuestionnaire,
  } = useContext(TopicsContext)
  return (
    <div className="flex flex-col w-full">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">{capitalize(currentTopic!.id)}</h1>
        {!!currentTopic?.startedQuestionnaire ? (
          <Button
            type="secondary"
            classes="max-w-[150px]"
            onClick={() => {
              cancelQuestionnaire!()
            }}
          >
            Cancel
          </Button>
        ) : (
          <Button
            type="primary"
            classes="max-w-[150px]"
            onClick={() => {
              switchManualQuestionnaire!()
            }}
          >
            Upload file
          </Button>
        )}
      </div>

      {!currentTopic?.startedQuestionnaire ? (
        <QuestionnaireDescription />
      ) : (
        <>
          <QuestionsContainer />
        </>
      )}
    </div>
  )
}
