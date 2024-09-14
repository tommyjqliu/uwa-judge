"use client"

import { cn } from "@/lib/utils";
import { UserPlus, Users } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function UserManagementNavigator() {
    const pathname = usePathname();
    const isActive = (path: string) => pathname === path;
    return (
        <nav>
            <ul className="space-y-2">
                <li>
                    <Link
                        href="/user-management/user"
                        className={cn(
                            "flex items-center p-2 rounded-lg transition-colors hover:text-foreground/80",
                            isActive("/user-management/user")
                                ? "bg-foreground/10 text-foreground"
                                : "hover:bg-foreground/5 text-foreground/60"
                        )}
                    >
                        <Users className="mr-2 h-5 w-5" />
                        <span>Users</span>
                    </Link>
                </li>
                <li>
                    <Link
                        href="/user-management/user-group"
                        className={cn(
                            "flex items-center p-2 rounded-lg transition-colors hover:text-foreground/80",
                            isActive("/user-management/user-group")
                                ? "bg-foreground/10 text-foreground"
                                : "hover:bg-foreground/5 text-foreground/60"
                        )}
                    >
                        <UserPlus className="mr-2 h-5 w-5" />
                        <span>User Groups</span>
                    </Link>
                </li>
            </ul>

        </nav>
    )
}