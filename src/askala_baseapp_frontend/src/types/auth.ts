import { AuthClient } from '@dfinity/auth-client'

export type TLogin = {
  onLogin: () => Promise<void> | void
  className?: string
  isLoading?: boolean
  error?: string
}

export type InternetIdentityState = {
  actor: any
  authClient: AuthClient | undefined
  isAuthenticated: boolean
  principal: string
}
