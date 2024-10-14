import { uwajudgeDB } from "@/lib/database-client";
import bcrypt from "bcrypt";

export async function createUser(userId: string, password: string) {
    const hashedPassword = password && (await bcrypt.hash(password, 10));
    return uwajudgeDB.user.create({
        data: {
            username: userId,
            password: hashedPassword,
        },
    });
}

export async function batchCreateUsers(userIds: string[], password: string) {
    const hashedPassword = password && (await bcrypt.hash(password, 10));
    return uwajudgeDB.user.createMany({
        data: userIds.map((userId) => ({
            username: userId,
            password: hashedPassword,
        })),
        skipDuplicates: true,
    });
}