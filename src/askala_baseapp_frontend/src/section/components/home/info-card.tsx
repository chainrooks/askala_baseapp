interface InfoCardProps {
  title: string
  description: string
}

export default function InfoCard({ title, description }: InfoCardProps) {
  return (
    <div
      className="
            relative 
            bg-gradient-to-br from-[#1F2937] to-[#111827] backdrop-blur-sm 
            border border-gray-700 
            transition-all ease-in-out duration-300 transform
            hover:scale-[101%] hover:border-[#58C2D6]/50
            rounded-3xl p-6 shadow-2xl overflow-hidden max-w-[400px] group
        "
    >
      <div className="absolute inset-0 opacity-20 bg-gradient-to-br from-gray-700 to-gray-900 group-hover:opacity-30 transition-opacity duration-300"></div>

      <div className="mb-8">
        <h1 className="text-white text-xl font-semibold mb-2">{title}</h1>
        <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
      </div>

      <div className="flex justify-center mb-8 w-fit">
        <div className="relative top-24 -left-12">
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-500/20 via-50% via-cyan-500/20 to-blue-500/20 blur-[50px] scale-120"></div>
          <div className="relative size-52 rounded-full flex flex-col items-center justify-center" />
        </div>
      </div>

      <div className="absolute w-[250px] h-[250px] bottom-0 -right-14">
        {/* Background image */}
        <div className="w-full h-full bg-[url('/images/3d-asset-askala-box.webp')] bg-contain relative opacity-20" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#58C2D6]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
    </div>
  )
}
