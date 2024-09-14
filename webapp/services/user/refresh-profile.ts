import { getSession } from "@/lib/auth/auth";
import { uwajudgeDB } from "@/lib/database-client";
import { assert } from "@/lib/error";
import { $Enums, User, UserGroup } from "@prisma/client";

export default async function refreshProfile(user?: User & { groups: UserGroup[] } | null) {
    const session = await getSession();
    const { profile } = session;

    if (!user) {
        if (!profile) return;
        const { id } = profile;
        user = await uwajudgeDB.user.findUnique({
            where: {
                id,
            },
            include: {
                groups: true,
            }
        });
        assert(user, "User not found");
    }

    const permissions = new Set<$Enums.Permission>(user.permissions);
    for (const group of user.groups) {
        for (const permission of group.permissions) {
            permissions.add(permission);
        }
    }

    session.profile = {
        ...user,
        permissions: [...permissions]
    };

    await session.save();
}