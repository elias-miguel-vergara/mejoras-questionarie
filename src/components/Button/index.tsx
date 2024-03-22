import React from 'react'
interface ButtonProps {
  children: React.ReactNode
  type: 'primary' | 'secondary'
  classes?: string
  onClick: React.MouseEventHandler<HTMLButtonElement>
  expandEffect?: boolean
  disabled?: boolean
}

export const Button = ({
  children,
  type,
  onClick,
  classes = '',
  expandEffect,
  disabled,
}: ButtonProps) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`button ${type} font-bold ${classes} ${
        expandEffect ? 'expand' : ''
      }`}
    >
      {children}
    </button>
  )
}
