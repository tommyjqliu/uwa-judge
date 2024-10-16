"use client";

import Link from "next/link";
import icon from "@/app/icon.png";
import Image from "next/image";
import { Fira_Code } from "next/font/google";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Permission } from "@prisma/client";
import { hasPermission } from "@/lib/permission";

const inter = Fira_Code({ weight: "500", subsets: ["latin"] });

const navItems = [
  {
    href: "/user-management/user",
    label: "User",
    path: "user-management",
    requires: [Permission.userManagement],
  },
  { href: "/assignments", label: "Assignment", path: "assignments" },
  { href: "/clarifications", label: "Clarification", path: "clarifications" },
  {
    href: "/problem-versions",
    label: "Problem",
    path: "problem-versions",
    requires: [Permission.problemManagement],
  },
];

export default function TopNavigator({ permissions }: { permissions: Permission[] }) {
  const pathname = usePathname();
  const isActive = (path: string) => pathname.includes(path);

  return (
    <nav className="flex gap-6">
      <Link href="/" className="flex gap-2">
        <Image src={icon} alt="UWA Judge" width={24} height={24} />
        <span className={inter.className}>UWAjudge</span>
      </Link>
      {navItems
        .filter(({ requires }) =>
          requires ? hasPermission(requires, permissions) : true,
        )
        .map(({ href, label, path }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              "transition-colors hover:text-foreground/80",
              isActive(path) ? "text-foreground" : "text-foreground/60",
            )}
          >
            {label}
          </Link>
        ))}
    </nav>
  );
}
