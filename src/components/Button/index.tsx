import React from 'react'
interface ButtonProps {
  children: React.ReactNode
  type: 'primary' | 'secondary'
  classes?: string
  onClick: React.MouseEventHandler<HTMLButtonElement>
  expandEffect?: boolean
  disabled?: boolean
}

export const Button: React.FC<ButtonProps> = ({
  children,
  type,
  onClick,
  classes = '',
  expandEffect,
  disabled,
}) => {
  const buttonClasses = `button ${type} font-bold ${classes} ${expandEffect ? 'expand' : ''}`
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={buttonClasses}
    >
      {children}
    </button>
  )
}
