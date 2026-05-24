import React from "react";

type BadgeVariant = "default" | "accent" | "muted";

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variantClasses: Record<BadgeVariant, string> = {
  default: "bg-[#2B2B2B] text-white",
  accent: "bg-[#C2A96A]/15 text-[#C2A96A] border border-[#C2A96A]/30",
  muted: "bg-[#8A8375]/10 text-[#8A8375]",
};

export function Badge({ children, variant = "default", className = "" }: BadgeProps) {
  return (
    <span
      className={[
        "inline-flex items-center rounded-full px-3 py-1",
        "font-body text-xs font-medium tracking-wide",
        variantClasses[variant],
        className,
      ].join(" ")}
    >
      {children}
    </span>
  );
}
