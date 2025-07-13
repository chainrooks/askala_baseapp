import { FormEvent, useState } from 'react';
import { askala_baseapp_backend } from '../../declarations/askala_baseapp_backend'
import { Button } from './components/ui/button';
import { MainContent } from './section/main-content';
import { TTopicProps } from './types/topic';
import { ChatHistory, ChatMessage } from './types/global';

function App() {
  const [selectedTopic, setSelectedTopic] = useState<TTopicProps | null>(null);
  const [chatHistory, setChatHistory] = useState<ChatHistory>({});


  const handleTopicSelect = (topic: TTopicProps) => {
    setSelectedTopic(topic);
  };

  return (
    <main>
      <MainContent 
        selectedTopic={selectedTopic}
      />
    </main>
  );
}

export default App;
