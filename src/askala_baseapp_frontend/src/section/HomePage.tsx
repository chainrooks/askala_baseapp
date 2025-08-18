import React, { useState, useEffect } from 'react'
import {
<<<<<<< Updated upstream
  Brain,
  Sparkles,
  Target,
  BarChart3,
  BookOpen,
  ChevronRight,
  Play,
  Cat,
  Github,
  Clock,
  ChevronLeft,
  ChevronDown,
  Search,
  Code,
  RefreshCcw
} from 'lucide-react'
import Navbar from './components/navbar'
import Footer from './components/footer'

export const HomePage = () => {
  const [currentFeature, setCurrentFeature] = useState(0)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [filter, setFilter] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')
  const [hoveredCard, setHoveredCard] = useState(null)
  const [rotateRefresh, setRotateRefresh] = useState(false)
=======
  Sparkles,
  ChevronRight,
  Play,
  Clock,
  Users,
  Star,
  ChevronLeft,
  ChevronDown,
  Search
} from 'lucide-react'
import Navbar from './components/navbar'
import Footer from './components/footer'
import { features, learningClass } from '@/data/courses'

export const HomePage = () => {
  const [activeFeature, setActiveFeature] = useState(0)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [filter, setFilter] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
>>>>>>> Stashed changes

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

<<<<<<< Updated upstream
  const features = [
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

  const learningClass = [
    {
      icon: <Code className="w-6 h-6" />,
      title: 'Kelas Pemrograman Python',
      description: 'Belajar pemrograman Python untuk meningkatkan kemampuan Anda',
      image: 'bg-gradient-to-br from-cyan-500 to-blue-500',
      category: 'Development',
      difficulty: 'Beginner',
      duration: '1 minggu',
      price: 'Gratis'
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: 'Kelas Pembelajaran Adaptif',
      description:
        'AI yang menyesuaikan materi pembelajaran dengan gaya belajar dan kemampuan Anda',
      image: 'bg-gradient-to-br from-blue-500 to-cyan-500',
      category: 'AI Learning',
      difficulty: 'Beginner',
      duration: '4 minggu',
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
      price: 'Gratis'
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
      price: 'Gratis'
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
      price: 'Gratis'
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
      price: 'Gratis'
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: 'Kelas Membuat Proyek',
      description: 'Belajar membuat proyek yang sesuai dengan kebutuhan Anda',
      image: 'bg-gradient-to-br from-pink-500 to-rose-500',
      category: 'Project Based',
      difficulty: 'Intermediate',
      duration: '5 minggu',
      price: 'Gratis'
    },
    {
      icon: <ChevronRight className="w-6 h-6" />,
      title: 'Kelas Meningkatkan Kemampuan',
      description: 'Meningkatkan kemampuan Anda dengan latihan yang sesuai',
      image: 'bg-gradient-to-br from-red-500 to-pink-500',
      category: 'Skill Development',
      difficulty: 'All Levels',
      duration: '4 minggu',
      price: 'Gratis'
    },
    {
      icon: <Cat className="w-6 h-6" />,
      title: 'Kelas Membuat AI Sendiri',
      description: 'Belajar membuat AI sendiri dengan bimbingan yang ahli',
      image: 'bg-gradient-to-br from-indigo-500 to-purple-500',
      category: 'AI Development',
      difficulty: 'Advanced',
      duration: '8 minggu',
      price: 'Gratis'
    },
    {
      icon: <Github className="w-6 h-6" />,
      title: 'Kelas Membuat Repository',
      description:
        'Belajar membuat repository yang sesuai dengan kebutuhan Anda',
      image: 'bg-gradient-to-br from-gray-700 to-gray-900',
      category: 'Development',
      difficulty: 'Beginner',
      duration: '2 minggu',
      price: 'Gratis'
    }
  ]

  const filteredClasses = learningClass.filter((course) => {
    const isFilterMatch = filter === 'All' || course.category === filter
    const isSearchMatch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase())
    return isFilterMatch && isSearchMatch
  })

  const cardWidth = 350
  const visibleCards = 3
  const maxSlide = filteredClasses.length - visibleCards

  const handleRefresh = () => {
    setSearchTerm('')
    setFilter('All')
    setCurrentSlide(0)
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % (maxSlide + 1))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + maxSlide + 1) % (maxSlide + 1))
  }

  // Auto-slide functionality
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % (maxSlide + 1))
      setCurrentFeature((prev) => (prev + 1) % features.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [maxSlide, features.length])

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

  return (
    <main className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1 bg-black">
        {/* Hero Section */}
        <section className="relative pt-16 pb-24 overflow-hidden mt-16">
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-blue-900/50"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-[#2A2D3B] to-[#3E3F4E] hover:bg-gradient-to-r hover:from-[#3E3F4E] hover:to-[#2A2D3B] transition duration-300 ease-in-out backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 mb-8">
                <Sparkles className="w-4 h-4 text-purple-600" />
                <span className="text-sm font-medium text-white">
                  Platform Pembelajaran AI Terdepan
                </span>
              </div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                Kuasai Bahasa Pemrograman Dengan{' '}
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Askala AI
                </span>
              </h1>
              <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                Tingkatkan kemampuan pemrograman Anda dengan mudah menggunakan
                platform pembelajaran yang didukung teknologi AI canggih dan
                metode pengajaran yang intuitif untuk semua level.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-2xl transform hover:scale-105 transition-all duration-200 flex items-center space-x-2">
                  <Play className="w-5 h-5" />
                  <span>Mulai Pembelajaran Gratis</span>
                </button>
                <button className="border border-gray-300 text-gray-300 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-50/10 transition-all duration-200 flex items-center space-x-2">
                  <span>Lihat Demo</span>
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Lerning materials Section */}
        <section className="py-10 bg-gradient-to-br from-[#0f1419] via-[#121826] to-[#1a1f2e] overflow-hidden relative">
          {/* Background decorative elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
          </div>

          <div className="relative z-10">
            {/* Header Section */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-12 px-8">
              <div>
                <p className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#58C2D6] via-[#6366f1] to-[#8b5cf6] bg-clip-text text-transparent mb-4">
                  Materi Pembelajaran Terbaik
                </p>
                <p className="text-[#8B9BB1] text-lg max-w-2xl">
                  Temukan kelas-kelas terbaik yang telah dipilih ribuan siswa
                  untuk meningkatkan kemampuan AI dan teknologi Anda
                </p>
              </div>

              {/* Search and Filter Controls */}
              <div className="flex flex-col sm:flex-row gap-2 mt-4 lg:mt-0 items-center">
                <RefreshCcw
                  className="w-6 h-6 mr-2 text-[#8B9BB1] transition-transform duration-300 hover:scale-110 transform cursor-pointer"
                  onClick={() => {
                    setRotateRefresh(!rotateRefresh);
                    handleRefresh();
                  }}
                  style={{ transform: rotateRefresh ? 'rotate(180deg)' : 'rotate(360deg)' }}
                />
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

=======
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

  // Auto-slide functionality
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
    <>
      <Navbar />
      <main className="flex flex-col min-h-screen bg-black">
        {/* Hero Section */}
        <section className="relative pt-16 pb-24 overflow-hidden mt-16">
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-blue-900/50"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-[#2A2D3B] to-[#3E3F4E] hover:bg-gradient-to-r hover:from-[#3E3F4E] hover:to-[#2A2D3B] transition duration-300 ease-in-out backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 mb-8">
                <Sparkles className="w-4 h-4 text-purple-600" />
                <span className="text-sm font-medium text-white">
                  Platform Pembelajaran AI Terdepan
                </span>
              </div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                Kuasai Bahasa Pemrograman Dengan{' '}
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Askala AI
                </span>
              </h1>
              <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                Tingkatkan kemampuan pemrograman Anda dengan mudah menggunakan
                platform pembelajaran yang didukung teknologi AI canggih dan
                metode pengajaran yang intuitif untuk semua level.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-2xl transform hover:scale-105 transition-all duration-200 flex items-center space-x-2">
                  <Play className="w-5 h-5" />
                  <span>Mulai Pembelajaran Gratis</span>
                </button>
                <button className="border border-gray-300 text-gray-300 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-50/10 transition-all duration-200 flex items-center space-x-2">
                  <span>Lihat Demo</span>
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Lerning materials Section */}
        <section className="py-20 bg-gradient-to-br from-[#0f1419] via-[#121826] to-[#1a1f2e] overflow-hidden relative">
          {/* Background decorative elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
          </div>

          <div className="relative z-10">
            {/* Header Section */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-12 px-8">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#58C2D6] via-[#6366f1] to-[#8b5cf6] bg-clip-text text-transparent mb-4">
                  Materi Pembelajaran Terpopuler
                </h2>
                <p className="text-[#8B9BB1] text-lg max-w-2xl">
                  Temukan kelas-kelas terbaik yang telah dipilih ribuan siswa
                  untuk meningkatkan kemampuan AI dan teknologi Anda
                </p>
              </div>

              {/* Search and Filter Controls */}
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

>>>>>>> Stashed changes
            {/* Course Cards Container */}
            <div className="mx-auto px-4 max-w-7xl">
              <div className="relative overflow-hidden">
                <div
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{
                    transform: `translateX(-${
                      currentSlide * (cardWidth + 32)
                    }px)`,
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
<<<<<<< Updated upstream
                        ? 'scale-96 shadow-2xl'
=======
                        ? 'scale-105 shadow-2xl'
>>>>>>> Stashed changes
                        : 'hover:scale-102'
                    } 
                    bg-gradient-to-br from-[#1F2937] to-[#111827] border border-gray-700 hover:border-[#58C2D6]/50
                    backdrop-blur-sm overflow-hidden group
                  `}
                      >
                        {/* Background gradient overlay */}
                        <div
                          className={`absolute inset-0 opacity-20 ${course.image} group-hover:opacity-30 transition-opacity duration-300`}
                        ></div>

<<<<<<< Updated upstream
                        {/* Difficulty badge */}
                        <div
                          className={`absolute top-4 left-4 px-3 py-1 ${getDifficultyColor(
                            course.difficulty
                          )} text-white text-xs font-semibold rounded-full`}
                        >
                          {course.difficulty}
                        </div>

                        {/* Content */}
                        <div className="relative z-10 flex flex-col h-full pt-12">
                          {/* Icon and Title */}
                          <div className="flex items-center space-x-4 mb-4">
                            <div className="p-3 bg-gradient-to-br from-[#58C2D6] to-[#6366f1] rounded-lg text-white">
                              {course.icon}
                            </div>
                            <h3 className="text-xl font-bold text-white leading-tight">
                              {course.title}
                            </h3>
                          </div>

                          {/* Description */}
                          <p className="text-[#8B9BB1] mb-6 flex-grow text-sm leading-relaxed">
                            {course.description}
                          </p>

                          {/* Course Stats */}
                          <div className="space-y-3 mb-6">
                            <div className="flex items-center justify-between text-sm">
                              <div className="flex items-center gap-2 text-gray-300">
                                <Clock className="w-4 h-4" />
                                <span>{course.duration}</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm px-3 py-1 bg-gray-800 text-gray-300 rounded-full">
                                  {course.category}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Price and CTA */}
                          <div className="flex items-center justify-between">
                            {/* <div className="text-lg font-bold text-[#58C2D6]">
                              {course.price}
                            </div> */}
                            <button className="px-6 py-2 bg-gradient-to-r from-[#58C2D6] to-[#6366f1] text-lg font-semibold rounded-lg text-white hover:from-[#6366f1] hover:to-[#8b5cf6] transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                              Mulai Belajar
                            </button>
                          </div>
                        </div>

                        {/* Hover Effect Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#58C2D6]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Slide Indicators */}
            <div className="flex justify-center mt-8 space-x-2">
              {Array.from({ length: maxSlide + 1 }, (_, i) => (
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

            {/* Navigation Buttons */}
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

            {/* Bottom CTA */}
            {/* <div className="text-center mt-12">
              <button className="px-8 py-4 bg-gradient-to-r from-[#58C2D6] via-[#6366f1] to-[#8b5cf6] text-white font-bold text-lg rounded-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                Lihat Semua Kelas
              </button>
            </div> */}
          </div>
        </section>

        {/* Main Features Section */}
        <section className="py-20 sm:px-10 lg:px-16">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Sidebar Navigation */}
              <div className="lg:w-1/4 space-y-4">
                {features.map((feature, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentFeature(index)}
                    className={`w-full p-6 rounded-xl text-left transition-all duration-300 ${
                      index === currentFeature
                        ? `bg-gradient-to-br ${feature.color} shadow-lg shadow-[#6c5ce7]`
                        : 'bg-gray-900 hover:bg-gray-800'
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <div
                        className={`p-3 rounded-full ${
                          index === currentFeature ? 'bg-white' : 'bg-gray-700'
                        }`}
                      >
                        {React.cloneElement(feature.icon, {
                          className: `w-5 h-5 ${
                            index === currentFeature
                              ? 'text-gray-900'
                              : 'text-white'
                          }`
                        })}
                      </div>
                      <h3
                        className={`text-lg font-medium ${
                          index === currentFeature
                            ? 'text-white'
                            : 'text-gray-400'
                        }`}
                      >
                        {feature.title}
                      </h3>
                    </div>
                  </button>
                ))}
              </div>

              {/* Main Content */}
              <div className="lg:w-3/4">
                <div
                  className={`w-full h-full min-h-[500px] rounded-2xl bg-gradient-to-br ${features[currentFeature]} flex items-center justify-center shadow-[#6c5ce7] transition-all duration-500 p-8 border-4 border-gray-400 `}
                >
                  <div className="text-center max-w-2xl">
                    <div className="w-20 h-20 bg-white text-blue-600 rounded-full flex items-center justify-center shadow-lg mb-6 mx-auto">
                      {features[currentFeature].icon}
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-4">
                      {features[currentFeature].title}
                    </h2>
                    <p className="text-gray-300 text-lg mb-8">
                      {features[currentFeature].description}
