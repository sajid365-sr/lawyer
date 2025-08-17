import { SessionProvider } from "next-auth/react";
import { Inter } from "next/font/google";
import "./globals.css";
import { auth } from "@/lib/auth";
import ToasterWrapper from "@/components/ToasterWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Your App Name",
  description: "A platform for clients and lawyers",
};

export default async function RootLayout({ children }) {
  const session = await auth();

  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider session={session}>
          <ToasterWrapper />
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
