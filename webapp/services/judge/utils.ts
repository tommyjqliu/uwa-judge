import { Judge, JudgeTask } from "@prisma/client";

export function isJudgeTaskFinished(judgeTask: JudgeTask) {
  return (
    judgeTask.runResult !== null ||
    (judgeTask.compileSuccess !== null && !judgeTask.compileSuccess)
  );
}

export function isJudgeTaskError(judgeTask: JudgeTask) {
  return (
    (judgeTask.runResult !== null && judgeTask.runResult !== "correct") ||
    (judgeTask.compileSuccess !== null && !judgeTask.compileSuccess)
  );
}

export function isJudgeTaskCorrect(judgeTask: JudgeTask) {
  return judgeTask.runResult === "correct";
}

export async function isJudgeFinished(
  judge: Judge & { judgeTask: JudgeTask[] },
) {
  const hasError = judge.judgeTask.some(isJudgeTaskError);
  const isCompleted = judge.judgeTask.every(isJudgeTaskFinished);

  if (judge.stopOnError) {
    return hasError || isCompleted;
  }

  return isCompleted;
}

export async function isJudgeError(judge: Judge & { judgeTask: JudgeTask[] }) {
  return judge.judgeTask.some(isJudgeTaskError);
}
