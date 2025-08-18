import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          console.log("Authorize called with credentials:", credentials);
          if (!credentials?.email || !credentials?.password) {
            console.log("Missing email or password");
            throw new Error("Email and password are required");
          }

          // Check Client model
          let user = await prisma.client.findUnique({
            where: { email: credentials.email.toLowerCase() },
          });
          let role = "client";
          console.log("Client query result:", user);

          // If not found in Client, check Lawyer model
          if (!user) {
            user = await prisma.lawyer.findUnique({
              where: { email: credentials.email.toLowerCase() },
            });
            role = "lawyer";
            console.log("Lawyer query result:", user);
          }

          if (!user) {
            console.log("No user found with email:", credentials.email);
            throw new Error("No user found with this email");
          }

          const isValidPassword = await bcrypt.compare(
            credentials.password,
            user.password
          );
          console.log("Password comparison result:", isValidPassword);
          if (!isValidPassword) {
            console.log("Invalid password for user:", user.email);
            throw new Error("Invalid password");
          }

          console.log(
            "Authentication successful for user:",
            user.email,
            "with role:",
            role
          );
          return {
            id: user.id,
            name: user.name || "Unknown User", // Ensure name is provided
            email: user.email,
            role: role,
            image: user.image || null, // Include image if available
          };
        } catch (error) {
          console.error("Authorization error:", error.message);
          return null; // Return null to indicate authentication failure
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user }) {
      console.log("JWT callback - User:", user, "Token:", token);
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.role = user.role;
        token.image = user.image;
      }
      return token;
    },
    async session({ session, token }) {
      console.log("Session callback - Session:", session, "Token:", token);
      if (session.user) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.role = token.role;
        session.user.image = token.image;
      }
      return session;
    },
  },
});
