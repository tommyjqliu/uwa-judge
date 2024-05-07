import { testApiHandler } from "next-test-api-route-handler";
import { describe, expect, it } from "vitest";
import * as appHandler from "@/app/api/submissions/[submissionId]/route";

describe.concurrent("Upload problem", () => {
    it("should upload success", async () => {
        await testApiHandler({
            appHandler,
            test: async ({ fetch }) => {


                const res = await fetch({
                    method: "GET",
                
                });

                // console.log(await res.json())
                expect(res.status).toBe(200);
            }
        });
    });
});
