import { TCourseProps } from '@/types/course'
import {
  BarChart3,
  BookOpen,
  Brain,
  Cat,
  ChevronRight,
  Github,
  Play,
  Sparkles,
  Target
} from 'lucide-react'

export const pythonCourse: TCourseProps = {
  id: 'python',
  name: 'Python Course',
  description: 'Master Python programming from basics to advanced concepts',
  topics: [
    {
      id: 'for_loops',
      title: 'For Loop',
      description: 'Loops, conditionals, and exception handling using for loop'
    },
    {
      id: 'functions',
      title: 'Functions',
      description: 'Function definition, arguments, and scope'
    },
    {
      id: 'if_else',
      title: 'If Else',
      description: 'Condition and scope'
    },
    {
      id: 'python_list',
      title: 'Python List',
      description: 'Manipulate List in Python'
    },
    {
      id: 'python_variables',
      title: 'Python Variables',
      description: 'Declaration, Value, and Type insertion'
    },
    {
      id: 'while',
      title: 'While Loop',
      description: 'Determining condition in while loop'
    }
  ]
}

export const features = [
  {
    icon: <Target className="w-6 h-6" />,
    title: 'Adaptive Learning',
    description:
      'AI that adapts learning materials to your learning style and abilities',
    image: 'bg-gradient-to-br from-blue-100 to-blue-200'
  },
  {
    icon: <BarChart3 className="w-6 h-6" />,
    title: 'Interactive Dashboard',
    description:
      'Monitor your learning progress with easy-to-understand data visualization',
    image: 'bg-gradient-to-br from-purple-100 to-purple-200'
  },
  {
    icon: <BookOpen className="w-6 h-6" />,
    title: 'Visual Report',
    description: 'Get deep insights into your AI skills development',
    image: 'bg-gradient-to-br from-green-100 to-green-200'
  },
  {
    icon: <Brain className="w-6 h-6" />,
    title: 'Smart Curriculum Generator',
    description:
      'Automatic recommendations for the most effective AI learning paths',
    image: 'bg-gradient-to-br from-orange-100 to-orange-200'
  }
]

export const learningClass = [
  {
    icon: <Sparkles className="w-6 h-6" />,
    title: 'Adaptive Learning Class',
    description:
      'AI that adapts learning materials to your learning style and abilities',
    image: 'bg-gradient-to-br from-blue-500 to-cyan-500',
    category: 'AI Learning',
    difficulty: 'Beginner',
    duration: '4 weeks',
    students: 1250,
    rating: 4.8,
    price: 'Free',
    priceICP: '0 ICP',
    priceUSD: '$0'
  },
  {
    icon: <BarChart3 className="w-6 h-6" />,
    title: 'Interactive Dashboard Class',
    description:
      'Monitor your learning progress with easy-to-understand data visualizations',
    image: 'bg-gradient-to-br from-purple-500 to-pink-500',
    category: 'Data Visualization',
    difficulty: 'Intermediate',
    duration: '3 weeks',
    students: 890,
    rating: 4.6,
    price: '6 ICP',
    priceICP: '6 ICP',
    priceUSD: '$30'
  },
  {
    icon: <BookOpen className="w-6 h-6" />,
    title: 'Visual Report Class',
    description: 'Get deep insights about your AI skill development progress',
    image: 'bg-gradient-to-br from-green-500 to-emerald-500',
    category: 'Analytics',
    difficulty: 'Intermediate',
    duration: '2 weeks',
    students: 675,
    rating: 4.7,
    price: '4 ICP',
    priceICP: '4 ICP',
    priceUSD: '$20'
  },
  {
    icon: <Brain className="w-6 h-6" />,
    title: 'Smart Curriculum Generator Class',
    description:
      'Automatic recommendations for the most effective AI learning paths',
    image: 'bg-gradient-to-br from-orange-500 to-red-500',
    category: 'AI Learning',
    difficulty: 'Advanced',
    duration: '6 weeks',
    students: 432,
    rating: 4.9,
    price: '10 ICP',
    priceICP: '10 ICP',
    priceUSD: '$50'
  },
  {
    icon: <Play className="w-6 h-6" />,
    title: 'Interactive Learning Class',
    description: 'Monitor your learning progress with fun interactions',
    image: 'bg-gradient-to-br from-yellow-500 to-orange-500',
    category: 'Interactive',
    difficulty: 'Beginner',
    duration: '3 weeks',
    students: 1100,
    rating: 4.5,
    price: '3 ICP',
    priceICP: '3 ICP',
    priceUSD: '$15'
  },
  {
    icon: <Target className="w-6 h-6" />,
    title: 'Project Creation Class',
    description: 'Learn to create projects that suit your needs',
    image: 'bg-gradient-to-br from-pink-500 to-rose-500',
    category: 'Project Based',
    difficulty: 'Intermediate',
    duration: '5 weeks',
    students: 756,
    rating: 4.8,
    price: '8 ICP',
    priceICP: '8 ICP',
    priceUSD: '$40'
  },
  {
    icon: <ChevronRight className="w-6 h-6" />,
    title: 'Skill Enhancement Class',
    description: 'Improve your skills with appropriate exercises',
    image: 'bg-gradient-to-br from-red-500 to-pink-500',
    category: 'Skill Development',
    difficulty: 'All Levels',
    duration: '4 weeks',
    students: 923,
    rating: 4.6,
    price: '5 ICP',
    priceICP: '5 ICP',
    priceUSD: '$25'
  },
  {
    icon: <Cat className="w-6 h-6" />,
    title: 'Build Your Own AI Class',
    description: 'Learn to create your own AI with expert guidance',
    image: 'bg-gradient-to-br from-indigo-500 to-purple-500',
    category: 'AI Development',
    difficulty: 'Advanced',
    duration: '8 weeks',
    students: 345,
    rating: 4.9,
    price: '14 ICP',
    priceICP: '14 ICP',
    priceUSD: '$70'
  },
  {
    icon: <Github className="w-6 h-6" />,
    title: 'Repository Creation Class',
    description: 'Learn to create repositories that suit your needs',
    image: 'bg-gradient-to-br from-gray-700 to-gray-900',
    category: 'Development',
    difficulty: 'Beginner',
    duration: '2 weeks',
    students: 1456,
    rating: 4.7,
    price: 'Free',
    priceICP: '0 ICP',
    priceUSD: '$0'
  }
]
