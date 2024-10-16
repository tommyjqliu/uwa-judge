import { getSession } from "./get-session";

export async function getPermissions() {
    const session = await getSession();
    return session?.profile?.permissions || [];
}