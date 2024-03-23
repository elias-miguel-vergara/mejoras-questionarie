import type { Metadata } from 'next'
import Link from 'next/link'
import { Inter } from 'next/font/google'
import './globals.css'
import topics from '../context/topics/topics.json'
import { getAllTopics } from '../context/topics'
import { TopicsProvider } from '../components'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Questionnaire App',
  description: 'Answer different topics questions',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col`}>
        <TopicsProvider
          topics={[
            ...getAllTopics(),
            ...topics,
          ]}
        >
          <div className="flex bg-black text-white items-center justify-start h-[60px] pl-[5px]">
            <Link href={'/'} className="">
              Questionnaire App
            </Link>
          </div>
          <div className="flex main">{children}</div>
        </TopicsProvider>
      </body>
    </html>
  )
}
