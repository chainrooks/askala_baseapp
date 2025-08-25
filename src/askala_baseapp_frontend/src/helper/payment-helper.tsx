import { HttpAgent, Identity } from '@dfinity/agent'
import {
  AccountIdentifier,
  LedgerCanister,
  TransferError
} from '@dfinity/ledger-icp'
import { Principal } from '@dfinity/principal'
import { InternetIdentityState } from '@/types/auth'
import { createAgent } from '@dfinity/utils'
import { useCallback, useEffect, useState } from 'react'
import type { TransferRequest } from '@dfinity/ledger-icp'

// Types and Interfaces
export interface PaymentConfig {
  HOST: string
  ICP_LEDGER_CANISTER_ID: string
  ICP_FEE: number
  E8S_PER_ICP: number
}

export interface BalanceInfo {
  e8s: bigint
  icp: number
  formatted: string
}

export interface TransferResult {
  success: boolean
  blockIndex?: bigint
  transactionId?: string
  amount?: number
  fee?: number
  error?: TransferError
  message?: string
}

export interface PaymentResult extends TransferResult {
  recipient?: string
  description?: string
  cancelled?: boolean
}

export interface PaymentRequest {
  recipientPrincipal: string
  amountICP: number
  description?: string
  skipConfirmation?: boolean
}

export interface PaymentConfirmationParams {
  recipient: string
  amount: number
  fee: number
  description?: string
}

// Configuration
const CONFIG: PaymentConfig = {
  HOST:
    import.meta.env.DFX_NETWORK === 'ic'
      ? 'https://ic0.app'
      : 'http://localhost:4943',
  ICP_LEDGER_CANISTER_ID: 'ryjl3-tyaaa-aaaaa-aaaba-cai',
  ICP_FEE: 0.0001,
  E8S_PER_ICP: 100000000
}

// Create ledger canister instance using existing auth state
const createLedgerCanister = async (
  authState: InternetIdentityState
): Promise<LedgerCanister> => {
  if (!authState.authClient || !authState.isAuthenticated) {
    throw new Error('User not authenticated')
  }

  const identity = authState.authClient.getIdentity()

  const agent = await createAgent({
    identity,
    host: CONFIG.HOST
  })

  if (CONFIG.HOST.includes('localhost')) {
    agent.fetchRootKey().catch((err) => {
      console.warn(
        'Unable to fetch root key. Check to ensure that your local replica is running'
      )
    })
  }

  return LedgerCanister.create({
    agent,
    canisterId: Principal.fromText(CONFIG.ICP_LEDGER_CANISTER_ID)
  })
}

// Get user's ICP balance
export const getUserBalance = async (
  authState: InternetIdentityState
): Promise<BalanceInfo> => {
  try {
    const ledger = await createLedgerCanister(authState)
    const identity = authState.authClient!.getIdentity()
    const principal = identity.getPrincipal()

    const balance = await ledger.accountBalance({
      accountIdentifier: principal.toText()
    })

    // Convert e8s to ICP
    const icpBalance = Number(balance) / CONFIG.E8S_PER_ICP

    return {
      e8s: balance,
      icp: icpBalance,
      formatted: `${icpBalance.toFixed(8)} ICP`
    }
  } catch (error) {
    console.error('Failed to get balance:', error)
    throw new Error(
      `Balance check failed: ${error instanceof Error ? error.message : String(error)}`
    )
  }
}

// Transfer ICP tokens
export const transferICP = async (
  authState: InternetIdentityState,
  { to, amount, memo }: TransferRequest
): Promise<TransferResult> => {
  try {
    const ledger = createLedgerCanister(authState)

    const amountE8s = BigInt(Math.floor(Number(amount) * CONFIG.E8S_PER_ICP))
    const fee = BigInt(CONFIG.ICP_FEE * CONFIG.E8S_PER_ICP)

    const transferArgs = {
      to,
      amount: amountE8s,
      fee,
      memo,
      from_subaccount: [],
      created_at_time: []
    }

    const result = await (await ledger).transfer(transferArgs)

    if (result) {
      return {
        success: true,
        amount: Number(amount),
        fee: CONFIG.ICP_FEE
      }
    } else {
      return {
        success: false
      }
    }
  } catch (error) {
    console.error('Transfer error:', error)
    throw new Error(
      `Transfer failed: ${error instanceof Error ? error.message : String(error)}`
    )
  }
}

