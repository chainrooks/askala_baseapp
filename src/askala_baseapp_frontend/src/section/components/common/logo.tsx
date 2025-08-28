import logo from '/logo.png'

interface LogoInterface {
  withText?: boolean
  inlineText?: string
}

export default function Logo({
  withText,
  inlineText = 'Askala AI'
}: LogoInterface) {
  return (
    <div className="flex items-center space-x-3">
      <a
        href="./"
        className="relative w-12 h-12 rounded-lg overflow-hidden border border-white/15"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#1c1c1c] to-black rounded-lg flex items-center justify-center">
          <img
            src={logo}
            alt="Askala Logo"
            className="object-contain size-8 rounded-lg"
          />
        </div>
      </a>
      {withText && (
        <span className="text-[13px] font-medium text-white">{inlineText}</span>
      )}
    </div>
  )
}
