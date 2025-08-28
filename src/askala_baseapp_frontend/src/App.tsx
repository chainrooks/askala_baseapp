import { useEffect, useState } from 'react'
// import { backend } from '../../declarations/backend'
import { MainContent } from './section/main-content'
import { CourseMetadata, SideContent } from './section/sidebar-content'
import { ChatMessage } from './types/global'
import { ChatPanel } from './section/chat-panel'
import { InternetIdentityState } from './types/auth'
import { AuthClient } from '@dfinity/auth-client'
import LoginPage from './section/auth/login-page'
import Modal from './section/components/common/modal'
import LandingPage from './section/landing-page'
import PaymentModal from './section/components/modal/payment-modal'

function App() {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [modalPaymentOpen, setModalPaymentOpen] = useState(false)
  const [selectedTopic, setSelectedTopic] = useState<CourseMetadata>()
  const [isLoginPage, setIsLoginPage] = useState(false)
  const [isHasAccess, setIsHasAccess] = useState(false)

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

      if (isAuthenticated) {
        const identity = authClient.getIdentity()
        const principal = identity.getPrincipal().toString()

        setAuthState((prev) => ({
          ...prev,
          authClient,
          isAuthenticated,
          principal
        }))
      } else {
        setAuthState((prev) => ({
          ...prev,
          authClient,
          isAuthenticated: false
        }))
      }
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

  const handlePaymentSuccess = async () => {
    if (
      !authState.isAuthenticated ||
      !authState.actor ||
      !selectedTopic?.slug ||
      !authState.authClient
    )
      return

    try {
      const identity = authState.authClient.getIdentity()
      const principal = identity.getPrincipal()

      const hasAccess = await authState.actor.hasAccess(
        principal,
        selectedTopic.slug
      )
      console.log('Has Access Result', hasAccess)
      setIsHasAccess(hasAccess)
    } catch (err) {
      console.error('Error checking access', err)
      setIsHasAccess(false)
    }
  }

  if (!authState.isAuthenticated) {
    if (isLoginPage) {
      return <LoginPage state={authState} setState={setAuthState} />
    }
    return <LandingPage onNavigateLogin={() => setIsLoginPage(true)} />
  }

  return (
    <main>
      <Modal
        isOpen={modalPaymentOpen}
        onClose={() => setModalPaymentOpen(false)}
      >
        <PaymentModal
          isOpen={modalPaymentOpen}
          onClose={() => setModalPaymentOpen(false)}
          selectedTopic={selectedTopic}
          authState={authState}
          onPaymentSuccess={handlePaymentSuccess}
        />
      </Modal>
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
            authState={authState}
            setModalPayment={setModalPaymentOpen}
            isHasAccess={isHasAccess}
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
