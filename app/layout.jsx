import { SessionProvider } from "next-auth/react";
import { Inter } from "next/font/google";
import "./globals.css";
import { auth } from "@/lib/auth";
import ToasterWrapper from "@/components/ToasterWrapper";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Legal Connect",
  description: "A platform for clients and lawyers",
};

export default async function RootLayout({ children }) {
  const session = await auth();

  let userProfile = null;
  if (session?.user?.id) {
    if (session.user.role === "client") {
      userProfile = await prisma.client.findUnique({
        where: { id: session.user.id },
        select: { profileImage: true },
      });
    } else if (session.user.role === "lawyer") {
      userProfile = await prisma.lawyer.findUnique({
        where: { id: session.user.id },
        select: { profileImage: true },
      });
    }
  }

  // if (!session) {
  //   redirect("/login");
  // }

  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true}>
        <SessionProvider session={session}>
          <Header
            userImage={userProfile?.profileImage || "/user.jpg"}
            userRole={session?.user?.role}
          />
          {children}
          <ToasterWrapper />
        </SessionProvider>
      </body>
    </html>
  );
}
