"use client"

import Link from "next/link"
import icon from "@/app/icon.png";
import Image from "next/image";
import { Fira_Code } from "next/font/google";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const inter = Fira_Code({ weight: "500", subsets: ["latin"] });

export default function TopNavigator() {
    const pathname = usePathname();
    const isActive = (path: string) => pathname.includes(path);
    return (
        <nav className="flex gap-6">
            <Link href="/" className="flex gap-2">
                <Image src={icon} alt="UWA Judge" width={24} height={24} />
                <span className={inter.className} >UWAjudge</span>
            </Link>
            <Link href="/user-management/user" className={cn("transition-colors hover:text-foreground/80", isActive("user-management") ? "text-foreground" : "text-foreground/60")}>User</Link>
            <Link href="/assignments" className={cn("transition-colors hover:text-foreground/80", isActive("assignments") ? "text-foreground" : "text-foreground/60")}>Assignment</Link>
            <Link href="/clarifications" className={cn("transition-colors hover:text-foreground/80", isActive("clarifications") ? "text-foreground" : "text-foreground/60")}>Clarification</Link>
            <Link href="/problem-versions" className={cn("transition-colors hover:text-foreground/80", isActive("problem-versions") ? "text-foreground" : "text-foreground/60")}>Problem</Link>
            <Link href="/code" className={cn("transition-colors hover:text-foreground/80", isActive("code") ? "text-foreground" : "text-foreground/60")}>Code</Link>
        </nav>
    )
}