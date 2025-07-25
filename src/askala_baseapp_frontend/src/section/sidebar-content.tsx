import React from "react";
import type { TTopicProps } from "@/types/topic";
import { BookOpen } from "lucide-react";

interface SidebarProps {
	topics: TTopicProps[];
	selectedTopic: TTopicProps | null;
	onTopicSelect: (topic: TTopicProps) => void;
	onLogout: () => Promise<void> | void;
}

export const SideContent: React.FC<SidebarProps> = ({
	topics,
	selectedTopic,
	onTopicSelect,
	onLogout
}) => {

	return (
		<div className="w-80 bg-gray-900 border-r border-gray-700 flex flex-col h-full">
			<div className="p-6 border-b border-gray-700">
				<h2 className="text-xl font-semibold text-white flex items-center gap-2">
					<BookOpen className="w-5 h-5 text-gray-400" />
					Askala Learning
				</h2>
				<p className="text-sm text-gray-400 mt-1">
					Master your skills from beginner to advance with the power of AI.
				</p>
			</div>

			<button
				className="text-gray-400 hover:text-red-400 hover:bg-red-900/20 w-full justify-start p-3 text-left"
				onClick={async () => await onLogout()}
			>
				Logout
			</button>

			<div className="flex-1 overflow-y-auto">
				<div className="p-4 space-y-2">
					{topics.map((topic) => {
						const isSelected = selectedTopic?.id === topic.id;
						return (
							<button
								key={topic.id}
								onClick={() => onTopicSelect(topic)}
								className={`w-full text-left h-auto p-3 rounded-md transition-all duration-200 ${
									isSelected
										? "bg-gray-800 text-white"
										: "text-gray-400 hover:bg-gray-800"
								}`}
							>
								<div className="font-medium text-sm">{topic.title}</div>
								<div
									className={`text-xs mt-1 ${
										isSelected ? "text-white" : "text-gray-400"
									}`}
								>
									{topic.description}
								</div>
							</button>
						);
					})}
				</div>
			</div>
		</div>
	);
};
