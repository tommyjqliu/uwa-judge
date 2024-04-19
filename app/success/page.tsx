import { auth } from "@/lib/auth";

export default async function page() {
    const session = await auth();
    console.log('tests')
    return <div>Login Success: {session?.user?.name}</div>
}