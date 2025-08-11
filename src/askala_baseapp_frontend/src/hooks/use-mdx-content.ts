import { useState, useEffect } from 'react'
import type { TTopicProps } from '@/types/topic'
import { CourseMetadata } from '@/section/sidebar-content'

export const useMDXContent = (topic: CourseMetadata | null) => {
  const [MDXComponent, setMDXComponent] = useState<React.ComponentType | null>(
    null
  )
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!topic) {
      setMDXComponent(null)
      return
    }

    const loadMDXContent = async () => {
      setLoading(true)
      setError(null)

      try {
        // Map topic IDs to their corresponding MDX files
        const contentMap: { [key: string]: () => Promise<any> } = {
          for_loops: () => import('../content/python/for_loops.md'),
          functions: () => import('../content/python/functions.md'),
          if_else: () => import('../content/python/if_else.md'),
          python_list: () => import('../content/python/python_list.md'),
          python_variables: () =>
            import('../content/python/python_variables.md'),
          while: () => import('../content/python/while.md')
        }

        const loader = contentMap[topic.slug]

        if (loader) {
          const module = await loader()
          setMDXComponent(() => module.default)
        } else {
          // Fallback for topics without MDX files
          setMDXComponent(null)
        }
      } catch (err) {
        console.error('Error loading MDX content:', err)
        setError('Failed to load content')
        setMDXComponent(null)
      } finally {
        setLoading(false)
        console.log(MDXComponent)
      }
    }

    loadMDXContent()
  }, [topic?.id])

  return { MDXComponent, loading, error }
}
