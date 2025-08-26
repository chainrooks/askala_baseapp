import React, { useState, useEffect } from 'react'
import {
  ChevronRight,
  Clock,
  Users,
  Star,
  ChevronLeft,
  BarChart3,
  Calculator,
  TrendingUp,
  DollarSign,
  ArrowUpDown,
  RefreshCw,
  Activity,
  Coins
} from 'lucide-react'
import { learningClass } from '@/data/courses'

export const ICPPriceSection = () => {
  const [icpPrice, setIcpPrice] = useState({ usd: 0, idr: 0 })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [calculatorAmount, setCalculatorAmount] = useState(1)
  const [calculatorFrom, setCalculatorFrom] = useState('ICP')
  const [calculatorTo, setCalculatorTo] = useState('USD')
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)
  const [priceChange, setPriceChange] = useState({ usd: 0, idr: 0 })

  const fetchICPPrice = async () => {
    setLoading(true)
    setError(null)

    try {
      setLoading(true)
      setError(null)

      // Actual API call to CoinGecko
      const response = await fetch(
        'https://api.coingecko.com/api/v3/simple/price?ids=internet-computer&vs_currencies=usd,idr&include_24hr_change=true&include_last_updated_at=true'
      )

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()

      if (!data || !data['internet-computer']) {
        throw new Error('Invalid response format from API')
      }

      const icpData = data['internet-computer']

      // Use actual data from API
      const actualPrice = {
        usd: icpData.usd,
        idr: icpData.idr
      }

      // Get actual price change data
      const priceChangeData = {
        usd: icpData.usd_24h_change || 0,
        idr: icpData.idr_24h_change || 0
      }

      // Get actual last updated timestamp
      const lastUpdated = icpData.last_updated_at
        ? new Date(icpData.last_updated_at * 1000)
        : new Date()

      setIcpPrice(actualPrice)
      setPriceChange(priceChangeData)
      setLastUpdated(lastUpdated)
    } catch (err) {
      console.error('Error fetching ICP price:', err)
      setError(
        err instanceof Error ? err.message : 'Failed to fetch ICP price data'
      )

      // Fallback to mock data if API fails
      const fallbackPrice = {
        usd: 12.45,
        idr: 12.45 * 15750 // Approximate IDR conversion
      }

      const fallbackChange = {
        usd: 0.5,
        idr: 0.5
      }

      setIcpPrice(fallbackPrice)
      setPriceChange(fallbackChange)
      setLastUpdated(new Date())
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchICPPrice()
    // Update price every 30 seconds
    const interval = setInterval(fetchICPPrice, 30000)
    return () => clearInterval(interval)
  }, [])

  const calculateConversion = () => {
    if (calculatorFrom === 'ICP') {
      if (calculatorTo === 'USD') {
        return (calculatorAmount * icpPrice.usd).toFixed(2)
      } else if (calculatorTo === 'IDR') {
        return (calculatorAmount * icpPrice.idr).toFixed(0)
      }
    } else if (calculatorFrom === 'USD') {
      if (calculatorTo === 'ICP') {
        return (calculatorAmount / icpPrice.usd).toFixed(4)
      } else if (calculatorTo === 'IDR') {
        return (calculatorAmount * 15750).toFixed(0) // Approximate USD to IDR
      }
    } else if (calculatorFrom === 'IDR') {
      if (calculatorTo === 'ICP') {
        return (calculatorAmount / icpPrice.idr).toFixed(4)
      } else if (calculatorTo === 'USD') {
        return (calculatorAmount / 15750).toFixed(2) // Approximate IDR to USD
      }
    }
    return calculatorAmount
  }

  const swapCurrencies = () => {
    setCalculatorFrom(calculatorTo)
    setCalculatorTo(calculatorFrom)
  }

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat().format(num)
  }

  const formatCurrency = (amount: number, currency: string) => {
    if (currency === 'USD') {
      return `$${formatNumber(amount)}`
    } else if (currency === 'IDR') {
      return `Rp ${formatNumber(amount)}`
    } else {
      return `${formatNumber(amount)} ICP`
    }
  }

  return (
    <section className="py-20 bg-gradient-to-b from-[#0a0e1a] via-[#0f1419] to-black relative overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-900/30 to-purple-900/30 backdrop-blur-sm px-4 py-2 rounded-full border border-blue-500/20 mb-6">
            <Coins className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-medium text-blue-300">
              Internet Computer Protocol
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-blue-600 bg-clip-text text-transparent mb-6">
            ICP Price Tracker & Calculator
          </h2>

          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Stay updated with real-time ICP prices and convert between ICP, USD,
            and IDR with our advanced calculator
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Price Display */}
          <div className="space-y-6">
            {/* Current Price Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* USD Price Card */}
              <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 hover:border-blue-500/30 transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-green-500/20 rounded-lg">
                      <DollarSign className="w-5 h-5 text-green-400" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-300">
                        ICP/USD
                      </h3>
                      <p className="text-xs text-gray-500">US Dollar</p>
                    </div>
                  </div>
                  <div
                    className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${
                      priceChange.usd >= 0
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-red-500/20 text-red-400'
                    }`}
                  >
                    <TrendingUp
                      className={`w-3 h-3 ${priceChange.usd < 0 ? 'rotate-180' : ''}`}
                    />
                    <span>{Math.abs(priceChange.usd).toFixed(2)}%</span>
                  </div>
                </div>

                {loading ? (
                  <div className="flex items-center space-x-2">
                    <RefreshCw className="w-4 h-4 animate-spin text-blue-400" />
                    <span className="text-gray-400">Loading...</span>
                  </div>
                ) : error ? (
                  <p className="text-red-400 text-sm">{error}</p>
                ) : (
                  <div>
                    <p className="text-2xl font-bold text-white mb-2">
                      ${icpPrice.usd.toFixed(4)}
                    </p>
                    <p className="text-xs text-gray-500">
                      Last updated: {lastUpdated?.toLocaleTimeString()}
                    </p>
                  </div>
                )}
              </div>

              {/* IDR Price Card */}
              <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 hover:border-purple-500/30 transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-purple-500/20 rounded-lg">
                      <BarChart3 className="w-5 h-5 text-purple-400" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-300">
                        ICP/IDR
                      </h3>
                      <p className="text-xs text-gray-500">Indonesian Rupiah</p>
                    </div>
                  </div>
                  <div
                    className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${
                      priceChange.idr >= 0
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-red-500/20 text-red-400'
                    }`}
                  >
                    <TrendingUp
                      className={`w-3 h-3 ${priceChange.idr < 0 ? 'rotate-180' : ''}`}
                    />
                    <span>{Math.abs(priceChange.idr).toFixed(2)}%</span>
                  </div>
                </div>

                {loading ? (
                  <div className="flex items-center space-x-2">
                    <RefreshCw className="w-4 h-4 animate-spin text-purple-400" />
                    <span className="text-gray-400">Loading...</span>
                  </div>
                ) : error ? (
                  <p className="text-red-400 text-sm">{error}</p>
                ) : (
                  <div>
                    <p className="text-2xl font-bold text-white mb-2">
                      Rp {formatNumber(Number(icpPrice.idr))}
                    </p>
                    <p className="text-xs text-gray-500">
                      Last updated: {lastUpdated?.toLocaleTimeString()}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Market Info */}
            <div className="bg-gradient-to-br from-gray-800/30 to-gray-900/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
              <div className="flex items-center space-x-3 mb-4">
                <Activity className="w-5 h-5 text-blue-400" />
                <h3 className="text-lg font-semibold text-white">
                  About Internet Computer (ICP)
                </h3>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">
                Internet Computer (ICP) is a revolutionary blockchain network
                that enables developers to build and deploy smart contracts and
                decentralized applications directly on the internet. ICP aims to
                extend the internet with secure, decentralized computing
                capabilities, making it possible to build entirely on-chain
                applications.
              </p>
            </div>
          </div>

          {/* Calculator */}
          <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl">
                <Calculator className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white">
                Currency Calculator
              </h3>
            </div>

            <div className="space-y-6">
              {/* Amount Input */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Amount
                </label>
                <input
                  type="number"
                  value={calculatorAmount}
                  onChange={(e) =>
                    setCalculatorAmount(parseFloat(e.target.value) || 0)
                  }
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Enter amount"
                  min="0"
                  step="any"
                />
              </div>

              {/* Currency Selection */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    From
                  </label>
                  <select
                    value={calculatorFrom}
                    onChange={(e) => setCalculatorFrom(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  >
                    <option value="ICP">ICP</option>
                    <option value="USD">USD</option>
                    <option value="IDR">IDR</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    To
                  </label>
                  <select
                    value={calculatorTo}
                    onChange={(e) => setCalculatorTo(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  >
                    <option value="ICP">ICP</option>
                    <option value="USD">USD</option>
                    <option value="IDR">IDR</option>
                  </select>
                </div>
              </div>

              {/* Swap Button */}
              <div className="flex justify-center">
                <button
                  onClick={swapCurrencies}
                  className="p-3 bg-gray-700/50 hover:bg-gray-600/50 rounded-full border border-gray-600 hover:border-gray-500 transition-all duration-200 group"
                >
                  <ArrowUpDown className="w-5 h-5 text-gray-400 group-hover:text-gray-300 group-hover:rotate-180 transition-all duration-200" />
                </button>
              </div>

              {/* Result */}
              <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-lg p-6 border border-blue-500/20">
                <div className="text-center">
                  <p className="text-sm text-gray-300 mb-2">Converted Amount</p>
                  {loading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <RefreshCw className="w-4 h-4 animate-spin text-blue-400" />
                      <span className="text-gray-400">Calculating...</span>
                    </div>
                  ) : (
                    <p className="text-2xl font-bold text-white">
                      {formatCurrency(
                        Number(calculateConversion()),
                        calculatorTo
                      )}
                    </p>
                  )}
                  <p className="text-xs text-gray-500 mt-2">
                    {calculatorAmount} {calculatorFrom} ={' '}
                    {calculateConversion()} {calculatorTo}
                  </p>
                </div>
              </div>

              {/* Refresh Button */}
              <button
                onClick={fetchICPPrice}
                disabled={loading}
                className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-700 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                <RefreshCw
                  className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`}
                />
                <span>{loading ? 'Updating...' : 'Refresh Prices'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center space-x-2 bg-yellow-500/10 text-yellow-400 px-4 py-2 rounded-full border border-yellow-500/20 text-sm">
            <Activity className="w-4 h-4" />
            <span>Prices update every 30 seconds</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export const PricingSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  const cardWidth = 350
  const maxSlide = learningClass.length

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1 + maxSlide) % maxSlide)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + maxSlide) % maxSlide)
  }

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
    <section className="py-8 bg-gradient-to-b from-black via-[#0f1419] to-[#0a0e1a] overflow-hidden relative">
      <div className="relative z-10">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-12 px-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#58C2D6] via-[#6366f1] to-[#8b5cf6] bg-clip-text text-transparent pb-4">
              Trending Courses
            </h1>
            <p className="text-[#8B9BB1] text-lg max-w-2xl">
              Find popular courses that have been selected by thousands of
              students to improve AI and tech skills
            </p>
          </div>
        </div>

        {/* Course Cards Container */}
        <div className="mx-auto px-4 max-w-7xl">
          <div className="relative overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentSlide * (cardWidth + 32)}px)`,
                width: `${learningClass.length * (cardWidth + 32)}px`
              }}
            >
              {learningClass.map((course, index) => (
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
                        ? 'scale-98 shadow-2xl'
                        : 'hover:scale-98'
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
                          Start Learning
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
            View All Classes
          </button>
        </div>
      </div>
    </section>
  )
}
