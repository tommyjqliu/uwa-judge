"use server";
import { waitForJudge } from "../judge/check-judge";
import { createJudge } from "../judge/create-judge";
import dispatchJudge from "../judge/dispatch-judge";
import { createSubmission, SubmissionOptions } from "./create-submission";
import { getJudgeResult } from "../judge/get-judge-result";

export default async function realtimeSubmission(options: SubmissionOptions) {
  const submission = await createSubmission(options);
  const judge = await createJudge(submission.id);
  await dispatchJudge(judge.id);
  await waitForJudge(judge.id);
  return getJudgeResult(judge.id);
}
