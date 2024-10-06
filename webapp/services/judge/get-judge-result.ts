import { uwajudgeDB } from "@/lib/database-client";
import { assertParams } from "@/lib/error";
import { isJudgeError, isJudgeTaskCorrect, isJudgeTaskError } from "./utils";

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
    
    const errorTasks = judge.judgeTask.filter(isJudgeTaskError);
    const firstErrorTask = errorTasks[0];
    let errorMessage = "compile-fail";
    if (firstErrorTask.runResult) {
        errorMessage = firstErrorTask.runResult;
    }

    let errorDiff;
    if (firstErrorTask.testcase.type === 'sample') {
        errorDiff = firstErrorTask.runDiff;
    }

    return {
        pass,
        total,
        errorMessage,
        errorDiff
    }
}