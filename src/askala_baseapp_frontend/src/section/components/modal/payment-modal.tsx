import { AccountIdentifier } from '@dfinity/ledger-icp'
import { HttpAgent, Actor } from '@dfinity/agent'
import { Buffer } from 'buffer'

import { X, Loader2, CheckCircle, AlertCircle, Wallet } from 'lucide-react'
import { CourseMetadata } from '@/section/sidebar-content'
import { InternetIdentityState } from '@/types/auth'
import { useEffect, useState } from 'react'

declare global {
  interface Window {
    Buffer: typeof Buffer
  }
}

if (typeof window !== 'undefined') {
  window.Buffer = Buffer
}

interface PaymentModalProps {
  isOpen: boolean
  onClose: () => void
  selectedTopic?: CourseMetadata
  authState: InternetIdentityState
  onPaymentSuccess?: () => void
}

const ledgerIdl = ({ IDL }: { IDL: any }) => {
  const Tokens = IDL.Record({ e8s: IDL.Nat64 })
  const TimeStamp = IDL.Record({ timestamp_nanos: IDL.Nat64 })
  const AccountIdentifier = IDL.Vec(IDL.Nat8)
  const SubAccount = IDL.Vec(IDL.Nat8)
  const BlockIndex = IDL.Nat64
  const Memo = IDL.Nat64

  const TransferArgs = IDL.Record({
    to: AccountIdentifier,
    fee: Tokens,
    memo: Memo,
    from_subaccount: IDL.Opt(SubAccount),
    created_at_time: IDL.Opt(TimeStamp),
    amount: Tokens
  })

  const TransferError = IDL.Variant({
    BadFee: IDL.Record({ expected_fee: Tokens }),
    InsufficientFunds: IDL.Record({ balance: Tokens }),
    TxTooOld: IDL.Record({ allowed_window_nanos: IDL.Nat64 }),
    TxCreatedInFuture: IDL.Null,
    TxDuplicate: IDL.Record({ duplicate_of: BlockIndex })
  })

  const TransferResult = IDL.Variant({
    Ok: BlockIndex,
    Err: TransferError
  })

  return IDL.Service({
    transfer: IDL.Func([TransferArgs], [TransferResult], [])
  })
}

