"use client";

import { HeroUIProvider } from "@heroui/react";
import { SessionProvider } from "next-auth/react";
import { SessionSync } from "@/components/auth/SessionSync";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <SessionSync />
      <HeroUIProvider>{children}</HeroUIProvider>
    </SessionProvider>
  );
}


