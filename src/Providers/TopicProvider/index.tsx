'use client'

import { createContext, useState } from 'react'
import { useRouter } from 'next/navigation'

interface SelectTopicParams {
  id?: string
  current: TopicState
  previousParents?: string[]
  isManualQuestionnaire?: boolean
}
export interface TopicsContextValue {
  manualQuestionnaire?: boolean
  switchManualQuestionnaire?: () => void
  currentTopic?: TopicState
  selectTopic?: (params: SelectTopicParams) => void
  startQuestionnaire?: () => void
  cancelQuestionnaire?: () => void
  completeQuestionnaire?: () => void
  resetQuestionnaire?: (current: TopicState) => void
  saveQuestionAnswer?: (
    current: TopicState,
    questionId: string,
    answer: 'A' | 'B' | 'C'
  ) => void
}

export const TopicsContext = createContext<TopicsContextValue>({})

interface Topic {
  id: string
  description?: string
  children: string[]
  resources?: any[]
  questions?: any[]
  startedQuestionnaire?: boolean
  isCompleted?: boolean
}

type TopicState = Topic & { previousParents?: string[] }

const initialTopic: Topic = {
  id: 'development',
  description: 'Select which area  you want to dive in.',
  children: ['frontend', 'fullstack'],
}

export function TopicsProvider({
  children,
  topics,
}: {
  topics: any[]
  children: React.ReactNode
}) {
  const router = useRouter()
  const [manualQuestionnaire, setManualQuestionnaire] = useState(false)
  const [allTopics, setAllTopics] = useState([...topics, initialTopic])
  const [currentTopic, setCurrentTopic] = useState<TopicState>({
    ...initialTopic,
    previousParents: [],
  })

  const switchManualQuestionnaire = () => {
    router.push('/development')
    setManualQuestionnaire(!manualQuestionnaire)
  }

  const refreshAllTopics = (current: TopicState) => {
    setAllTopics(
      allTopics.map((topic) => (topic.id === current.id ? current : topic))
    )
  }

  const selectTopic = ({
    id,
    current,
    previousParents,
    isManualQuestionnaire,
  }: SelectTopicParams) => {
    if (isManualQuestionnaire) {
      setCurrentTopic(current)
    }

    if (!id) return

    refreshAllTopics(current)

    const selectedTopic = allTopics.find((topic) => topic.id === id)

    if (!selectedTopic) {
      router.push('/' + current.id)
    } else {
      setCurrentTopic({
        id,
        previousParents,
        children: selectedTopic.children,
        description: selectedTopic.description,
        resources: selectedTopic.resources,
        questions: selectedTopic.questions,
      })
    }
  }

  const startQuestionnaire = () => {
    setCurrentTopic({ ...currentTopic, startedQuestionnaire: true })
  }

  const cancelQuestionnaire = () => {
    setCurrentTopic({ ...currentTopic, startedQuestionnaire: false })
  }

  const completeQuestionnaire = () => {
    setCurrentTopic({
      ...currentTopic,
      isCompleted: true,
      startedQuestionnaire: false,
    })
  }

  const resetQuestionnaire = (current: TopicState) => {
    setCurrentTopic({
      ...current,
      isCompleted: false,
      startedQuestionnaire: true,
      questions: current.questions?.map((question) => ({
        ...question,
        answer: undefined,
      })),
    })
  }

  const saveQuestionAnswer = (
    current: TopicState,
    questionId: string,
    answer: 'A' | 'B' | 'C'
  ) => {
    const { questions } = current

    if (questions) {
      setCurrentTopic({
        ...current,
        questions: questions.map((q) =>
          q.id === questionId ? { ...q, answer } : q
        ),
      })
    }
  }

  return (
    <TopicsContext.Provider
      value={{
        manualQuestionnaire,
        switchManualQuestionnaire,
        currentTopic,
        selectTopic,
        startQuestionnaire,
        cancelQuestionnaire,
        saveQuestionAnswer,
        completeQuestionnaire,
        resetQuestionnaire,
      }}
    >
      {children}
    </TopicsContext.Provider>
  )
}
