import { useContext } from 'react'
import { Button, ResourcesContainer, TopicsContext } from '@/components'

export const QuestionnaireDescription = () => {
  const { currentTopic, startQuestionnaire } = useContext(TopicsContext)
  
  const renderDescription = () => (
    <p className="mt-4 text-lg">{currentTopic?.description}</p>
  );

  const renderResources = () => (
    <ResourcesContainer resources={currentTopic?.resources} />
  );

  const renderStartButton = () => (
    <div className="flex justify-center mt-4">
      <Button
        type="primary"
        classes="max-w-[60%]"
        onClick={() => startQuestionnaire!()}
      >
        START QUESTIONNAIRE
      </Button>
    </div>
  );

  return (
    <>
      {renderDescription()}
      {renderResources()}
      {!!currentTopic?.questions?.length && renderStartButton()}
    </>
  )
}
