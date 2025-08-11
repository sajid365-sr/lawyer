import Header from "@/components/Header";
import React from "react";
import { SessionProvider } from "next-auth/react";

const AuthLayout = ({ children }) => {
  return (
    <div className="flex flex-col h-max  w-screen">
      <SessionProvider>
        <Header />
        {children}
      </SessionProvider>
    </div>
  );
};

export default AuthLayout;
