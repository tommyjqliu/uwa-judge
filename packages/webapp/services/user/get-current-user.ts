import { getSession } from "@/services/session/get-session";

export default async function getCurrentUser() {
  const session = await getSession();
  return session.profile?.id;
}
