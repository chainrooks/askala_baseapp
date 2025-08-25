import React from 'react'

interface SecondaryButtonProps
  extends React.ComponentPropsWithoutRef<'button'> {
  children: React.ReactNode
}

export default function SecondaryButton({
  children,
  ...props
}: SecondaryButtonProps) {
  return (
    <button
      {...props}
      className="relative z-10 px-3 py-2 cursor-pointer bg-white rounded-lg text-black transition ease-in-out duration-200 hover:text-gray-400 text-xs shadow-xs"
    >
      {children}
    </button>
  )
}
