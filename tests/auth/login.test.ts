
import { describe, expect, it } from "vitest";

import { uwajudgeDB } from "@/lib/database-client";

describe.concurrent("Login", () => {
    it("should login success", async () => {
        console.log(0)
        await uwajudgeDB.$transaction(async (tx) => {
            console.log(1)
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
            // throw new Error("test")
           
            console.log(12)
            
            console.log(13)
        })
    });
});
