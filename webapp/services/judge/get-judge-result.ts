import { uwajudgeDB } from "@/lib/database-client";
import { assertParams } from "@/lib/error";
import { isJudgeTaskCorrect, isJudgeTaskError } from "./utils";

export type JudgeResult = Awaited<ReturnType<typeof getJudgeResult>>;

export async function getJudgeResult(judgeId: number) {
    const judge = await uwajudgeDB.judge.findUnique({
        where: {
            id: judgeId
        },
        include: {
            judgeTask: {
                include: {
                    testcase: true
                }
            }
        }
    })

    assertParams(!!judge, "Judge not found");
    const correctTasks = judge.judgeTask.filter(isJudgeTaskCorrect);
    const pass = correctTasks.length;
    const total = judge.judgeTask.length;
    let errorMessage = "";
    let errorDiff = "";

    const errorTasks = judge.judgeTask.filter(isJudgeTaskError);
    const firstErrorTask = errorTasks[0];
    if (firstErrorTask) {
        errorMessage = "compile-fail";
        if (firstErrorTask?.runResult) {
            errorMessage = firstErrorTask.runResult;
        }

        if (firstErrorTask?.testcase.type === 'sample') {
            errorDiff = firstErrorTask.runDiff || "";
        }
    }

    return {
        pass,
        total,
        errorMessage,
        errorDiff
    }
}