"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";
const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? "";

function storeToken(token: string) {
  localStorage.setItem("ekvir_user_token", token);
}

export default function LoginPage() {
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
        data?: { token: string; role: string };
        message?: string;
      };
      if (!res.ok || !json.success) { setError(json.message ?? "Invalid credentials."); return; }

      // Admins go to the dashboard; regular users go home
      if (json.data!.role === "admin" || json.data!.role === "superadmin") {
        localStorage.setItem("ekvir_token", json.data!.token);
        router.replace("/admin");
      } else {
        storeToken(json.data!.token);
        router.replace("/");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogle(idToken: string) {
    setError("");
    setLoading(true);
    try {
      const res = await fetch(`${API}/api/auth/google`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken }),
      });
      const json = (await res.json()) as { success: boolean; data?: { token: string }; message?: string };
      if (!res.ok || !json.success) { setError(json.message ?? "Google sign-in failed."); return; }
      storeToken(json.data!.token);
      router.replace("/");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const inputClass =
    "w-full rounded-xl border border-[#C2A96A]/30 bg-white/60 px-4 py-3 font-body text-sm text-[#2B2B2B] outline-none focus:border-[#C2A96A] transition-colors";

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <div className="flex min-h-screen items-center justify-center px-6 py-16">
        <div className="w-full max-w-sm space-y-8">
          {/* Header */}
          <div>
            <Link href="/" className="font-heading text-2xl font-light text-[#C2A96A]">
              EKVIR
            </Link>
            <h1 className="mt-3 font-heading text-4xl font-light text-[#2B2B2B]">Welcome back.</h1>
            <p className="mt-2 font-body text-sm text-[#8A8375]">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="text-[#C2A96A] hover:underline underline-offset-4">
                Sign up
              </Link>
            </p>
          </div>

          {/* Google SSO */}
          {GOOGLE_CLIENT_ID && (
            <div className="space-y-3">
              <GoogleLogin
                onSuccess={(r) => r.credential && handleGoogle(r.credential)}
                onError={() => setError("Google sign-in failed.")}
                width="100%"
                text="signin_with"
                shape="pill"
              />
              <div className="flex items-center gap-4">
                <span className="flex-1 h-px bg-[#C2A96A]/20" />
                <span className="font-body text-xs text-[#8A8375]">or continue with email</span>
                <span className="flex-1 h-px bg-[#C2A96A]/20" />
              </div>
            </div>
          )}

          {/* Email / Password form */}
          <form onSubmit={handleSubmit} noValidate className="space-y-4">
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
                className={inputClass}
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
                autoComplete="current-password"
                className={inputClass}
              />
            </div>

            {error && (
              <p role="alert" className="font-body text-sm text-red-600">
                {error}
              </p>
            )}

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
    </GoogleOAuthProvider>
  );
}
