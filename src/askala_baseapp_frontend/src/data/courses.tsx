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
    title: 'Pembelajaran Adaptif',
    description:
      'AI yang menyesuaikan materi pembelajaran dengan gaya belajar dan kemampuan Anda',
    image: 'bg-gradient-to-br from-blue-100 to-blue-200'
  },
  {
    icon: <BarChart3 className="w-6 h-6" />,
    title: 'Dashboard Interaktif',
    description:
      'Pantau progress pembelajaran Anda dengan visualisasi data yang mudah dipahami',
    image: 'bg-gradient-to-br from-purple-100 to-purple-200'
  },
  {
    icon: <BookOpen className="w-6 h-6" />,
    title: 'Laporan Visual',
    description:
      'Dapatkan insight mendalam tentang perkembangan kemampuan AI Anda',
    image: 'bg-gradient-to-br from-green-100 to-green-200'
  },
  {
    icon: <Brain className="w-6 h-6" />,
    title: 'Generator Kurikulum Cerdas',
    description:
      'Rekomendasi otomatis untuk jalur pembelajaran AI yang paling efektif',
    image: 'bg-gradient-to-br from-orange-100 to-orange-200'
  }
]

export const learningClass = [
  {
    icon: <Sparkles className="w-6 h-6" />,
    title: 'Kelas Pembelajaran Adaptif',
    description:
      'AI yang menyesuaikan materi pembelajaran dengan gaya belajar dan kemampuan Anda',
    image: 'bg-gradient-to-br from-blue-500 to-cyan-500',
    category: 'AI Learning',
    difficulty: 'Beginner',
    duration: '4 minggu',
    students: 1250,
    rating: 4.8,
    price: 'Gratis'
  },
  {
    icon: <BarChart3 className="w-6 h-6" />,
    title: 'Kelas Dashboard Interaktif',
    description:
      'Pantau progress pembelajaran Anda dengan visualisasi data yang mudah dipahami',
    image: 'bg-gradient-to-br from-purple-500 to-pink-500',
    category: 'Data Visualization',
    difficulty: 'Intermediate',
    duration: '3 minggu',
    students: 890,
    rating: 4.6,
    price: 'Rp 299.000'
  },
  {
    icon: <BookOpen className="w-6 h-6" />,
    title: 'Kelas Laporan Visual',
    description:
      'Dapatkan insight mendalam tentang perkembangan kemampuan AI Anda',
    image: 'bg-gradient-to-br from-green-500 to-emerald-500',
    category: 'Analytics',
    difficulty: 'Intermediate',
    duration: '2 minggu',
    students: 675,
    rating: 4.7,
    price: 'Rp 199.000'
  },
  {
    icon: <Brain className="w-6 h-6" />,
    title: 'Kelas Generator Kurikulum Cerdas',
    description:
      'Rekomendasi otomatis untuk jalur pembelajaran AI yang paling efektif',
    image: 'bg-gradient-to-br from-orange-500 to-red-500',
    category: 'AI Learning',
    difficulty: 'Advanced',
    duration: '6 minggu',
    students: 432,
    rating: 4.9,
    price: 'Rp 499.000'
  },
  {
    icon: <Play className="w-6 h-6" />,
    title: 'Kelas Pembelajaran Interaktif',
    description:
      'Pantau progress pembelajaran Anda dengan interaksi yang menyenangkan',
    image: 'bg-gradient-to-br from-yellow-500 to-orange-500',
    category: 'Interactive',
    difficulty: 'Beginner',
    duration: '3 minggu',
    students: 1100,
    rating: 4.5,
    price: 'Rp 149.000'
  },
  {
    icon: <Target className="w-6 h-6" />,
    title: 'Kelas Membuat Proyek',
    description: 'Belajar membuat proyek yang sesuai dengan kebutuhan Anda',
    image: 'bg-gradient-to-br from-pink-500 to-rose-500',
    category: 'Project Based',
    difficulty: 'Intermediate',
    duration: '5 minggu',
    students: 756,
    rating: 4.8,
    price: 'Rp 399.000'
  },
  {
    icon: <ChevronRight className="w-6 h-6" />,
    title: 'Kelas Meningkatkan Kemampuan',
    description: 'Meningkatkan kemampuan Anda dengan latihan yang sesuai',
    image: 'bg-gradient-to-br from-red-500 to-pink-500',
    category: 'Skill Development',
    difficulty: 'All Levels',
    duration: '4 minggu',
    students: 923,
    rating: 4.6,
    price: 'Rp 249.000'
  },
  {
    icon: <Cat className="w-6 h-6" />,
    title: 'Kelas Membuat AI Sendiri',
    description: 'Belajar membuat AI sendiri dengan bimbingan yang ahli',
    image: 'bg-gradient-to-br from-indigo-500 to-purple-500',
    category: 'AI Development',
    difficulty: 'Advanced',
    duration: '8 minggu',
    students: 345,
    rating: 4.9,
    price: 'Rp 699.000'
  },
  {
    icon: <Github className="w-6 h-6" />,
    title: 'Kelas Membuat Repository',
    description: 'Belajar membuat repository yang sesuai dengan kebutuhan Anda',
    image: 'bg-gradient-to-br from-gray-700 to-gray-900',
    category: 'Development',
    difficulty: 'Beginner',
    duration: '2 minggu',
    students: 1456,
    rating: 4.7,
    price: 'Gratis'
  }
]
