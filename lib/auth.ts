import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import AzureADProvider from "next-auth/providers/azure-ad";
import { connectDB } from "@/lib/db";
import UserModel from "@/models/User";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    AzureADProvider({
      clientId: process.env.AZURE_AD_CLIENT_ID!,
      clientSecret: process.env.AZURE_AD_CLIENT_SECRET!,
      tenantId: process.env.AZURE_AD_TENANT_ID,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (!user.email) return false;

      try {
        await connectDB();
        const existingUser = await UserModel.findOne({ email: user.email });

        if (!existingUser) {
          // New Registration
          await UserModel.create({
            name: user.name || user.email.split("@")[0],
            email: user.email,
            image: user.image || "",
            role: "user",
          });
        }
        return true;
      } catch (error) {
        console.error("Error during sign in:", error);
        return false;
      }
    },
    async session({ session, token }) {
      if (session.user && session.user.email) {
        await connectDB();
        const dbUser = await UserModel.findOne({ email: session.user.email });
        if (dbUser) {
          (session.user as any)._id = dbUser._id.toString();
          (session.user as any).role = dbUser.role;
        }
      }
      return session;
    },
    async jwt({ token, user }) {
      // Initial sign in
      // console.log("User from jwt: ", user);
      if (user) {
        token._id = (user as any).id;
      }
      return token;
    },
  },
  pages: {
    signIn: "/auth",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
