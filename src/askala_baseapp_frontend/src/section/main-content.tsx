import React from "react";
import type { TTopicProps } from "@/types/topic";
import { Brain, FileText, Loader2 } from "lucide-react";
import { useMDXContent } from "@/hooks/use-mdx-content";

interface MainContentProps {
	selectedTopic: TTopicProps | null;
}

export const MainContent: React.FC<MainContentProps> = ({ selectedTopic }) => {
	const { MDXComponent, loading, error } = useMDXContent(selectedTopic);

	const getWelcomeContent = () => {
		if (!selectedTopic) {
			return (
				<div className="text-center py-12">
					<FileText className="w-16 h-16 mx-auto mb-6 text-blue-400" />
					<h1 className="text-3xl font-bold text-white mb-4">
						Welcome to Python Learning
					</h1>
					<p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
						Select a topic from the sidebar to begin your Python learning journey.
						Our AI assistant will help you understand complex concepts through interactive conversations.
					</p>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
						{[
							{ title: "🐍 Python Fundamentals", desc: "Learn Python from basics to advanced concepts with hands-on examples" },
							{ title: "💬 AI Assistant", desc: "Ask questions about Python concepts and get detailed explanations" },
							{ title: "📖 Rich Content", desc: "Interactive content with code examples, exercises, and best practices" },
							{ title: "📝 Chat History", desc: "Track your questions and learning progress for each topic" },
						].map((card, i) => (
							<div key={i} className="p-4 border rounded-lg shadow-sm bg-gray-800 border-gray-700">
								<h3 className="text-xl font-semibold mb-2 text-white">{card.title}</h3>
								<p className="text-gray-400 text-sm">{card.desc}</p>
							</div>
						))}
					</div>
				</div>
			);
		}
		return null;
	};

	const renderContent = () => {
		if (!selectedTopic) {
			return getWelcomeContent();
		}

		if (loading) {
			return (
				<div className="flex items-center justify-center py-12">
					<Loader2 className="w-8 h-8 animate-spin text-blue-400 mr-3" />
					<span className="text-gray-400">Loading content...</span>
				</div>
			);
		}

		if (error) {
			return (
				<div className="text-center py-12">
					<div className="bg-red-900 border border-red-700 max-w-md mx-auto p-6 rounded-lg">
						<h3 className="text-red-300 font-semibold text-lg mb-2">Error Loading Content</h3>
						<p className="text-red-400 text-sm">{error}</p>
					</div>
				</div>
			);
		}

		if (MDXComponent) {
			return (
				<div className="prose prose-invert prose-slate max-w-none">
					<MDXComponent />
				</div>
			);
		}

		return (
			<div className="text-center py-12">
				<FileText className="w-16 h-16 mx-auto mb-6 text-yellow-400" />
				<h1 className="text-3xl font-bold text-white mb-4">
					{selectedTopic.title}
				</h1>
				<p className="text-gray-400 text-lg mb-8">
					{selectedTopic.description}
				</p>
				<div className="max-w-2xl mx-auto p-6 border rounded-lg bg-gray-800 border-gray-700">
					<p className="text-gray-400 mb-4">
						Content for this topic is coming soon! In the meantime, you can:
					</p>
					<ul className="text-left space-y-2 text-gray-400 text-sm">
						<li>• Ask questions about <strong>{selectedTopic.title}</strong> in the chat</li>
						<li>• Get explanations and code examples from our AI assistant</li>
						<li>• Explore other topics that have detailed content available</li>
					</ul>
				</div>
			</div>
		);
	};

	return (
		<div className="flex-1 bg-gray-900 flex flex-col h-full">
			<div className="border-b p-4 border-gray-700">
				<div className="flex items-center gap-3">
					<Brain className="w-6 h-6 text-blue-400" />
					<div>
						<h1 className="text-xl font-semibold text-white">
							{selectedTopic
								? selectedTopic.title
								: "Python Learning Assistant"}
						</h1>
						<p className="text-sm text-gray-400">
							{selectedTopic
								? selectedTopic.description
								: "Master Python programming from basics to advanced concepts"}
						</p>
					</div>
				</div>
			</div>

			<div className="flex-1 overflow-y-auto">
				<div className="p-6">
					<div className="max-w-4xl mx-auto space-y-6">{renderContent()}</div>
				</div>
			</div>
		</div>
	);
};