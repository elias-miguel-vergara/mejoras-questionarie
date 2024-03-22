'use client'
import { useContext, useEffect } from 'react'
import {
  QuestionnaireContainer,
  RecommendationsContainer,
  TopicsContext,
} from '../../components'
import { ManualQuestionnaire } from '@/components/Sections/ManualQuestionnaire'

export default function Main({ params }: { params: { topic: string[] } }) {
  const { currentTopic, selectTopic, manualQuestionnaire } =
    useContext(TopicsContext)

  const { startedQuestionnaire = false } = currentTopic!

  useEffect(() => {
    const topics = [...params.topic]
    selectTopic!({
      id: topics.pop()!,
      current: currentTopic!,
      previousParents: topics,
    })
  }, [params])

  useEffect(() => {
    const topics = [...params.topic]
    selectTopic!({
      id: topics.pop()!,
      current: currentTopic!,
      previousParents: topics,
    })
  }, [manualQuestionnaire])
  return (
    <div className="main-container">
      {manualQuestionnaire ? (
        <ManualQuestionnaire />
      ) : (
        <>
          <div
            className={`main-left transition-[width] duration-300 ${
              startedQuestionnaire ? 'w-full ' : ''
            }`}
          >
            <QuestionnaireContainer />
          </div>
          <div className={`main-right ${startedQuestionnaire ? 'hidden' : ''}`}>
            <RecommendationsContainer />
          </div>
        </>
      )}
    </div>
  )
}
