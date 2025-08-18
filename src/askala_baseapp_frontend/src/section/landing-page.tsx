import React from 'react'
import Navbar from './components/navbar'
import Footer from './components/footer'
import SecondaryButton from './components/button/secondary'
import InfoCard from './components/home/info-card'
import { Sparkles } from 'lucide-react'

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <main className="flex flex-col min-h-screen bg-black">
        {/* Updated Hero Section */}
        <section className="relative pt-16 pb-12 overflow-hidden mt-16">
          {/* Background image */}
          <img
            src="/images/askala-space-bg.png"
            alt="Askala background"
            className="absolute inset-0 w-full h-full object-cover"
          />

          <div className="flex flex-col items-center text-center !space-y-5 relative z-10">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-[#2A2D3B] to-[#3E3F4E] hover:from-[#3E3F4E] hover:to-[#2A2D3B] transition duration-300 ease-in-out backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 mb-8">
              <Sparkles className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-medium text-white">
                Leading AI Based Learning Platform
              </span>
            </div>

            <h1
              className="!text-7xl font-medium !max-w-xl bg-clip-text text-transparent 
             bg-gradient-to-b from-[#ffffff] via-[#d6b1e5] via-60% to-[#ae66cc] to-90%
             [text-shadow:0_4px_20px_rgba(168,85,247,0.6)]"
            >
              Boost your <br /> skill with Askala.
            </h1>

            <p className="max-w-md !text-[20px] text-white opacity-70">
              Elevate your site's visibility effortlessly with AI, where smart
              technology meets user-friendly SEO tools.
            </p>

            <div className="relative p-2 rounded-xl flex items-center group">
              <span
                className="
                    absolute inset-0 rounded-xl border border-gray-700
                    transition-transform duration-300 ease-in-out
                    scale-105 group-hover:scale-100
                "
              />
              <SecondaryButton>Start for free</SecondaryButton>
            </div>
          </div>
        </section>

        {/* Updated Card Section */}
        <section className="relative overflow-hidden grid grid-cols-3 px-5 pb-20 pt-12">
          <div className="flex justify-end">
            <InfoCard
              title="Learn with Interactive Materials"
              description="Access high-quality course content in text, images, and videos — all in one place."
            />
          </div>
          <div className="flex justify-center">
            <InfoCard
              title="AI-Powered Learning Assistant"
              description="Chat with Askala’s AI to get explanations, practice questions, and deeper insights."
            />
          </div>
          <div className="flex justify-start">
            <InfoCard
              title="Secure & Private"
              description="Built on Internet Computer, your data stays safe with tamper-proof storage and end-to-end security."
            />
          </div>
        </section>

        <section className="flex flex-col items-center pb-20">
          <h2 className="!text-3xl font-medium tracking-tighter !mb-16">
            Harness the power of AI, make learning experience more intuitive and
            effective for all skill levels.
          </h2>

          <div className="flex flex-col items-center px-44 space-y-4">
            {/* Section 1 */}
            <div className="grid grid-cols-3 gap-4">
              <div className="flex flex-col items-center justify-center p-6 border border-gray-700 rounded-xl bg-black/40">
                <img
                  src="/images/3d-asset-askala-x.webp"
                  alt="3D Asset X"
                  className="size-60 mb-4"
                />
                <h3 className="text-lg font-semibold text-white">
                  AI Based Learning
                </h3>
                <p className="text-sm text-gray-400 text-center">
                  Make your learning experience great again!
                </p>
              </div>
              <div className="relative col-span-2 border border-gray-700 rounded-xl overflow-hidden bg-gradient-to-tr from-purple-900 to-black to-60%">
                <img
                  src="/images/askala_learn_asset.jpg"
                  alt="Dashboard preview"
                  className="relative top-20 left-28 w-full h-full object-contain scale-110"
                />

                <div className="absolute bottom-0 w-full h-32">
                  <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-purple-900/10 via-purple-600/8 to-purple-300/5 blur-3xl"></div>
                  <div className="absolute bottom-0 inset-x-0 h-28 bg-gradient-to-t from-purple-900/50 via-purple-700/25 to-purple-500/10 blur-2xl"></div>
                  <div className="absolute bottom-0 inset-x-0 w-full h-20 bg-gradient-to-t from-purple-950/50 via-purple-900/50 to-purple-800/50 blur-xl"></div>
                </div>

                <div
                  className="absolute bottom-0 left-0 w-full px-6 py-4 z-10 
                  bg-gradient-to-t from-black/60 via-black/40 to-transparent 
                  backdrop-blur-[1px]"
                >
                  <h3 className="text-lg font-semibold text-white drop-shadow-md">
                    Smart Guidance
                  </h3>
                  <p className="text-sm text-gray-200 drop-shadow">
                    Personalized help, and learning course.
                  </p>
                </div>
              </div>
            </div>

            {/* Section 2 */}
            <div className="grid grid-cols-3 gap-4">
              <div className="relative col-span-2 border border-gray-700 rounded-xl overflow-hidden bg-gradient-to-tr from-purple-900 to-black to-60%">
                <img
                  src="/images/askala_learn_asset.jpg"
                  alt="Dashboard preview"
                  className="relative top-20 left-28 w-full h-full object-contain scale-110"
                />

                <div className="absolute bottom-0 w-full h-32">
                  <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-purple-900/10 via-purple-600/8 to-purple-300/5 blur-3xl"></div>
                  <div className="absolute bottom-0 inset-x-0 h-28 bg-gradient-to-t from-purple-900/50 via-purple-700/25 to-purple-500/10 blur-2xl"></div>
                  <div className="absolute bottom-0 inset-x-0 w-full h-20 bg-gradient-to-t from-purple-950/50 via-purple-900/50 to-purple-800/50 blur-xl"></div>
                </div>

                <div
                  className="absolute bottom-0 left-0 w-full px-6 py-4 z-10 
                  bg-gradient-to-t from-black/60 via-black/40 to-transparent 
                  backdrop-blur-[1px]"
                >
                  <h3 className="text-lg font-semibold text-white drop-shadow-md">
                    Smart Guidance
                  </h3>
                  <p className="text-sm text-gray-200 drop-shadow">
                    Personalized help, and learning course.
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center p-6 border border-gray-700 rounded-xl bg-black/40">
                <img
                  src="/images/3d-asset-askala.webp"
                  alt="3D Asset Y"
                  className="size-60 mb-4"
                />
                <h3 className="text-lg font-semibold text-white">
                  Smart Guidance
                </h3>
                <p className="text-sm text-gray-400 text-center">
                  Personalized help, exercises, and insights.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
