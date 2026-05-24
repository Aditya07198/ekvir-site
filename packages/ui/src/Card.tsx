import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}

export function Card({ children, className = "", as: Tag = "div" }: CardProps) {
  return (
    <Tag
      className={[
        "rounded-2xl bg-white/70 backdrop-blur-sm border border-[#C2A96A]/20",
        "p-6 shadow-sm",
        className,
      ].join(" ")}
    >
      {children}
    </Tag>
  );
}
