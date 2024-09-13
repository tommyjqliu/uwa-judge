import { uwajudgeDB } from "@/lib/database-client";
import { waitForJudge } from "../judge/check-judge";
import { createJudge } from "../judge/create-judge";
import dispatchJudge from "../judge/dispatch-judge";
import { createSubmission, SubmissionOptions } from "./create-submission";

export default async function realtimeSubmission(options: SubmissionOptions) {
    const submission = await createSubmission(options);
    const judge = await createJudge(submission.id);
    await dispatchJudge(judge.id);
    await waitForJudge(judge.id);
    const returnJudge = await uwajudgeDB.judge.findUnique({
        where: {
            id: judge.id
        },
        include: {
            judgeTask: true
        }
    });
    return returnJudge!;
}