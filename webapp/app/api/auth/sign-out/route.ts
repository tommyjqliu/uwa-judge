import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export async function GET() {
    const session = await getSession();
    session.destroy();
    redirect("/clear-cache");
}