import { getAllTopics } from '@/context/topics/getalltopics'
import Main from './main'

export default function Home({ params }: { params: { topic: string[] } }) {
  return (
    <div className="main-container">
      <Main params={params} />
    </div>
  )
}

export async function generateStaticParams() {
  return getAllTopics()
}
