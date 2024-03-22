import { Button, ResourcesContainer, TopicsContext } from '@/components'
import { useContext } from 'react'

export const QuestionnaireDescription = () => {
  const { currentTopic, startQuestionnaire } = useContext(TopicsContext)
  return (
    <>
      <p className="mt-4 text-lg">{currentTopic?.description}</p>

      <ResourcesContainer resources={currentTopic?.resources} />

      {!!currentTopic?.questions?.length && (
        <div className="flex justify-center mt-4">
          <Button
            type="primary"
            classes="max-w-[60%]"
            onClick={() => {
              startQuestionnaire!()
            }}
          >
            START QUESTIONNAIRE
          </Button>
        </div>
      )}
    </>
  )
}
