import React, { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';



export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      ...props
    },
    ref
  ): JSX.Element => {
    return (
      <button
        {...props}
        ref={ref}
        className={twMerge(
          "flex items-center justify-center bg-slate-300 backdrop-blur-xl border-solid border-2 rounded-lg border-indigo-600 p-2",
          className
        )}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'

export default Button;