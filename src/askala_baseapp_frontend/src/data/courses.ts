import { TCourseProps } from '@/types/course';

export const pythonCourse: TCourseProps = {
  id: 'python',
  name: 'Python Course',
  description: 'Master Python programming from basics to advanced concepts',
  topics: [
    {
      id: 'python-basics',
      title: 'Python Basics',
      description: 'Variables, data types, and basic syntax'
    },
    {
      id: 'data-structures',
      title: 'Data Structures',
      description: 'Lists, dictionaries, sets, and tuples'
    },
    {
      id: 'control-flow',
      title: 'Control Flow',
      description: 'Loops, conditionals, and exception handling'
    },
    {
      id: 'functions',
      title: 'Functions',
      description: 'Function definition, arguments, and scope'
    },
    {
      id: 'oop',
      title: 'Object-Oriented Programming',
      description: 'Classes, objects, inheritance, and polymorphism'
    },
    {
      id: 'modules',
      title: 'Modules & Packages',
      description: 'Importing modules and creating packages'
    }
  ]
};