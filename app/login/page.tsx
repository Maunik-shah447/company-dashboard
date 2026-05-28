// app/login/page.tsx
'use client';

import { useState, type FormEvent } from "react";
import { Loader2, Lock, Mail, ShieldAlert } from "lucide-react";
import { supabase } from "../../utils/supabase";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    // Live Supabase Authentication
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setLoading(false);
      setError("Invalid credentials. Please verify your email and password.");
    } else {
      router.push("/");
      router.refresh();
    }
  };

  return (
    <main
      className="min-h-screen w-full flex items-center justify-center px-4 py-12 relative overflow-hidden bg-slate-900"
      style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)" }}
    >
      {/* Ambient grid */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(oklch(1 0 0) 1px, transparent 1px), linear-gradient(90deg, oklch(1 0 0) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      
      {/* Soft glow */}
      <div
        aria-hidden
        className="absolute -top-40 left-1/2 -translate-x-1/2 w-[720px] h-[720px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 60%)",
        }}
      />

      <div className="relative w-full max-w-md">
        {/* Card */}
        <section
          className="bg-white text-slate-900 rounded-2xl p-8 sm:p-10 shadow-2xl shadow-black/40 border border-slate-700/30"
          aria-labelledby="login-heading"
        >
          {/* Logo */}
          <div className="flex flex-col items-center text-center mb-8">
            <div className="h-20 w-20 rounded-full bg-white flex items-center justify-center mb-5 ring-1 ring-slate-200 overflow-hidden shadow-lg">
              <img
                src="/oan-logo.png"
                alt="OAN Industries Limited logo"
                className="h-full w-full object-contain p-2"
                onError={(e) => {
                  // Fallback if logo is missing from public folder
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.parentElement!.innerHTML = '<span class="text-2xl font-black text-indigo-600">OAN</span>';
                }}
              />
            </div>
            <h1
              id="login-heading"
              className="text-2xl font-bold tracking-tight text-slate-900"
            >
              OAN Industries Limited
            </h1>
            <p className="mt-1 text-sm font-medium tracking-wide uppercase text-slate-500">
              Enterprise Hub
            </p>
          </div>

          {/* Error alert — hidden until set */}
          <div
            role="alert"
            aria-live="polite"
            className={`overflow-hidden transition-all duration-300 ${
              error ? "max-h-24 opacity-100 mb-5" : "max-h-0 opacity-0 mb-0"
            }`}
          >
            <div className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3">
              <ShieldAlert className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
              <p className="text-sm text-red-600 font-medium leading-snug">{error}</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-slate-700">
                Email Address
              </label>
              <div className="relative group">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@oanindustries.com"
                  className="w-full h-11 pl-10 pr-3 rounded-lg border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 outline-none focus:border-indigo-600 focus:ring-4 focus:ring-indigo-600/15 transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-slate-700">
                Password
              </label>
              <div className="relative group">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                <input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full h-11 pl-10 pr-3 rounded-lg border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 outline-none focus:border-indigo-600 focus:ring-4 focus:ring-indigo-600/15 transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-11 rounded-lg font-semibold text-white inline-flex items-center justify-center gap-2 disabled:opacity-80 disabled:cursor-not-allowed hover:brightness-110 active:scale-[0.99] bg-indigo-600 shadow-md shadow-indigo-600/20 transition-all duration-200 hover:bg-indigo-700"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Authenticating…
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <span className="text-xs font-medium text-slate-400 hover:text-indigo-600 transition-colors cursor-pointer">
              Forgot your password? Contact IT Admin
            </span>
          </div>
        </section>

        {/* Footer notice */}
        <p className="mt-6 text-center text-xs text-slate-500 px-4 leading-relaxed font-medium">
          Restricted access. This is a private system for authorized OAN Industries Limited personnel only. All activity is monitored and logged.
        </p>
      </div>
    </main>
  );
}