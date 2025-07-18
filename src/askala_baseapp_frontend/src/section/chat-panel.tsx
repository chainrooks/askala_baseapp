import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { ChatMessage } from "@/types/global";
import type { TTopicProps } from "@/types/topic";
import { Send, MessageCircle, Clock } from "lucide-react";

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
		<div className="w-80 bg-white border-l flex flex-col h-full dark:bg-gray-900 dark:border-gray-700">
			<div className="p-4 border-b dark:border-gray-700">
				<h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
					<MessageCircle className="w-5 h-5 text-emerald-400" />
					Chat
				</h3>
				{selectedTopic && (
					<p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
						Topic: {selectedTopic.title}
					</p>
				)}
			</div>

			<div className="flex-1 overflow-y-auto">
				<div className="p-4">
					{!selectedTopic ? (
						<div className="text-center text-gray-400 mt-8">
							<MessageCircle className="w-12 h-12 mx-auto mb-3 opacity-50" />
							<p>Select a topic to start chatting</p>
						</div>
					) : topicMessages.length === 0 ? (
						<>
							<div className="text-center text-gray-400 mt-8">
								<MessageCircle className="w-12 h-12 mx-auto mb-3 opacity-50" />
								<p>No messages yet</p>
								<p className="text-sm mt-1">Ask your first question!</p>
							</div>
							<div className="mt-4 text-xs text-gray-400 space-y-1">
								<p>Try asking:</p>
								<p>"Explain the basics"</p>
								<p>"Show me examples"</p>
								<p>"What are best practices?"</p>
							</div>
						</>
					) : (
						<div className="space-y-3">
							{topicMessages.map((message) => (
								<div
									key={message.id}
									className={`rounded-lg px-4 py-3 text-sm ${
										message.sender === "user"
											? "bg-blue-600 text-white ml-4"
											: "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white mr-4"
									}`}
								>
									{message.sender === "ai" ? (
										<div className="prose prose-sm max-w-none dark:prose-invert">
											<ReactMarkdown remarkPlugins={[remarkGfm]}>
												{message.content.length > 200
													? message.content.substring(0, 200) + "..."
													: message.content}
											</ReactMarkdown>
										</div>
									) : (
										<p className="whitespace-pre-wrap">{message.content}</p>
									)}
									<div
										className={`flex items-center gap-1 mt-2 text-xs ${
											message.sender === "user"
												? "text-white/70"
												: "text-gray-500 dark:text-gray-400"
										}`}
									>
										<Clock className="w-3 h-3" />
										{message.timestamp.toLocaleTimeString()}
									</div>
								</div>
							))}
						</div>
					)}
				</div>
			</div>

			<div className="p-4 border-t dark:border-gray-700">
				<form onSubmit={handleSubmit} className="flex gap-2">
					<input
						type="text"
						name="message"
						value={inputValue}
						onChange={(e) => setInputValue(e.target.value)}
						placeholder={
							selectedTopic ? "Ask about this topic..." : "Select a topic first"
						}
						disabled={!selectedTopic}
						className="flex-1 px-3 py-2 border rounded-md text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 disabled:opacity-50"
					/>
					<button
						type="submit"
						disabled={!inputValue.trim() || !selectedTopic}
						className="p-2 bg-blue-600 text-white rounded-md disabled:opacity-50"
					>
						<Send className="w-4 h-4" />
					</button>
				</form>
				{selectedTopic && (
					<p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
						Ask questions about the current topic content
					</p>
				)}
			</div>
		</div>
	);
};
