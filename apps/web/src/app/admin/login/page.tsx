"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch(`${API}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const json = (await res.json()) as {
        success: boolean;
        data?: { token: string };
        message?: string;
      };
      if (!res.ok || !json.success) {
        setError(json.message ?? "Invalid credentials");
        return;
      }
      localStorage.setItem("ekvir_token", json.data!.token);
      router.replace("/admin");
    } catch {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <div className="w-full max-w-sm space-y-8">
        <div>
          <p className="font-heading text-4xl font-light text-[#2B2B2B]">EKVIR</p>
          <p className="mt-1 font-body text-sm text-[#8A8375]">Admin — internal access only</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="font-body text-xs uppercase tracking-widest text-[#8A8375]">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              className="w-full rounded-xl border border-[#C2A96A]/30 bg-white/60 px-4 py-3 font-body text-sm text-[#2B2B2B] outline-none focus:border-[#C2A96A] transition-colors"
            />
          </div>

          <div className="space-y-1">
            <label className="font-body text-xs uppercase tracking-widest text-[#8A8375]">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
              autoComplete="current-password"
              className="w-full rounded-xl border border-[#C2A96A]/30 bg-white/60 px-4 py-3 font-body text-sm text-[#2B2B2B] outline-none focus:border-[#C2A96A] transition-colors"
            />
          </div>

          {error && <p className="font-body text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-[#C2A96A] py-4 font-body font-medium text-white transition-colors hover:bg-[#b8983a] disabled:opacity-60"
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
