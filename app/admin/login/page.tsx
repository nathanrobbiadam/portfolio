"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Eye, EyeOff, Lock, Mail, Terminal } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function AdminLogin() {
  const router = useRouter();
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }

      if (data.user) {
        router.push("/admin/dashboard");
      }
    } catch {
      setError("Terjadi kesalahan. Silakan coba lagi.");
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      {/* Subtle Grid Background */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:40px_40px]" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Terminal-style header */}
        <div className="mb-4 flex items-center gap-4">
          <div className="flex gap-2">
            <div className="h-3 w-3 rounded-full bg-foreground/40" />
            <div className="h-3 w-3 rounded-full bg-foreground/30" />
            <div className="h-3 w-3 rounded-full bg-foreground/20" />
          </div>
          <div className="flex-1 rounded-t-lg border border-b-0 border-foreground/20 bg-foreground/5 px-4 py-1.5 font-mono text-xs text-muted-foreground">
            admin_login.tsx
          </div>
        </div>

        <Card className="border-foreground/20 bg-card/90 backdrop-blur-sm">
          <CardHeader className="space-y-1 pb-6 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-lg border border-foreground/20 bg-foreground/5">
              <Lock className="h-6 w-6 text-foreground/80" />
            </div>
            <CardTitle className="font-mono text-2xl text-foreground">
              <span className="text-muted-foreground">{'<'}</span>
              <span>Admin</span>
              <span className="text-muted-foreground">{' />'}</span>
            </CardTitle>
            <div className="font-mono text-xs text-muted-foreground">
              <span className="text-foreground/60">$</span> Authentication required
            </div>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleLogin} className="space-y-5">
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <Alert className="border-foreground/20 bg-foreground/5">
                    <AlertDescription className="font-mono text-sm text-foreground/80">
                      Error: {error}
                    </AlertDescription>
                  </Alert>
                </motion.div>
              )}

              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="font-mono text-xs text-muted-foreground"
                >
                  <span className="text-foreground/60">const</span> email ={" "}
                  <span className="text-foreground/40">"</span>
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground/40" />
                  <input
                    id="email"
                    type="email"
                    placeholder="admin@portfolio.dev"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-lg border border-foreground/20 bg-foreground/5 py-3 pl-10 pr-4 font-mono text-sm text-foreground placeholder:text-muted-foreground focus:border-foreground/40 focus:outline-none focus:ring-1 focus:ring-foreground/20"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="font-mono text-xs text-muted-foreground"
                >
                  <span className="text-foreground/60">const</span> password ={" "}
                  <span className="text-foreground/40">"</span>
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground/40" />
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-lg border border-foreground/20 bg-foreground/5 py-3 pl-10 pr-12 font-mono text-sm text-foreground placeholder:text-muted-foreground focus:border-foreground/40 focus:outline-none focus:ring-1 focus:ring-foreground/20"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/40 transition-colors hover:text-foreground/60"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full rounded-lg bg-foreground py-3 font-mono text-sm font-semibold text-background transition-all hover:opacity-80 disabled:opacity-50"
              >
                <span className="flex items-center justify-center gap-2">
                  <Terminal className="h-4 w-4" />
                  {loading ? "Authenticating..." : "npm run login"}
                </span>
              </motion.button>
            </form>

            {/* Command hint */}
            <div className="mt-6 border-t border-foreground/10 pt-4">
              <div className="font-mono text-xs text-muted-foreground">
                <span className="text-foreground/60">$</span>{" "}
                <span className="text-foreground/30">// Credentials stored in Supabase Auth</span>
                <br />
                <span className="text-foreground/60">$</span>{" "}
                <span className="text-foreground/30">
                  <a href="/" className="hover:text-foreground/60">
                    cd ..
                  </a>{" "}
                  <span className="animate-pulse">|</span> Back to portfolio
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}