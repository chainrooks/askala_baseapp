import React, { useEffect, useState } from 'react'
import type { TTopicProps } from '@/types/topic'
import { BookOpen } from 'lucide-react'
import { InternetIdentityState } from '@/types/auth'
import { pythonCourse } from '@/data/courses'

export interface SidebarProps {
  selectedTopic: CourseMetadata | undefined
  onTopicSelect: (topic: CourseMetadata) => void
  onLogout: () => Promise<void> | void
  authState: InternetIdentityState
}

export interface CourseMetadata {
  code: string
  contentHash: string
  createdAt: bigint
  description: string
  id: string
  is_premium: boolean
  slug: string
  title: string
  updatedAt: bigint
  version: string
}

export const SideContent: React.FC<SidebarProps> = ({
  selectedTopic,
  onTopicSelect,
  onLogout,
  authState
}) => {
  const [courses, setCourses] = useState<CourseMetadata[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCourses = async () => {
      if (!authState.isAuthenticated || !authState.actor) return
      setLoading(true)
      setError(null)
      try {
        const data: CourseMetadata[] = await authState.actor.getAllCourses()
        setCourses(data)
        console.log('Success')
      } catch (err) {
        console.error('Error fetching courses:', err)
        setError('Failed to fetch courses')
      } finally {
        setLoading(false)
      }
    }

    fetchCourses()
  }, [authState.isAuthenticated, authState.actor])

  return (
    <div className="w-80 bg-gray-900 border-r border-gray-700 flex flex-col h-full">
      <div className="p-6 border-b border-gray-700">
        <h2 className="text-xl font-semibold text-white flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-gray-400" />
          Askala Learning
        </h2>
        <p className="text-sm text-gray-400 mt-1">
          Master your skills from beginner to advance with the power of AI.
        </p>
      </div>

      <button
        className="text-gray-400 hover:text-red-400 hover:bg-red-900/20 w-full justify-start p-3 text-left"
        onClick={async () => await onLogout()}
      >
        Logout
      </button>

      <div className="flex-1 overflow-y-auto">
        {loading && <>Loading...</>}
        <div className="p-4 space-y-2">
          {courses.map((topic) => {
            const isSelected = selectedTopic?.id === topic.id
            return (
              <button
                key={topic.id}
                onClick={() => onTopicSelect(topic)}
                className={`w-full text-left h-auto p-3 rounded-md transition-all duration-200 ${
                  isSelected
                    ? 'bg-gray-800 text-white'
                    : 'text-gray-400 hover:bg-gray-800'
                }`}
              >
                <div className="font-medium text-sm">{topic.title}</div>
                <div className="text-xs mt-1 text-gray-400">
                  {topic.description}
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
