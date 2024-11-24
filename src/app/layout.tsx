import "@/styles/globals.css";
import { cn } from "@/lib/utils";
import { Inter as FontSans } from "next/font/google";
import { type Metadata } from "next";
import { Header } from "@/components/header";
// Required CSS import, unless you're overriding the styling
import "@knocklabs/react/dist/index.css";

import AuthProvider from "./auth-provider";
import { AppKnockProviders } from "./knock-provider";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Bid, Buy, and Save Big | Byte Auction",
  description:
    "Discover a wide range of items for sale at Byte Auction. Explore exciting deals and bid on exclusive products today!",
  icons: [{ rel: "icon", url: "/logo_big.png" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <AuthProvider>
          <AppKnockProviders>
            <Header />
            <div className="container mx-auto py-12">{children}</div>
          </AppKnockProviders>
        </AuthProvider>
      </body>
    </html>
  );
}
