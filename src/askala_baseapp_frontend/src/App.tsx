import { FormEvent, useEffect, useState } from 'react';
// import { askala_baseapp_backend } from '../../declarations/askala_baseapp_backend'
import { pythonCourse } from './data/courses';
import { MainContent } from './section/main-content';
import { SideContent } from './section/sidebar-content'
import { TTopicProps } from './types/topic';
import { ChatHistory, ChatMessage } from './types/global';
import { ChatPanel } from './section/chat-panel';
import { InternetIdentityState } from './types/auth';
import { AuthClient } from '@dfinity/auth-client';
import LoginPage from './section/auth/login-page';

function App() {
  const [selectedTopic, setSelectedTopic] = useState<TTopicProps | null>(null);
  const [chatHistory, setChatHistory] = useState<ChatHistory>({});

  const [authState, setAuthState] = useState<InternetIdentityState>({
    actor: undefined,
    authClient: undefined,
    isAuthenticated: false,
    principal: 'Click "Whoami" to see your principal ID'
  });

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
        try {
            const authClient = await AuthClient.create();
            const isAuthenticated = await authClient.isAuthenticated();
            
            setAuthState(prev => ({
                ...prev,
                authClient,
                isAuthenticated
            }));
        } catch (error) {
            console.error('Error checking auth status:', error);
        }
  };

  const logout = async () => {
        try {
            if (authState.authClient) {
                await authState.authClient.logout();
                setAuthState(prev => ({
                    ...prev,
                    isAuthenticated: false,
                    principal: 'Click "Whoami" to see your principal ID'
                }));
            }
        } catch (error) {
            console.error('Logout error:', error);
        }
  };

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

  if (!authState.isAuthenticated) {
    return <LoginPage state={authState} setState={setAuthState} />;
  }

  return (
    <main>
      <div className="h-screen bg-background flex overflow-hidden">
        <SideContent
          topics={pythonCourse.topics}
          selectedTopic={selectedTopic}
          onTopicSelect={handleTopicSelect}
          onLogout={logout}
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
