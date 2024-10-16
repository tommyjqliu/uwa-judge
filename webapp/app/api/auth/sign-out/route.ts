import { getSession } from "@/services/session/get-session";
import { redirect } from "next/navigation";

export async function GET() {
  const session = await getSession();
  session.destroy();
  redirect("/clear-cache");
}