=======
                        {/* Popular badge */}
                        {course.students > 1000 && (
                          <div className="absolute top-4 right-4 px-3 py-1 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs font-bold rounded-full flex items-center gap-1">
                            <Star className="w-3 h-3" />
                            Popular
                          </div>
                        )}

                        {/* Difficulty badge */}
                        <div
                          className={`absolute top-4 left-4 px-3 py-1 ${getDifficultyColor(
                            course.difficulty
                          )} text-white text-xs font-semibold rounded-full`}
                        >
                          {course.difficulty}
                        </div>

                        {/* Content */}
                        <div className="relative z-10 flex flex-col h-full pt-12">
                          {/* Icon and Title */}
                          <div className="flex items-center space-x-4 mb-4">
                            <div className="p-3 bg-gradient-to-br from-[#58C2D6] to-[#6366f1] rounded-lg text-white">
                              {course.icon}
                            </div>
                            <h3 className="text-xl font-bold text-white leading-tight">
                              {course.title}
                            </h3>
                          </div>

                          {/* Description */}
                          <p className="text-[#8B9BB1] mb-6 flex-grow text-sm leading-relaxed">
                            {course.description}
                          </p>

                          {/* Course Stats */}
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

                          {/* Price and CTA */}
                          <div className="flex items-center justify-between">
                            <div className="text-lg font-bold text-[#58C2D6]">
                              {course.price}
                            </div>
                            <button className="px-6 py-2 bg-gradient-to-r from-[#58C2D6] to-[#6366f1] text-lg font-semibold rounded-lg text-white hover:from-[#6366f1] hover:to-[#8b5cf6] transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                              Mulai Belajar
                            </button>
                          </div>
                        </div>

                        {/* Hover Effect Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#58C2D6]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Slide Indicators */}
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

            {/* Navigation Buttons */}
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

            {/* Bottom CTA */}
            <div className="text-center mt-12">
              <button className="px-8 py-4 bg-gradient-to-r from-[#58C2D6] via-[#6366f1] to-[#8b5cf6] text-white font-bold text-lg rounded-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                Lihat Semua Kelas
              </button>
            </div>
          </div>
        </section>

        {/* Main Features Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Sidebar Navigation */}
              <div className="lg:w-1/4 space-y-4">
                {features.map((feature, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveFeature(index)}
                    className={`w-full p-6 rounded-xl text-left transition-all duration-300 ${
                      index === activeFeature
                        ? `bg-gradient-to-br ${feature.image} shadow-lg shadow-[#6c5ce7]`
                        : 'bg-gray-900 hover:bg-gray-800'
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <div
                        className={`p-3 rounded-full ${
                          index === activeFeature ? 'bg-white' : 'bg-gray-700'
                        }`}
                      >
                        {React.cloneElement(feature.icon, {
                          className: `w-5 h-5 ${
                            index === activeFeature
                              ? 'text-gray-900'
                              : 'text-white'
                          }`
                        })}
                      </div>
                      <h3
                        className={`text-lg font-medium ${
                          index === activeFeature
                            ? 'text-white'
                            : 'text-gray-400'
                        }`}
                      >
                        {feature.title}
                      </h3>
                    </div>
                  </button>
                ))}
              </div>

              {/* Main Content */}
              <div className="lg:w-3/4">
                <div
                  className={`w-full h-full min-h-[500px] rounded-2xl bg-gradient-to-br ${features[activeFeature]} flex items-center justify-center shadow-[#6c5ce7] transition-all duration-500 p-8 border-4 border-gray-400 `}
                >
                  <div className="text-center max-w-2xl">
                    <div className="w-20 h-20 bg-white text-blue-600 rounded-full flex items-center justify-center shadow-lg mb-6 mx-auto">
                      {features[activeFeature].icon}
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-4">
                      {features[activeFeature].title}
                    </h2>
                    <p className="text-gray-300 text-lg mb-8">
                      {features[activeFeature].description}
>>>>>>> Stashed changes
                    </p>
                    <div className="flex justify-center space-x-2">
                      {features.map((_, index) => (
                        <button
                          key={index}
<<<<<<< Updated upstream
                          onClick={() => setCurrentFeature(index)}
                          className={`w-3 h-3 rounded-full transition-all ${
                            index === currentFeature
=======
                          onClick={() => setActiveFeature(index)}
                          className={`w-3 h-3 rounded-full transition-all ${
                            index === activeFeature
>>>>>>> Stashed changes
                              ? 'bg-white w-8'
                              : 'bg-gray-500'
                          }`}
                          aria-label={`Go to feature ${index + 1}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
<<<<<<< Updated upstream
      </div>
      <Footer />
    </main>
=======
      </main>
      <Footer />
    </>
>>>>>>> Stashed changes
  )
}
