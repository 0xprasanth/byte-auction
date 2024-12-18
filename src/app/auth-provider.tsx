"use client";
import { SessionProvider } from "next-auth/react";
import React, { type ReactNode } from "react";

type Props = {
  children: ReactNode;
};

function AuthProvider({ children }: Props) {
  return <SessionProvider>{children}</SessionProvider>;
}

export default AuthProvider;
