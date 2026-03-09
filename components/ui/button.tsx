"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))] focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(var(--background))]",
  {
    variants: {
      variant: {
        default:
          "bg-[hsl(var(--foreground))] px-5 py-3 text-[hsl(var(--background))] shadow-[0_12px_40px_rgba(255,255,255,0.08)] hover:-translate-y-0.5 hover:bg-white",
        secondary:
          "border border-white/15 bg-white/6 px-5 py-3 text-white backdrop-blur hover:-translate-y-0.5 hover:bg-white/10",
        light:
          "border border-white/70 bg-white px-5 py-3 !text-black shadow-[0_10px_30px_rgba(0,0,0,0.18)] hover:-translate-y-0.5 hover:bg-white/90 hover:!text-black",
        ghost: "px-4 py-2 text-white/80 hover:text-white",
      },
      size: {
        default: "h-11",
        sm: "h-9 px-4 text-xs",
        lg: "h-12 px-6 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
