"use client";

import { signIn, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { LuChrome, LuSearch, LuShieldCheck } from "react-icons/lu";
import { useUserStore } from "@/store/userStore";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function LoginPage() {
  const session = useSession()
  const user = session.data?.user
  const router = useRouter()

  useEffect(() => {
    if (user) {
      console.log(user)
      router.push("/");
    }
  }, [user])


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


        <Card className="border-white/10 bg-black/40 backdrop-blur-2xl shadow-2xl overflow-hidden">
          <div className="h-1.5 w-full bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500" />
          <CardHeader className="text-center pt-8 pb-4">
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
              <Image src="/assets/icons/google.svg" alt="google" width={24} height={24} />
              Continue with Google
            </Button>

            <Button
              variant="outline"
              onClick={() => handleSignIn("azure-ad")}
              className="w-full h-12 bg-white/5 hover:bg-white/10 border-white/10 text-white transition-all duration-300 flex items-center justify-center gap-3 text-base"
            >
              <Image src="/assets/icons/microsoft.svg" alt="microsoft" width={25} height={25} />
              Continue with Microsoft
            </Button>

            <div className="pt-6 text-center">
              <p className="text-xs text-zinc-500 flex items-center justify-center gap-1.5">
                <LuShieldCheck className="w-3.5 h-3.5" />
                Secure authentication via OAuth 2.0
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

