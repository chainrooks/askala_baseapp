import { FormEvent, useEffect, useState } from 'react'
// import { backend } from '../../declarations/backend'
import { MainContent } from './section/main-content'
import { CourseMetadata, SideContent } from './section/sidebar-content'
import { TTopicProps } from './types/topic'
import { ChatMessage } from './types/global'
import { ChatPanel } from './section/chat-panel'
import { InternetIdentityState } from './types/auth'
import { AuthClient } from '@dfinity/auth-client'
import LoginPage from './section/auth/login-page'
import { CourseList } from './section/course/course-list'

function App() {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [selectedTopic, setSelectedTopic] = useState<CourseMetadata | null>(null)

  const [authState, setAuthState] = useState<InternetIdentityState>({
    actor: undefined,
    authClient: undefined,
    isAuthenticated: false,
    principal: 'Click "Whoami" to see your principal ID'
  })

  useEffect(() => {
    checkAuthStatus()
  }, [])

  const checkAuthStatus = async () => {
    try {
      const authClient = await AuthClient.create()
      const isAuthenticated = await authClient.isAuthenticated()

      setAuthState((prev) => ({
        ...prev,
        authClient,
        isAuthenticated
      }))
    } catch (error) {
      console.error('Error checking auth status:', error)
    }
  }

  const logout = async () => {
    try {
      if (authState.authClient) {
        await authState.authClient.logout()
        setAuthState((prev) => ({
          ...prev,
          isAuthenticated: false,
          principal: 'Click "Whoami" to see your principal ID'
        }))
      }
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  const handleTopicSelect = (topic: CourseMetadata) => {
    setSelectedTopic(topic)
  }

  if (!authState.isAuthenticated) {
    return <LoginPage state={authState} setState={setAuthState} />
  }

  return (
    <main>
      <div className="h-screen bg-background flex overflow-hidden">
        <SideContent
          selectedTopic={selectedTopic}
          onTopicSelect={handleTopicSelect}
          onLogout={logout}
          authState={authState}
        />

        <div>
          <MainContent 
            selectedTopic={selectedTopic}
          />
        </div>

        <ChatPanel
          selectedTopic={selectedTopic}
          messages={messages}
          setMessages={setMessages}
        />
      </div>
    </main>
  )
}

export default App
