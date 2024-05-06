import { testApiHandler } from "next-test-api-route-handler";
import { describe, expect, it } from "vitest";
import * as appHandler from "@/app/api/auth/[...nextauth]/route";

describe.concurrent("Login", () => {
    it("should login success", async () => {
        await testApiHandler({
            appHandler,
            url: "/api/auth/callback/credentials",
            test: async ({ fetch }) => {
                fetch({
                    method: "POST",
                    // headers: {
                    //     "Content-Type": "application/json",
                    // },
                    // body: JSON.stringify({
                    //     username: '111',
                    //     password: '222',
                    // })
                });
            }
        });
    });
});
