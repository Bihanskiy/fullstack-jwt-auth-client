import React, { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';


export type TextFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  isError?: boolean;
  helperText?: string | boolean;
  label?: string;
  fullWidth?: boolean
}

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      isError,
      helperText,
      fullWidth,
      label,
      type,
      children,
      className,
      ...props
    },
    ref
  ): JSX.Element => {

    const classes = twMerge(
      "h-[2.375rem] mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500",
      clsx({
        "w-full": fullWidth,
        "border-pink-500 text-pink-600 focus:border-pink-500 focus:ring-pink-500": isError,
        "text-xl": type === "password"
      }),
      className,
    )

    return (
      <label className={twMerge(
        "block",
        clsx({
          "w-full": fullWidth
        })
      )}>
        <span className="block text-sm font-medium text-slate-700">
          {label}
        </span>
        <input
          {...props}
          type={type}
          ref={ref}
          className={classes}
        />
        {helperText &&
          <p className={twMerge(
            "mt-2 text-sm",
            clsx({
              "text-pink-600": isError,
              "text-black": !isError
            })
          )}>
            {helperText}
          </p>
        }
      </label>
    )
  }
)

TextField.displayName = 'Input'

export default TextField;
