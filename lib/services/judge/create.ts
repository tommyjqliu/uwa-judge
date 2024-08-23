import { uwajudgeDB } from "@/lib/database-client";
import { assert } from "@/lib/error";

export async function createJudge(submissionId: number) {
    const submission = await uwajudgeDB.submission.findUnique({
        where: {
            id: submissionId,
        },
        include: {
            ProblemVersion: {
                include: {
                    Testcase: true,
                },
            },
            
        },
    });
    assert(!!submission, 'Submission not found');

    uwajudgeDB.$transaction(async (db) => {
        const judge = await db.judge.create({
            data: {
                submissionId,
            },
        });

        await db.judgeTask.createMany({
            data: submission.ProblemVersion.Testcase.map((testcase) => ({
                judgeId: judge.id,
                testcaseId: testcase.id,
            })),
        });
    })
}