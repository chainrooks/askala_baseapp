export type ChatMessage = {
  id: string
  content: string
  sender: 'user' | 'ai'
  timestamp: Date
  topicId?: string
}

export type ChatHistory = {
  [topicId: string]: ChatMessage[]
}
