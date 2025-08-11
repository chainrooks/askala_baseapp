import { useEffect, useState } from 'react'
import type { InternetIdentityState } from '@/types/auth'

export interface CourseMetadata {
  code: string
  contentHash: string
  createdAt: bigint
  description: string
  id: string
  slug: string
  title: string
  updatedAt: bigint
  version: string
}

interface CourseListProps {
  authState: InternetIdentityState
}

export function CourseList({ authState }: CourseListProps) {
  const [courses, setCourses] = useState<CourseMetadata[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const formatDate = (ns: bigint) => {
    const ms = Number(ns / BigInt(1_000_000))
    return new Date(ms).toLocaleString()
  }

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

  if (!authState.isAuthenticated) {
    return <p className="p-4 text-gray-500">Please log in to see courses.</p>
  }

  if (loading) {
    return <p className="p-4 text-gray-500">Loading courses...</p>
  }

  if (error) {
    return <p className="p-4 text-red-500">{error}</p>
  }

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-2">Available Courses</h2>
      {courses.length === 0 ? (
        <p className="text-gray-500">No courses found.</p>
      ) : (
        <ul className="space-y-3">
          {courses.map((course) => (
            <li
              key={course.id}
              className="p-3 border rounded-lg shadow-sm bg-white"
            >
              <h3 className="font-semibold">{course.title}</h3>
              <p className="text-sm text-gray-600">{course.description}</p>
              <p className="text-xs text-gray-500 mt-1">
                Created: {formatDate(course.createdAt)}
              </p>
              <p className="text-xs text-gray-500">
                Updated: {formatDate(course.updatedAt)}
              </p>
              <p className="text-xs text-gray-500">
                Version: {course.version} | Code: {course.code}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