// Get transaction details
// export const getTransactionDetails = async (
//   authState: InternetIdentityState,
//   blockIndex: bigint | number
// ): Promise<any> => {
//   try {
//     const ledger = createLedgerCanister(authState);
//     const blockIndexBigInt = typeof blockIndex === 'number' ? BigInt(blockIndex) : blockIndex;

//     const transaction = await ledger.queryBlocks({
//       start: blockIndexBigInt,
//       length: BigInt(1)
//     });

//     return transaction;
//   } catch (error) {
//     console.error("Failed to get transaction:", error);
//     throw new Error(`Transaction query failed: ${error instanceof Error ? error.message : String(error)}`);
//   }
// };

// Show payment confirmation dialog
export const showPaymentConfirmation = async ({
  recipient,
  amount,
  fee,
  description = ''
}: PaymentConfirmationParams): Promise<boolean> => {
  const total = amount + fee

  const message = [
    'Confirm Payment',
    '',
    `To: ${recipient}`,
    `Amount: ${amount} ICP`,
    `Fee: ${fee} ICP`,
    `Total: ${total} ICP`,
    description && `Description: ${description}`,
    '',
    'Do you want to proceed with this payment?'
  ]
    .filter(Boolean)
    .join('\n')

  return window.confirm(message)
}

// Show payment success notification
export const showPaymentSuccess = (result: TransferResult): void => {
  alert(
    `Payment successful!\nTransaction ID: ${result.transactionId}\nAmount: ${result.amount} ICP`
  )
}

// Show payment error notification
export const showPaymentError = (error: string): void => {
  alert(`Payment failed: ${error}`)
}

