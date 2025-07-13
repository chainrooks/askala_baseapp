import { useState, useEffect } from 'react';
import type { TTopicProps } from '@/types/topic';

export const useMDXContent = (topic: TTopicProps | null) => {
  const [MDXComponent, setMDXComponent] = useState<React.ComponentType | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!topic) {
      setMDXComponent(null);
      return;
    }

    const loadMDXContent = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Map topic IDs to their corresponding MDX files
        const contentMap: { [key: string]: () => Promise<any> } = {
          'python-basics': () => import('../content/python/python-basics.mdx'),
          'data-structures': () => import('../content/python/data-structures.mdx'),
        };

        const loader = contentMap[topic.id];
        
        if (loader) {
          const module = await loader();
          setMDXComponent(() => module.default);
        } else {
          // Fallback for topics without MDX files
          setMDXComponent(null);
        }
      } catch (err) {
        console.error('Error loading MDX content:', err);
        setError('Failed to load content');
        setMDXComponent(null);
      } finally {
        setLoading(false);
      }
    };

    loadMDXContent();
  }, [topic?.id]);

  return { MDXComponent, loading, error };
};