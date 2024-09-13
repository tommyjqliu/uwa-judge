import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { getServerSession, Session } from "@/lib/auth/session"
import { CircleUser } from "lucide-react"
import Link from "next/link"


export async function LayoutAvatar({ session }: { session?: Session }) {
    console.log(session);
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <CircleUser strokeWidth={1.5} />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {session ? (
                    <Link href="/api/auth/signout"><DropdownMenuItem>Logout</DropdownMenuItem></Link>
                ) : (
                    <Link href="/api/auth/signin"><DropdownMenuItem>Login</DropdownMenuItem></Link>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}