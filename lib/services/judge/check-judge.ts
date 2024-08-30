import { publishMessage, sendMessage, waitMessage, withQueue } from "@/lib/broker";
import { uwajudgeDB } from "@/lib/database-client";
import { assert } from "@/lib/error";

export async function isJudgeFinished(judgeId?: number) {
    const judge = await uwajudgeDB.judge.findUnique({
        where: {
            id: judgeId
        },
        include: {
            judgeTask: true
        }
    });

    assert(!!judge, "Judge not found");

    const hasError = judge.judgeTask.some((task) => task.runResult !== null && task.runResult !== 'correct');
    const isCompleted = judge.judgeTask.every((task) => task.runResult !== null);
    if (judge.stopOnError) {
        return hasError || isCompleted;
    }
    return isCompleted;
}

export async function refreshJudgeResult(judgeId: number) {
    if (await isJudgeFinished(judgeId)) {
        await uwajudgeDB.judge.update({
            where: {
                id: judgeId
            },
            data: {
                finished: true
            }
        });

        sendMessage(`judge.${judgeId}.finished`, "true", { autoDelete: true });
        publishMessage('judge_finished', judgeId.toString());
    }
}

export async function waitForJudge(judgeId: number) {
    await waitMessage(`judge.${judgeId}.finished`);
    return uwajudgeDB.judge.findUnique({
        where: {
            id: judgeId
        }
    });
}