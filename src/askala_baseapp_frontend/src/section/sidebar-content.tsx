import React from "react";
import type { TTopicProps } from "@/types/topic";
import { BookOpen } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SidebarProps {
	topics: TTopicProps[];
	selectedTopic: TTopicProps | null;
	onTopicSelect: (topic: TTopicProps) => void;
}

export const SideContent: React.FC<SidebarProps> = ({
	topics,
	selectedTopic,
	onTopicSelect,
}) => {
	return (
		<div className="w-80 bg-gray-200 border-r flex flex-col h-full">
			<div className="p-6 border-b">
				<h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
					<BookOpen className="w-5 h-5 text-gray-500" />
					Python Course
				</h2>
				<p className="text-sm text-gray-600 mt-1">
					Master Python programming from basics to advanced concepts
				</p>
			</div>

			<ScrollArea className="flex-1">
				<div className="p-4 space-y-2">
					{topics.map((topic) => (
						<Button
							variant="ghost"
							key={topic.id}
							onClick={() => onTopicSelect(topic)}
							className={cn(
								"w-full justify-start h-auto p-3 transition-all duration-200",
								selectedTopic?.id === topic.id
									? "bg-gray-300 text-gray-800"
									: "text-gray-600 hover:bg-gray-200"
							)}
						>
							<div className="text-left">
								<div className="font-medium text-sm">{topic.title}</div>
								<div
									className={cn(
										"text-xs",
										selectedTopic?.id === topic.id
											? "text-gray-800"
											: "text-gray-500"
									)}
								>
									{topic.description}
								</div>
							</div>
						</Button>
					))}
				</div>
			</ScrollArea>
		</div>
	);
};

