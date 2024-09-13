import type { Metadata } from "next";
import { Inter, Press_Start_2P } from "next/font/google";
import { getServerSession } from "@/lib/auth/session";
import Link from "next/link";

import "./globals.css";
import { Button } from "@/components/ui/button";
import SessionInjector from "@/components/session-injector";

import TopNavigator from "./navigator";
import { LayoutAvatar } from "@/components/layout-avatar";

const inter = Inter({ subsets: ["latin"] });
const pressStart2P = Press_Start_2P({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "UWA Judge",
  description: "UWA Judge Application",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();

  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} flex flex-col min-h-full`}>
        <header className="sticky top-0 z-50 w-full flex justify-between p-4 items-center border-border/40 bg-background/10 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex gap-6 items-center">
            <TopNavigator />
          </div>
          <LayoutAvatar session={session}/>
        </header>
        <main className="flex-1 overflow-auto">
          {children}
        </main>
        <SessionInjector session={session} />
      </body>
    </html>
  );
}