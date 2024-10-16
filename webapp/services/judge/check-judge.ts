import { publishMessage, sendMessage, waitMessage } from "@/lib/broker";
import { uwajudgeDB } from "@/lib/database-client";
import { assertParams } from "@/lib/error";
import { isJudgeFinished } from "./utils";

export async function refreshJudgeResult(judgeId: number) {
  const judge = await uwajudgeDB.judge.findUnique({
    where: {
      id: judgeId,
    },
    include: {
      judgeTask: true,
    },
  });

  assertParams(!!judge, "Judge not found");

  if (await isJudgeFinished(judge)) {
    await uwajudgeDB.judge.update({
      where: {
        id: judgeId,
      },
      data: {
        finished: true,
      },
    });

    sendMessage(`judge.${judgeId}.finished`, "true", { autoDelete: true });
    publishMessage("judge_finished", judgeId.toString());
  }
}

export async function waitForJudge(judgeId: number) {
  await waitMessage(`judge.${judgeId}.finished`);
  return uwajudgeDB.judge.findUnique({
    where: {
      id: judgeId,
    },
  });
}
