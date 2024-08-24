import { describe, expect, it } from "vitest";
import { readProblem, readProblems } from "../utils/read-problems";
import { uwajudgeDB } from "@/lib/database-client";
import importProblemVersion from "@/lib/services/problem-version/import";
import { createSubmission } from "@/lib/services/submission/create-submission";
import { createJudge } from "@/lib/services/judge/create-judge";
import dispatchJudge from "@/lib/services/judge/dispatch-judge";


describe("Judge problem", () => {
    it("Judge problem should success", async () => {
        const file = await readProblem("hello.zip");
        const problemVersion = await importProblemVersion(file);
 
        const promises = [{
            code: "console.log('Hello World!')",
            languageId: "js",
            problemVersionId: problemVersion.id,
        }, {
            code: "print('Hello World!11')",
            languageId: "py3",
            problemVersionId: problemVersion.id,
        }, {
            code: `
            #include <iostream>

            int main() {
                std::cout << "Hello World!" << std::endl;
                return 0;
            }
            `,
            languageId: "cpp",
            problemVersionId: problemVersion.id,
        }].map(async (item) => {
            const submission = await createSubmission(item);
            const judge = await createJudge(submission.id);
            await dispatchJudge(judge.id);
        })

        await Promise.all(promises);
    })
});

