import { testApiHandler } from "next-test-api-route-handler";
import { describe, expect, it } from "vitest";
import { readProblems } from "../utils/read-problems";
import { getHash } from "@/lib/file";
import { uwajudgeDB } from "@/lib/database-client";
import batchImportProblemVersion from "@/lib/services/problem-version/batch-import";

describe("Upload problem", () => {
    it("version import should success", async () => {
        const files = await readProblems();
        const hashes = await Promise.all(files.map((file) => getHash(file)));
        await uwajudgeDB.problemVersion.deleteMany({
            where: {
                hash: {
                    in: hashes,
                },
            },
        });

        await batchImportProblemVersion(files);
    });
});
