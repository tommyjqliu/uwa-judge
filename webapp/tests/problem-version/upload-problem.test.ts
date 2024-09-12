import { testApiHandler } from "next-test-api-route-handler";
import { describe, expect, it } from "vitest";
import importProblemVersion from "@/prisma/seeding/problem-version";

describe("Upload problem", () => {
    it("version import should success", async () => {
        await importProblemVersion();
    });
});
