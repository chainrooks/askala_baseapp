import logo from "../../../public/logo.png";
import { Github, Cat } from "lucide-react";

const Footer = () => {
	return (
		<div className="flex items-center justify-between p-2 bg-black">
			<a
				href="./"
				className="relative w-8 h-8 ml-4 rounded-lg overflow-hidden border border-white/15"
			>
				<div className="absolute inset-0 bg-gradient-to-b from-[#1c1c1c] to-black rounded-lg flex items-center justify-center">
					<img
						src={logo}
						alt="Askala Logo"
						className="object-contain w-full h-full"
					/>
				</div>
			</a>

			<div className="flex items-center space-x-2 border border-white/15 rounded-full px-4 py-2">
				<div className="cursor-pointer hover:text-white px-4 py-2 rounded-[50px] transition-colors duration-200 hover:bg-white/10 hover:shadow-[inset_0_0_6px_3px_rgba(255,255,255,0.2)]">
					<p className="text-gray-400 hover:text-white text-sm font-medium">Learn</p>
				</div>

				<div className="cursor-pointer hover:text-white px-4 py-2 rounded-[50px] transition-colors duration-200 hover:bg-white/10 hover:shadow-[inset_0_0_6px_3px_rgba(255,255,255,0.2)]">
					<p className="text-gray-400 hover:text-white text-sm font-medium">Pricing</p>
				</div>

				<div className="cursor-pointer hover:text-white px-4 py-2 rounded-[50px] transition-colors duration-200 hover:bg-white/10 hover:shadow-[inset_0_0_6px_3px_rgba(255,255,255,0.2)]">
					<p className="text-gray-400 hover:text-white text-sm font-medium">Community</p>
				</div>

				<div className="cursor-pointer hover:text-white px-4 py-2 rounded-[50px] transition-colors duration-200 hover:bg-white/10 hover:shadow-[inset_0_0_6px_3px_rgba(255,255,255,0.2)]">
					<p className="text-gray-400 hover:text-white text-sm font-medium">Why Askala</p>
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
	);
};

export default Footer;
