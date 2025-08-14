import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";
import { generateAccessToken, generateRefreshToken } from "./jwt";
import Google from "next-auth/providers/google";
import { hashPassword } from "./hash";
import { PrismaAdapter } from "@auth/prisma-adapter";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      credentials: {
        email: {
          type: "email",
          label: "Email",
          placeholder: "johndoe@gmail.com",
        },
        password: {
          type: "password",
          label: "Password",
          placeholder: "*****",
        },
      },
      authorize: async (credentials) => {
        let user = null;

        const pwHash = hashPassword(credentials.password);

        user = await prisma.user.findUnique(credentials.email, pwHash);

        if (!user) {
          throw new Error("Invalid Credentials.");
        }
        return user;
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = generateAccessToken({
          id: user.id,
          email: user.email,
        });
        token.refreshToken = generateRefreshToken({ id: user.id });
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      session.user.id = token.sub;
      session.user.role = token.role;
      return session;
    },
  },
  // pages: {
  //   signIn: "/login",
  //   signUp: "/signup",
  // },
});
