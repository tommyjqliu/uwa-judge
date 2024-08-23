import { testApiHandler } from "next-test-api-route-handler";
import { describe, expect, it } from "vitest";
import { readProblems } from "../utils/read-problems";
import { createJudge } from "@/lib/services/judge/create";
import { uwajudgeDB } from "@/lib/database-client";


describe.concurrent("New judge", () => {
    // it("should get files", async () => {
    //     await testApiHandler({
    //         appHandler,
    //         url: "?type=compile&id=py3",
    //         test: async ({ fetch }) => {
    //             const res = await fetch({
    //                 method: "GET",
    //             });

    //             if (res.status !== 200) {
    //                 console.error("Failed to get assignments. Status code:", res.status);
    //                 return;
    //             }

    //             console.log("Response:", res);
    //             console.log("JSON data:", await res.json());
    //         }
    //     });
    // });

    it("should submit success", async () => {
        await createJudge()
        console.log('Hello from judge')
    });
});