import Logo from './common/logo'
import logo from '/logo.png'

const Navbar = () => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center py-4 bg-transparent">
      <div className="flex items-center justify-center border border-gray-600 p-3 rounded-xl space-x-16 bg-transparent backdrop-blur-sm">
        <Logo />

        <div className="flex items-center space-x-2 rounded-full px-4 py-2">
          <div className="cursor-pointer py-2 px-3 rounded-[50px] transition-colors duration-200 hover:bg-white/10 hover:shadow-[inset_0_0_6px_3px_rgba(255,255,255,0.2)]">
            <p className="text-white !text-xs font-normal opacity-70">Learn</p>
          </div>

          <div className="cursor-pointer py-2 px-3 rounded-[50px] transition-colors duration-200 hover:bg-white/10 hover:shadow-[inset_0_0_6px_3px_rgba(255,255,255,0.2)]">
            <p className="text-white !text-xs font-normal opacity-70">
              Pricing
            </p>
          </div>

          <div className="cursor-pointer py-2 px-3 rounded-[50px] transition-colors duration-200 hover:bg-white/10 hover:shadow-[inset_0_0_6px_3px_rgba(255,255,255,0.2)]">
            <p className="text-white !text-xs font-normal opacity-70">
              Community
            </p>
          </div>

          <div className="cursor-pointer py-2 px-3 rounded-[50px] transition-colors duration-200 hover:bg-white/10 hover:shadow-[inset_0_0_6px_3px_rgba(255,255,255,0.2)]">
            <p className="text-white !text-xs font-normal opacity-70">
              Why Askala
            </p>
          </div>
        </div>

        <div className="relative">
          <button className="px-3 py-2 rounded-lg bg-[#8c45ff]/80 border border-white/15 shadow-[inset_0_0_6px_3px_rgba(255,255,255,0.15)] backdrop-blur-sm transition-colors duration-200 hover:bg-[#8c45ff]/90 hover:shadow-[inset_0_0_6px_3px_rgba(255,255,255,0.3)] hover:text-white">
            <p className="text-white text-sm font-medium">Join waitlist</p>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Navbar
