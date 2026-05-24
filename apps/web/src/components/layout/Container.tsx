import React from "react";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
  narrow?: boolean;
}

export function Container({
  children,
  className = "",
  as: Tag = "div",
  narrow = false,
}: ContainerProps) {
  return (
    <Tag
      className={[
        "mx-auto w-full px-6 md:px-10 lg:px-16",
        narrow ? "max-w-3xl" : "max-w-7xl",
        className,
      ].join(" ")}
    >
      {children}
    </Tag>
  );
}
