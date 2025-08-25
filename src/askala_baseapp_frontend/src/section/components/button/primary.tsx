import React from 'react'

interface PrimaryButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  children: React.ReactNode
}

export default function PrimaryButton({
  children,
  ...props
}: PrimaryButtonProps) {
  return (
    <button
      {...props}
      className="
        px-3 py-2 rounded-lg bg-[#8c45ff]/80 border border-white/15 
        shadow-[inset_0_0_6px_3px_rgba(255,255,255,0.15)] backdrop-blur-sm
        text-white text-sm font-medium
        transition-colors duration-200 hover:bg-[#8c45ff]/90 hover:shadow-[inset_0_0_6px_3px_rgba(255,255,255,0.3)] hover:text-white
        "
    >
      {children}
    </button>
  )
}