const PaymentModal = ({
  isOpen,
  onClose,
  selectedTopic,
  authState,
  onPaymentSuccess
}: PaymentModalProps) => {
  const network = import.meta.env.DFX_NETWORK || 'local'
  const [paymentStep, setPaymentStep] = useState<
    'connect' | 'confirm' | 'processing' | 'success' | 'error'
  >('connect')
  const [ledger, setLedger] = useState<any>(null)
  const [coursePrice, setCoursePrice] = useState<number>(5.5)
  const [transactionId, setTransactionId] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const networkFee = 0.0001

  useEffect(() => {
    const initializeLedger = async () => {
      if (!authState.isAuthenticated || !authState.authClient) {
        setLedger(null)
        return
      }

      try {
        const identity = authState.authClient.getIdentity()
        const agent = new HttpAgent({
          identity,
          host: network === 'ic' ? 'https://ic0.app' : 'http://localhost:4943'
        })

        if (network !== 'ic') {
          await agent.fetchRootKey()
        }

        const ledgerCanisterId =
          network === 'ic'
            ? 'rrkah-fqaaa-aaaaa-aaaaq-cai'
            : 'ryjl3-tyaaa-aaaaa-aaaba-cai'

        const ledgerActor = Actor.createActor(ledgerIdl, {
          agent,
          canisterId: ledgerCanisterId
        })

        setLedger(ledgerActor)
        console.log('Ledger connected successfully')
      } catch (error) {
        console.error('Failed to initialize ledger:', error)
        setLedger(null)
      }
    }

    initializeLedger()
  }, [authState.isAuthenticated, authState.authClient, network])

  useEffect(() => {
    if (authState && authState.isAuthenticated) {
      const identity = authState.authClient?.getIdentity()
      const principal = identity?.getPrincipal()

      if (!principal) {
        console.warn('No principal found')
        return
      }

      console.log('Principal text:', principal.toText())

      const senderAccount = AccountIdentifier.fromPrincipal({ principal })
      console.log('Sender account ID (hex):', senderAccount.toHex())
    }
  }, [authState])

  useEffect(() => {
    const fetchCoursePrice = async () => {
      if (
        !authState.isAuthenticated ||
        !authState.actor ||
        !selectedTopic?.slug
      )
        return

      try {
        const priceResult = await authState.actor.getPrice(selectedTopic.slug)
        console.log('Raw price result:', priceResult)

        let price = 5.5

        if (priceResult && priceResult.length > 0) {
          const coursePrice = priceResult[0]
          if (coursePrice && coursePrice.e8s !== undefined) {
            price = Number(coursePrice.e8s) / 100000000
          }
        } else if (
          priceResult === null ||
          (Array.isArray(priceResult) && priceResult.length === 0)
        ) {
          console.log(`No price found for slug: ${selectedTopic.slug}`)
        }

        setCoursePrice(price)
      } catch (err) {
        console.error('Error getting course price:', err)
      }
    }

    fetchCoursePrice()
  }, [authState.isAuthenticated, authState.actor, selectedTopic?.slug])

  useEffect(() => {
    if (isOpen) {
      setPaymentStep(authState.isAuthenticated ? 'confirm' : 'connect')
      setErrorMessage('')
      setTransactionId('')
    }
  }, [isOpen, authState.isAuthenticated])

  const createInvoice = async () => {
    if (
      !authState.isAuthenticated ||
      !authState.actor ||
      !selectedTopic?.slug
    ) {
      throw new Error('Not authenticated or missing course data')
    }

    try {
      const courseSlug = selectedTopic.slug
      const amount = Math.floor(coursePrice * 100_000_000)

      const invoiceData = await authState.actor.createInvoice(courseSlug, [
        amount
      ])
      return invoiceData
    } catch (error) {
      console.error('Error creating invoice:', error)
      throw error
    }
  }

  const processPayment = async () => {
    setIsLoading(true)
    setPaymentStep('processing')

    try {
      if (!authState.isAuthenticated) {
        throw new Error('Please authenticate first')
      }

      if (!authState.authClient) {
        throw new Error('Authentication client not available')
      }

      if (!ledger) {
        throw new Error('Ledger connection not established. Please try again.')
      }

      const invoiceData = await createInvoice()
      const identity = authState.authClient.getIdentity()
      const principal = identity.getPrincipal()

      const senderAccount = AccountIdentifier.fromPrincipal({ principal })
      console.log('Sender account ID (hex):', senderAccount.toHex())

      let recipientAccountArray
      try {
        const recipientAccountId = AccountIdentifier.fromHex(
          invoiceData.depositAccount
        )
        recipientAccountArray = recipientAccountId.toUint8Array()
      } catch (error) {
        // Fallback: convert hex string to Uint8Array manually
        const hex = invoiceData.depositAccount.replace(/^0x/, '')
        recipientAccountArray = new Uint8Array(
          hex.match(/.{1,2}/g).map((byte: string) => parseInt(byte, 16))
        )
      }

      const transferArgs = {
        to: recipientAccountArray,
        amount: { e8s: Number(invoiceData.amount.e8s) },
        fee: { e8s: 10000 },
        memo: Number(invoiceData.invoiceId),
        from_subaccount: [],
        created_at_time: []
      }

      console.log('Transfer args:', {
        ...transferArgs,
        amount: transferArgs.amount.e8s.toString()
      })

      const transferResult = await ledger.transfer(transferArgs)

      if ('Err' in transferResult) {
        throw new Error(
          `Transfer failed: ${JSON.stringify(transferResult.Err, (_, v) =>
            typeof v === 'bigint' ? v.toString() : v
          )}`
        )
      }

      const blockHeight = transferResult.Ok
      setTransactionId(blockHeight.toString())
      setPaymentStep('success')

      await registerCourseAccess(invoiceData.invoiceId, blockHeight.toString())
    } catch (error) {
      console.error('Payment failed:', error)
      setErrorMessage(`Payment failed: ${error}`)
      setPaymentStep('error')
    } finally {
      setIsLoading(false)
    }
  }

  const registerCourseAccess = async (
    invoiceId?: number,
    blockHeight?: string
  ) => {
    if (!authState.isAuthenticated || !authState.actor || !invoiceId) return
    const result = await authState.actor.verifyAndSettle(invoiceId)
    if ('err' in result) throw new Error(`Settlement failed: ${result.err}`)
  }

  const handleRetry = () => {
    setErrorMessage('')
    setPaymentStep(authState.isAuthenticated ? 'confirm' : 'connect')
  }

  const handleComplete = () => {
    if (onPaymentSuccess) onPaymentSuccess()
    onClose()
  }

  if (!selectedTopic) return null

  return (
    <div>
      <div className="flex items-center justify-between border-b">
        <h2 className="text-xl font-semibold text-gray-800">Purchase Course</h2>
      </div>

      <div>
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-medium text-gray-800 mb-2">
            {selectedTopic.title}
          </h3>
          {selectedTopic.description && (
            <p className="text-sm text-gray-600 mb-3">
              {selectedTopic.description}
            </p>
          )}
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Price:</span>
            <span className="text-lg font-semibold text-blue-600">
              {coursePrice} ICP
            </span>
          </div>
        </div>

        {paymentStep === 'connect' && (
          <div className="text-center">
            <div className="mb-6">
              <Wallet className="mx-auto text-blue-500 mb-4" size={48} />
              <h3 className="text-lg font-medium mb-2">
                Authentication Required
              </h3>
              <p className="text-gray-600 mb-6">
                You need to be logged in with Internet Identity to purchase
                courses.
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700"
            >
              Close and Login First
            </button>
          </div>
        )}

        {paymentStep === 'confirm' && (
          <div>
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4 p-3 bg-green-50 rounded-lg">
                <span className="text-green-700">
                  Internet Identity Connected
                </span>
                <CheckCircle className="text-green-500" size={20} />
              </div>

              <div className="flex justify-between border-t pt-2">
                <span className="text-gray-600">Total Cost:</span>
                <span className="font-semibold">
                  {coursePrice + networkFee} ICP
                </span>
              </div>
            </div>

            <button
              onClick={processPayment}
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin mr-2" size={20} />
                  Processing...
                </>
              ) : (
                `Pay ${coursePrice} ICP`
              )}
            </button>
          </div>
        )}

        {paymentStep === 'processing' && (
          <div className="text-center">
            <Loader2
              className="animate-spin mx-auto text-blue-500 mb-4"
              size={48}
            />
            <h3 className="text-lg font-medium mb-2">Processing Payment</h3>
            <p className="text-gray-600">
              Submitting transaction to the Internet Computer network...
            </p>
          </div>
        )}

        {paymentStep === 'success' && (
          <div className="text-center">
            <CheckCircle className="mx-auto text-green-500 mb-4" size={48} />
            <h3 className="text-lg font-medium mb-2">Payment Successful!</h3>
            <p className="text-gray-600 mb-4">
              Your course purchase has been completed and recorded on the ICP
              ledger.
            </p>

            {transactionId && (
              <div className="mb-6 p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Block Height:</p>
                <p className="text-sm font-mono break-all">{transactionId}</p>
              </div>
            )}

            <button
              onClick={handleComplete}
              className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700"
            >
              Access Course
            </button>
          </div>
        )}

        {paymentStep === 'error' && (
          <div className="text-center">
            <AlertCircle className="mx-auto text-red-500 mb-4" size={48} />
            <h3 className="text-lg font-medium mb-2">Payment Failed</h3>
            <p className="text-red-600 mb-6">{errorMessage}</p>

            <div className="space-y-3">
              <button
                onClick={handleRetry}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700"
              >
                Try Again
              </button>
              <button
                onClick={onClose}
                className="w-full bg-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default PaymentModal
