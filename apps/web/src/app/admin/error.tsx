"use client";
import { useEffect } from "react";

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[admin] Unhandled error:", error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center gap-4">
      <p className="font-heading text-2xl font-light text-[#2B2B2B]">Something went wrong.</p>
      <p className="font-body text-sm text-[#8A8375]">
        {error.message || "An unexpected error occurred in the admin panel."}
      </p>
      <button
        onClick={reset}
        className="rounded-full bg-[#C2A96A] px-6 py-3 font-body text-sm font-medium text-white transition-colors hover:bg-[#b8983a]"
      >
        Try again
      </button>
    </div>
  );
}
