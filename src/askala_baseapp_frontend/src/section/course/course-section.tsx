import { learningClass } from '@/data/courses'
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock,
  Search,
  Star,
  Users
} from 'lucide-react'
import { useEffect, useState } from 'react'

export default function CourseSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [filter, setFilter] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  const categories = [
    'All',
    'AI Learning',
    'Data Visualization',
    'Analytics',
    'Interactive',
    'Project Based',
    'Skill Development',
    'AI Development',
    'Development'
  ]

  const filteredClasses = learningClass.filter((course) => {
    const matchesFilter = filter === 'All' || course.category === filter
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const cardWidth = 350
  const visibleCards = 3
  const maxSlide = filteredClasses.length

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1 + maxSlide) % maxSlide)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + maxSlide) % maxSlide)
  }

  useEffect(() => {
    if (maxSlide <= visibleCards) return // No auto-slide if not enough cards

    // Set interval to change slide every 5 seconds
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1 + maxSlide) % maxSlide)
    }, 5000)
    return () => clearInterval(timer)
  }, [maxSlide])

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return 'bg-green-500'
      case 'Intermediate':
        return 'bg-yellow-500'
      case 'Advanced':
        return 'bg-red-500'
      default:
        return 'bg-blue-500'
    }
  }

  useEffect(() => {
    setCurrentSlide((prev) => (prev + 1 + maxSlide) % maxSlide)
  }, [maxSlide])

  return (
    <section className="py-20 bg-gradient-to-br from-[#0f1419] via-[#121826] to-[#1a1f2e] overflow-hidden relative">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-12 px-8">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#58C2D6] via-[#6366f1] to-[#8b5cf6] bg-clip-text text-transparent mb-4">
              Materi Pembelajaran Terpopuler
            </h2>
            <p className="text-[#8B9BB1] text-lg max-w-2xl">
              Temukan kelas-kelas terbaik yang telah dipilih ribuan siswa untuk
              meningkatkan kemampuan AI dan teknologi Anda
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 mt-4 lg:mt-0">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Cari kelas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-3 py-2 bg-[#1F2937] border border-gray-600 rounded-lg text-base text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#58C2D6] transition-all w-full"
              />
            </div>
            <div className="relative w-full sm:w-40">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="pl-3 pr-2 py-2 bg-[#1F2937] border border-gray-600 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#58C2D6] transition-all w-full appearance-none"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <div>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              </div>
            </div>
          </div>
        </div>

        {/* Course Cards Container */}
        <div className="mx-auto px-4 max-w-7xl">
          <div className="relative overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentSlide * (cardWidth + 32)}px)`,
                width: `${filteredClasses.length * (cardWidth + 32)}px`
              }}
            >
              {filteredClasses.map((course, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 mr-8"
                  style={{ width: `${cardWidth}px` }}
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <div
                    className={`
                    relative h-full p-6 rounded-2xl shadow-xl transition-all duration-300 transform 
                    ${
                      hoveredCard === index
                        ? 'scale-105 shadow-2xl'
                        : 'hover:scale-102'
                    } 
                    bg-gradient-to-br from-[#1F2937] to-[#111827] border border-gray-700 hover:border-[#58C2D6]/50
                    backdrop-blur-sm overflow-hidden group
                  `}
                  >
                    <div
                      className={`absolute inset-0 opacity-20 ${course.image} group-hover:opacity-30 transition-opacity duration-300`}
                    ></div>

                    {/* Popular badge */}
                    {course.students > 1000 && (
                      <div className="absolute top-4 right-4 px-3 py-1 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs font-bold rounded-full flex items-center gap-1">
                        <Star className="w-3 h-3" />
                        Popular
                      </div>
                    )}

                    <div
                      className={`absolute top-4 left-4 px-3 py-1 ${getDifficultyColor(
                        course.difficulty
                      )} text-white text-xs font-semibold rounded-full`}
                    >
                      {course.difficulty}
                    </div>

                    <div className="relative z-10 flex flex-col h-full pt-12">
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="p-3 bg-gradient-to-br from-[#58C2D6] to-[#6366f1] rounded-lg text-white">
                          {course.icon}
                        </div>
                        <h3 className="text-xl font-bold text-white leading-tight">
                          {course.title}
                        </h3>
                      </div>

                      <p className="text-[#8B9BB1] mb-6 flex-grow text-sm leading-relaxed">
                        {course.description}
                      </p>

                      <div className="space-y-3 mb-6">
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2 text-gray-300">
                            <Clock className="w-4 h-4" />
                            <span>{course.duration}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-300">
                            <Users className="w-4 h-4" />
                            <span>{course.students.toLocaleString()}</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < Math.floor(course.rating)
                                    ? 'text-yellow-400 fill-current'
                                    : 'text-gray-400'
                                }`}
                              />
                            ))}
                            <span className="text-sm text-gray-300 ml-2">
                              {course.rating}
                            </span>
                          </div>
                          <span className="text-sm px-3 py-1 bg-gray-800 text-gray-300 rounded-full">
                            {course.category}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="text-lg font-bold text-[#58C2D6]">
                          {course.price}
                        </div>
                        <button className="px-6 py-2 bg-gradient-to-r from-[#58C2D6] to-[#6366f1] text-lg font-semibold rounded-lg text-white hover:from-[#6366f1] hover:to-[#8b5cf6] transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                          Mulai Belajar
                        </button>
                      </div>
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-t from-[#58C2D6]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-8 space-x-2">
          {Array.from({ length: maxSlide }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentSlide === i
                  ? 'bg-[#58C2D6] w-8'
                  : 'bg-gray-600 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>

        <div className="flex justify-center gap-4 mb-8 mt-6">
          <button
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className="p-3 bg-[#1F2937] hover:bg-[#374151] disabled:opacity-50 disabled:cursor-not-allowed rounded-full border border-gray-600 transition-all duration-300 hover:border-[#58C2D6] group"
          >
            <ChevronLeft className="w-5 h-5 text-[#58C2D6] group-hover:scale-110 transition-transform" />
          </button>
          <button
            onClick={nextSlide}
            disabled={currentSlide >= maxSlide}
            className="p-3 bg-[#1F2937] hover:bg-[#374151] disabled:opacity-50 disabled:cursor-not-allowed rounded-full border border-gray-600 transition-all duration-300 hover:border-[#58C2D6] group"
          >
            <ChevronRight className="w-5 h-5 text-[#58C2D6] group-hover:scale-110 transition-transform" />
          </button>
        </div>

        <div className="text-center mt-12">
          <button className="px-8 py-4 bg-gradient-to-r from-[#58C2D6] via-[#6366f1] to-[#8b5cf6] text-white font-bold text-lg rounded-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
            Lihat Semua Kelas
          </button>
        </div>
      </div>
    </section>
  )
}
