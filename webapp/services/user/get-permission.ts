import { getServerSession } from "@/lib/auth/session";
import { uwajudgeDB } from "@/lib/database-client";

export default async function getPermission() {
    const session = await getServerSession();
    const userId = session.user?.userId;
    const user = userId != null ? await uwajudgeDB.user.findFirst({
        where: {
            id: userId,
        },
    }) : null;
    return user?.permissions || [];
}