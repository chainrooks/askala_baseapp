import React from 'react'
import '../../../main-content.css'

type ModalProps = {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  return (
    <div
      className={`inset-0 flex items-center justify-center z-[9999] ${isOpen ? 'fixed' : 'hidden'}`}
    >
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-black/50 backdrop-blur-md ${
          isOpen ? 'modal-overlay-animation modal-blur-animation' : ''
        }`}
        onClick={onClose}
      />

      {/* Modal Content */}
      <div
        className={`
          relative z-[10000] w-full max-w-[600px] min-h-[300px] rounded-3xl p-8 shadow-2xl 
          bg-gradient-to-br from-[#1F2937] to-[#111827] overflow-hidden
          ${isOpen ? 'modal-content-animation' : ''}
        `}
      >
        {/* Background glow layer */}
        <div className="absolute inset-0 opacity-20 bg-gradient-to-br from-gray-700 to-gray-900 pointer-events-none"></div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition"
        >
          ✕
        </button>

        {/* Modal Inner Content */}
        <div className="relative z-10">{children}</div>

        {/* Decorative Blur Orb */}
        <div className="absolute -bottom-20 -left-20">
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-500/20 via-cyan-500/20 to-blue-500/20 blur-[80px] w-72 h-72"></div>
        </div>
      </div>
    </div>
  )
}
