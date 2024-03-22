import {
  Button,
  TopicsContext,
  QuestionsContainer,
  QuestionnaireDescription,
} from '@/components'
import { capitalize } from '@/utils'
import { useContext, useState } from 'react'

export const ManualQuestionnaire = () => {
  const { currentTopic, selectTopic, switchManualQuestionnaire } =
    useContext(TopicsContext)
  const [fileUploaded, setFileUploaded] = useState(false)

  const handleFileChange = (e: any) => {
    if (e.target.files.length) {
      const reader = new FileReader()

      reader.onload = (event) => {
        if (event?.target?.result) {
          const json = JSON.parse(event.target.result.toString())

          for (let topicName in json.skill) {
            if (json.skill[topicName].id) {
              selectTopic!({
                current: json.skill[topicName],
                isManualQuestionnaire: true,
              })
              setFileUploaded(true)
              break
            }
          }
        }
      }

      reader.readAsText(e.target.files[0])
    }
  }

  return (
    <div className="flex w-full flex-col">
      <div className="flex justify-end p-4">
        <Button
          type="secondary"
          classes="max-w-[150px]"
          onClick={() => {
            switchManualQuestionnaire!()
          }}
        >
          Return
        </Button>
      </div>
      {fileUploaded ? (
        <div className="flex w-full p-[20px] flex-col">
          <h1 className="text-2xl font-bold">{capitalize(currentTopic!.id)}</h1>
          {currentTopic?.startedQuestionnaire ? (
            <QuestionsContainer />
          ) : (
            <QuestionnaireDescription />
          )}
        </div>
      ) : (
        <div className="flex p-6 flex-col items-center">
          <p className="text-2xl font-bold">
            Please upload a JSON file to start questionnaire
          </p>
          <input onChange={handleFileChange} className="mt-6" type="file" />
        </div>
      )}
    </div>
  )
}
