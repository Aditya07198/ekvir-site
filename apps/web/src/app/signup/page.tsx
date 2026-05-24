"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";
const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? "";

interface FormValues {
  name: string;
  phone: string;
  email: string;
  password: string;
}

interface FormErrors {
  name?: string;
  phone?: string;
  email?: string;
  password?: string;
}

function validate(v: FormValues): FormErrors {
  const e: FormErrors = {};
  if (!v.name.trim()) e.name = "Full name is required.";
  if (!v.phone.trim()) e.phone = "Contact number is required.";
  if (!v.email.trim()) e.email = "Email is required.";
  else if (!/^\S+@\S+\.\S+$/.test(v.email)) e.email = "Enter a valid email.";
  if (v.password.length < 8) e.password = "Password must be at least 8 characters.";
  return e;
}

function storeToken(token: string) {
  localStorage.setItem("ekvir_user_token", token);
}

export default function SignupPage() {
  const router = useRouter();
  const [values, setValues] = useState<FormValues>({ name: "", phone: "", email: "", password: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(field: keyof FormValues) {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      setValues((v) => ({ ...v, [field]: e.target.value }));
      if (errors[field]) setErrors((errs) => ({ ...errs, [field]: undefined }));
    };
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate(values);
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setServerError("");
    setLoading(true);
    try {
      const res = await fetch(`${API}/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const json = (await res.json()) as { success: boolean; data?: { token: string }; message?: string };
      if (!res.ok || !json.success) { setServerError(json.message ?? "Signup failed."); return; }
      storeToken(json.data!.token);
      router.replace("/");
    } catch {
      setServerError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogle(idToken: string) {
    setServerError("");
    setLoading(true);
    try {
      const res = await fetch(`${API}/api/auth/google`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken }),
      });
      const json = (await res.json()) as { success: boolean; data?: { token: string }; message?: string };
      if (!res.ok || !json.success) { setServerError(json.message ?? "Google sign-in failed."); return; }
      storeToken(json.data!.token);
      router.replace("/");
    } catch {
      setServerError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const inputClass =
    "w-full rounded-xl border border-[#C2A96A]/30 bg-white/60 px-4 py-3 font-body text-sm text-[#2B2B2B] outline-none focus:border-[#C2A96A] transition-colors placeholder:text-[#8A8375]/60";

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <div className="flex min-h-screen items-center justify-center px-6 py-16">
        <div className="w-full max-w-md space-y-8">
          {/* Header */}
          <div>
            <Link href="/" className="font-heading text-2xl font-light text-[#C2A96A]">
              EKVIR
            </Link>
            <h1 className="mt-3 font-heading text-4xl font-light text-[#2B2B2B]">
              Create your account
            </h1>
            <p className="mt-2 font-body text-sm text-[#8A8375]">
              Already have an account?{" "}
              <Link href="/login" className="text-[#C2A96A] hover:underline underline-offset-4">
                Sign in
              </Link>
            </p>
          </div>

          {/* Google SSO */}
          {GOOGLE_CLIENT_ID && (
            <div className="space-y-3">
              <GoogleLogin
                onSuccess={(r) => r.credential && handleGoogle(r.credential)}
                onError={() => setServerError("Google sign-in failed.")}
                width="100%"
                text="signup_with"
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
                Full Name
              </label>
              <input
                type="text"
                placeholder="Aditya Shah"
                value={values.name}
                onChange={handleChange("name")}
                autoComplete="name"
                className={inputClass}
              />
              {errors.name && <p className="font-body text-xs text-red-600">{errors.name}</p>}
            </div>

            <div className="space-y-1">
              <label className="font-body text-xs uppercase tracking-widest text-[#8A8375]">
                Contact Number
              </label>
              <input
                type="tel"
                placeholder="+91 99040 44439"
                value={values.phone}
                onChange={handleChange("phone")}
                autoComplete="tel"
                className={inputClass}
              />
              {errors.phone && <p className="font-body text-xs text-red-600">{errors.phone}</p>}
            </div>

            <div className="space-y-1">
              <label className="font-body text-xs uppercase tracking-widest text-[#8A8375]">
                Email
              </label>
              <input
                type="email"
                placeholder="you@company.com"
                value={values.email}
                onChange={handleChange("email")}
                autoComplete="email"
                className={inputClass}
              />
              {errors.email && <p className="font-body text-xs text-red-600">{errors.email}</p>}
            </div>

            <div className="space-y-1">
              <label className="font-body text-xs uppercase tracking-widest text-[#8A8375]">
                Password
              </label>
              <input
                type="password"
                placeholder="At least 8 characters"
                value={values.password}
                onChange={handleChange("password")}
                autoComplete="new-password"
                className={inputClass}
              />
              {errors.password && (
                <p className="font-body text-xs text-red-600">{errors.password}</p>
              )}
            </div>

            {serverError && (
              <p role="alert" className="font-body text-sm text-red-600">
                {serverError}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-[#C2A96A] py-4 font-body font-medium text-white transition-colors hover:bg-[#b8983a] disabled:opacity-60"
            >
              {loading ? "Creating account…" : "Create account"}
            </button>
          </form>

          <p className="font-body text-xs text-[#8A8375] text-center">
            By signing up you agree to EKVIR&apos;s terms of service and privacy policy.
          </p>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
}
