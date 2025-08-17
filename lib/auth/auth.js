import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";
import { compare } from "bcryptjs";

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
        console.log("Authorize called with credentials:", credentials);
        try {
          const user = await prisma.user.findUnique({
            where: { email: credentials.email },
          });
          console.log("Found user:", user);
          if (user && (await compare(credentials.password, user.password))) {
            console.log("Authentication successful for user:", user.email);
            return {
              id: user.id,
              email: user.email,
              name: user.name,
            };
          }
          console.log("Authentication failed for user:", credentials.email);
          return null;
        } catch (error) {
          console.error("Authorize error:", error);
          return null;
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },
  debug: process.env.NODE_ENV === "development",
};

export const { auth } = NextAuth(authOptions);
