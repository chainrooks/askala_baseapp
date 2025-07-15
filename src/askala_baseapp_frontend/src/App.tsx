import { FormEvent, useState } from 'react';
// import { askala_baseapp_backend } from '../../declarations/askala_baseapp_backend'
import { Button } from './components/ui/button';
import { pythonCourse } from './data/courses';
import { MainContent } from './section/main-content';
import { SideContent } from './section/sidebar-content'
import { TTopicProps } from './types/topic';
import { ChatHistory, ChatMessage } from './types/global';
import { ChatPanel } from './section/chat-panel';

function App() {
  const [selectedTopic, setSelectedTopic] = useState<TTopicProps | null>(null);
  const [chatHistory, setChatHistory] = useState<ChatHistory>({});

  const handleTopicSelect = (topic: TTopicProps) => {
    setSelectedTopic(topic);
  };

  const handleSendMessage = (content: string) => {
    if (!selectedTopic) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      content,
      sender: 'user',
      timestamp: new Date(),
      topicId: selectedTopic.id,
    };

    // Simulate AI response with a delay
    // const aiResponse: ChatMessage = {
    //   id: `ai-${Date.now()}`,
    //   content: generateAIResponse(content, selectedTopic),
    //   sender: 'ai',
    //   timestamp: new Date(),
    //   topicId: selectedTopic.id,
    // };

    setChatHistory(prev => ({
      ...prev,
      [selectedTopic.id]: [
        ...(prev[selectedTopic.id] || []),
        userMessage,
        //aiResponse,
      ],
    }));
  };

  const getAllMessages = (): ChatMessage[] => {
    return Object.values(chatHistory).flat().sort((a, b) => 
      a.timestamp.getTime() - b.timestamp.getTime()
    );
  };

  return (
    <main>
      <div className="h-screen bg-background flex overflow-hidden">
        <SideContent
          topics={pythonCourse.topics}
          selectedTopic={selectedTopic}
          onTopicSelect={handleTopicSelect}
        />

        <MainContent 
          selectedTopic={selectedTopic}
        />

        <ChatPanel
          selectedTopic={selectedTopic}
          messages={getAllMessages()}
          onSendMessage={handleSendMessage}
        />
      </div>
    </main>
  );
}

export default App;
