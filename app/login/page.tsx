"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Chrome, Search, ShieldCheck } from "lucide-react";

export default function LoginPage() {
  const handleSignIn = (provider: string) => {
    signIn(provider, { callbackUrl: "/" });
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-zinc-950 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob" />
      <div className="absolute top-0 -right-4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000" />
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="z-10 w-full max-w-md px-4"
      >
        <div className="flex justify-center mb-8">
            <div className="p-3 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-xl">
                <Search className="w-10 h-10 text-blue-500" />
            </div>
        </div>

        <Card className="border-white/10 bg-black/40 backdrop-blur-2xl shadow-2xl overflow-hidden">
          <div className="h-1.5 w-full bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500" />
          <CardHeader className="text-center pt-8 pb-4">
            <CardTitle className="text-3xl font-bold tracking-tight text-white">
              Welcome Back
            </CardTitle>
            <CardDescription className="text-zinc-400 text-base">
              Sign in to your account to continue
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4 pb-8">
            <Button
              variant="outline"
              onClick={() => handleSignIn("google")}
              className="w-full h-12 bg-white/5 hover:bg-white/10 border-white/10 text-white transition-all duration-300 flex items-center justify-center gap-3 text-base"
            >
              <GoogleIcon />
              Continue with Google
            </Button>

            <Button
              variant="outline"
              onClick={() => handleSignIn("azure-ad")}
              className="w-full h-12 bg-white/5 hover:bg-white/10 border-white/10 text-white transition-all duration-300 flex items-center justify-center gap-3 text-base"
            >
              <MicrosoftIcon />
              Continue with Microsoft
            </Button>

            <div className="pt-6 text-center">
                <p className="text-xs text-zinc-500 flex items-center justify-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Secure authentication via OAuth 2.0
                </p>
            </div>
          </CardContent>
        </Card>

        <p className="mt-8 text-center text-sm text-zinc-500">
          New here? Registration is automatic when you sign in.
        </p>
      </motion.div>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24">
      <path
        fill="currentColor"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 12-4.53z"
      />
    </svg>
  );
}

function MicrosoftIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 23 23">
        <path fill="#f3f3f3" d="M0 0h11v11H0z"/>
        <path fill="#f3f3f3" d="M12 0h11v11H12z"/>
        <path fill="#f3f3f3" d="M0 12h11v23H0z"/>
        <path fill="#f3f3f3" d="M12 12h11v23H12z"/>
        {/* Actual colors for better look if desired, but grayscale matches the premium feel */}
        <path fill="#f25022" d="M0 0h11v11H0z" className="opacity-80"/>
        <path fill="#7fbb00" d="M12 0h11v11H12z" className="opacity-80"/>
        <path fill="#00a1f1" d="M0 12h11v11H0z" className="opacity-80"/>
        <path fill="#ffbb00" d="M12 12h11v11H12z" className="opacity-80"/>
    </svg>
  );
}
