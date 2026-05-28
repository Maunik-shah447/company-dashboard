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

    // Live Supabase Authentication Layer
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

  // Modern Clean System Font Stack to completely kill Times New Roman
  const globalFont = {
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        position: "relative",
        overflow: "hidden",
        background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
        boxSizing: "border-box",
        ...globalFont
      }}
    >
      {/* Background Matrix Mesh Accent */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.03,
          pointerEvents: "none",
          backgroundImage:
            "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      
      {/* High-End Vector Ambient Blue Glow */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "-200px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "800px",
          height: "800px",
          borderRadius: "50%",
          pointerEvents: "none",
          background: "radial-gradient(circle, rgba(99, 102, 241, 0.18) 0%, transparent 65%)",
        }}
      />

      <div style={{ position: "relative", width: "100%", maxWidth: "420px", zIndex: 10 }}>
        {/* Floating Executive Interface Card */}
        <section
          style={{
            backgroundColor: "#ffffff",
            color: "#0f172a",
            borderRadius: "20px",
            padding: "40px 32px",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.6)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            boxSizing: "border-box"
          }}
        >
          {/* Brand Presentation Section */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", marginBottom: "32px" }}>
            <div style={{
              height: "76px",
              width: "76px",
              borderRadius: "50%",
              backgroundColor: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "16px",
              boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.08)",
              border: "1px solid #e2e8f0",
              overflow: "hidden"
            }}>
              <img
                src="/oan-logo.png"
                alt="OAN Industries Limited logo"[cite: 1]
                style={{ height: "100%", width: "100%", objectFit: "contain", padding: "10px" }}
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.parentElement!.innerHTML = '<span style="font-size: 22px; font-weight: 900; color: #4f46e5;">OAN</span>';
                }}
              />
            </div>
            <h1 style={{ fontSize: "22px", fontWeight: "700", letterSpacing: "-0.02em", color: "#0f172a", margin: "0 0 4px 0" }}>
              OAN Industries Limited[cite: 1]
            </h1>
            <p style={{ fontSize: "11px", fontWeight: "700", letterSpacing: "0.08em", textTransform: "uppercase", color: "#64748b", margin: 0 }}>
              Enterprise Hub
            </p>
          </div>

          {/* Secure Diagnostic Warning Banner */}
          {error && (
            <div style={{
              display: "flex",
              alignItems: "start",
              gap: "10px",
              borderRadius: "10px",
              border: "1px solid #fecaca",
              backgroundColor: "#fef2f2",
              padding: "12px",
              marginBottom: "24px"
            }}>
              <ShieldAlert style={{ height: "18px", width: "18px", color: "#dc2626", flexShrink: 0, marginTop: "2px" }} />
              <p style={{ fontSize: "13px", color: "#dc2626", fontWeight: "500", margin: 0, lineHeight: "1.4" }}>{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }} noValidate>
            {/* Account Identifier Input Form */}
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <label htmlFor="email" style={{ fontSize: "13px", fontWeight: "600", color: "#475569" }}>
                Email Address
              </label>
              <div style={{ position: "relative" }}>
                <Mail style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", height: "16px", width: "16px", color: "#94a3b8" }} />
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@oanindustries.com"
                  style={{
                    width: "100%",
                    height: "44px",
                    paddingLeft: "42px",
                    paddingRight: "14px",
                    borderRadius: "10px",
                    border: "1px solid #cbd5e1",
                    backgroundColor: "#ffffff",
                    color: "#0f172a",
                    fontSize: "14px",
                    outline: "none",
                    boxSizing: "border-box"
                  }}
                />
              </div>
            </div>

            {/* Cryptographic Protection Input Form */}
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <label htmlFor="password" style={{ fontSize: "13px", fontWeight: "600", color: "#475569" }}>
                Password
              </label>
              <div style={{ position: "relative" }}>
                <Lock style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", height: "16px", width: "16px", color: "#94a3b8" }} />
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  style={{
                    width: "100%",
                    height: "44px",
                    paddingLeft: "42px",
                    paddingRight: "14px",
                    borderRadius: "10px",
                    border: "1px solid #cbd5e1",
                    backgroundColor: "#ffffff",
                    color: "#0f172a",
                    fontSize: "14px",
                    outline: "none",
                    boxSizing: "border-box"
                  }}
                />
              </div>
            </div>

            {/* Authorization Submission Trigger */}
            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                height: "46px",
                borderRadius: "10px",
                backgroundColor: "#4f46e5",
                color: "#ffffff",
                fontSize: "14px",
                fontWeight: "600",
                border: "none",
                cursor: loading ? "not-allowed" : "pointer",
                opacity: loading ? 0.8 : 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                boxShadow: "0 4px 12px rgba(79, 70, 229, 0.25)",
                marginTop: "6px"
              }}
            >
              {loading ? (
                <>
                  <Loader2 style={{ height: "16px", width: "16px", animation: "spin 1s linear infinite" }} />
                  Verifying Gateway Token…
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <div style={{ marginTop: "24px", textBreak: "none", textAlign: "center" }}>
            <span style={{ fontSize: "12px", fontWeight: "500", color: "#94a3b8", textDecoration: "none" }}>
              Forgot password? Contact Systems Admin
            </span>
          </div>
        </section>

        {/* Global Access Protocol Warning Banner */}
        <p style={{ marginTop: "28px", textAlign: "center", fontSize: "11px", color: "#64748b", padding: "0 12px", lineHeight: "1.6", fontWeight: "500" }}>
          Restricted access portal. This is a private operational ecosystem for authorized OAN Industries Limited personnel only[cite: 1]. Active background telemetry monitoring is engaged[cite: 1].
        </p>
      </div>

      {/* Basic Keyframe Animation injection for CSS Spinners */}
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </main>
  );
}