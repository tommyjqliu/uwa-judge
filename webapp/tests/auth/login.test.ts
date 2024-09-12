
import { describe, expect, it } from "vitest";

import { uwajudgeDB } from "@/lib/database-client";

describe.skip.concurrent("Login", () => {
    it("should login success", async () => {
        await uwajudgeDB.$transaction(async (tx) => {
            await tx.user.update({
                where: {
                    username: "user3"
                },
                data: {
                    password: "test03"
                }
            })
            await uwajudgeDB.user.update({
                where: {
                    username: "user2"
                },
                data: {
                    password: "test03"
                }
            })
        })
    });
});
