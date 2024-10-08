import type { Metadata } from "next";
import { Fira_Code } from "next/font/google";

import "./globals.css";
import SessionInjector from "@/components/session-injector";

import TopNavigator from "./navigator";
import { getSession } from "@/lib/auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CircleUser } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const firaCode = Fira_Code({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "UWA Judge",
  description: "UWA Judge Application",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession();
  const { profile } = session;
  return (
    <html lang="en" className="h-full">
      <body className={`${firaCode.className} flex flex-col min-h-full`}>
        <header className="sticky top-0 z-50 w-full flex justify-between px-4 py-3 items-center border-border/40 bg-background/10 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
          <div className="flex gap-6 items-center">
            <TopNavigator />
          </div>
          {!profile ? (
            <div className="flex gap-2">
              <Link href="/sign-in">
                <Button size="sm" variant="ghost">
                  Sign-in
                </Button>
              </Link>
              <Link href="/sign-up">
                <Button size="sm" variant="outline">
                  Sign-up
                </Button>
              </Link>
            </div>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger className="p-1">
                <CircleUser strokeWidth={1.5} />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>{profile.username}</DropdownMenuLabel>
                <DropdownMenuLabel className="font-normal text-foreground/80">{profile.email}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <Link href="/api/auth/sign-out">
                  <DropdownMenuItem>Logout</DropdownMenuItem>
                </Link>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </header>
        {children}
        <SessionInjector session={JSON.parse(JSON.stringify(session))} />
      </body>
    </html>
  );
}
