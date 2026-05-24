import React from "react";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string | undefined;
}

export function Textarea({ label, error, id, className = "", ...props }: TextareaProps) {
  const textareaId = id ?? label?.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label
          htmlFor={textareaId}
          className="font-body text-sm font-medium text-[#2B2B2B]"
        >
          {label}
        </label>
      )}
      <textarea
        id={textareaId}
        rows={4}
        className={[
          "w-full resize-none rounded-xl border bg-white/80 px-4 py-3",
          "font-body text-sm text-[#2B2B2B] placeholder:text-[#8A8375]",
          "outline-none transition-colors duration-150",
          error
            ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-200"
            : "border-[#C2A96A]/30 focus:border-[#C2A96A] focus:ring-2 focus:ring-[#C2A96A]/20",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          className,
        ].join(" ")}
        {...props}
      />
      {error && (
        <p role="alert" className="font-body text-xs text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}
