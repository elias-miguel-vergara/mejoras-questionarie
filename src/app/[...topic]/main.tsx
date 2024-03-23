'use client'
import { useContext, useEffect } from 'react'
import {
  QuestionnaireContainer,
  RecommendationsContainer,
  TopicsContext,
} from '../../components'
import { ManualQuestionnaire } from '@/components/Sections/ManualQuestionnaire'

export default function Main({ params }: { params: { topic: string[] } }) {
  const { currentTopic, selectTopic, manualQuestionnaire } = useContext(TopicsContext)
  const { startedQuestionnaire = false } = currentTopic!
  const topics = [...params.topic]
  const topicsid = topics.pop();

  useEffect(() => {
    selectTopic!({
      id: topicsid!,
      current: currentTopic!,
      previousParents: topics,
    })
  }, [manualQuestionnaire, params])
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
