"use client";

import { SessionProvider } from "next-auth/react";
import Header from "@/components/Header";

export default function SessionHeader() {
  return (
    <SessionProvider>
      <Header />
    </SessionProvider>
  );
}
