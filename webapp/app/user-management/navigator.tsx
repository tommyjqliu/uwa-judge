"use client"

import { UserPlus, Users } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function UserManagementNavigator() {
    const pathname = usePathname();
    const isActive = (path: string) => pathname === path;
    return (
        <nav className="bg-white sm:w-64">
            <ul className="space-y-2">
                <li>
                    <Link
                        href="/user-management/user"
                        className={`flex items-center p-2 rounded-lg ${isActive('/user-management/user')
                            ? 'bg-blue-100 text-blue-700'
                            : 'hover:bg-gray-100'
                            }`}
                    >
                        <Users className="mr-2 h-5 w-5" />
                        <span>Users</span>
                    </Link>
                </li>
                <li>
                    <Link
                        href="/user-management/user-group"
                        className={`flex items-center p-2 rounded-lg ${isActive('/user-management/user-group')
                            ? 'bg-blue-100 text-blue-700'
                            : 'hover:bg-gray-100'
                            }`}
                    >
                        <UserPlus className="mr-2 h-5 w-5" />
                        <span>User Groups</span>
                    </Link>
                </li>
            </ul>

        </nav>
    )
}