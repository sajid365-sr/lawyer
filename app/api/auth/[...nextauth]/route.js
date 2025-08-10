import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prisma"; // Create this file for Prisma client

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Custom logic to verify user (e.g., check Prisma DB)
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });
        if (user && credentials.password === "test") {
          // Replace with bcrypt
          return user;
        }
        return null;
      },
    }),
    // Add other providers like Google if needed
  ],
  secret: process.env.NEXTAUTH_SECRET, // Add to .env: NEXTAUTH_SECRET=your-secret
  session: { strategy: "jwt" },
  // No custom pages defined here to use defaults
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
