"use client";
import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[app] Unhandled error:", error);
  }, [error]);

  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center gap-6">
      <p className="font-body text-xs uppercase tracking-widest text-[#8A8375]">
        Something went wrong
      </p>
      <h1 className="font-heading text-4xl font-light text-[#2B2B2B]">
        An unexpected error occurred.
      </h1>
      <p className="font-body text-sm text-[#8A8375] max-w-md">
        We have been notified. You can try again or return to the homepage.
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        <button
          onClick={reset}
          className="rounded-full bg-[#C2A96A] px-8 py-3 font-body text-sm font-medium text-white transition-colors hover:bg-[#b8983a]"
        >
          Try again
        </button>
        <Link
          href="/"
          className="rounded-full border border-[#2B2B2B]/20 px-8 py-3 font-body text-sm font-medium text-[#2B2B2B] transition-colors hover:border-[#C2A96A] hover:text-[#C2A96A]"
        >
          Go home
        </Link>
      </div>
    </main>
  );
}
