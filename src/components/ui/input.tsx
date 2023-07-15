import React from "react";
import { cva, VariantProps } from "class-variance-authority";
import { AiFillCheckCircle } from "react-icons/ai";
import { GiCancel } from "react-icons/gi";

import { cn } from "@/utils/style-utils";

export const inputVariants = cva(
  "mr-1 flex w-full overflow-auto bg-transparent outline-none placeholder:text-white/30 disabled:text-white/30",
);

export const inputContainerVariants = cva(
  [
    "relative mb-2 flex items-center border border-white/50 bg-transparent py-2 pl-4 text-sm lg:text-base",
    "transition-all duration-300 focus-within:border-tomato hover:focus-within:opacity-100",
  ],
  {
    variants: {
      state: {
        error: "border border-error/100 focus-within:border-error/100 hover:border-error/100",
        success:
          "border border-success border-opacity-100 focus-within:border-success/100 hover:border-success/100",
      },
    },
  },
);

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants>,
    VariantProps<typeof inputContainerVariants> {
  StartIcon?: (iconProps: React.SVGProps<SVGSVGElement>) => JSX.Element;
  startIconProps?: React.SVGProps<SVGSVGElement>;
  EndIcon?: (iconProps: React.SVGProps<SVGSVGElement>) => JSX.Element;
  endIconProps?: React.SVGProps<SVGSVGElement>;
  successMessage?: string;
  errorMessage?: string;
  label?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      state,
      StartIcon,
      startIconProps,
      EndIcon,
      endIconProps,
      successMessage,
      errorMessage,
      label,
      disabled,
      className,
      ...props
    },
    ref,
  ) => {
    return (
      <div className="flex flex-col">
        {label && (
          <div
            className={cn(
              "w-fit bg-white/10 px-4 py-1 text-sm tracking-[0.07em] backdrop-blur-none",
              state === "error" && "text-error",
              state === "success" && "text-success",
              disabled && "opacity-50",
            )}
          >
            {label}
          </div>
        )}
        <div
          className={cn(
            inputContainerVariants({ state, className }),
            disabled && "pointer-events-none opacity-20",
          )}
        >
          {StartIcon && (
            <div className="mr-2 flex justify-center">
              <StartIcon {...startIconProps} />
            </div>
          )}

          <input className={cn(inputVariants())} ref={ref} {...props} />

          {EndIcon && (
            <div className="mr-4 flex justify-center">
              <EndIcon {...endIconProps} />
            </div>
          )}
        </div>
        {successMessage && (
          <p className="inline-flex flex-row items-center justify-start gap-2 text-sm text-success">
            <AiFillCheckCircle /> {successMessage}
          </p>
        )}
        {errorMessage && (
          <p className="inline-flex flex-row items-center justify-start gap-2 text-sm text-error">
            <GiCancel /> {errorMessage}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";
