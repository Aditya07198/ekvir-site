import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page Not Found",
};

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <p className="font-body text-sm uppercase tracking-widest text-[#8A8375] mb-4">404</p>
      <h1 className="font-heading text-4xl font-light text-[#2B2B2B] mb-4">Page not found</h1>
      <p className="font-body text-[#8A8375] mb-8">
        The page you are looking for does not exist.
      </p>
      <Link
        href="/"
        className="rounded-full border border-[#C2A96A] px-6 py-3 font-body text-[#C2A96A] transition-colors hover:bg-[#C2A96A] hover:text-white"
      >
        Back to home
      </Link>
    </main>
  );
}
