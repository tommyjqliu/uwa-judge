import { uwajudgeDB } from "@/lib/database-client";
import { stringToInt } from "@/lib/zod"
import { Submission } from "@prisma/client";

export default async function CodeResult(params: { submissionId?: number }) {
    let submission: Submission | null = null;
    if (params.submissionId !== undefined) {
        submission = await uwajudgeDB.submission.findUnique({
            where: {
                id: params.submissionId,
            }
        })
    }

    return (
        <div>
            <h1>Code Result</h1>
            {submission?.id}
        </div>
    )
}