// Main payment processing function
export const processPayment = async (
  authState: InternetIdentityState,
  {
    recipientPrincipal,
    amountICP,
    description = '',
    skipConfirmation = false
  }: PaymentRequest
): Promise<PaymentResult> => {
  try {
    // Check if user is authenticated
    if (!authState.isAuthenticated || !authState.authClient) {
      throw new Error('User not authenticated. Please login first.')
    }

    // Check user balance
    const balance = await getUserBalance(authState)
    const totalRequired = amountICP + CONFIG.ICP_FEE

    if (balance.icp < totalRequired) {
      const errorMsg = `Insufficient balance. Required: ${totalRequired} ICP, Available: ${balance.icp} ICP`
      throw new Error(errorMsg)
    }

    // Show payment confirmation (unless skipped)
    if (!skipConfirmation) {
      const confirmed = await showPaymentConfirmation({
        recipient: recipientPrincipal,
        amount: amountICP,
        fee: CONFIG.ICP_FEE,
        description
      })

      if (!confirmed) {
        return {
          success: false,
          cancelled: true,
          message: 'Payment cancelled by user'
        }
      }
    }

    // Execute transfer
    const transferResult = await transferICP(authState, {
      to: AccountIdentifier.fromPrincipal({
        principal: Principal.fromText(recipientPrincipal)
      }),
      amount: BigInt(amountICP)
    })

    // Handle result
    if (transferResult.success) {
      showPaymentSuccess(transferResult)
      return {
        ...transferResult,
        recipient: recipientPrincipal,
        description
      }
    } else {
      showPaymentError(transferResult.message || 'Unknown error')
      return transferResult
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    console.error('Payment processing failed:', error)
    showPaymentError(errorMessage)
    throw error
  }
}

// Get current user principal from auth state
export const getCurrentUserPrincipal = (
  authState: InternetIdentityState
): string => {
  if (!authState.isAuthenticated || !authState.authClient) {
    throw new Error('User not authenticated')
  }
  return authState.authClient.getIdentity().getPrincipal().toText()
}

// Utility function to format ICP amounts
export const formatICP = (amount: number, decimals: number = 8): string => {
  return `${Number(amount).toFixed(decimals)} ICP`
}

// Utility function to convert e8s to ICP
export const e8sToICP = (e8s: bigint): number => {
  return Number(e8s) / CONFIG.E8S_PER_ICP
}

// Utility function to convert ICP to e8s
export const icpToE8s = (icp: number): bigint => {
  return BigInt(Math.floor(icp * CONFIG.E8S_PER_ICP))
}

// Validate principal ID format
export const isValidPrincipal = (principalText: string): boolean => {
  try {
    Principal.fromText(principalText)
    return true
  } catch {
    return false
  }
}

// Get readable error message from TransferError
export const getTransferErrorMessage = (error: TransferError): string => {
  if ('BadFee' in error) {
    return `Bad fee: expected ${error.BadFee}`
  } else if ('InsufficientFunds' in error) {
    return `Insufficient funds: balance ${error.InsufficientFunds}`
  } else if ('TxTooOld' in error) {
    return 'Transaction too old'
  } else if ('TxCreatedInFuture' in error) {
    return 'Transaction created in future'
  } else if ('TxDuplicate' in error) {
    return `Duplicate transaction: ${error.TxDuplicate}`
  }
  return 'Unknown transfer error'
}

// React hook for ICP payments using existing auth state
export interface UseICPPaymentReturn {
  balance: BalanceInfo | null
  loading: boolean
  error: string | null
  refreshBalance: () => Promise<void>
  makePayment: (
    recipientPrincipal: string,
    amountICP: number,
    description?: string
  ) => Promise<PaymentResult>
  canMakePayment: (amount: number) => boolean
}

export const useICPPayment = (
  authState: InternetIdentityState
): UseICPPaymentReturn => {
  const [balance, setBalance] = useState<BalanceInfo | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const refreshBalance = useCallback(async (): Promise<void> => {
    if (!authState.isAuthenticated || !authState.authClient) {
      setError('User not authenticated')
      return
    }

    try {
      setError(null)
      const userBalance = await getUserBalance(authState)
      setBalance(userBalance)
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to get balance'
      setError(errorMessage)
      console.error('Failed to get balance:', err)
    }
  }, [authState])

  const makePayment = useCallback(
    async (
      recipientPrincipal: string,
      amountICP: number,
      description?: string
    ): Promise<PaymentResult> => {
      setLoading(true)
      setError(null)

      try {
        const result = await processPayment(authState, {
          recipientPrincipal,
          amountICP,
          description
        })

        if (result.success) {
          await refreshBalance() // Refresh balance after successful payment
        }

        return result
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Payment failed'
        setError(errorMessage)
        console.error('Payment failed:', err)
        throw err
      } finally {
        setLoading(false)
      }
    },
    [authState, refreshBalance]
  )

  const canMakePayment = useCallback(
    (amount: number): boolean => {
      if (!balance || !authState.isAuthenticated) return false
      return balance.icp >= amount + CONFIG.ICP_FEE
    },
    [balance, authState.isAuthenticated]
  )

  // Auto-refresh balance when authentication state changes
  useEffect(() => {
    if (authState.isAuthenticated && authState.authClient) {
      refreshBalance()
    } else {
      setBalance(null)
      setError(null)
    }
  }, [authState.isAuthenticated, refreshBalance])

  return {
    balance,
    loading,
    error,
    refreshBalance,
    makePayment,
    canMakePayment
  }
}

// Export default object with all functions
const ICPPaymentHandler = {
  getUserBalance,
  transferICP,
  // getTransactionDetails,
  processPayment,
  getCurrentUserPrincipal,
  formatICP,
  e8sToICP,
  icpToE8s,
  isValidPrincipal,
  getTransferErrorMessage,
  useICPPayment,
  CONFIG
}

export default ICPPaymentHandler
