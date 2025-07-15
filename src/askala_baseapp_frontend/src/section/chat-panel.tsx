import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { ChatMessage, ChatHistory } from "@/types/global";
import type { TTopicProps } from "@/types/topic";
import { Send, MessageCircle, Clock } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

interface ChatPanelProps {
	selectedTopic: TTopicProps | null;
	messages: ChatMessage[];
	onSendMessage: (content: string) => void;
}

export const ChatPanel: React.FC<ChatPanelProps> = ({
	selectedTopic,
	messages,
	onSendMessage,
}) => {
	const [inputValue, setInputValue] = useState("");

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (inputValue.trim() && selectedTopic) {
			onSendMessage(inputValue.trim());
			setInputValue("");
		}
	};

	const topicMessages = messages.filter(
		(msg) => selectedTopic && msg.topicId === selectedTopic.id
	);

	return (
		<div className="w-80 bg-card border-l flex flex-col h-full">
			<div className="p-4 border-b">
				<h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
					<MessageCircle className="w-5 h-5 text-emerald-400" />
					Chat
				</h3>
				{selectedTopic && (
					<p className="text-sm text-muted-foreground mt-1">
						Topic: {selectedTopic.title}
					</p>
				)}
			</div>

			<ScrollArea className="flex-1">
				<div className="p-4">
					{!selectedTopic ? (
						<div className="text-center text-muted-foreground mt-8">
							<MessageCircle className="w-12 h-12 mx-auto mb-3 opacity-50" />
							<p>Select a topic to start chatting</p>
						</div>
					) : topicMessages.length === 0 ? (
						<>
							<div className="text-center text-muted-foreground mt-8">
								<MessageCircle className="w-12 h-12 mx-auto mb-3 opacity-50" />
								<p>No messages yet</p>
								<p className="text-sm mt-1">Ask your first question!</p>
							</div>
							<div className="mt-4 text-xs text-muted-foreground space-y-1">
								<p>Try asking:</p>
								<p>"Explain the basics"</p>
								<p>"Show me examples"</p>
								<p>"What are best practices?"</p>
							</div>
						</>
					) : (
						<div className="space-y-3">
							{topicMessages.map((message) => (
								<Card
									key={message.id}
									className={cn(
										message.sender === "user"
											? "bg-primary text-primary-foreground ml-4"
											: "bg-muted mr-4"
									)}
								>
									<CardContent className="p-3">
										{message.sender === "ai" ? (
											<div className="prose prose-sm max-w-none dark:prose-invert">
												<ReactMarkdown remarkPlugins={[remarkGfm]}>
													{message.content.length > 200
														? message.content.substring(0, 200) + "..."
														: message.content}
												</ReactMarkdown>
											</div>
										) : (
											<p className="text-sm whitespace-pre-wrap">
												{message.content}
											</p>
										)}
										<div
											className={cn(
												"flex items-center gap-1 mt-2 text-xs",
												message.sender === "user"
													? "text-primary-foreground/70"
													: "text-muted-foreground"
											)}
										>
											<Clock className="w-3 h-3" />
											{message.timestamp.toLocaleTimeString()}
										</div>
									</CardContent>
								</Card>
							))}
						</div>
					)}
				</div>
			</ScrollArea>

			<div className="p-4 border-t">
				<form onSubmit={handleSubmit} className="flex gap-2">
					<Input
                        name="message"
                        type="text"
						value={inputValue}
						onChange={(e) => setInputValue(e.target.value)}
						placeholder={
							selectedTopic ? "Ask about this topic..." : "Select a topic first"
						}
						disabled={!selectedTopic}
						className="flex-1"
					/>
					<Button
						type="submit"
						size="icon"
						disabled={!inputValue.trim() || !selectedTopic}
					>
						<Send className="w-4 h-4" />
					</Button>
				</form>
				{selectedTopic && (
					<p className="text-xs text-muted-foreground mt-2 text-center">
						Ask questions about the current topic content
					</p>
				)}
			</div>
		</div>
	);
};
