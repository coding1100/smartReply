"use client";

import { HeroUIProvider } from "@heroui/react";
import { SessionProvider } from "next-auth/react";
import { SessionSync } from "@/components/auth/SessionSync";
import { NgrokBounce } from "@/components/auth/NgrokBounce";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider basePath="/auth">
      <NgrokBounce />
      <SessionSync />
      <HeroUIProvider>{children}</HeroUIProvider>
    </SessionProvider>
  );
}


