import logo from '../../../public/logo.png'
import { Github, Cat } from 'lucide-react'
import Logo from './common/logo'

const Footer = () => {
  return (
    <div className="flex items-center justify-between py-2 px-6 bg-black">
      <Logo withText />

      <div className="flex items-center space-x-2 px-4 py-2">
        <div className="cursor-pointer px-4 py-2 rounded-[50px] transition-colors duration-200 hover:bg-white/10 hover:shadow-[inset_0_0_6px_3px_rgba(255,255,255,0.2)]">
          <p className="text-white !text-xs font-normal opacity-70">Learn</p>
        </div>

        <div className="cursor-pointer px-4 py-2 rounded-[50px] transition-colors duration-200 hover:bg-white/10 hover:shadow-[inset_0_0_6px_3px_rgba(255,255,255,0.2)]">
          <p className="text-white !text-xs font-normal opacity-70">Pricing</p>
        </div>

        <div className="cursor-pointer px-4 py-2 rounded-[50px] transition-colors duration-200 hover:bg-white/10 hover:shadow-[inset_0_0_6px_3px_rgba(255,255,255,0.2)]">
          <p className="text-white !text-xs font-normal opacity-70">
            Community
          </p>
        </div>

        <div className="cursor-pointer px-4 py-2 rounded-[50px] transition-colors duration-200 hover:bg-white/10 hover:shadow-[inset_0_0_6px_3px_rgba(255,255,255,0.2)]">
          <p className="text-white !text-xs font-normal opacity-70">
            Why Askala
          </p>
        </div>
      </div>

      <div className="flex items-center space-x-4 mr-4">
        <a
          href="https://dorahacks.io/buidl/29186/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Cat className="w-6 h-6 text-white hover:text-[#8c45ff]" />
        </a>

        <a
          href="https://github.com/chainrooks/askala_baseapp"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Github className="w-6 h-6 text-white hover:text-[#8c45ff]" />
        </a>
      </div>
    </div>
  )
}

export default Footer
