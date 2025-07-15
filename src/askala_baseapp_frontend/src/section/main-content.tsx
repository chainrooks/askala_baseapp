import React from "react";
import type { TTopicProps } from "@/types/topic";
import type { ChatMessage } from "@/types/global";
import { Brain, FileText, Loader2 } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
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
					<h1 className="text-3xl font-bold text-foreground mb-4">
						Welcome to Python Learning
					</h1>
					<p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
						Select a topic from the sidebar to begin your Python learning
						journey. Our AI assistant will help you understand complex concepts
						through interactive conversations.
					</p>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
						<Card>
							<CardHeader>
								<CardTitle className="text-xl">
									🐍 Python Fundamentals
								</CardTitle>
							</CardHeader>
							<CardContent>
								<CardDescription>
									Learn Python from basics to advanced concepts with hands-on
									examples
								</CardDescription>
							</CardContent>
						</Card>
						<Card>
							<CardHeader>
								<CardTitle className="text-xl">💬 AI Assistant</CardTitle>
							</CardHeader>
							<CardContent>
								<CardDescription>
									Ask questions about Python concepts and get detailed
									explanations
								</CardDescription>
							</CardContent>
						</Card>
						<Card>
							<CardHeader>
								<CardTitle className="text-xl">📖 Rich Content</CardTitle>
							</CardHeader>
							<CardContent>
								<CardDescription>
									Interactive content with code examples, exercises, and best
									practices
								</CardDescription>
							</CardContent>
						</Card>
						<Card>
							<CardHeader>
								<CardTitle className="text-xl">📝 Chat History</CardTitle>
							</CardHeader>
							<CardContent>
								<CardDescription>
									Track your questions and learning progress for each topic
								</CardDescription>
							</CardContent>
						</Card>
					</div>
				</div>
			);
		}

		return null; // Will be handled by MDX content
	};

	const renderContent = () => {
		if (!selectedTopic) {
			return getWelcomeContent();
		}

		if (loading) {
			return (
				<div className="flex items-center justify-center py-12">
					<Loader2 className="w-8 h-8 animate-spin text-blue-400 mr-3" />
					<span className="text-muted-foreground">Loading content...</span>
				</div>
			);
		}

		if (error) {
			return (
				<div className="text-center py-12">
					<Card className="bg-destructive/10 border-destructive/30 max-w-md mx-auto">
						<CardHeader>
							<CardTitle className="text-destructive">
								Error Loading Content
							</CardTitle>
						</CardHeader>
						<CardContent>
							<CardDescription className="text-destructive/80">
								{error}
							</CardDescription>
						</CardContent>
					</Card>
				</div>
			);
		}

		if (MDXComponent) {
			return (
				<div className="prose prose-invert prose-slate max-w-none ">
					<MDXComponent />
				</div>
			);
		}

		// Fallback for topics without MDX content
		return (
			<div className="text-center py-12">
				<FileText className="w-16 h-16 mx-auto mb-6 text-yellow-400" />
				<h1 className="text-3xl font-bold text-foreground mb-4">
					{selectedTopic.title}
				</h1>
				<p className="text-muted-foreground text-lg mb-8">
					{selectedTopic.description}
				</p>
				<Card className="max-w-2xl mx-auto">
					<CardContent className="pt-6">
						<p className="text-muted-foreground mb-4">
							Content for this topic is coming soon! In the meantime, you can:
						</p>
						<ul className="text-muted-foreground text-left space-y-2">
							<li>
								• Ask questions about <strong>{selectedTopic.title}</strong> in
								the chat
							</li>
							<li>
								• Get explanations and code examples from our AI assistant
							</li>
							<li>
								• Explore other topics that have detailed content available
							</li>
						</ul>
					</CardContent>
				</Card>
			</div>
		);
	};

	return (
		<div className="flex-1 bg-background flex flex-col h-full">
			<div className="border-b p-4">
				<div className="flex items-center gap-3">
					<Brain className="w-6 h-6 text-blue-400" />
					<div>
						<h1 className="text-xl font-semibold text-foreground">
							{selectedTopic
								? selectedTopic.title
								: "Python Learning Assistant"}
						</h1>
						<p className="text-sm text-muted-foreground">
							{selectedTopic
								? selectedTopic.description
								: "Master Python programming from basics to advanced concepts"}
						</p>
					</div>
				</div>
			</div>

			<ScrollArea className="flex-1 overflow-y-auto">
				<div className="p-6">
					<div className="max-w-4xl mx-auto space-y-6">{renderContent()}</div>
				</div>
			</ScrollArea>
		</div>
	);
};
