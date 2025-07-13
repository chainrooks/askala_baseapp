import { TCourseProps } from "@/types/course";

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
  ]
};