"use client";
import { env } from "@/env";
import { KnockFeedProvider, KnockProvider } from "@knocklabs/react";
import { type ReactNode } from "react";
import { useSession } from "next-auth/react";

export function AppKnockProviders({ children }: { children: ReactNode }) {
  const { data: session } = useSession();

  return (
    <KnockProvider
      apiKey={env.NEXT_PUBLIC_KNOCK_PUBLIC_API_KEY}
      userId={session?.user?.id ?? "user"}
    >
      {/* Optionally, use the KnockFeedProvider to connect an in-app feed */}
      <KnockFeedProvider feedId={env.NEXT_PUBLIC_KNOCK_FEED_ID}>
        <div>{children}</div>
      </KnockFeedProvider>
    </KnockProvider>
  );
}
