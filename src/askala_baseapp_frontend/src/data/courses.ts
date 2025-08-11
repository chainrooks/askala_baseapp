import { TCourseProps } from '@/types/course'

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
