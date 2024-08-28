import { testApiHandler } from "next-test-api-route-handler";
import { describe, it } from "vitest";
import * as appHandler from "@/app/api/assignments/[assignmentId]/route"

describe.skip.concurrent("Get Assignment", () => {
    it("should get assignments successfully", async () => {
        await testApiHandler({
            appHandler,
            test: async ({ fetch }) => {

                const res = await fetch({
                    method: "GET",
                });

                if (res.status !== 200) {
                    console.error("Failed to get assignments. Status code:", res.status);
                    return;
                }
                console.log("Response:", res);


                console.log("JSON data:", await res.json());
            }
        });
    });
});
