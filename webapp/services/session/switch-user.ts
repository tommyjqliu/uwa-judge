"use server";
import { uwajudgeDB } from "@/lib/database-client";
import { assert } from "@/lib/error";
import refreshProfile from "./refresh-session";

export default async function switchUser(userId: string) {
    const user = await uwajudgeDB.user.findUnique({
        where: {
            id: +userId,
        },
        include: {
            groups: true,
        },
    });

    assert(user, "User not found");
    await refreshProfile(user);
}
