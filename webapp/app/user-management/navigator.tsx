"use client";

import { cn } from "@/lib/utils";
import { Key, UserPlus, Users } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/user-management/users", icon: Users, label: "Users" },
  { href: "/user-management/permissions", icon: Key, label: "Permissions" },
];

export default function UserManagementNavigator() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-1">
      {navItems.map(({ href, icon: Icon, label }) => (
        <Link
          key={href}
          href={href}
          className={cn(
            "flex items-center p-2 rounded-lg transition-colors hover:text-foreground/80",
            pathname === href
              ? "bg-foreground/10 text-foreground"
              : "hover:bg-foreground/5 text-foreground/60",
          )}
        >
          <Icon className="mr-2 h-4 w-4" />
          <span>{label}</span>
        </Link>
      ))}
    </nav>
  );
}
