import { Brain, Globe, Sparkles } from 'lucide-react'
import type { TLogin } from '@/types/auth'

export default function Login({
  onLogin,
  className = '',
  isLoading = false,
  error
}: TLogin) {
  const handleLogin = async () => {
    try {
      await onLogin()
    } catch (error) {
      console.error('Login error:', error)
    }
  }

  return (
    <div className={`relative ${className}`}>
      {/* Background decorative elements */}
      <div className="absolute -top-20 -left-20 w-40 h-40 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute -bottom-20 -right-20 w-32 h-32 bg-gradient-to-br from-emerald-500/20 to-teal-600/20 rounded-full blur-3xl animate-pulse delay-1000" />

      {/* Card */}
      <div className="w-full max-w-md mx-auto bg-slate-900/95 border border-slate-700/50 rounded-lg shadow-2xl shadow-blue-900/20 backdrop-blur-xl relative overflow-hidden">
        {/* Header glow line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent" />

        {/* Card Header */}
        <div className="px-6 pt-6 pb-8 text-center space-y-6">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="relative">
              <Brain className="h-10 w-10 text-blue-400" />
              <Sparkles className="absolute -top-1 -right-1 h-5 w-5 text-emerald-400 animate-pulse" />
            </div>
          </div>
          <div className="space-y-4">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent">
              Askala
            </h2>
            <p className="text-slate-300 leading-relaxed text-base px-2">
              Your intelligent learning companion powered by advanced AI.
              Discover personalized knowledge through interactive conversations
              and adaptive learning experiences.
            </p>
          </div>
        </div>

        {/* Card Content */}
        <div className="px-6 pb-8 space-y-6">
          {error && (
            <div className="p-4 bg-red-950/50 border border-red-800/50 rounded-lg text-red-200 text-sm text-center">
              {error}
            </div>
          )}

          <button
            onClick={handleLogin}
            disabled={isLoading}
            className={`w-full h-12 flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-md shadow-lg shadow-blue-900/25 text-base transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] hover:from-blue-500 hover:to-purple-500 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none`}
          >
            {isLoading ? (
              <>
                <div className="mr-3 h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Connecting to Internet Identity...
              </>
            ) : (
              <>
                <Globe className="mr-3 h-5 w-5" />
                Login with Internet Identity
              </>
            )}
          </button>

          {/* Feature Highlights */}
          <div className="pt-6 border-t border-slate-700/50">
            <div className="grid grid-cols-3 gap-6 text-center">
              <div className="space-y-2">
                <Brain className="h-6 w-6 text-blue-400 mx-auto" />
                <p className="text-xs text-slate-400 font-medium">AI-Powered</p>
              </div>
              <div className="space-y-2">
                <Sparkles className="h-6 w-6 text-purple-400 mx-auto" />
                <p className="text-xs text-slate-400 font-medium">
                  Personalized
                </p>
              </div>
              <div className="space-y-2">
                <Globe className="h-6 w-6 text-emerald-400 mx-auto" />
                <p className="text-xs text-slate-400 font-medium">Secure</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
