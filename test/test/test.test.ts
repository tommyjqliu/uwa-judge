import { testApiHandler } from "next-test-api-route-handler";
import { beforeAll, describe, expect, it } from "vitest";

import * as appHandler from "@/app/api/test/route";

describe("GET /api/test", () => {

    it("should respond with 200", async () => {
        await testApiHandler({
            appHandler,
            test: async ({ fetch }) => {
                const response = await fetch({ method: "GET" });
                expect(response.status).toBe(200);
            },
        });
    });
});