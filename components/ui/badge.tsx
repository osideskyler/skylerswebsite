import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium tracking-[0.18em] uppercase transition-colors",
  {
    variants: {
      variant: {
        default:
          "border-white/15 bg-white/8 text-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/6",
        solid: "border-transparent bg-[hsl(var(--foreground))] text-[hsl(var(--background))]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}
