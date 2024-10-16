import { getSession } from "@/lib/auth";

export default async function getCurrentUser() {
  const session = await getSession();
  return session.profile?.id;
}
