import logo from "../../../public/logo.png";

const Navbar = () => {
	return (
		<div className="fixed border-b border-white/20 top-0 left-0 right-0 z-50 flex items-center justify-between p-4 bg-black backdrop-blur-md">
			<div className="flex items-center space-x-4">
				<a
					href="./"
					className="relative w-12 h-12 rounded-lg overflow-hidden border border-white/15"
				>
					<div className="absolute inset-0 bg-gradient-to-b from-[#1c1c1c] to-black rounded-lg flex items-center justify-center">
						<img
							src={logo}
							alt="Askala Logo"
							className="object-contain w-full h-full"
						/>
					</div>
				</a>
				<p className="text-white font-bold text-2xl">Askala AI</p>
			</div>

			<div className="flex items-center space-x-2 border-2 border-white/40 rounded-full px-4 py-2">
				<div className="cursor-pointer px-4 py-2 rounded-[50px] transition-colors duration-200 hover:bg-white/10 hover:shadow-[inset_0_0_6px_3px_rgba(255,255,255,0.2)]">
					<p className="text-white text-sm font-medium">Learn</p>
				</div>

				<div className="cursor-pointer px-4 py-2 rounded-[50px] transition-colors duration-200 hover:bg-white/10 hover:shadow-[inset_0_0_6px_3px_rgba(255,255,255,0.2)]">
					<p className="text-white text-sm font-medium">Pricing</p>
				</div>

				<div className="cursor-pointer px-4 py-2 rounded-[50px] transition-colors duration-200 hover:bg-white/10 hover:shadow-[inset_0_0_6px_3px_rgba(255,255,255,0.2)]">
					<p className="text-white text-sm font-medium">Community</p>
				</div>

				<div className="cursor-pointer px-4 py-2 rounded-[50px] transition-colors duration-200 hover:bg-white/10 hover:shadow-[inset_0_0_6px_3px_rgba(255,255,255,0.2)]">
					<p className="text-white text-sm font-medium">Why Askala</p>
				</div>
			</div>

			<div className="relative">
				<button className="px-4 py-2 rounded-lg bg-[#8c45ff]/80 border border-white/15 shadow-[inset_0_0_6px_3px_rgba(255,255,255,0.15)] backdrop-blur-sm transition-colors duration-200 hover:bg-[#8c45ff]/90 hover:shadow-[inset_0_0_6px_3px_rgba(255,255,255,0.3)] hover:text-white">
					<p className="text-white text-sm font-medium">Join waitlist</p>
				</button>
				<div className="absolute inset-0 rounded-lg bg-gradient-to-b from-transparent to-black/50 pointer-events-none"></div>
				<div className="absolute inset-0 rounded-xl border border-white/15 pointer-events-none"></div>
			</div>
		</div>
	);
};

export default Navbar;
